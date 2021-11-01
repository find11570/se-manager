import { Helmet } from 'react-helmet';
import { useState } from 'react';
import {
	Box,
	Container,
	Grid,
	TextField,
	InputAdornment,
	SvgIcon,
	Card,
	CardContent,
	Hidden,
	Button
} from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
const stacks = [
	'React',
	'Java',
	'C++',
	'C',
	'Mysql',
	'MongoDB',
	'Python',
	'자연어처리',
	'영상처리',
	'딥러닝',
];
const subjects = [
	'창의융합종합설계1',
	'창의융합종합설계2',
	'일반 프로젝트'
];
const professors = [
	'김병만',
	'김시관',
	'김선명',
	'김성렬',
	'신윤식',
	'오득환',
	'이현아',
	'이해연',
	'이종열',
];
const years = [
	'2016',
	'2017',
	'2018',
	'2019',
	'2020',
	'2021',
];
const menus = [
	'최신순',
	'좋아요순',
	'조회순',
];
const categorys = [
	'웹사이트',
	'모바일앱',
	'인공지능',
	'IoT',
	'블록체인',
	'보안',
	'VR/AR',
	'게임',
	'로봇',
	'자연어처리',
	'영상처리'
];
const Project = () => {
	const [postBody, setPostBody] = useState({
		name: ''
	});
	const [Data] = useState({
		id: '1',
		title: 'SE-Manager',
		people: '진채연, 김현수, 황영민, 김지영',
		see: '50',
		good: '200',
		picture: '/static/picture.PNG'
	});
	const [stack, setstack] = useState([]);
	const [subject, setsubject] = useState([]);
	const [professor, setprofessor] = useState([]);
	const [year, setyear] = useState([]);
	const [menu, setmenu] = useState([]);
	const [category, setcategory] = useState([]);
	const handleTextChange = (event) => {
		setPostBody({
			name: event.currentTarget.value,
		});
	};
	const handlestackChange = (event) => {
		const {
			target: { value },
		} = event;
		setstack(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	const handlesubjectChange = (event) => {
		const {
			target: { value },
		} = event;
		setsubject(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	const handleprofessorChange = (event) => {
		const {
			target: { value },
		} = event;
		setprofessor(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	const handleyearChange = (event) => {
		const {
			target: { value },
		} = event;
		setyear(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	const handlemenuChange = (event) => {
		const {
			target: { value },
		} = event;
		setmenu(
			typeof value === 'string' ? value.split(',') : value,
		);
		console.log(menu);
	};
	const handlecategoryChange = (event) => {
		const {
			target: { value },
		} = event;
		setcategory(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Box
				sx={{
					minHeight: '100%',
					py: 5,
				}}
			>
				<Box
					sx={{
						bgcolor: 'primary.green',
						width: '100px',
						height: 8,
						marginLeft: 3
					}}
				/>
				<Box
					sx={{
						minHeight: '100%',
						py: 1,
					}}
				/>
				<Grid
					item
					lg={10}
					md={10}
					sm={12}
					xs={12}
				>
					<h2 style={{ marginLeft: 20, display: 'inline' }}>전체 프로젝트</h2>
					<Hidden lgDown>
						<FormControl
							sx={{
								width: 200,
								float: 'right',
								marginBottom: 2,
								marginRight: 2,
							}}
						>
							<InputLabel id="카테고리">&nbsp;카테고리</InputLabel>
							<Select
								labelId="카테고리"
								id="카테고리"
								value={category}
								onChange={handlecategoryChange}
								input={<OutlinedInput label="카테고리" />}
								renderValue={(selected) => selected.join(', ')}
								MenuProps={MenuProps}
							>
								{categorys.map((s) => (
									<MenuItem key={s} value={s}>
										<Checkbox
											sx={{
												color: 'primary.darkgreen',
												'&.Mui-checked': {
													color: 'primary.darkgreen',
												},
											}}
											checked={category.indexOf(s) > -1}
										/>
										<ListItemText primary={s} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Hidden>
					<Hidden lgUp>
						<Box
							sx={{
								minHeight: '100%',
								py: 1,
							}}
						/>
						<FormControl
							sx={{
								width: 200,
								marginBottom: 2,
								marginRight: 2,
								marginLeft: 2
							}}
						>
							<InputLabel id="카테고리">&nbsp;카테고리</InputLabel>
							<Select
								labelId="카테고리"
								id="카테고리"
								value={category}
								onChange={handlecategoryChange}
								input={<OutlinedInput label="카테고리" />}
								renderValue={(selected) => selected.join(', ')}
								MenuProps={MenuProps}
							>
								{categorys.map((s) => (
									<MenuItem key={s} value={s}>
										<Checkbox
											sx={{
												color: 'primary.darkgreen',
												'&.Mui-checked': {
													color: 'primary.darkgreen',
												},
											}}
											checked={category.indexOf(s) > -1}
										/>
										<ListItemText primary={s} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Hidden>
				</Grid>
				<Box
					sx={{
						minHeight: '100%',
						py: 1,
					}}
				/>
				{postBody.name}
				<Container maxWidth={false}>
					<Grid
						container
						spacing={3}
					>
						<Grid
							item
							lg={9}
							md={9}
							sm={9}
							xs={9}
						>
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
											<SvgIcon
												fontSize="small"
												color="action"
											/>
										</InputAdornment>
									)
								}}
								placeholder="프로젝트를 검색 해보세요!"
								variant="outlined"
								onChange={handleTextChange}
							/>
						</Grid>
						<Grid
							item
							lg={2}
							md={2}
							sm={2}
							xs={2}
						>
							<Link to="/app/project">
								<Button
									variant="contained"
									color="success"
									size="large"
								>
									<h4 style={{
										color: '#ffffff',
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
							py: 2,
						}}
					/>
					<Box
						sx={{
							bgcolor: 'primary.darkgreen',
							width: '100%',
							height: 2,
						}}
					/>
					<Grid
						item
						lg={10}
						md={10}
						sm={12}
						xs={12}
					>
						<Hidden lgDown>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
								}}
							/>
							<FormControl
								sx={{
									width: 200,
								}}
							>
								<InputLabel id="기술스택">&nbsp; 기술스택</InputLabel>
								<Select
									labelId="기술스택"
									id="기술스택"
									multiple
									value={stack}
									onChange={handlestackChange}
									input={<OutlinedInput label="기술스택" />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{stacks.map((s) => (
										<MenuItem key={s} value={s}>
											<Checkbox
												sx={{
													color: 'primary.darkgreen',
													'&.Mui-checked': {
														color: 'primary.darkgreen',
													},
												}}
												checked={stack.indexOf(s) > -1}
											/>
											<ListItemText primary={s} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl
								sx={{
									width: 200,
									marginLeft: 2.5,
									backgroundColor: 'primary.smoothgreen'
								}}
							>
								<InputLabel id="과목명">&nbsp; 과목명</InputLabel>
								<Select
									labelId="과목명"
									id="과목명"
									multiple
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
														color: 'primary.darkgreen',
													},
												}}
												checked={subject.indexOf(s) > -1}
											/>
											<ListItemText primary={s} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl
								sx={{
									width: 200,
									marginLeft: 2.5,
								}}
							>
								<InputLabel id="년도">&nbsp; 년도</InputLabel>
								<Select
									labelId="년도"
									id="년도"
									multiple
									value={year}
									onChange={handleyearChange}
									input={<OutlinedInput label="년도" />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{years.map((s) => (
										<MenuItem key={s} value={s}>
											<Checkbox
												sx={{
													color: 'primary.darkgreen',
													'&.Mui-checked': {
														color: 'primary.darkgreen',
													},
												}}
												checked={year.indexOf(s) > -1}
											/>
											<ListItemText primary={s} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl
								sx={{
									width: 200,
									marginLeft: 2.5,
									backgroundColor: 'primary.smoothgreen'
								}}
							>
								<InputLabel id="지도교수">&nbsp; 지도교수</InputLabel>
								<Select
									labelId="지도교수"
									id="지도교수"
									multiple
									value={professor}
									onChange={handleprofessorChange}
									input={<OutlinedInput label="지도교수" />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{professors.map((s) => (
										<MenuItem key={s} value={s}>
											<Checkbox
												sx={{
													color: 'primary.darkgreen',
													'&.Mui-checked': {
														color: 'primary.darkgreen',
													},
												}}
												checked={professor.indexOf(s) > -1}
											/>
											<ListItemText primary={s} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl
								sx={{
									width: 150,
									marginLeft: 2.5,
									float: 'right'
								}}
							>
								<InputLabel id="최신순">&nbsp; 최신순</InputLabel>
								<Select
									labelId="최신순"
									id="최신순"
									value={menu}
									onChange={handlemenuChange}
									input={<OutlinedInput label="최신순" />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{menus.map((s) => (
										<MenuItem key={s} value={s}>
											<Checkbox
												sx={{
													color: 'primary.darkgreen',
													'&.Mui-checked': {
														color: 'primary.darkgreen',
													},
												}}
												checked={menu.indexOf(s) > -1}
											/>
											<ListItemText primary={s} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
								}}
							/>
						</Hidden>
					</Grid>
					<Box
						sx={{
							marginRight: '15%'
						}}
					>
						<Grid
							container
							spacing={3}
						>
							<Grid
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
												src={Data.picture}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{Data.title}</h3>
											<h4>{Data.people}</h4>
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
													{Data.see}
												</h4>
												<FavoriteIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{Data.good}
												</h4>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
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
												src={Data.picture}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{Data.title}</h3>
											<h4>{Data.people}</h4>
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
													{Data.see}
												</h4>
												<FavoriteIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{Data.good}
												</h4>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
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
											height: 250,
										}}
									>
										<CardContent>
											<img
												src={Data.picture}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{Data.title}</h3>
											<h4>{Data.people}</h4>
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
													{Data.see}
												</h4>
												<FavoriteIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{Data.good}
												</h4>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
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
												src={Data.picture}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{Data.title}</h3>
											<h4>{Data.people}</h4>
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
													{Data.see}
												</h4>
												<FavoriteIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{Data.good}
												</h4>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
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
												src={Data.picture}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{Data.title}</h3>
											<h4>{Data.people}</h4>
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
													{Data.see}
												</h4>
												<FavoriteIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{Data.good}
												</h4>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
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
												src={Data.picture}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{Data.title}</h3>
											<h4>{Data.people}</h4>
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
													{Data.see}
												</h4>
												<FavoriteIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{Data.good}
												</h4>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
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
												src={Data.picture}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
											<h3>{Data.title}</h3>
											<h4>{Data.people}</h4>
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
													{Data.see}
												</h4>
												<FavoriteIcon
													sx={{
														display: 'inline-block',
													}}
												/>
												<h4 style={{ display: 'inline-block' }}>
													&nbsp;
													{Data.good}
												</h4>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						</Grid>
					</Box>
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
								<Pagination count={10} showFirstButton showLastButton />
							</Stack>
						</Box>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Project;
