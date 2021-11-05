import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	Box,
	Card,
	CardContent,
	Grid
} from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const api = 'https://se-disk.herokuapp.com/api';
const url = '/user';
const people = JSON.parse(sessionStorage.getItem('user_data'));
const token = sessionStorage.getItem('user_token');

const ProjectCard = (props) => {
	const [page, setPage] = useState(0);

	const handlePageChange = (event, value) => {
		setPage(value);
		const front = () => axios.get(api + url + '/' + people.user_id + '/projects?pageNum=' + value + '&pageCount=8',
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

	const back = () => axios.get(api + url + '/' + people.user_id + '/projects?pageNum=' + page + '&pageCount=8',
		{
			headers: {
				authorization: `Bearer ${token}`
			}
		}
	);

	useEffect(() => {
		const getFarms = async () => {
			const data = await back();
			setarray(data.data.projects);
			console.log(data);
		};
		getFarms();
	}, []);

	const [array, setarray] = useState([]);

	function mapping() {
		back
		return (
			<Box>
				<Grid
					container
					spacing={3}
				>
					{
						array.map(row => (
							<Grid
								key={row.project_id}
								item
								lg={3}
								md={4}
								sm={6}
								xs={12}
							>
								<Link to="/app/projectDetail">
									<Card
										sx={{
											boxShadow: 5,
											width: 220,
											height: 220
										}}
									>
										<CardContent>
											<img
												src={row.project_image}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{row.project_title}</h3>
											{
												row.project_members.map(member => (
													<li style={{ listStyleType: 'none', float: 'left' }} key={member.user_id}><h4>{member.user_name}&nbsp;</h4></li>
												))
											}
											<Box
												sx={{
													float: 'right'
												}}
											>
												<RemoveRedEyeIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{row.project_hit}
												</h4>
												<FavoriteIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{row.project_like}
												</h4>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						))
					}
				</Grid>
			</Box>
		);
	}

	return (
		<>
			{mapping()}
			<Grid
				item
				lg={12}
				md={12}
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
						<Pagination count={10} page={page} onChange={handlePageChange} showFirstButton showLastButton />
					</Stack>
				</Box>
			</Grid>
		</>
	);
};

export default ProjectCard;
