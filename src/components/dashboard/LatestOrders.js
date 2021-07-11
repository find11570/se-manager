import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Box,
	Card,
	CardHeader,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core';
import axios from 'axios';

const api = () => axios.get('http://farm.developerpsy.com:443/SelectFarmList.php');

const LatestOrders = (props) => {
	const [farms, setFarms] = useState();

	useEffect(() => {
		const getFarms = async () => {
			const newFarms = await api();
			setFarms(newFarms.data);
		};
		getFarms();
	}, []);

	return (
		<Card {...props}>
			<CardHeader title="농장 목록" />
			<Divider />
			<PerfectScrollbar>
				<Box sx={{ minWidth: 800 }}>
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
							{farms ? farms.map((Farm) => (
								<TableRow
									hover
									key={Farm.pkey}
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
							)) : null}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
		</Card>
	);
};
export default LatestOrders;
