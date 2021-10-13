import 'date-fns';
import { Helmet } from 'react-helmet';
import { useState, React } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	TextField,
	InputAdornment,
	SvgIcon,
	Button
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
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
	'일반 프로젝트'
];

const TeamUpdate = () => {
	const [chartData, setchartData] = useState({
		id: '1',
		name: '진채연',
		date: '2021-05-08',
		title: '창의 융합 종합 설계 1 프로젝트 인원 모집',
		tag: ['hi', 'my', 'name', 'is', 'door'],
		Maxpeople: '4',
		content: '으아아아아아ㅏㅇ 나는 프로젝트하는 중이다..... 으아아아아아아아 배고파아아아아앙 키키키키키키키키 졸려어ㅓㅌ어어어어어라너미런아ㅣㅓㄹ민ㅇㄹ',
		question: '너무졸린심경을 표현하시오'
	});
	const [stack, setstack] = useState([]);
	const [subject, setsubject] = useState([]);
	const handlesubjectChange = (event) => {
		const {
			target: { value },
		} = event;
		setsubject(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	const handlestackChange = (event) => {
		const {
			target: { value },
		} = event;
		setstack(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	const handleDateChange = (date) => {
		setchartData({
			selectDate: date,
		});
	};
	const handletitleChange = (event) => {
		setchartData({
			title: event.currentTarget.value,
		});
	};
	const handlecontentChange = (event) => {
		setchartData({
			content: event.currentTarget.value,
		});
	};
	const handlequestionChange = (event) => {
		setchartData({
			question: event.currentTarget.value,
		});
	};
	const handlecountChange = (event) => {
		setchartData({
			count: event.currentTarget.value,
		});
	};
	return (
		<>
			<Helmet>
				<title>TeamUpdate</title>
			</Helmet>
			<Box>
				<Box
					sx={{
						minHeight: '100%',
						py: 3,
					}}
				/>
				<Grid
					item
					lg={10}
					md={10}
					sm={12}
					xs={12}
				>
					<Card
						sx={{
							borderBottomRightRadius: 10,
							borderBottomLeftRadius: 10,
							borderTopRightRadius: 10,
							borderTopLeftRadius: 10,
							boxShadow: 5
						}}
					>
						<CardContent>
							<h2 style={{ color: '#006400' }}>
								팀원 모집글 수정
							</h2>
							<h4>
								팀원을 모집하세요!
							</h4>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
									borderBottom: '1px solid grey'
								}}
							/>
							<Box
								sx={{
									backgroundColor: '#ffffff',
									paddingLeft: 0.5
								}}
							>
								<Box
									sx={{
										minHeight: '100%',
										py: 1.5,
									}}
								/>
								<h3>글 제목&nbsp;(최대 40자)</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<TextField
									halfwidth="true"
									sx={{
										flex: '1',
										flexDirection: 'row',
										boxShadow: 5,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderTopRightRadius: 5,
										borderTopLeftRadius: 5,
										backgroundColor: 'primary.smoothgreen',
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
									value={chartData.title}
									placeholder="최대 40자"
									variant="outlined"
									onChange={handletitleChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>글 내용</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
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
										height: 300
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
									value={chartData.content}
									variant="outlined"
									onChange={handlecontentChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>모집 인원&nbsp;(숫자만 입력)</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<TextField
									halfwidth="true"
									sx={{
										flex: '1',
										flexDirection: 'row',
										boxShadow: 5,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderTopRightRadius: 5,
										borderTopLeftRadius: 5,
										backgroundColor: 'primary.smoothgreen',
										display: 'inline-block'
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
									value={chartData.Maxpeople}
									placeholder="숫자만 입력해주세요"
									variant="outlined"
									onChange={handlecountChange}
								/>
								<h3 style={{ display: 'inline-block', width: 20, marginTop: 15 }}>&nbsp;명</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>모집 기간</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										margin="normal"
										id="date-picker-dialog"
										label="모집기간"
										format="yyyy/MM/dd"
										value={chartData.date}
										onChange={handleDateChange}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
										autoOk="true"
									/>
								</MuiPickersUtilsProvider>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>프로젝트 과목</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<FormControl
									sx={{
										width: 200,
										backgroundColor: 'primary.smoothgreen'
									}}
								>
									<InputLabel id="과목명">&nbsp;과목명</InputLabel>
									<Select
										labelId="과목명"
										id="과목명"
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
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>기술 스택</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<FormControl
									sx={{
										width: 200
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
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<Box
									sx={{
										backgroundColor: '#D3D3D3',
										height: 2,
										boxShadow: 5
									}}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3 style={{ display: 'inline-block', width: 50, marginTop: 15 }}>질문</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 1,
									}}
								/>
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
										backgroundColor: 'primary.smoothgreen',
										height: 300,
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
									value={chartData.question}
									placeholder="추가 질문을 입력해주세요"
									variant="outlined"
									onChange={handlequestionChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 3,
									}}
								/>
								<Link to="/se/Team">
									<Button
										variant="contained"
										color="success"
										onClick={() => {
											alert('수정되었습니다.');
										}}
									>
										수정
									</Button>
								</Link>
								<Link to="/se/Team">
									<Button
										variant="contained"
										color="success"
										sx={{
											float: 'right'
										}}
										onClick={() => {
											alert('삭제되었습니다.');
										}}
									>
										삭제
									</Button>
								</Link>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default TeamUpdate;
