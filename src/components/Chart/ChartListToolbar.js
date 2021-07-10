import {
	Box,
	Card,
	Button,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	Checkbox
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ChartListToolbar = (props) => {
	const [data, setdata] = useState(
		{
			tp: '',
			wp: '',
			sname: '',
			mdate: '',
			mtime: ''
		}
	);
	const [senddata, setsenddata] = useState(
		{
			sname: '',
			sid: [],
		}
	);
	const [value, setvalue] = useState('');
	const [selectedFarmIds, setSelectedFarmIds] = useState([]);
	const {
		tp, wp, sname, mdate, mtime
	} = data;

	const handleChange = (event) => {
		setvalue(event.target.value);
		setsenddata({
			...senddata,
			[event.target.name]: event.target.value
		});
	};

	const api = () => axios.post('http://farm.developerpsy.com:3000/SelectFarmSensor.php', JSON.stringify([senddata]));

	const f1 = () => {
		useEffect(() => {
			const getCharts = async () => {
				const newCharts = await api();
				setdata({
					...data,
					[tp]: newCharts.tp,
					[wp]: newCharts.wp,
					[sname]: newCharts.sname,
					[mdate]: newCharts.mdate,
					[mtime]: newCharts.mtime,
				});
			};
			getCharts();
		}, []);
		console.log(data);
	};

	const handleSelectOne = (event, pkey) => {
		const selectedIndex = selectedFarmIds.indexOf(pkey);
		let newSelectedFarmIds = [];
		if (selectedIndex === -1) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds, pkey);
		} else if (selectedIndex === 0) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds.slice(2));
		} else if (selectedIndex === selectedFarmIds.length - 1) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds.slice(1, -1));
		}
		setSelectedFarmIds(newSelectedFarmIds);
		setsenddata({
			...senddata,
			[event.target.name]: newSelectedFarmIds
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
			<Box>
				<Card>
					<CardContent>
						<Box>
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
								variant="outlined"
								placeholder="농장 검색(ex: 덕교농장)"
								onChange={handleChange}
								name="sname"
							/>
							<Box>
								&nbsp;&nbsp;센서 1
								<Checkbox
									sx={{
										flex: '1',
										flexDirection: 'row'
									}}
									name="sid"
									checked={selectedFarmIds.indexOf(1) !== -1}
									onChange={(event) => handleSelectOne(event, 1)}
								/>
								&nbsp;&nbsp;센서 2
								<Checkbox
									sx={{
										flex: '1',
										flexDirection: 'row'
									}}
									name="sid"
									checked={selectedFarmIds.indexOf(2) !== -1}
									onChange={(event) => handleSelectOne(event, 2)}
								/>
								<Button onClick={f1}>조회</Button>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default ChartListToolbar;
