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

const Farms = [
	{
		pkey: '1',
		did: 'M0001',
		region: '인천',
		sname: '덕교농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '2',
		did: 'M0002',
		region: '인천',
		sname: '중산농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '3',
		did: 'M0003',
		region: '영암',
		sname: '만수농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '4',
		did: 'M0004',
		region: '영암',
		sname: '봉호농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '5',
		did: 'M0005',
		region: '안동',
		sname: '녹내농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '6',
		did: 'M0006',
		region: '안동',
		sname: '구송농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '7',
		did: 'M0007',
		region: '구미',
		sname: '시험농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '8',
		did: 'M0008',
		region: '구미',
		sname: '채연농장',
		fname: '',
		phone: ''
	}
];

const FarmListResults = (props) => {
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
		<Card {...props}>
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
