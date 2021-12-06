import { Helmet } from 'react-helmet';
import { useState, React } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Hidden
} from '@material-ui/core';
import Api from '../../Api/Api';

const server_path = 'http://202.31.202.28:443/file/';
const empty_profile = 'http://202.31.202.28:443/file/file__1637754138261.png';

const SignUpRegister = () => {
  const [postBody, setPostBody] = useState({
    id: '',
    pw: '',
    checkpw: '',
    image: empty_profile,
    name: '',
    number: '',
    checkemail: '',
    email: '',
    type: 'STUDENT',
    checked: false,
    github: '',
    blog: '',
    content: '',
    position: ''
  });

  const [isClick, setIsClick] = useState(false);
  const [image, setimage] = useState();
  const [fileUrl, setFileUrl] = useState(null);

  // 이메일 인증 번호 전송, 이메일 인증 번호 전송 버튼 OnClick 함수
  const emailAuth = async () => {
    let response = await Api.getEmail(postBody.email);

    if (response.data.sucess) {
      if (!response.data.doubleCheck) {
        alert('등록된 아이디의 이메일입니다');
      } else {
        Api.emailCode = response.data.emailId;
        alert('이메일이 전송되었습니다.');
      }
    } else {
      alert('이메일 전송에 실패했습니다');
    }
  };

  // 이메일 인증 확인, 이메일 인증 번호 인증 버튼 OnClick 함수
  const checkEmailAuth = async () => {
    var check = { auth: false, msg: '' };
    if (postBody.checkemail) {
      if (Api.emailCode !== null) {
        let response = await Api.postEmail(Api.emailCode, postBody.checkemail);
        check.auth = await response.isAuth;
        if (check.auth === true) {
          check.msg = '인증되었습니다';
          setIsClick(true);
        } else {
          check.msg = '인증에 실패하였습니다';
        }
        return check;
      } else {
        check.msg = '인증번호 전송 후 진행해주세요';
        return check;
      }
    } else {
      check.msg = '이메일 인증번호를 입력해주세요';
      return check;
    }
  };

  const processImage = async (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setimage(imageFile);
    setFileUrl(imageUrl);
    const formData = new FormData();
    formData.append('attachments', imageFile);
    let response = await Api.getReadFile(formData);
    if (response.sucess) {
      let image_path = response.files[0].file_path.replace('file\\', '');
      let image = server_path + image_path;
      setPostBody({
        id: postBody.id,
        pw: postBody.pw,
        checkpw: postBody.checkpw,
        image: image,
        name: postBody.name,
        number: postBody.number,
        checkemail: postBody.checkemail,
        email: postBody.email,
        type: postBody.type,
        checked: postBody.checked,
        github: postBody.github,
        blog: postBody.blog,
        content: postBody.content,
        position: postBody.position
      });
    } else {
      console.log('이미지 업로드 실패');
    }
  };

  const deleteImage = () => {
    setFileUrl(empty_profile);
    setPostBody({
      id: postBody.id,
      pw: postBody.pw,
      checkpw: postBody.checkpw,
      image: empty_profile,
      name: postBody.name,
      number: postBody.number,
      checkemail: postBody.checkemail,
      email: postBody.email,
      type: postBody.type,
      checked: postBody.checked,
      github: postBody.github,
      blog: postBody.blog,
      content: postBody.content,
      position: postBody.position
    });
  };

  // 비밀번호 확인
  const checkPw = function () {
    return postBody.pw === postBody.checkpw;
  };

  // 중복 아이디 체크
  const checkId = async () => {
    var check = false;
    if (!postBody.id) {
      return check;
    }
    let response = await Api.getDoubleCheckId(postBody.id);
    if (response.data.sucess) {
      check = response.data.isDouble;
      return check;
    }
    return check;
  };

  // 빈 값 체크
  const emptyCheck = () => {
    if (
      postBody.number === '' ||
      postBody.email === '' ||
      postBody.id === '' ||
      postBody.pw === '' ||
      postBody.name === ''
    ) {
      return false;
    }
  };

  // 회원가입 OnClick 함수
  const join = async () => {
    const isEmpty = emptyCheck();
    let isEmailAuth = await checkEmailAuth();
    const isDuplicatePw = checkPw();
    let isDuplicateId = await checkId();
    if (postBody.checked === false) {
      alert('약관동의에 체크해주세요');
      return false;
    }
    if (isDuplicatePw === false) {
      alert('비밀번호가 일치하지 않습니다');
      return false;
    }
    if (isEmpty === false) {
      alert('필수항목란을 채워주세요(학번, 이메일, 아이디, 비밀번호, 이름)');
      return false;
    }
    if (!isClick) {
      alert('인증번호 확인을 해주세요');
      return false;
    }
    if (isEmailAuth.auth === false) {
      alert(isEmailAuth.msg);
      return false;
    }
    if (isDuplicateId === true) {
      alert('중복된 아이디 입니다');
      return false;
    }
    if (postBody.image == null) {
      setPostBody({
        id: postBody.id,
        pw: postBody.pw,
        checkpw: postBody.checkpw,
        image: empty_profile,
        name: postBody.name,
        number: postBody.number,
        checkemail: postBody.checkemail,
        email: postBody.email,
        type: postBody.type,
        checked: postBody.checked,
        github: postBody.github,
        blog: postBody.blog,
        content: postBody.content,
        position: postBody.position
      });
    }
    let user_data = {
      user_login_id: postBody.id,
      user_email: postBody.email,
      user_password: postBody.pw,
      user_type: postBody.type,
      user_name: postBody.name,
      user_image: postBody.image,
      user_introduction: postBody.content,
      user_github: postBody.github,
      user_blog: postBody.blog,
      user_position: postBody.position,
      user_school_num: postBody.number
    };
    let response = await Api.postUser(user_data);
    if (response.success) {
      const target = '/login/login';
      window.location.href = target;
      alert('회원가입 성공');
    } else {
      alert('회원가입 실패');
    }
  };

  // React Handle Function
  const handlecheckChange = (event) => {
    setPostBody({ ...postBody, [event.target.name]: event.target.checked });
  };
  const handleChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      type: event.currentTarget.value
    }));
  };
  const handleIdChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      id: event.target.value
    }));
  };
  const handlenumberChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      number: event.target.value
    }));
  };
  const handlecheckemailChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      checkemail: event.target.value
    }));
  };
  const handleEmailChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      email: event.target.value
    }));
  };
  const handlepwChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      pw: event.target.value
    }));
  };
  const handlecheckpwChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      checkpw: event.target.value
    }));
  };
  const handlenameChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      name: event.target.value
    }));
  };
  const handlecontentChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      content: event.target.value
    }));
  };
  const handlegithubChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      github: event.target.value
    }));
  };
  const handleblogChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      blog: event.target.value
    }));
  };
  const handlepositionChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      position: event.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box>
        <Box
          sx={{
            minHeight: '100%',
            py: 3
          }}
        />
        <Grid item lg={10} md={10} sm={12} xs={12}>
          <Card
            sx={{
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              boxShadow: 5
            }}
          >
            <CardContent>
              <h2 style={{ color: '#006400' }}>회원가입</h2>
              <Box
                sx={{
                  minHeight: '100%',
                  py: 2,
                  borderBottom: '1px solid grey'
                }}
              />
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  paddingLeft: 0.5
                }}
              >
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 1.5
                  }}
                />
                <h3>회원 타입</h3>
                <FormControl component="fieldset">
                  <RadioGroup
                    id="type"
                    aria-label="회원 타입"
                    name="회원 타입"
                    value={postBody.type ? postBody.type : ''}
                    defaultValue={postBody.type}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="STUDENT"
                      control={<Radio color="default" />}
                      label="학생"
                    />
                    <FormControlLabel
                      value="PROFESSOR"
                      control={<Radio color="default" />}
                      label="교수"
                    />
                  </RadioGroup>
                </FormControl>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  //수정
                  id="code"
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="학번/교수코드"
                  variant="outlined"
                  defaultValue={postBody.number}
                  onChange={handlenumberChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>이메일</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <Hidden lgDown>
                  <TextField
                    id="email"
                    halfwidth="true"
                    sx={{
                      flex: '1',
                      flexDirection: 'row',
                      boxShadow: 5,
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderTopLeftRadius: 5,
                      marginRight: 3,
                      backgroundColor: 'primary.smoothgreen'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action" />
                        </InputAdornment>
                      )
                    }}
                    placeholder="email@email.com"
                    variant="outlined"
                    onChange={handleEmailChange}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{
                      width: 240,
                      marginTop: 0.5
                    }}
                    onClick={emailAuth}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      인증번호 전송
                    </h3>
                  </Button>
                </Hidden>
                <Hidden lgUp>
                  <TextField
                    id="email"
                    halfwidth="true"
                    sx={{
                      flex: '1',
                      flexDirection: 'row',
                      boxShadow: 5,
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderTopLeftRadius: 5,
                      backgroundColor: 'primary.smoothgreen'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action" />
                        </InputAdornment>
                      )
                    }}
                    placeholder="email@email.com"
                    variant="outlined"
                    onChange={handleEmailChange}
                  />
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 0.5
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{
                      width: 240,
                      marginTop: 0.5
                    }}
                    // 수정
                    onClick={emailAuth}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      인증번호 전송
                    </h3>
                  </Button>
                </Hidden>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <Hidden lgDown>
                  <TextField
                    id="email"
                    halfwidth="true"
                    sx={{
                      flex: '1',
                      flexDirection: 'row',
                      boxShadow: 5,
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderTopLeftRadius: 5,
                      marginRight: 3,
                      backgroundColor: 'primary.smoothgreen'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action" />
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"
                    onChange={handlecheckemailChange}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{
                      width: 240,
                      marginTop: 0.5
                    }}
                    onClick={() => {
                      checkEmailAuth().then((check) => alert(check.msg));
                    }}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      인증번호 확인
                    </h3>
                  </Button>
                </Hidden>
                <Hidden lgUp>
                  <TextField
                    id="email"
                    halfwidth="true"
                    sx={{
                      flex: '1',
                      flexDirection: 'row',
                      boxShadow: 5,
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderTopLeftRadius: 5,
                      backgroundColor: 'primary.smoothgreen'
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action" />
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"
                    onChange={handlecheckemailChange}
                  />
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 0.5
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{
                      width: 240,
                      marginTop: 0.5
                    }}
                    // 수정
                    onClick={() => {
                      checkEmailAuth().then((check) => alert(check.msg));
                    }}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      인증번호 확인
                    </h3>
                  </Button>
                </Hidden>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>아이디</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="아이디 입력"
                  variant="outlined"
                  onChange={handleIdChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>비밀번호</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  id="pw"
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  type="password"
                  placeholder="영어 대/소문자, 특수문자"
                  variant="outlined"
                  onChange={handlepwChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>비밀번호 확인</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  type="password"
                  placeholder="영어 대/소문자, 특수문자"
                  variant="outlined"
                  onChange={handlecheckpwChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>프로필 사진</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <div className="img__box">
                  <img
                    src={fileUrl}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%'
                    }}
                  />
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 0.5
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    color="info"
                    sx={{
                      marginTop: 1,
                      width: 180
                    }}
                  >
                    <label
                      htmlFor="file"
                      style={{
                        width: 100
                      }}
                    >
                      <h3
                        style={{
                          color: '#ffffff'
                        }}
                      >
                        사진 선택
                      </h3>
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      style={{
                        color: '#ffffff',
                        display: 'none'
                      }}
                      onChange={processImage}
                    ></input>
                  </Button>
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 0.5
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    sx={{
                      marginTop: 1,
                      width: 180
                    }}
                    onClick={deleteImage}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      기본 이미지로 변경
                    </h3>
                  </Button>
                </div>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>이름</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  id="name"
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="이름을 입력하세요"
                  variant="outlined"
                  onChange={handlenameChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>github주소</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  id="github"
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="www.github.com"
                  variant="outlined"
                  onChange={handlegithubChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>blog주소</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  id="blog"
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="www.blog.com"
                  variant="outlined"
                  onChange={handleblogChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>포지션</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  id="position"
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="포지션을 입력하세요"
                  variant="outlined"
                  onChange={handlepositionChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>자기소개</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  id="content"
                  fullWidth
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handlecontentChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <FormControlLabel
                  id="check"
                  control={
                    <Checkbox
                      checked={postBody.checked}
                      onChange={handlecheckChange}
                      name="checked"
                      color="default"
                    />
                  }
                  label="이용약관, 개인정보취급방침에 동의합니다."
                />
              </Box>
              <Button
                variant="contained"
                size="medium"
                color="success"
                sx={{
                  marginTop: 2,
                  width: 240
                }}
                onClick={join}
              >
                <h3
                  style={{
                    color: '#ffffff'
                  }}
                >
                  가입하기
                </h3>
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default SignUpRegister;
