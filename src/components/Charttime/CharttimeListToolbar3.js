import {
	Box,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	Button
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CharttimeListToolbar3 = (props) => {
	const { dat, setdat } = props;
	const [value, setvalue] = useState('');
	const [senddata, setsenddata] = useState(
		{
			farm: '',
		}
	);

	const api = () => axios.post('http://farm.developerpsy.com:443/SelectSensorDuringTenDays.php', JSON.stringify([senddata]));

	const getCharts = async () => {
		const newCharts = await api();
		setdat(newCharts.data);
	};

	const handleChange = (event) => {
		setvalue(event.target.value);
		setsenddata({
			...senddata,
			[event.target.name]: event.target.value
		});
	};

	useEffect(() => {
	}, [dat]);

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
							최근 10일간, 하루 한건의 데이터
							<Button onClick={getCharts}>조회</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default CharttimeListToolbar3;
