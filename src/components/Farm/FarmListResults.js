import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Box,
	Card,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
} from '@material-ui/core';

const FarmListResults = ({ Farms, ...rest }) => {
	const [selectedFarmIds, setSelectedFarmIds] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

	const handleSelectAll = (event) => {
		let newSelectedFarmIds;

		if (event.target.checked) {
			newSelectedFarmIds = Farms.map((Farm) => Farm.pkey);
		} else {
			newSelectedFarmIds = [];
		}

		setSelectedFarmIds(newSelectedFarmIds);
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

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<Card {...rest}>
			<PerfectScrollbar>
				<Box sx={{ minWidth: 1050 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedFarmIds.length === Farms.length}
										color="primary"
										indeterminate={
											selectedFarmIds.length > 0
											&& selectedFarmIds.length < Farms.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>
								<TableCell>
									지역명
								</TableCell>
								<TableCell>
									장치식별자
								</TableCell>
								<TableCell>
									농장명
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Farms.slice(0, limit).map((Farm) => (
								<TableRow
									hover
									key={Farm.pkey}
									selected={selectedFarmIds.indexOf(Farm.pkey) !== -1}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={selectedFarmIds.indexOf(Farm.pkey) !== -1}
											onChange={(event) => handleSelectOne(event, Farm.pkey)}
											value="true"
										/>
									</TableCell>
									<TableCell>
										{Farm.region}
									</TableCell>
									<TableCell>
										{Farm.did}
									</TableCell>
									<TableCell>
										{Farm.sname}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={Farms.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

FarmListResults.propTypes = {
	Farms: PropTypes.array.isRequired
};

export default FarmListResults;
