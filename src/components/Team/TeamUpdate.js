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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Api from 'src/Api/Api';

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

const TeamUpdate = () => {
  const [chartData, setchartData] = useState({
    id: '',
    date: new Date(),
    title: '',
    Maxpeople: '',
    content: ''
  });
  const [subjects, setsubjects] = useState([]);

  const [subject, setsubject] = useState([]);
  const handlesubjectChange = (event) => {
    const {
      target: { value }
    } = event;
    setsubject(typeof value === 'string' ? value.split(',') : value);
  };
  const handleDateChange = (date) => {
    setchartData({
      date: date,
      title: chartData.title,
      content: chartData.content,
      Maxpeople: chartData.Maxpeople,
      id: chartData.id
    });
  };
  const handletitleChange = (event) => {
    setchartData({
      title: event.currentTarget.value,
      date: chartData.date,
      content: chartData.content,
      Maxpeople: chartData.Maxpeople,
      id: chartData.id
    });
  };
  const handlecontentChange = (event) => {
    setchartData({
      content: event.currentTarget.value,
      date: chartData.date,
      title: chartData.title,
      Maxpeople: chartData.Maxpeople,
      id: chartData.id
    });
  };
  const handlecountChange = (event) => {
    setchartData({
      Maxpeople: event.currentTarget.value,
      date: chartData.date,
      title: chartData.title,
      content: chartData.content,
      id: chartData.id
    });
  };
  const emptyCheck = () => {
    if (
      chartData.title === undefined ||
      subject[0] === undefined ||
      chartData.content === undefined ||
      chartData.Maxpeople === undefined
    ) {
      return false;
    }
  };
  const Team_id = location.href
    .split('/')
    [location.href.split('/').length - 1].split('.')[0];

  useEffect(async () => {
    getSubjects();
    let response = await Api.getTeam(Team_id);
    setchartData({
      date: response.data.recruitment.recruitment_deadline_date,
      title: response.data.recruitment.recruitment_title,
      content: response.data.recruitment.recruitment_content,
      Maxpeople: response.data.recruitment.recruitment_recruited_limit,
      id: response.data.recruitment.recruitment_id
    });
    const subject = [];
    subject.push(response.data.recruitment.recruitment_subject);
    setsubject(subject);
  }, []);

  const getSubjects = async () => {
    let response = await Api.getSubjects();
    const subject_list = await response.data.subjects;
    setsubjects(subject_list);
  };

  const TeamUpdate = async () => {
    const isEmpty = emptyCheck();
    if (isEmpty === false) {
      alert('필수항목란을 채워주세요(제목, 설명, 모집인원, 과목)');
      return false;
    }

    const reqObject = {
      recruitment_title: chartData.title,
      recruitment_content: chartData.content,
      recruitment_recruited_limit: chartData.Maxpeople,
      recruitment_deadline_date: chartData.date,
      recruitment_subject: subject[0]
    };
    let response = await Api.postTeamUpdate(chartData.id, reqObject);
    if (response.sucess) {
      alert('수정되었습니다.');
      const target = '/se/team';
      window.location.href = target;
    } else {
      alert('수정 실패');
    }
  };
  const deleteTeam = async () => {
    let response = await Api.deleteTeam(chartData.id);
    if (response.sucess) {
      alert('삭제되었습니다');
      const target = '/se/team';
      window.location.href = target;
    } else {
      alert('삭제 실패');
    }
  };
  return (
    <>
      <Helmet>
        <title>TeamUpdate</title>
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
              <h2 style={{ color: '#006400' }}>팀원 모집글 수정</h2>
              <h4>팀원을 모집하세요!</h4>
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
                <h3>글 제목&nbsp;(최대 40자)</h3>
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
                  value={chartData.title}
                  placeholder="최대 40자"
                  variant="outlined"
                  onChange={handletitleChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>글 내용</h3>
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
                  multiline
                  rows={4}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  value={chartData.content}
                  variant="outlined"
                  onChange={handlecontentChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>모집 인원&nbsp;(숫자만 입력)</h3>
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
                    backgroundColor: 'primary.smoothgreen',
                    display: 'inline-block'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  value={chartData.Maxpeople}
                  placeholder="숫자만 입력해주세요"
                  variant="outlined"
                  onChange={handlecountChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>모집 기간</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="모집기간"
                    format="yyyy/MM/dd"
                    value={chartData.date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    autoOk="true"
                  />
                </MuiPickersUtilsProvider>
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
                  <InputLabel id="과목명">&nbsp;과목명</InputLabel>
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
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />

                <Button
                  variant="contained"
                  color="success"
                  onClick={TeamUpdate}
                >
                  <h3
                    style={{
                      color: '#ffffff'
                    }}
                  >
                    수정
                  </h3>
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    float: 'right'
                  }}
                  onClick={deleteTeam}
                >
                  <h3
                    style={{
                      color: '#ffffff'
                    }}
                  >
                    삭제
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

export default TeamUpdate;
