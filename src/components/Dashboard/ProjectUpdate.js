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
import { Link } from 'react-router-dom';
import Api from '../../Api/Api';
import TagsInput from './TagsInput';
import UserInput from './UserInput';
import ProjectPostList from 'src/components/Dashboard/ProjectPostList';

const server_path = 'http://202.31.202.28:443/file/';
const empty_path = 'http://202.31.202.28:443/file/file__1637753431355.jpg';

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

const ProjectUpdate = () => {
  const [postBody, setPostBody] = useState({
    title: undefined,
    content: undefined,
    image: undefined,
    stack: undefined
  });

  const [subject, setsubject] = useState([]);
  const [professor, setprofessor] = useState([]);
  const [year, setyear] = useState([]);
  const [category, setcategory] = useState([]);
  const [stack, setstack] = useState([]);

  const [subjects, setsubjects] = useState([]);
  const [professors, setprofessors] = useState([]);
  const [years, setyears] = useState([]);
  const [categorys, setcategorys] = useState([]);
  const [stacks, setstacks] = useState([]);

  const [members, setmembers] = useState([]);
  const [p_list, setp_list] = useState([]);
  const [leader, setleader] = useState([]);
  const [image, setimage] = useState();
  const [fileUrl, setFileUrl] = useState(null);

  const [postArray, setpostArray] = useState({
    post_title: ''
  });
  const [PostArrays, setPostArrays] = useState([]);
  useEffect(async () => {
    await getYears();
    await getSubjects();
    await getProfessors();
    await getCategorys();
    let response = await Api.getProject(project_id);

    const mem = response.data.project.project_members;
    const memberList = [];

    mem.map((v) => {
      memberList.push(v.user_id);
    });
    setmembers(memberList);
    if (response.data.project.project_introduction == null) {
      setPostBody({
        title: response.data.project.project_title,
        content: undefined,
        image: response.data.project.project_image
      });
    } else {
      setPostBody({
        title: response.data.project.project_title,
        content: response.data.project.project_introduction,
        image: response.data.project.project_image
      });
    }

    if (response.data.project.project_image != null) {
      setFileUrl(response.data.project.project_image);
    }
    if (response.data.project.project_tags != null) {
      const tag = [];
      tag.push(response.data.project.project_tags);
      setstack(tag[0]);
    }
    if (response.data.project.project_subject != null) {
      const subject = [];
      subject.push(response.data.project.project_subject);
      setsubject(subject);
    }

    if (response.data.project.project_professor != null) {
      const professor_id = [];
      professor_id.push(response.data.project.project_professor.user_id);
      let response2 = await Api.getProfessors();
      setp_list(response2.data.professors);
      response2.data.professors.map((idx) => {
        if (idx.user_id == professor_id) {
          setprofessor([idx.user_name]);
        }
      });
    }
    if (response.data.project.project_subject_year != null) {
      const year = [];
      year.push(String(response.data.project.project_subject_year));
      setyear(year);
    }
    if (response.data.project.project_categorys != null) {
      const category = [];
      category.push(response.data.project.project_categorys);
      setcategory(category[0]);
    }
    setleader(response.data.project.project_leader);
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
  const getstack = (selectedItem) => {
    setstack(selectedItem);
  };
  const getMembers = (selectedItem) => {
    setmembers(selectedItem);
  };
  const getProfessors = async () => {
    let response = await Api.getProfessors();
    var professor_Name_list = response.data.professors.map(
      ({ user_name }) => user_name
    );
    setprofessors(professor_Name_list);
  };
  const getCategorys = async () => {
    let response = await Api.getCategorys();
    const category_list = await response.data.categorys;
    setcategorys(category_list);
  };
  const getList = (postArrays) => {
    setPostArrays(postArrays);
  };

  const project_id = location.href
    .split('/')
    [location.href.split('/').length - 1].split('.')[0];

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

  // 프로젝트 수정버튼 OnClick 함수
  const projectUpdate = async () => {
    const isEmpty = emptyCheck();
    if (isEmpty === false) {
      alert(
        '필수항목란을 채워주세요(제목, 기술 스택, 해당 과목, 진행년도, 지도교수, 카테고리)'
      );
      return false;
    }

    const intM = [];
    var errFlag = { err: false, msg: null };
    if (members == '') {
      intM.push(leader);
    } else {
      await Promise.all(
        members.map(async function (member) {
          let response = await Api.getUserLoginId(member);
          if (response.data.users.length === 0) {
            errFlag = {
              err: true,
              msg: '프로젝트 팀원 아이디를 다시 확인해주세요'
            };
          } else if (response.data.users[0].user_id === leader) {
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

    const reqObject = {
      project_title: postBody.title,
      project_introduction: postBody.content,
      project_categorys: category,
      project_image: postBody.image,
      project_subject: subject[0],
      project_subject_year: year[0],
      project_professor: p_id[0],
      project_members: intM,
      project_tags: stack
    };
    let response = await Api.postUpdateProject(project_id, reqObject);
    if (response.sucess) {
      setprofessor(p_id);
      alert('수정되었습니다.');
      const target = '/app/dashboard';
      window.location.href = target;
    } else {
      alert('수정 실패');
    }
  };

  // React Handle Function
  const handlecategoryChange = (event) => {
    const {
      target: { value }
    } = event;
    setcategory(typeof value === 'string' ? value.split(',') : value);
  };
  const handleposttitleChange = (event) => {
    setpostArray({
      post_title: event.currentTarget.value
    });
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
  const handleyearChange = (event) => {
    const {
      target: { value }
    } = event;
    setyear(typeof value === 'string' ? value.split(',') : value);
  };

  const handletitleChange = (event) => {
    setPostBody({
      content: postBody.content,
      title: event.currentTarget.value,
      image: postBody.image
    });
  };
  const handlecontentChange = (event) => {
    setPostBody({
      content: event.currentTarget.value,
      title: postBody.title,
      image: postBody.image
    });
  };

  const handleListChange = async (event) => {
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
        let response2 = await Api.getCreatePosting(project_id, value);
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
    setFileUrl(null);
    setPostBody({
      title: postBody.title,
      image: empty_path,
      content: postBody.content
    });
  };

  return (
    <>
      <Helmet>
        <title>ProjectUpdate</title>
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
              <h2 style={{ color: '#006400' }}>프로젝트 수정</h2>
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
                  value={postBody.title || ''}
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
                  value={postBody.content}
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
                <UserInput
                  variant="outlined"
                  id="프로젝트 팀원"
                  name="프로젝트 팀원"
                  label="프로젝트 팀원"
                  propfunction={getMembers}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>기술 스택</h3>
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
                    width: 200
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
                  onClick={projectUpdate}
                >
                  <h3
                    style={{
                      color: '#ffffff'
                    }}
                  >
                    수정하기
                  </h3>
                </Button>
                <Link to="/app/dashboard">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      float: 'right'
                    }}
                    onClick={() => {
                      alert('삭제되었습니다.');
                    }}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      삭제하기
                    </h3>
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default ProjectUpdate;
