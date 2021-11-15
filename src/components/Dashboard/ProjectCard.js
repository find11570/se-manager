import { useState, useEffect } from 'react';
import {
	Box,
	Grid,
} from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import ProjectCardContent from 'src/components/Dashboard/ProjectCardContent';
import Api from 'src/Api/Api';

const api = 'https://se-disk.herokuapp.com/api';
const url = '/project/search';
const url_c = '/category';

const ProjectCard = (props) => {
	const { category_props, sort_props } = props;

	const post_array = [];
	const link = document.location.href;
	var link_quary = link.replace('http://localhost:3000/app/project/', '');
	var quary = decodeURI(link_quary, 'UTF-8');

	if (quary.includes(',')) {
		var quary_array = quary.split('&');
		var category = quary_array[0];

		// stack
		quary_array[1] = quary_array[1].slice(0, -1);
		var stack_string = quary_array[1].split('=');
		if (stack_string[1] != 'null') {
			var stack_array = stack_string[1].split(',');
			const stack = [];
			stack.push(stack_array);
			post_array.push(stack[0]);
		}
		else {
			post_array.push('null');
		}

		// subject
		quary_array[2] = quary_array[2].slice(0, -1);
		var stack_string2 = quary_array[2].split('=');
		if (stack_string2[1] != 'null') {
			var stack_array = stack_string2[1].split(',');
			const subject = [];
			subject.push(stack_array);
			post_array.push(subject[0]);
		}
		else {
			post_array.push('null');
		}

		// year
		quary_array[3] = quary_array[3].slice(0, -1);
		var stack_string3 = quary_array[3].split('=');
		if (stack_string3[1] != 'null') {
			var stack_array = stack_string3[1].split(',');
			const year = [];
			year.push(stack_array);
			post_array.push(year[0]);
		}
		else {
			post_array.push('null');
		}

		// professor
		quary_array[4] = quary_array[4].slice(0, -1);
		var stack_string4 = quary_array[4].split('=');
		if (stack_string4[1] != 'null') {
			var stack_array = stack_string4[1].split(',');
			const professor = [];
			professor.push(stack_array);
			post_array.push(professor[0]);
		}
		else {
			post_array.push('null');
		}

		// keyword
		var stack_string5 = quary_array[5].split('=');
		if (stack_string5[1] != 'null') {
			post_array.push(stack_string5[1]);
		}
		else {
			post_array.push('null');
		}

		// category
		if (category_props != 'null') {
			post_array.push(category_props);
		}
		else {
			post_array.push('null');
		}

		// sort
		if (sort_props != 'null') {
			post_array.push(sort_props);
		}
		else {
			post_array.push('null');
		}
	}
	else {
		var category = quary;
	}

	const [page, setPage] = useState(0);
	const [count, setcount] = useState(1);
	const [p_list, setp_list] = useState([]);
	const [array, setarray] = useState([]);

	const handlePageChange = (event, value) => {
		setPage(value);
		const front = () => {
			if (quary.includes(',')) {
				if ((stack_string[1] == 'null') && (stack_string2[1] == 'null') && (stack_string3[1] == 'null') && (stack_string4[1] == 'null') && (stack_string5[1] == 'null')) {
					console.log('f: get 요청');
					return axios.get(api + url + url_c + '?categoryId=' + category + '&pageNum=' + value + '&pageCount=6');
				}
				else {
					console.log('f:post 요청');
					const tag_arr = [];
					if (post_array[0] !== 'null') {
						post_array[0].map(function (v) {
							return tag_arr.push(v);
						});
					}

					const subj_arr = [];
					if (post_array[1] !== 'null') {
						post_array[1].map(function (v) {
							return subj_arr.push(v);
						});
					}

					const intYear = [];
					if (post_array[2] !== 'null') {
						post_array[2].map(function (v) {
							return intYear.push(parseInt(v, 10));
						});
					}

					const p_id = [];
					if (post_array[2] !== 'null') {
						p_list.map((idx) => {
							post_array[3].map((v) => {
								if (idx.user_name == v)
									return p_id.push(idx.user_id);
							});
						});
					}

					const cat_arr = [];
					if (post_array[5] !== 'null') {
						post_array[5].map(function (v) {
							return cat_arr.push(v);
						});
					}

					const sort_arr = [];
					if (post_array[6] !== 'null') {
						post_array[6].map(function (v) {
							return sort_arr.push(v);
						});
					}

					const post_list = {
						tag: tag_arr,
						subject: subj_arr,
						year: intYear,
						professor: p_id,
						keyword: post_array[4],
						category: cat_arr,
						sort: sort_arr
					};
					console.log(post_list);

					return axios.post(api + url + '?pageNum=' + value + '&pageCount=6', post_list);
				}
			}
			else {
				return axios.get(api + url + url_c + '?categoryId=' + category + '&pageNum=' + value + '&pageCount=6');
			}
		}

		const getdata = async () => {
			const data = await front();
			setarray(data.data.projects);
		};
		getdata();
	};

	const back = () => {
		if (quary.includes(',')) {
			if ((stack_string[1] == 'null') && (stack_string2[1] == 'null') && (stack_string3[1] == 'null') && (stack_string4[1] == 'null') && (stack_string5[1] == 'null')) {
				console.log('b: get 요청');
				return axios.get(api + url + url_c + '?categoryId=' + category + '&pageNum=1' + '&pageCount=6');
			}
			else {
				console.log('b : post 요청');
				const tag_arr = [];
				if (post_array[0] !== 'null') {
					post_array[0].map(function (v) {
						return tag_arr.push(v);
					});
				}

				const subj_arr = [];
				if (post_array[1] !== 'null') {
					post_array[1].map(function (v) {
						return subj_arr.push(v);
					});
				}

				const intYear = [];
				if (post_array[2] !== 'null') {
					post_array[2].map(function (v) {
						return intYear.push(parseInt(v, 10));
					});
				}

				const p_id = [];
				if (post_array[2] !== 'null') {
					p_list.map((idx) => {
						post_array[3].map((v) => {
							if (idx.user_name == v)
								return p_id.push(idx.user_id);
						});
					});
				}

				const cat_arr = [];
				if (post_array[5] !== 'null') {
					post_array[5].map(function (v) {
						return cat_arr.push(v);
					});
				}

				const sort_arr = [];
				if (post_array[6] !== 'null') {
					post_array[6].map(function (v) {
						return sort_arr.push(v);
					});
				}

				const post_list = {
					tag: tag_arr,
					subject: subj_arr,
					year: intYear,
					professor: p_id,
					keyword: post_array[4],
					category: cat_arr,
					sort: sort_arr
				};
				console.log(post_list);

				return axios.post(api + url + '?pageNum=1' + '&pageCount=6', post_list);
			}
		}
		else {
			return axios.get(api + url + url_c + '?categoryId=' + category + '&pageNum=1' + '&pageCount=6');
		}
	}


	useEffect(async () => {
		await getProfessors();

		const getdata = async () => {
			const data = await back();
			setarray(data.data.projects);
			setcount(Math.ceil(data.data.count / 6));
		};
		getdata();
	}, []);

	const getProfessors = async () => {
		let response = await Api.getProfessors();
		var professor_list = response.data.professors;
		setp_list(professor_list);
	};

	return (
		<>
			<Box>
				<Grid
					container
					spacing={3}
				>
					{
						array.map(row => (
							<ProjectCardContent key={row.project_id} id={row.project_id} title={row.project_title} image={row.project_image} hit={row.project_hit} like={row.project_like} members={row.project_members} />
						))
					}
				</Grid>
			</Box >
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
						<Pagination count={count} page={page} onChange={handlePageChange} showFirstButton showLastButton />
					</Stack>
				</Box>
			</Grid>
		</>
	);
};

export default ProjectCard;
