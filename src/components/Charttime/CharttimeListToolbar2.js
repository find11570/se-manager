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

const CharttimeListToolbar2 = (props) => {
	const { data, setdata } = props;
	const [startDate, setStartDate] = useState(new Date());
	const [value, setvalue] = useState('');
	const [senddata, setsenddata] = useState(
		{
			farm: '',
			date: moment(startDate).format('YYYY-MM-DD'),
			time: moment(startDate).format('HH')
		}
	);

	const handleChange = (event) => {
		setvalue(event.target.value);
		setsenddata({
			...senddata,
			[event.target.name]: event.target.value
		});
	};

	const api = () => axios.post('http://farm.developerpsy.com:443/SelectSensorDuringOneHour.php', JSON.stringify([senddata]));

	const getCharts = async () => {
		const newCharts = await api();
		setdata(newCharts.data);
	};

	const handledateChange = () => {
		setsenddata({
			...senddata,
			date: moment(startDate).format('YYYY-MM-DD'),
			time: moment(startDate).format('HH'),
		});
	};

	useEffect(() => {
	}, [data]);

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
							특정 일자, 특정 시간의 1분간의 센서 데이터 :&nbsp;
							<DatePicker selected={startDate} onChange={(da) => setStartDate(da)} dateFormat="yyyy-MM-dd, HH:MM" showTimeSelect />
							<Button onClick={handledateChange}>시간 확인</Button>
							<Button onClick={getCharts}>조회</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default CharttimeListToolbar2;
