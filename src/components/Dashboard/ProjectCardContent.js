import { Link } from 'react-router-dom';
import {
	Box,
	Card,
	CardContent,
	Grid,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Api from '../../Api/Api';

const token = sessionStorage.getItem('user_token');

const ProjectCardContent = (props) => {
	const {
		id, title, image, hit, like, members
	} = props;
	const [likes, setlikes] = useState(like);
	const [bookmark, setBookmark] = useState(false);

	const front = async() => await Api.getProject(id);
	const back = async() => await Api.getProjectIsLike(id);

	useEffect(() => {
		if (sessionStorage.getItem('user_token')) {
			const getdata = async () => {
				const data = await back();
				setBookmark(data.data.isLike)
			};
			getdata();
		}
		else {
			setBookmark(false);
		}
	}, []);
	const handleBookmark = async (id) => {
		if (sessionStorage.getItem('user_token')) {
			if (bookmark === false) {
				await Api.getProjectLike(id);
				const getdata = async () => {
					const data = await front();
					setlikes(data.data.project.project_like);
				};
				getdata();
			} else {
				await Api.getProjectUnlike(id);
				const getdata = async () => {
					const data = await front();
					setlikes(data.data.project.project_like);
				};
				getdata();
			}
			setBookmark(!bookmark);
		}
		else {
			alert('로그인이 필요합니다');
		}
	};
	const handlehit = async (id) => {
		await Api.getHit(id);
	};


	return (
		<>
			<Grid
				key={id}
				item
				lg={4}
				md={4}
				sm={6}
				xs={12}
				p={5}
			>
				<Card
					sx={{
						boxShadow: 5,
						height: 350
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
							<Box
								sx={{
									marginBottom: 3,
									height: '80%'
								}}
							>
								<img
									src={image}
									alt="profile"
									style={{
										width: '100%',
										height: 200
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
						<Box
							sx={{
								p: 2
							}}
						/>
					</CardContent>
				</Card>
			</Grid>
		</>
	);
};

export default ProjectCardContent;
