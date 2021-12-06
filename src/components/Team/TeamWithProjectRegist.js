import 'date-fns';
import { Helmet } from 'react-helmet';
import { useState, React, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  Button
} from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Api from 'src/Api/Api';
import TagsInput from 'src/components/Dashboard/TagsInput';
import TeamWithUserInput from 'src/components/Team/TeamWithUserInput';
import ProjectPostList from 'src/components/Dashboard/ProjectPostList';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const data = JSON.parse(sessionStorage.getItem('user_data'));
const server_path = 'http://202.31.202.28:443/file/';
const empty_path = 'http://202.31.202.28:443/file/file__1637753431355.jpg';

const TeamWithProjectRegist = () => {
  const team_id = location.href.split('/')[location.href.split('/').length - 2];
  const [postBody, setPostBody] = useState({
    title: '',
    content: '',
    image: empty_path
  });

  const [postArray, setpostArray] = useState({
    post_title: ''
  });
  const [PostArrays, setPostArrays] = useState(['프로젝트소개', '팀원소개']);

  const [subject, setsubject] = useState([]);
  const [professor, setprofessor] = useState([]);
  const [year, setyear] = useState([]);
  const [category, setcategory] = useState([]);
  const [stack, setstack] = useState([]);

  const [subjects, setsubjects] = useState([]);
  const [professors, setprofessors] = useState([]);
  const [years, setyears] = useState([]);
  const [categorys, setcategorys] = useState([]);

  const [members, setmembers] = useState([]);
  const [p_list, setp_list] = useState([]);
  const [image, setimage] = useState();
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(async () => {
    await getYears();
    await getSubjects();
    await getProfessors();
    await getCategorys();
  }, []);

  // 드롭다운 메뉴 로딩
  const getYears = async () => {
    let response = await Api.getYears();
    const year_list = await response.data.years;
    setyears(year_list);
  };
  const getSubjects = async () => {
    let response = await Api.getSubjects();
    const subject_list = await response.data.subjects;
    setsubjects(subject_list);
  };
  const getProfessors = async () => {
    let response = await Api.getProfessors();
    var professor_list = response.data.professors;
    var professor_Name_list = response.data.professors.map(
      ({ user_name }) => user_name
    );
    setp_list(professor_list);
    setprofessors(professor_Name_list);

    const p = [];
    p_list.map((idx) => {
      if (idx.user_id == professor) return p.push(idx.user_name);
    });
    setprofessor(p);
  };
  const getCategorys = async () => {
    let response = await Api.getCategorys();
    const category_list = await response.data.categorys;
    setcategorys(category_list);
  };
  const getstack = (selectedItem) => {
    setstack(selectedItem);
  };
  const getMembers = (selectedItem) => {
    setmembers(selectedItem);
  };
  const getList = (postArrays) => {
    setPostArrays(postArrays);
  };

  // 빈 값 체크
  const emptyCheck = () => {
    if (
      postBody.title === '' ||
      subject[0] === undefined ||
      year[0] === undefined ||
      professor[0] === undefined ||
      category.length == 0
    ) {
      return false;
    }
  };

  // 프로젝트 생성 버튼 OnClick 함수
  const createProject = async () => {
    // 예외 처리
    const isEmpty = emptyCheck();
    if (isEmpty === false) {
      alert(
        '필수항목란을 채워주세요(제목, 기술 스택, 해당 과목, 진행년도, 지도교수, 카테고리)'
      );
      return false;
    }
    // post 요청
    const intM = [];
    var errFlag = { err: false, msg: null };
    intM.push(data.user_id);
    if (members !== '') {
      await Promise.all(
        members.map(async function (member) {
          let response = await Api.getUserLoginId(member);
          if (response.data.users.length === 0) {
            errFlag = {
              err: true,
              msg: '프로젝트 팀원 아이디를 다시 확인해주세요'
            };
          } else if (response.data.users[0].user_id === data.user_id) {
            errFlag = {
              err: true,
              msg: '리더의 아이디는 제외시켜주십시오'
            };
          } else {
            return intM.push(parseInt(response.data.users[0].user_id, 10));
          }
        })
      );
    }
    if (errFlag.err) {
      alert(errFlag.msg);
      return false;
    }

    const p_id = [];
    if (professor !== null || professor !== undefined) {
      p_list.map((idx) => {
        if (idx.user_name == professor) return p_id.push(idx.user_id);
      });
    }

    if (postBody.image == null) {
      setPostBody({
        title: postBody.title,
        image: empty_path,
        content: postBody.content
      });
    }

    const reqObject = {
      project_title: postBody.title,
      project_introduction: postBody.content,
      project_categorys: category,
      project_leader: data.user_id,
      project_image: postBody.image,
      project_subject: subject[0],
      project_subject_year: year[0],
      project_professor: p_id[0],
      project_members: intM,
      project_tags: stack,
      project_posts: PostArrays
    };
    let response = await Api.postProject(reqObject);
    if (response.sucess) {
      setprofessor(p_id);
      alert('생성되었습니다');
      const target = '/app/dashboard';
      window.location.href = target;
    } else {
      alert('생성 실패');
    }
  };

  // React Handle Function
  const handlecategoryChange = (event) => {
    const {
      target: { value }
    } = event;
    setcategory(typeof value === 'string' ? value.split(',') : value);
  };
  const handlesubjectChange = (event) => {
    const {
      target: { value }
    } = event;
    setsubject(typeof value === 'string' ? value.split(',') : value);
  };
  const handleprofessorChange = (event) => {
    const {
      target: { value }
    } = event;
    setprofessor(typeof value === 'string' ? value.split(',') : value);
  };
  const handleposttitleChange = (event) => {
    setpostArray({
      post_title: event.currentTarget.value
    });
  };
  const handleyearChange = (event) => {
    const {
      target: { value }
    } = event;
    setyear(typeof value === 'string' ? value.split(',') : value);
  };
  const handletitleChange = (event) => {
    setPostBody({
      title: event.currentTarget.value,
      content: postBody.content,
      image: postBody.image
    });
  };
  const handlecontentChange = (event) => {
    setPostBody({
      title: postBody.title,
      image: postBody.image,
      content: event.currentTarget.value
    });
  };
  const handleListChange = (event) => {
    if (event.key === 'Enter') {
      const {
        target: { value }
      } = event;
      var state = PostArrays.includes(value);
      if (state == true) {
        alert('같은 게시물이 있습니다');
        setpostArray({
          post_title: ''
        });
      } else {
        let postArrays = PostArrays;
        postArrays.push(value);
        setpostArray({
          post_title: ''
        });
        setPostArrays(postArrays);
      }
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
        title: postBody.title,
        image: image,
        content: postBody.content
      });
    } else {
      console.log('이미지 업로드 실패');
    }
  };

  const deleteImage = (event) => {
    setFileUrl(empty_path);
    setPostBody({
      title: postBody.title,
      image: empty_path,
      content: postBody.content
    });
  };

  return (
    <>
      <Helmet>
        <title>ProjectRegitser</title>
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
              <h2 style={{ color: '#006400' }}>새 프로젝트 생성</h2>
              <h4>산출물 관리를 할수 있어요!</h4>
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
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 1.5
                    }}
                  />
                  <h3>프로젝트 사진</h3>
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 0.5
                    }}
                  />
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
                      <div className="img__box">
                        <img
                          src={fileUrl}
                          style={{
                            width: '100%',
                            height: '15%'
                          }}
                        />
                        <Box
                          sx={{
                            minHeight: '100%',
                            py: 1.5
                          }}
                        />
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          sx={{
                            marginTop: 2,
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
                            marginTop: 2,
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
                    </CardContent>
                  </Card>
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 1.5
                    }}
                  />
                </Grid>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 1.5
                  }}
                />
                <h3>프로젝트 제목</h3>
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
                  variant="outlined"
                  onChange={handletitleChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>프로젝트 설명</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  fullWidth
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5
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
                <h3>프로젝트 팀원</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TeamWithUserInput
                  variant="outlined"
                  id="프로젝트 팀원"
                  name="프로젝트 팀원"
                  label="프로젝트 팀원"
                  propfunction={getMembers}
                  stack={members}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>기술 스택 (입력 후 Enter or 클릭)</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TagsInput
                  variant="outlined"
                  id="기술스택"
                  name="기술스택"
                  label="기술스택"
                  propfunction={getstack}
                  stack={stack}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>프로젝트 과목</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <FormControl
                  sx={{
                    width: 200,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                >
                  <InputLabel id="과목명">&nbsp; 과목명</InputLabel>
                  <Select
                    labelId="과목명"
                    id="과목명"
                    value={subject}
                    onChange={handlesubjectChange}
                    input={<OutlinedInput label="과목명" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {subjects.map((s) => (
                      <MenuItem key={s} value={s}>
                        <Checkbox
                          sx={{
                            color: 'primary.darkgreen',
                            '&.Mui-checked': {
                              color: 'primary.darkgreen'
                            }
                          }}
                          checked={subject.indexOf(s) > -1}
                        />
                        <ListItemText primary={s} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>년도</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <FormControl
                  sx={{
                    width: 200
                  }}
                >
                  <InputLabel id="년도">&nbsp; 년도</InputLabel>
                  <Select
                    labelId="년도"
                    id="년도"
                    value={year}
                    onChange={handleyearChange}
                    input={<OutlinedInput label="년도" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {years.map((s) => (
                      <MenuItem key={s} value={s}>
                        <Checkbox
                          sx={{
                            color: 'primary.darkgreen',
                            '&.Mui-checked': {
                              color: 'primary.darkgreen'
                            }
                          }}
                          checked={year.indexOf(s) > -1}
                        />
                        <ListItemText primary={s} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>프로젝트 지도 교수</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <FormControl
                  sx={{
                    width: 200,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                >
                  <InputLabel id="지도교수">&nbsp; 지도교수</InputLabel>
                  <Select
                    labelId="지도교수"
                    id="지도교수"
                    value={professor}
                    onChange={handleprofessorChange}
                    input={<OutlinedInput label="지도교수" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {professors.map((s) => (
                      <MenuItem key={s} value={s}>
                        <Checkbox
                          sx={{
                            color: 'primary.darkgreen',
                            '&.Mui-checked': {
                              color: 'primary.darkgreen'
                            }
                          }}
                          checked={professor.indexOf(s) > -1}
                        />
                        <ListItemText primary={s} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>프로젝트 카테고리</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <FormControl
                  sx={{
                    width: 200,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                >
                  <InputLabel id="카테고리">&nbsp; 카테고리</InputLabel>
                  <Select
                    labelId="카테고리"
                    id="카테고리"
                    multiple
                    value={category}
                    onChange={handlecategoryChange}
                    input={<OutlinedInput label="카테고리" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {categorys.map((s) => (
                      <MenuItem key={s} value={s}>
                        <Checkbox
                          sx={{
                            color: 'primary.darkgreen',
                            '&.Mui-checked': {
                              color: 'primary.darkgreen'
                            }
                          }}
                          checked={category.indexOf(s) > -1}
                        />
                        <ListItemText primary={s} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>프로젝트 게시물</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <ProjectPostList
                  PostArrays={PostArrays}
                  propfunction={getList}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
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
                  placeholder="프로젝트 게시물 이름을 입력해주세요"
                  variant="outlined"
                  value={postArray.post_title}
                  onChange={handleposttitleChange}
                  onKeyDown={handleListChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 1
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={createProject}
                >
                  <h3
                    style={{
                      color: '#ffffff'
                    }}
                  >
                    생성하기
                  </h3>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default TeamWithProjectRegist;
