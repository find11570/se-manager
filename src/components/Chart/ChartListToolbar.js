import {
	Box,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	Checkbox
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState } from 'react';

const ChartListToolbar = (props) => {
	const [selectedFarmIds, setSelectedFarmIds] = useState([]);

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
			<Box sx={{ mt: 3 }}>
				<Card>
					<CardContent>
						<Box>
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
							센서 1
							<Checkbox
								sx={{
									flex: '1',
									flexDirection: 'row'
								}}
								checked={selectedFarmIds.indexOf(1) !== -1}
								onChange={(event) => handleSelectOne(event, 1)}
								value="true"
							/>
							센서 2
							<Checkbox
								sx={{
									flex: '1',
									flexDirection: 'row'
								}}
								checked={selectedFarmIds.indexOf(2) !== -1}
								onChange={(event) => handleSelectOne(event, 2)}
								value="true"
							/>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default ChartListToolbar;
