/* eslint-disable */
// eslint 적용을 위해서 나주엥 이부분 제거 하고 적용

import {
	Box,
	Card,
	CardContent,
	Button,
	TextField,
	InputAdornment,
	SvgIcon
 } from '@material-ui/core';
 import { useState } from 'react';
 import DatePicker from 'react-datepicker';
 import 'react-datepicker/dist/react-datepicker.css';
 import { Search as SearchIcon } from 'react-feather';
 import axios from 'axios';
 import CharttimeLine from 'src/components/Charttime//CharttimeLine1';
 
 const CharttimeListToolbar1 = (props) => {
	const [startDate, setStartDate] = useState(new Date());
	const [chartData, setChartData] = useState({
		wp: undefined,
		tp: undefined,
		dates: undefined,
		farm_name: ''
	 });
 
	// 시작
 
	const getDateFormat = (date) => {
	   return (
		  date.getFullYear() +
		  '-' +
		  (date.getMonth() + 1).toString().padStart(2, '0') +
		  '-' +
		  date.getDate().toString().padStart(2, '0')
	   );
	};
 
	const [postBody, setPostBody] = useState({
	   farm: '덕교농장',
	   date: getDateFormat(startDate)
	});
 
	const api = () =>
	   axios.post(
		  'http://farm.developerpsy.com:443/SelectSensorWithFarmAndDateLimitAmount.php',
		  JSON.stringify([postBody])
	   );
 
	const getFormatedChart = (api) => {
	   if (api.length === 0)
		  return {
			 wp: undefined,
			 tp: undefined,
			 dates: undefined,
			 farm_name: undefined
		  };
 
	   const newWp = [];
	   const newTp = [];
	   const newDates = [];
 
	   api.forEach((element) => {
		  newWp.push(element.wp);
		  newTp.push(element.tp);
		  newDates.push(element.mdate + element.mtime);
	   });
 
	   return {
		  wp: newWp,
		  tp: newTp,
		  dates: newDates,
		  farm_name: api[0]['sname']
	   };
	};
 
	const getChart = async () => {
	   const newCharts = await api();
	   console.log(newCharts.data); // 테스팅용 콘솔
	   setChartData(getFormatedChart(newCharts.data));
	};
 
	// 끝
 
	return (
	   <Box {...props}>
		  <Box
			 sx={{
				flex: '1',
				flexDirection: 'row'
			 }}
		  />
		  <Box sx={{ mt: 3 }}>
			 <Card>
				<CardContent>
				   <TextField
					  fullWidth
					  sx={{
						 flex: '1',
						 flexDirection: 'row'
					  }}
					  InputProps={{
						 startAdornment: (
							<InputAdornment position="start">
							   <SvgIcon
								  fontSize="small"
								  color="action"
							   >
								  <SearchIcon />
							   </SvgIcon>
							</InputAdornment>
						 )
					  }}
					  placeholder="농장 검색"
					  variant="outlined"
				   />
				   <Box>
					  특정 일자의 5개의 센서 데이터 :&nbsp;
					  <DatePicker
						 selected={startDate}
						 onChange={(date) => {
							setStartDate(date);
							setPostBody({
							   farm: '덕교농장',
							   date: getDateFormat(date)
							});
						 }}
					  />
					  <Button onClick={getChart}>조회</Button>
				   </Box>
				</CardContent>
			 </Card>
		  </Box>
		  <Box>
			 <CharttimeLine
				wp={chartData.wp}
				tp={chartData.tp}
				dates={chartData.dates}
				farm_name={chartData.farm_name}
			 />
		  </Box>
	   </Box>
	);
 };
 
 export default CharttimeListToolbar1;
