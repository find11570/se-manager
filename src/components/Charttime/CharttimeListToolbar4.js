import {
	Box,
	Card,
	CardContent,
	Button,
	TextField,
	InputAdornment,
	SvgIcon,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Search as SearchIcon } from 'react-feather';
import * as moment from 'moment';
import axios from 'axios';

const CharttimeListToolbar4 = (props) => {
	const [startDate, setStartDate] = useState(new Date());
	const { data4, setdata4 } = props;
	const [value, setvalue] = useState('');
	const [senddata, setsenddata] = useState(
		{
			farm: '',
			date: moment(startDate).format('YYYY-MM-DD'),
		}
	);

	const api = () => axios.post('http://farm.developerpsy.com:443/SelectSensorDuringTenDays.php', JSON.stringify([senddata]));

	const getCharts = async () => {
		console.log(senddata);
		const newCharts = await api();
		setdata4(newCharts.data);
		console.log(newCharts.data);
	};

	const handleChange = (event) => {
		setvalue(event.target.value);
		setsenddata({
			...senddata,
			[event.target.name]: event.target.value
		});
	};

	const handledateChange = () => {
		setsenddata({
			...senddata,
			date: moment(startDate).format('YYYY-MM-DD'),
		});
	};

	useEffect(() => {
	}, [data4]);

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
								flexDirection: 'row',
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
							value={value || ''}
							onChange={handleChange}
							name="farm"
							placeholder="농장 검색"
							variant="outlined"
						/>
						<Box>
							특정 일자의 시간별 센서 데이터 :&nbsp;
							<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
							<Button onClick={handledateChange}>시간 확인</Button>
							<Button onClick={getCharts}>조회</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default CharttimeListToolbar4;
