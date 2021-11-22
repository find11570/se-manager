import { useState, useEffect } from 'react';
import {
	Box,
	Grid,
} from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TeamReadContent from 'src/components/Team/TeamReadContent';
import Api from 'src/Api/Api';

const TeamRead = (props) => {
	const { state } = props;

	const [page, setPage] = useState(1);
	const [count, setcount] = useState(1);
	const [array, setarray] = useState([]);
	const handlePageChange = (event, value) => {
		setPage(value);
		const front = async() => {
			return await Api.getAllTeam(value, 6);
		}
		const getdata = async() => {
            const data = await front();
            setarray(data.recruitments);
        };
        getdata();
	}

	function dateCul(date) {
		var year = date.slice(0, 4);
		var month = date.slice(5, 7);
		var day = date.slice(8, 10);
		var Dday = new Date(year, month-1, day);
		var now = new Date();

		var gap = now.getTime() - Dday.getTime();
		var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
		return result;
	}
	var link = document.location.href;
    var link_quary = link.replace('http://localhost:3000/se/team/', '');
    var quary = decodeURI(link_quary, 'UTF-8');
	
	const back = async() => {
        if (quary.includes(',')) {
			var quary_array = quary.split('&');
			quary_array[1] = quary_array[1].slice(0, -1);
			var stack_string = quary_array[1].split('=');
			var stack_string2 = quary_array[2].split('=');
            if ((stack_string[1] == 'null') && (stack_string2[1] == 'null')) {
                return await Api.getAllTeam(1, 6);
            } else {
				var keyword = stack_string2[1];
				var subject = stack_string[1];
				if(stack_string2[1] == 'null'){
					keyword = 'null'
				}
				if(stack_string[1] == 'null'){
					subject = 'null'
				}
                return await Api.getSearch(1,6,keyword,subject);
            }
        } else {
            return await Api.getAllTeam(1, 6);
        }
    }

	useEffect(async () => {
		const getdata = async () => {
			const data = await back();
			setarray(data.recruitments);
			setcount(Math.ceil(data.count / 6));
		};
		getdata();
	}, [state]);


	return (
		<>
			<Box >
				<Grid
					container
					spacing={3}
				>
					{
						array.map(row => (
							<TeamReadContent key={row.recruitment_id}
								id={row.recruitment_id}
								title={row.recruitment_title}
								content={row.recruitment_content}
								tag={row.recruitment_subject}
								currentpeople={row.recruitment_recruited_cnt}
								Maxpeople={row.recruitment_recruited_limit}
								user_id={row.user_id}
								user_name={row.user_name}
								user_image={row.user_image}
								people_key={row.user_school_num}
								date={dateCul(row.recruitment_deadline_date)}
							/>
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
					<Stack
						spacing={2}
					>
						<Pagination
							count={count}
							page={page}
							onChange={handlePageChange}
							showFirstButton showLastButton
						/>
					</Stack>
				</Box>
			</Grid>
		</>
	);
};

export default TeamRead;
