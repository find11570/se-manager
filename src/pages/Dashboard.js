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
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AddIcon from '@material-ui/icons/Add';
import AdbIcon from '@material-ui/icons/Adb';
import LinkIcon from '@material-ui/icons/Link';
import MoodIcon from '@material-ui/icons/Mood';
import PublicIcon from '@material-ui/icons/Public';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import SecurityIcon from '@material-ui/icons/Security';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import { Link } from 'react-router-dom';

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
const Dashboard = () => {
	const [postBody, setPostBody] = useState({
		name: '',
	});
	const [stack, setstack] = useState([]);
	const [subject, setsubject] = useState([]);
	const [professor, setprofessor] = useState([]);
	const [year, setyear] = useState([]);
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
				<h2 style={{ marginLeft: 20 }}>프로젝트를 찾아보세요!</h2>
				<Hidden lgDown>
					<Box
						sx={{
							minHeight: '100%',
							py: 1,
						}}
					/>
					<FormControl
						sx={{
							m: 1,
							width: 200,
							marginLeft: 2.5,
						}}
					>
						<InputLabel id="기술스택">&nbsp;기술스택</InputLabel>
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
							m: 1,
							width: 200,
							marginLeft: 2.5,
							backgroundColor: 'primary.smoothgreen'
						}}
					>
						<InputLabel id="과목명">&nbsp;과목명</InputLabel>
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
							m: 1,
							width: 200,
							marginLeft: 2.5,
						}}
					>
						<InputLabel id="년도">&nbsp;년도</InputLabel>
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
							m: 1,
							width: 200,
							marginLeft: 2.5,
							backgroundColor: 'primary.smoothgreen'
						}}
					>
						<InputLabel id="지도교수">&nbsp;지도교수</InputLabel>
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
				</Hidden>
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
							<Hidden lgDown>
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
							</Hidden>
							<Hidden lgUp>
								<Link to="/app/project">
									<Box
										sx={{
											paddingTop: 1,
										}}
									>
										<Button
											variant="contained"
											color="success"
										>
											<h4 style={{
												color: '#ffffff',
											}}
											>
												검색
											</h4>
										</Button>
									</Box>
								</Link>
							</Hidden>
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
							marginRight: '15%'
						}}
					>
						<Grid
							container
							spacing={3}
						>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: 'primary.smoothgreen'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<PublicIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>웹사이트</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<MobileScreenShareIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>모바일앱</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: 'primary.smoothgreen'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<MoodIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>인공지능</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<SelectAllIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>IoT</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: 'primary.smoothgreen'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<LinkIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>블록체인</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<SecurityIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>보안</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: 'primary.smoothgreen'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<ThreeDRotationIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>VR/AR</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<DesktopWindowsIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>게임</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: 'primary.smoothgreen'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<AdbIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>로봇</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<TextFormatIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>자연어처리</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: 'primary.smoothgreen'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<MovieCreationIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>영상처리</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={5}
								xs={12}
							>
								<Link to="/app/project">
									<Card
										sx={{
											boxShadow: 5,
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<CardContent>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<AddIcon
													fontSize="large"
													sx={{
														width: 50,
														height: 50,
														paddingBottom: 1,
														color: '#2e6411'
													}}
												/>
												<h3>전체</h3>
											</Box>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Dashboard;
