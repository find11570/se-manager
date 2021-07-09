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
	const [selectedFarmIds, setSelectedFarmIds] = useState([]);
	const [values] = useState({
		name: '',
		sensor1: '',
		sensor2: '',
	});

	const api = () => axios.post('http://farm.developerpsy.com:3000/SelectFarmSensor.php', values);

	const f1 = () => {
		useEffect(() => {
			const getCharts = async () => {
				await api();
			};
			getCharts();
		}, []);
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
								placeholder="농장 검색"
								variant="outlined"
							/>
							<Box>
								&nbsp;&nbsp;센서 1
								<Checkbox
									sx={{
										flex: '1',
										flexDirection: 'row'
									}}
									checked={selectedFarmIds.indexOf(1) !== -1}
									onChange={(event) => handleSelectOne(event, 1)}
								/>
								&nbsp;&nbsp;센서 2
								<Checkbox
									sx={{
										flex: '1',
										flexDirection: 'row'
									}}
									checked={selectedFarmIds.indexOf(2) !== -1}
									onChange={(event) => handleSelectOne(event, 2)}
								/>
								<Button onClick={() => f1}>조회</Button>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default ChartListToolbar;
