import 'date-fns';
import { Helmet } from 'react-helmet';
import { useState, React, useEffect } from 'react';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Api from '../../Api/Api';

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

const ProjectUpdate = () => {
	const [postBody, setPostBody] = useState({
		title: undefined,
		content: undefined,
		image: undefined,
		stack: undefined
	});

	const [subject, setsubject] = useState([]);
	const [professor, setprofessor] = useState([]);
	const [year, setyear] = useState([]);
	const [category, setcategory] = useState([]);
	const [stack, setstack] = useState([]);

	const [subjects, setsubjects] = useState([]);
	const [professors, setprofessors] = useState([]);
	const [years, setyears] = useState([]);
	const [categorys, setcategorys] = useState([]);
	const [stacks, setstacks] = useState([]);

	const [members, setmembers] = useState([]);
	const [p_list, setp_list] = useState([]);

	useEffect(async () => {
		await getYears();
		await getSubjects();
		await getProfessors();
		await getCategorys();
		await getStacks();
	}, []);

	// 드롭다운 메뉴 로딩
	const getYears = async () => {
		let response = await Api.getYears();
		const year_list = await response.data.years;
		setyears(year_list);
	};
	const getSubjects = async () => {
		let response = await Api.getSubjects();
		const subject_list = await response.data.subjects;
		setsubjects(subject_list);
	};
	const getStacks = async () => {
		let response = await Api.getStacks();
		const stack_list = await response.data.tags;
		setstacks(stack_list);
	};
	const getProfessors = async () => {
		let response = await Api.getProfessors();
		var professor_Name_list = response.data.professors.map(
			({ user_name }) => user_name
		);
		setprofessors(professor_Name_list);
	};
	const getCategorys = async () => {
		let response = await Api.getCategorys();
		const category_list = await response.data.categorys;
		setcategorys(category_list);
	};

	const project_id = location.href
		.split('/')
	[location.href.split('/').length - 1].split('.')[0];

	useEffect(async () => {
		let response = await Api.getProejct(project_id);

		const mem = response.data.project.project_members;
		const memberList = [];

		mem.map((v) => {
			memberList.push(v.user_id);
		});
		setmembers(memberList);
		setPostBody({
			title: response.data.project.project_title,
			content: response.data.project.project_introduction,
			image: response.data.project.project_image
		});
		if (response.data.project.project_tags != null) {
			const tag = [];
			tag.push(response.data.project.project_tags);
			setstack(tag[0]);
		}
		if (response.data.project.project_subject != null) {
			const subject = [];
			subject.push(response.data.project.project_subject);
			setsubject(subject);
		}

		if (response.data.project.project_professor != null) {
			const professor_id = [];
			professor_id.push(response.data.project.project_professor.user_id);
			let response2 = await Api.getProfessors();
			setp_list(response2.data.professors);
			response2.data.professors.map((idx) => {
				if (idx.user_id == professor_id) {
					setprofessor([idx.user_name]);
				}
			});
		}
		if (response.data.project.project_subject_year != null) {
			const year = [];
			year.push(String(response.data.project.project_subject_year));
			setyear(year);
		}
		if (response.data.project.project_categorys != null) {
			const category = [];
			category.push(response.data.project.project_categorys);
			setcategory(category[0]);
		}
	}, []);

	// 프로젝트 수정버튼 OnClick 함수
	const projectUpdate = async () => {
		const intM = [];
		members.map(function (v) {
			return intM.push(parseInt(v, 10));
		});
		const p_id = [];
		p_list.map((idx) => {
			if (idx.user_name == professor) return p_id.push(idx.user_id);
		});
		setprofessor(p_id);
		const reqObject = {
			project_title: postBody.title,
			project_introduction: postBody.content,
			project_categorys: category,
			// project_image: postBody.image,
			project_image: '/static/picture.PNG',
			project_subject: subject[0],
			project_subject_year: year[0],
			project_professor: p_id[0],
			project_members: intM,
			project_tags: stack
		};
		let response = await Api.postUpdateProject(project_id, reqObject);
		console.log(response);
		if (response.sucess) {
			alert('수정되었습니다.');
		} else {
			alert('수정 실패');
		}
	};

	// React Handle Function
	const handlecategoryChange = (event) => {
		const {
			target: { value }
		} = event;
		setcategory(typeof value === 'string' ? value.split(',') : value);
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
	const handlestackChange = (event) => {
		const {
			target: { value }
		} = event;
		setstack(typeof value === 'string' ? value.split(',') : value);
	};
	const handletitleChange = (event) => {
		setPostBody({
			content: postBody.content,
			title: event.currentTarget.value,
			picture: postBody.picture
		});
	};
	const handlecontentChange = (event) => {
		setPostBody({
			content: event.currentTarget.value,
			title: postBody.title,
			picture: postBody.picture
		});
	};
	const handlememberChange = (event) => {
		const {
			target: { value }
		} = event;
		setmembers(typeof value === 'string' ? value.split(',') : value);
	};
	return (
		<>
			<Helmet>
				<title>ProjectUpdate</title>
			</Helmet>
			<Box>
				<Box
					sx={{
						minHeight: '100%',
						py: 3
					}}
				/>
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
						<CardContent>
							<h2 style={{ color: '#006400' }}>프로젝트 수정</h2>
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
								<Grid item lg={3} md={3} sm={6} xs={12}>
									<Box
										sx={{
											minHeight: '100%',
											py: 1.5
										}}
									/>
									<h3>프로젝트 사진</h3>
									<Box
										sx={{
											minHeight: '100%',
											py: 0.5
										}}
									/>
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
											<img
												src={postBody.picture}
												alt="profile"
												style={{
													width: 220,
													height: 120
												}}
											/>
										</CardContent>
									</Card>
								</Grid>
								<Box
									sx={{
										minHeight: '100%',
										py: 1.5
									}}
								/>
								<h3>프로젝트 제목</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
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
										backgroundColor: 'primary.smoothgreen'
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon fontSize="small" color="action" />
											</InputAdornment>
										)
									}}
									value={postBody.title || ''}
									variant="outlined"
									onChange={handletitleChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>프로젝트 설명</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
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
										borderTopLeftRadius: 5
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon fontSize="small" color="action" />
											</InputAdornment>
										)
									}}
									value={postBody.content}
									multiline
									rows={4}
									variant="outlined"
									onChange={handlecontentChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>프로젝트 팀원</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
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
										backgroundColor: 'primary.smoothgreen'
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon fontSize="small" color="action" />
											</InputAdornment>
										)
									}}
									value={members}
									variant="outlined"
									onChange={handlememberChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>기술 스택</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
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
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>프로젝트 과목</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<FormControl
									sx={{
										width: 200,
										backgroundColor: 'primary.smoothgreen'
									}}
								>
									<InputLabel id="과목명">&nbsp; 과목명</InputLabel>
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
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>년도</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<FormControl
									sx={{
										width: 200
									}}
								>
									<InputLabel id="년도">&nbsp; 년도</InputLabel>
									<Select
										labelId="년도"
										id="년도"
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
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>프로젝트 지도 교수</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<FormControl
									sx={{
										width: 200,
										backgroundColor: 'primary.smoothgreen'
									}}
								>
									<InputLabel id="지도교수">&nbsp; 지도교수</InputLabel>
									<Select
										labelId="지도교수"
										id="지도교수"
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
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>프로젝트 카테고리</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<FormControl
									sx={{
										width: 200
									}}
								>
									<InputLabel id="카테고리">&nbsp; 카테고리</InputLabel>
									<Select
										labelId="카테고리"
										id="카테고리"
										multiple
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
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<Link
									to={{
										pathname: `/app/projectDetail/${project_id}`,
										state: { index: project_id }
									}}
								>
									<Button
										variant="contained"
										color="success"
										onClick={projectUpdate}
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
								<Link to="/app/dashboard">
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
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											삭제하기
										</h3>
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

export default ProjectUpdate;
