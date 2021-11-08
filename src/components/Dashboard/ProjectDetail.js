import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Hidden,
	TextField,
	InputAdornment,
	SvgIcon,
	Avatar,
	Button
} from '@material-ui/core';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SimpleTabs from 'src/components/Dashboard/SimpleTabs';
import { Link } from 'react-router-dom';
import axios from 'axios';

const api = 'https://se-disk.herokuapp.com/api';
const url = '/project';
const people = JSON.parse(sessionStorage.getItem('user_data'));

const ProjectDetail = (props) => {
	const project_id = location.href.split('/')[location.href.split('/').length - 1].split('.')[0];
	const [data, setData] = useState([]);
	const [state, setstate] = useState(false);
	useEffect(() => {
		axios.get(api + url + '/' + project_id).then((response) => {
			setData(response.data.project);
			if (sessionStorage.getItem('user_token')) {
				if (response.data.project.length != 0) {
					response.data.project.project_members.map((m) => {
						if (m.user_id === people.user_id) {
							setstate(true);
						}
					});
				}
			};
		});
	}, []);

	const mem = data.project_members;
	const memResult = mem?.map((member) => member.user_name + ' ');

	const [chartData] = useState({
		tag: ['창융1', '리액트', 'Node.js', 'AWS', '김선명교수님', '2021'],
	});

	const comment = [
		{
			id: 1,
			name: '현수',
			text: 'ㅋ'
		},
		{
			id: 2,
			name: '채연',
			text: 'ㅋㅋ'
		},
		{
			id: 3,
			name: '영민',
			text: 'ㅋㅋㅋ'
		},
		{
			id: 4,
			name: '지영',
			text: 'ㅋㅋㅋㅋ'
		},
		{
			id: 5,
			name: '현수찡',
			text: 'ㅋㅋㅋㅋㅋ'
		},
		{
			id: 6,
			name: '채연찡',
			text: 'ㅋㅋㅋㅋㅋㅋ'
		},
		{
			id: 7,
			name: '나는야 카와이 소졍쨩',
			text: '소정이는 귀여워 왜나 나는 귀엽기때문이야 키키키 소정이는 애기소졍짱 하와와와와~'
		},
		{
			id: 8,
			name: '기범',
			text: '냐미~'
		}
	];
	const [postBody, setPostBody] = useState({
		content: ''
	});

	const handleTextChange = (event) => {
		setPostBody({
			content: event.currentTarget.value
		});
	};
	const List = chartData.tag.map((t) => (
		<Box
			key={t}
			value={t}
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
			{t}
		</Box>
	));

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
									py: 3
								}}
							>
								<Hidden lgDown>
									<Box
										sx={{
											float: 'left',
											display: 'inline-block',
											marginRight: 2
										}}
									>
										<img
											src={data.project_image}
											alt="profile"
											style={{
												width: 220,
												height: 180,
												borderBottomRightRadius: 10,
												borderBottomLeftRadius: 10,
												borderTopRightRadius: 10,
												borderTopLeftRadius: 10,
												display: 'inline-block'
											}}
										/>
									</Box>
								</Hidden>
								<Hidden lgDown>
									<Box
										sx={{
											display: 'inline-block'
										}}
									>
										<h1
											style={{
												color: '#ffffff',
												marginTop: 10
											}}
										>
											{data.project_title}
										</h1>
										<Box
											sx={{
												minHeight: '100%',
												py: 1
											}}
										/>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											{memResult}
										</h3>
										<Box
											sx={{
												minHeight: '100%',
												py: 1
											}}
										/>
										<h4 style={{ color: '#006400' }}>
											#&nbsp;
											{List}
										</h4>
										<Box
											sx={{
												minHeight: '100%',
												py: 1
											}}
										/>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block'
											}}
										/>
										<h4 style={{ display: 'inline-block' }}>
											&nbsp;
											{data.project_hit}
										</h4>
										<FavoriteIcon
											sx={{
												display: 'inline-block'
											}}
										/>
										<h4 style={{ display: 'inline-block' }}>
											&nbsp;
											{data.project_like}
										</h4>
									</Box>
								</Hidden>
								<Hidden lgUp>
									<h3 style={{ color: '#ffffff', marginLeft: 20 }}>
										{data.project_title}
									</h3>
								</Hidden>
							</Box>
						</CardContent>
						<CardContent
							sx={{
								backgroundColor: '#ffffff'
							}}
						>
							<SimpleTabs contents={data.project_introduction} members={data.project_members} />
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
								pathname: `/app/projectUpdate/${project_id}`,
								state: { index: project_id }
							}}
						>
							<Button
								variant="contained"
								color="success"
								sx={{
									float: 'right'
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
						<Box
							sx={{
								minHeight: '100%',
							}}
						/>
					)}
					<Box
						sx={{
							minHeight: '100%',
							py: 4
						}}
					/>
					<Box
						sx={{
							bgcolor: 'primary.darkgreen',
							width: '100%',
							height: 2
						}}
					/>
					<Box
						sx={{
							minHeight: '100%',
							py: 2
						}}
					/>
					<h3>댓글/피드백</h3>
					<Box
						sx={{
							minHeight: '100%',
							py: 1
						}}
					/>
					{postBody.content}
					<Grid container spacing={2}>
						<Grid item lg={9} md={9} sm={9} xs={9}>
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
								placeholder="댓글을 입력하세요!"
								variant="outlined"
								onChange={handleTextChange}
							/>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<Link to="/app/project">
								<Button variant="contained" color="success" size="large">
									<h4
										style={{
											color: '#ffffff'
										}}
									>
										검색
									</h4>
								</Button>
							</Link>
						</Grid>
					</Grid>
					<Box
						sx={{
							minHeight: '100%',
							py: 3
						}}
					/>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						{comment.map((comments) => (
							<Card
								key={comments.id}
								value={comments}
								sx={{
									borderBottomRightRadius: 10,
									borderBottomLeftRadius: 10,
									borderTopRightRadius: 10,
									borderTopLeftRadius: 10,
									boxShadow: 5,
									marginBottom: 3
								}}
							>
								<CardContent>
									<Box
										sx={{
											display: 'inline-block',
											marginRight: 2
										}}
									>
										<Avatar
											sx={{
												cursor: 'pointer',
												width: 30,
												height: 30
											}}
										/>
									</Box>
									<h4 style={{ display: 'inline-block' }}>
										{comments.name}
										&nbsp;:&nbsp;
										{comments.text}
									</h4>
								</CardContent>
							</Card>
						))}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default ProjectDetail;
