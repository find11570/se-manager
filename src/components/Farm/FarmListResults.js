import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Box,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
} from '@material-ui/core';

const FarmListResults = ({ Farms, ...rest }) => {
	const [selectedFarmIds] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

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
