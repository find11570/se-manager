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

const api = 'https://se-disk.herokuapp.com/api';

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
	const compare_link = window.location.href;
	const [postBody, setPostBody] = useState({
		name: ''
	});

	const [menu, setmenu] = useState(['최신순']);
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
	const [menus, setmenus] = useState([]);

	const [state, setstate] = useState(new Date());

	// 드롭다운 메뉴 세팅
	useEffect(async () => {
		getMenus();
		await getStacks();
		await getSubjects();
		await getProfessors();
		await getYears();
		await getCategorys();

		// url string quary
		const link = document.location.href;
		var link_quary = link.replace('http://localhost:3000/app/project/', '');
		var quary = decodeURI(link_quary, 'UTF-8');
		if (quary.includes(',')) {
			var quary_array = quary.split('&');

			// category
			const c_list = [];
			c_list.push(quary_array[0]);
			if (quary_array[0] != '전체') {
				const category = [];
				category.push(c_list);
				setcategory(category[0]);
			}

			// stack
			quary_array[1] = quary_array[1].slice(0, -1);
			var stack_string = quary_array[1].split('=');
			if (stack_string[1] != 'null') {
				var stack_array = stack_string[1].split(',');
				const stack = [];
				stack.push(stack_array);
				setstack(stack[0]);
			}

			// subject
			quary_array[2] = quary_array[2].slice(0, -1);
			var stack_string2 = quary_array[2].split('=');
			if (stack_string2[1] != 'null') {
				var stack_array = stack_string2[1].split(',');
				const subject = [];
				subject.push(stack_array);
				setsubject(subject[0]);
			}

			// year
			quary_array[3] = quary_array[3].slice(0, -1);
			var stack_string3 = quary_array[3].split('=');
			if (stack_string3[1] != 'null') {
				var stack_array = stack_string3[1].split(',');
				const year = [];
				year.push(stack_array);
				setyear(year[0]);
			}

			// professor
			quary_array[4] = quary_array[4].slice(0, -1);
			var stack_string4 = quary_array[4].split('=');
			if (stack_string4[1] != 'null') {
				var stack_array = stack_string4[1].split(',');
				const professor = [];
				professor.push(stack_array);
				setprofessor(professor[0]);
			}

			// keyword
			var stack_string5 = quary_array[5].split('=');
			if (stack_string5[1] != 'null') {
				setPostBody({
					name: stack_string5[1]
				});
			}
		}
		else {
			var c = quary;
			const c_list = [];
			c_list.push(c);
			if (c != '전체') {
				const category = [];
				category.push(c_list);
				setcategory(category[0]);
			}
		}

	}, []);

	// // 드롭다운 메뉴 Api로 get
	const getStacks = async () => {
		let response = await Api.getStacks();
		const stack_list = await response.data.tags;
		setstacks(stack_list);
	};
	const getMenus = () => {
		const menu_list = Api.getMenus();
		setmenus(menu_list);
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
	const handleChange = (event) => {
		setstate(new Date());
	}
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
	function search_url(stack, subject, year, professor, keyword, category) {
		const url = [];
		if (!(stack.length === 0)) {
			url.push("&stack=" + stack.join(','));
		}
		else {
			url.push('&stack=null');
		}

		if (!(subject.length === 0)) {
			url.push("&subject=" + subject.join(','));
		}
		else {
			url.push('&subject=null');
		}

		if (!(year.length === 0)) {
			url.push("&year=" + year.join(','));
		}
		else {
			url.push('&year=null');
		}

		if (!(professor.length === 0)) {
			url.push("&professor=" + professor.join(','));
		}
		else {
			url.push('&professor=null');
		}

		if (!(keyword === '')) {
			url.push('&keyword=' + keyword);
		}
		else {
			url.push('&keyword=null');
		}
		if (!(category.length === 0)) {
			url.push('&category=' + category.join(','));
		}
		else {
			url.push('&category=null');
		}
		if (!(menu === '' || menu === undefined)) {
			url.push('&sort=' + menu);
		}
		else {
			url.push('&sort=null');
		}

		return url.join();
	}

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
								value={postBody.name}
								variant="outlined"
								onChange={handleTextChange}
							/>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<Link to=
								{{
									pathname: `/app/project/${"전체" + search_url(stack, subject, year, professor, postBody.name, category)}`,
								}}
							>
								<Button variant="contained"
									color="success"
									size="large"
									type="submit"
									onClick={handleChange}
								>
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
							<InputLabel id="정렬">&nbsp; 정렬</InputLabel>
							<Select
								labelId="정렬"
								id="정렬"
								value={menu}
								onChange={handlemenuChange}
								input={<OutlinedInput label="정렬" />}
								renderValue={(selected) => selected.join(', ')}
								MenuProps={MenuProps}
							>
								{menus.map((s) => (
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
						<ProjectCard state={state} />
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Project;
