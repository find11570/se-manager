import { useState, useEffect } from 'react';
import {
	Box,
	Grid,
} from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import ProjectCardContent from 'src/components/Dashboard/ProjectCardContent';

const api = 'https://se-disk.herokuapp.com/api';
const url = '/user';
const people = JSON.parse(sessionStorage.getItem('user_data'));
const token = sessionStorage.getItem('user_token');

const Favorite = (props) => {
	const [page, setPage] = useState(0);
	const [count, setcount] = useState(1);

	const handlePageChange = (event, value) => {
		setPage(value);
		const front = () => axios.get(api + url + '/' + people.user_id + '/like-projects?pageNum=' + value + '&pageCount=6',
			{
				headers: {
					authorization: `Bearer ${token}`
				}
			}
		);
		const getFarms = async () => {
			const data = await front();
			setarray(data.data.projects);
		};
		getFarms();
	};

	const back = () => axios.get(api + url + '/' + people.user_id + '/like-projects?pageNum=1&pageCount=6',
		{
			headers: {
				authorization: `Bearer ${token}`
			}
		}
	);

	useEffect(() => {
		const getdata = async () => {
			const data = await back();
			setarray(data.data.projects);
			setcount(Math.ceil(data.data.projects.length/ 6));
		};
		getdata();
	}, []);

	const [array, setarray] = useState([]);

	return (
		<>
			<Box>
				<Grid
					container
					spacing={3}
				>
					{
						array.map(row => (
							<ProjectCardContent key={row.project_id} id = {row.project_id} title={row.project_title} image={row.project_image} hit={row.project_hit} like={row.project_like} members={row.project_members}/>
						))
					}
				</Grid>
			</Box >
			<Grid
				item
				lg={10}
				md={10}
				sm={12}
				xs={12}
			>
				<Box
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex'
					}}
				>
					<Stack spacing={2}>
						<Pagination count={count} page={page} onChange={handlePageChange} showFirstButton showLastButton />
					</Stack>
				</Box>
			</Grid>
		</>
	);
};

export default Favorite;
