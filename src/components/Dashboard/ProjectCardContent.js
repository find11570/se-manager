import { Link } from 'react-router-dom';
import {
	Box,
	Card,
	CardContent,
	Grid,
} from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const api = 'https://se-disk.herokuapp.com/api';
const url = '/project';
const token = sessionStorage.getItem('user_token');

const ProjectCardContent = (props) => {
	const {
		id, title, image, hit, like, members
	} = props;
	const [likes, setlikes] = useState(like);
	const [bookmark, setBookmark] = useState(false);

	const front = () => axios.get(api + url + '/' + id);

	const handleBookmark = async (id) => {
		if (bookmark === false) {
			await axios.get(api + url + '/like?projectId=' + id, {
				headers: {
					authorization: `Bearer ${token}`
				}
			}
			);
			const getdata = async () => {
				const data = await front();
				setlikes(data.data.project.project_like);
			};
			getdata();
		} else {
			await axios.get(api + url + '/unlike?projectId=' + id, {
				headers: {
					authorization: `Bearer ${token}`
				}
			}
			);
			const getdata = async () => {
				const data = await front();
				setlikes(data.data.project.project_like);
			};
			getdata();
		}
		setBookmark(!bookmark);
	};
	const handlehit = async (id) => {
		await axios.get(api + url + '/' + id + '/hit')
	};


	return (
		<>
			<Grid
				key={id}
				item
				lg={3}
				md={4}
				sm={6}
				xs={12}
				p={5}
			>
				<Card
					sx={{
						boxShadow: 5,
						width: 250,
						height: 250
					}}
					onClick={() => handlehit(id)}
				>
					<CardContent>
						<Link to=
							{{
								pathname: `/app/projectDetail/${id}`,
								state: { index: id },
							}}
						>
							<Box>
								<img
									src={image}
									alt="profile"
									style={{
										width: 220,
										height: 120
									}}
								/>
								<h3>{title}</h3>
								{
									members.map(member => (
										<li style={{ listStyleType: 'none', float: 'left' }} key={member.user_id}><h4>{member.user_name}&nbsp;</h4></li>
									))
								}
							</Box>
						</Link>
						<Box
							sx={{
								marginTop: 3,
								float: 'right'
							}}
						>
							<RemoveRedEyeIcon
								sx={{
									display: 'inline-block',
									marginLeft: 2,
									fontSize: 40
								}}
							/>
							<h4 style={{ display: 'inline-block' }}>
								&nbsp;
								{hit}
							</h4>
							{bookmark ? (
								<FavoriteIcon
									sx={{
										display: 'inline-block',
										marginLeft: 2,
										color: 'red',
										fontSize: 40
									}}
									onClick={() => handleBookmark(id)}
								/>
							) : (
								<FavoriteBorderIcon
									sx={{
										display: 'inline-block',
										marginLeft: 2,
										color: 'red',
										fontSize: 40
									}}
									onClick={() => handleBookmark(id)}
								/>
							)}
							<h4 style={{ display: 'inline-block' }}>
								&nbsp;
								{likes}
							</h4>
						</Box>
					</CardContent>
				</Card>
			</Grid>
		</>
	);
};

export default ProjectCardContent;
