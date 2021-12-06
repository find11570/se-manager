import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Hidden,
  Avatar,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Api from 'src/Api/Api';

const TeamSpecific = () => {
  const team_id = location.href
    .split('/')
    [location.href.split('/').length - 1].split('.')[0];
  const [data, setData] = useState([]);
  const temp = '';
  const [state, setstate] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user_data'));
  const [date, setdate] = useState();
  const [appstate, setappstate] = useState(false);
  const [max, setmax] = useState(false);
  const isLogin = () => {
    if (sessionStorage.getItem('user_token')) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(async () => {
    function dateCul(date) {
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);
      var Dday = new Date(year, month - 1, day);
      var now = new Date();

      var gap = now.getTime() - Dday.getTime();
      var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
      return result;
    }
    let response = await Api.getTeam(team_id);
    setData(response.data.recruitment);
    setdate(dateCul(response.data.recruitment.recruitment_deadline_date));
    if (sessionStorage.getItem('user_token')) {
      if (response.data.recruitment.length != 0) {
        if (response.data.recruitment.user_id === user.user_id) {
          setstate(true);
        }
      }
    }
    if (
      response.data.recruitment.recruitment_recruited_cnt ==
      response.data.recruitment.recruitment_recruited_limit
    ) {
      setmax(true);
    } else {
      if (!isLogin()) {
        setmax(true);
      } else {
        let response2 = await Api.getisApplication(team_id);
        if (response2.data.isApplication == true) {
          setappstate(true);
        }
      }
    }
  }, []);

  const teamApplication = async () => {
    let response = await Api.getTeamApplication(data.recruitment_id);
    if (response.data.sucess) {
      alert('신청되었습니다');
      const target = '/se/team';
      window.location.href = target;
    } else {
      alert('신청실패');
    }
  };

  const teamcancelApplication = async () => {
    let response = await Api.getTeamcancelApplication(data.recruitment_id);
    if (response.sucess) {
      alert('신청취소되었습니다');
      const target = '/se/team';
      window.location.href = target;
    } else {
      alert('신청취소실패');
    }
  };

  const teamEnd = async () => {
    let response = await Api.getTeamEnd(data.recruitment_id);
    if (response.data.sucess) {
      alert('마감되었습니다');
      const target = '/ProjectRegister';
      window.location.href = window.location.href + target;
    } else {
      alert('마감실패');
    }
  };
  function app() {
    if (!max) {
      return application();
    } else {
      temp;
    }
  }
  function application() {
    if (appstate) {
      return (
        <Button
          variant="contained"
          size="medium"
          color="success"
          sx={{
            float: 'right',
            marginRight: 2,
            marginTop: 0.5,
            marginLeft: 2
          }}
          onClick={teamcancelApplication}
        >
          <h3
            style={{
              color: '#ffffff'
            }}
          >
            신청취소
          </h3>
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          size="medium"
          color="success"
          sx={{
            float: 'right',
            marginRight: 2,
            marginTop: 0.5,
            marginLeft: 2
          }}
          onClick={teamApplication}
        >
          <h3
            style={{
              color: '#ffffff'
            }}
          >
            신청하기
          </h3>
        </Button>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>teamSpecific</title>
      </Helmet>
      <Box
        sx={{
          minHeight: '100%',
          py: 3
        }}
      >
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
            <CardContent
              sx={{
                backgroundColor: '#81C147'
              }}
            >
              <Box
                sx={{
                  minHeight: '100%',
                  py: 7
                }}
              >
                <Hidden lgDown>
                  <h2
                    style={{
                      color: 'red',
                      float: 'right',
                      marginRight: 2
                    }}
                  >
                    마감까지 D-
                    {date}
                  </h2>
                </Hidden>
                <Hidden lgDown>
                  <h1 style={{ color: '#ffffff', marginLeft: 25 }}>
                    {data.recruitment_title}
                  </h1>
                </Hidden>
                <Hidden lgUp>
                  <h3 style={{ color: '#ffffff', marginLeft: 20 }}>
                    {data.recruitment_title}
                  </h3>
                </Hidden>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 1
                  }}
                />
                <Box
                  sx={{
                    marginLeft: 2
                  }}
                >
                  <h4 style={{ color: '#006400' }}>
                    #&nbsp;
                    <Box
                      sx={{
                        backgroundColor: 'primary.smoothgreen',
                        display: 'inline-block',
                        textAlign: 'center',
                        marginRight: 2,
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5,
                        borderColor: 'primary.main',
                        paddingLeft: 2,
                        paddingRight: 2,
                        boxShadow: 1
                      }}
                    >
                      {data.recruitment_subject}
                    </Box>
                  </h4>
                </Box>
                <Box>
                  <Hidden lgDown>
                    <h2
                      style={{
                        color: '#ffffff',
                        float: 'right',
                        marginTop: 15,
                        marginRight: 20
                      }}
                    >
                      {data.user_name}
                    </h2>
                    <img
                      alt="Image"
                      src={data.user_image}
                      style={{
                        float: 'right',
                        marginRight: 5,
                        marginTop: 10,
                        width: 40,
                        height: 40,
                        borderRadius: '50%'
                      }}
                    />
                  </Hidden>
                </Box>
              </Box>
            </CardContent>
            <CardContent
              sx={{
                backgroundColor: '#ffffff'
              }}
            >
              <Box
                sx={{
                  minHeight: '100%',
                  py: 7
                }}
              >
                <h3>{data.recruitment_content}</h3>
              </Box>
              {state ? (
                <Box>
                  <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    sx={{
                      float: 'right',
                      marginRight: 2,
                      marginTop: 0.5,
                      marginLeft: 2
                    }}
                    onClick={teamEnd}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      마감하기
                    </h3>
                  </Button>
                </Box>
              ) : (
                temp
              )}
              {state ? temp : app()}
              <Box
                sx={{
                  minHeight: '100%',
                  py: 3
                }}
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              minHeight: '100%',
              py: 2
            }}
          />
          {state ? (
            <Link
              to={{
                pathname: `/se/teamList/${data.recruitment_id}`,
                state: { index: data.recruitment_id }
              }}
            >
              <Button
                variant="contained"
                size="medium"
                color="success"
                sx={{
                  float: 'right',
                  marginLeft: 2
                }}
              >
                <h3
                  style={{
                    color: '#ffffff'
                  }}
                >
                  신청목록
                </h3>
              </Button>
            </Link>
          ) : (
            temp
          )}
          {state ? (
            <Link
              to={{
                pathname: `/se/teamupdate/${data.recruitment_id}`,
                state: { index: data.recruitment_id }
              }}
            >
              <Button
                variant="contained"
                size="medium"
                color="success"
                sx={{
                  float: 'left',
                  marginRight: 2
                }}
              >
                <h3
                  style={{
                    color: '#ffffff'
                  }}
                >
                  수정하기
                </h3>
              </Button>
            </Link>
          ) : (
            temp
          )}
        </Grid>
      </Box>
    </>
  );
};

export default TeamSpecific;
