import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Grid,
	TextField,
	InputAdornment,
	SvgIcon,
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
import ProjectCard from 'src/components/Dashboard/ProjectCard';
import Api from '../Api/Api';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const Project = () => {
	const [postBody, setPostBody] = useState({
		name: ''
	});

	const [menu, setmenu] = useState([]);
	const [stack, setstack] = useState([]);
	const [subject, setsubject] = useState([]);
	const [professor, setprofessor] = useState([]);
	const [year, setyear] = useState([]);
	const [category, setcategory] = useState([]);

	// 드롭다운 메뉴 불러와서 저장
	const [stacks, setstacks] = useState([]);
	const [subjects, setsubjects] = useState([]);
	const [professors, setprofessors] = useState([]);
	const [years, setyears] = useState([]);
	const [categorys, setcategorys] = useState([]);

	// 드롭다운 메뉴 세팅
	useEffect(async () => {
		await getStacks();
		await getSubjects();
		await getProfessors();
		await getYears();
		await getCategorys();
	}, []);

	// // 드롭다운 메뉴 Api로 get
	const getStacks = async () => {
		let response = await Api.getStacks();
		const stack_list = await response.data.tags;
		setstacks(stack_list);
	};
	const getSubjects = async () => {
		let response = await Api.getSubjects();
		const subject_list = await response.data.subjects;
		setsubjects(subject_list);
	};
	const getProfessors = async () => {
		let response = await Api.getProfessors();
		var professor_list = response.data.professors.map(
			({ user_name }) => user_name
		);
		setprofessors(professor_list);
	};
	const getYears = async () => {
		let response = await Api.getYears();
		const year_list = await response.data.years;
		setyears(year_list);
	};
	const getCategorys = async () => {
		let response = await Api.getCategorys();
		const category_list = await response.data.categorys;
		setcategorys(category_list);
	};

	// React Handle Function
	const handleTextChange = (event) => {
		setPostBody({
			name: event.currentTarget.value
		});
	};
	const handlestackChange = (event) => {
		const {
			target: { value }
		} = event;
		setstack(typeof value === 'string' ? value.split(',') : value);
	};
	const handlesubjectChange = (event) => {
		const {
			target: { value }
		} = event;
		setsubject(typeof value === 'string' ? value.split(',') : value);
	};
	const handleprofessorChange = (event) => {
		const {
			target: { value }
		} = event;
		setprofessor(typeof value === 'string' ? value.split(',') : value);
	};
	const handleyearChange = (event) => {
		const {
			target: { value }
		} = event;
		setyear(typeof value === 'string' ? value.split(',') : value);
	};
	const handlemenuChange = (event) => {
		const {
			target: { value }
		} = event;
		setmenu(typeof value === 'string' ? value.split(',') : value);
	};
	const handlecategoryChange = (event) => {
		const {
			target: { value }
		} = event;
		setcategory(typeof value === 'string' ? value.split(',') : value);
	};

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Box
				sx={{
					minHeight: '100%',
					py: 5
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
						py: 1
					}}
				/>
				<Grid item lg={10} md={10} sm={12} xs={12}>
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
													color: 'primary.darkgreen'
												}
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
								py: 1
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
													color: 'primary.darkgreen'
												}
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
						py: 1
					}}
				/>
				{postBody.name}
				<Container maxWidth={false}>
					<Grid container spacing={3}>
						<Hidden lgDown>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
									marginLeft: 3
								}}
							/>
							<FormControl
								sx={{
									width: 200
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
														color: 'primary.darkgreen'
													}
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
														color: 'primary.darkgreen'
													}
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
									marginLeft: 2.5
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
														color: 'primary.darkgreen'
													}
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
														color: 'primary.darkgreen'
													}
												}}
												checked={professor.indexOf(s) > -1}
											/>
											<ListItemText primary={s} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Hidden>
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
								placeholder="프로젝트를 검색 해보세요!"
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
							py: 2
						}}
					/>
					<Box
						sx={{
							bgcolor: 'primary.darkgreen',
							width: '100%',
							height: 2
						}}
					/>
					<Grid item lg={10} md={10} sm={12} xs={12}>
						<FormControl
							sx={{
								width: 150,
								marginTop: 2.5,
								float: 'right',
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
								{Api.getMenus().map((s) => (
									<MenuItem key={s} value={s}>
										<Checkbox
											sx={{
												color: 'primary.darkgreen',
												'&.Mui-checked': {
													color: 'primary.darkgreen'
												}
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
								py: 2
							}}
						/>
						<ProjectCard />
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Project;
