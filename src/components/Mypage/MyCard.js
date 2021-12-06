import { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProjectCardContent from 'src/components/Dashboard/ProjectCardContent';
import Api from 'src/Api/Api';

// 유저정보 세션에서 가져옴
const people = JSON.parse(sessionStorage.getItem('user_data'));

const MyCard = (props) => {
  const [page, setPage] = useState(1);
  const [count, setcount] = useState(1);
  const [array, setarray] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const data = await back();
      if (data !== undefined) {
        setarray(data.data.projects);
        setcount(Math.ceil(data.data.count / Api.pageCount));
      }
    };
    getdata();
  }, []);

  // React Handle Function
  const handlePageChange = (event, value) => {
    setPage(value);

    const front = async () => {
      let response = await Api.getProjectInUser(
        people.user_id,
        value,
        Api.pageCount
      );
      return response;
    };

    const getFarms = async () => {
      const data = await front();
      setarray(data.data.projects);
    };
    getFarms();
  };

  const back = async () => {
    let response = await Api.getProjectInUser(people.user_id, 1, Api.pageCount);
    return response;
  };

  return (
    <>
      <Box
        sx={{
          marginRight: '15%'
        }}
      >
        <Grid container spacing={3}>
          {array.map((row) => (
            <ProjectCardContent
              key={row.project_id}
              id={row.project_id}
              title={row.project_title}
              image={row.project_image}
              hit={row.project_hit}
              like={row.project_like}
              members={row.project_members}
            />
          ))}
        </Grid>
      </Box>
      <Grid item lg={10} md={10} sm={12} xs={12}>
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={count}
              page={page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
      </Grid>
    </>
  );
};

export default MyCard;
