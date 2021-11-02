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
const url = '/project';

const ProjectCard = (props) => {
	const [page, setPage] = useState(1);

	const handlePageChange = (event, value) => {
		setPage(value);
		const front = () => axios.get(api + url + '?pageNum='+ value + '&pageCount=8');
		const getFarms = async () => {
			const data = await front();
			setarray(data.data.projects.rows);
		};
		getFarms();
	};

	const back = () => axios.get(api + url + '?pageNum=1 + &pageCount=8');

	useEffect(() => {
		const getFarms = async () => {
			const data = await back();
			setarray(data.data.projects.rows);
		};
		getFarms();
	}, []);

	const [array, setarray] = useState([]);

	function mapping() {
		back
		return (
			<Box
				sx={{
					marginRight: '15%'
				}}
			>
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
								p={5}
							>
								<Link to="/app/projectDetail">
									<Card
										sx={{
											boxShadow: 5,
											width: 250,
											height: 250
										}}
									>
										<CardContent>
											<img
												src={'hello'}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{row.project_title}</h3>
											<h4>{'진채연, 김현수, 황영민, 김지영'}</h4>
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
						<Pagination count={10} page={page} onChange={handlePageChange} showFirstButton showLastButton />
					</Stack>
				</Box>
			</Grid>
		</>
	);
};

export default ProjectCard;
