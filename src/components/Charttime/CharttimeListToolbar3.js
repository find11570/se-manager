import {
	Box,
	Card,
	CardContent,
	Checkbox
} from '@material-ui/core';
import { useState } from 'react';

const CharttimeListToolbar3 = (props) => {
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
							최근 10일간, 하루 한건의 데이터 :
							<Checkbox
								sx={{
									flex: '1',
									flexDirection: 'row'
								}}
								checked={selectedFarmIds.indexOf(1) !== -1}
								onChange={(event) => handleSelectOne(event, 1)}
								value="true"
							/>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default CharttimeListToolbar3;
