import { Helmet } from 'react-helmet';
import TeamRead from 'src/components/Team/TeamRead';
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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Api from '../Api/Api';

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

const Team = () => {
	const [postBody, setPostBody] = useState({
		name: ''
	});
	const [stack, setstack] = useState([]);
	const [subject, setsubject] = useState([]);

	const [stacks, setstacks] = useState([]);
	const [subjects, setsubjects] = useState([]);

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
	useEffect(async () => {
		getSubjects();
		getStacks();

	}, []);
	const getSubjects = async () => {
		let response = await Api.getSubjects();
		const subject_list = await response.data.subjects;
		setsubjects(subject_list);
	};
	const getStacks = async () => {
		let response = await Api.getStacks();
		if (response.data.tags == null) {
			const stack_list = [];
			setstacks(stack_list);
		}
		else {
			const stack_list = await response.data.tags;
			setstacks(stack_list);
		}
	};
	return (
		<>
			<Helmet>
				<title>Team</title>
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
				<h2 style={{ marginLeft: 20 }}>팀원을 찾아보세요!</h2>
				<Box
					sx={{
						minHeight: '100%',
						py: 1,
					}}
				/>
				<Hidden lgDown>
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
						spacing={2}
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
								<Link to="/se/team">
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
								<Link to="/se/team">
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
						<TeamRead />
				</Container>
			</Box>
		</>
	);
};

export default Team;
