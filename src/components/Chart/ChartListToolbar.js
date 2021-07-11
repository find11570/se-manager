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
	const { data, setdata } = props;
	const [senddata, setsenddata] = useState(
		{
			farm: '',
			sid: [],
		}
	);
	const [value, setvalue] = useState('');
	const [selectedFarmIds, setSelectedFarmIds] = useState([]);

	const handleChange = (event) => {
		setvalue(event.target.value);
		setsenddata({
			...senddata,
			[event.target.name]: event.target.value
		});
	};

	const api = () => axios.post('http://farm.developerpsy.com:443/SelectFarmSensor.php', JSON.stringify([senddata]));

	const getCharts = async () => {
		const newCharts = await api();
		setdata(newCharts.data);
	};

	const handleSelectOne = (event, pkey) => {
		const selectedIndex = selectedFarmIds.indexOf(pkey);
		let newSelectedFarmIds = [];
		if (selectedIndex === -1) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds, pkey);
		} else if (selectedIndex === 0) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds.slice(1));
		} else if (selectedIndex === selectedFarmIds.length - 1) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedFarmIds = newSelectedFarmIds.concat(
				selectedFarmIds.slice(0, selectedIndex),
				selectedFarmIds.slice(selectedIndex + 1)
			);
		}
		setSelectedFarmIds(newSelectedFarmIds);
		if (newSelectedFarmIds.length === 2) {
			setsenddata({
				...senddata,
				[event.target.name]: 3
			});
		} else {
			setsenddata({
				...senddata,
				[event.target.name]: newSelectedFarmIds[0]
			});
		}
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
								name="farm"
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
								<Button onClick={getCharts}>조회</Button>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default ChartListToolbar;
