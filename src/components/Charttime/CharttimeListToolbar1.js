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
	const [farmInput, setFarmInput] = useState();
	const [chartData, setChartData] = useState({
		wp: undefined,
		tp: undefined,
		dates: undefined,
		farmname: ''
	});

	const getDateFormat = (date) => {
		const res = `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		return res;
	};

	const [postBody, setPostBody] = useState({
		farm: '',
		date: getDateFormat(startDate)
	});

	const api = () => axios.post('http://farm.developerpsy.com:443/SelectSensorWithFarmAndDateLimitAmount.php',
		JSON.stringify([postBody]));

	const getFormatedChart = (data) => {
		const newFarmName = farmInput;
		const newWp = [];
		const newTp = [];
		const newDates = [];

		data.forEach((element) => {
			newWp.push(element.wp);
			newTp.push(element.tp);
			newDates.push(element.mdate + element.mtime);
		});

		return {
			wp: newWp,
			tp: newTp,
			dates: newDates,
			farmname: newFarmName
		};
	};

	const getChart = async () => {
		const newCharts = await api();
		console.log(newCharts);
		setChartData(getFormatedChart(newCharts.data));
	};

	const handleTextChange = (event) => {
		setFarmInput(event.currentTarget.value);
		setPostBody({
			farm: event.currentTarget.value,
			date: getDateFormat(startDate)
		});
	};

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
							onChange={handleTextChange}
						/>

						<Box>
							특정 일자의 5개의 센서 데이터 :&nbsp;
							<DatePicker
								selected={startDate}
								onChange={(date) => {
									setStartDate(date);
									setPostBody({
										farm: farmInput,
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
					farmname={chartData.farmname}
				/>
			</Box>
		</Box>
	);
};

export default CharttimeListToolbar1;
