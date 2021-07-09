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

const Farms = axios.get('http://farm.developerpsy.com:3000/SelectFarmList.php');

const LatestOrders = (props) => (
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
						{Farms.map((Farm) => (
							<TableRow
								hover
								key={Farm.id}
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
	</Card>
);

export default LatestOrders;
