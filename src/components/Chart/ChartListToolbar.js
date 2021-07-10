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
	const [value, setValue] = useState('');

	const handleChange = (event) => {
		setValue(event.target.value);
		console.log(event.target.value);
	};

	const api = () => axios.post('http://farm.developerpsy.com:3000/SelectFarmSensor.php');

	function f1() {
		useEffect(() => {
			const getCharts = async () => {
				await api();
			};
			getCharts();
		}, []);
	}

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
		console.log(newSelectedFarmIds);
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
								placeholder="농장 검색(ex: 덕교 농장)"
								onChange={handleChange}
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
