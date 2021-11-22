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
	const [subject, setsubject] = useState([]);

	const [subjects, setsubjects] = useState([]);
	const [state, setstate] = useState(new Date());

	const handleTextChange = (event) => {
		setPostBody({
			name: event.currentTarget.value,
		});
	};
	const handleChange = (event) => {
		setstate(new Date());
	}
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
		const link = document.location.href;
		var link_quary = link.replace('http://localhost:3000/se/team/', '');
		var quary = decodeURI(link_quary, 'UTF-8');
		if (quary.includes(',')) {
			var quary_array = quary.split('&');
			var stack_string = quary_array[1].split('=');
			var stack_string2 = quary_array[2].split('=');
			setsubject(stack_string[1]);
			setPostBody({
				name: stack_string2[1]
			});
        }
	}, []);

	function search_url(subject, keyword) {
		const url = [];
		if (!(subject.length == 0)) {
			url.push("&subject=" + subject);
		}
		else {
			url.push('&subject=null');
		}

		if (!(keyword === '')) {
			url.push('&keyword=' + keyword);
		}
		else {
			url.push('&keyword=null');
		}

		return url.join();
	}
	const getSubjects = async () => {
		let response = await Api.getSubjects();
		const subject_list = await response.data.subjects;
		setsubjects(subject_list);
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
							<Link to=
								{{
									pathname: `/se/team/${search_url(subject, postBody.name)}`,
								}}
							>
								<Box
									sx={{
										paddingTop: 1,
									}}
								>
									<Button
										variant="contained"
										color="success"
										onClick={handleChange}
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
						</Grid>
					</Grid>
					<Box
						sx={{
							minHeight: '100%',
							py: 2,
						}}
					/>
					<TeamRead state={state} />
				</Container>
			</Box>
		</>
	);
};

export default Team;
