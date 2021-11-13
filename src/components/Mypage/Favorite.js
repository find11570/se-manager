import { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProjectCardContent from 'src/components/Dashboard/ProjectCardContent';
import Api from '../../Api/Api';

const people = JSON.parse(sessionStorage.getItem('user_data'));

const Favorite = (props) => {
	const [page, setPage] = useState(0);
	const [count, setcount] = useState(1);
	const [array, setarray] = useState([]);

	const handlePageChange = (event, value) => {
		setPage(value);

		const front = async () => {
			let response = await Api.getLikedProject(
				people.user_id,
				value - 1,
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
		let response = await Api.getLikedProject(people.user_id, 1, Api.pageCount);
		return response;
	};

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

export default Favorite;
