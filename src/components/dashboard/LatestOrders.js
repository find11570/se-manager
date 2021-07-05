import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Box,
	Button,
	Card,
	CardHeader,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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
	}
];

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
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-end',
				p: 2
			}}
		>
			<Button
				color="primary"
				endIcon={<ArrowRightIcon />}
				size="small"
				variant="text"
				href="/app/Farm"
			>
				전체 목록
			</Button>
		</Box>
	</Card>
);

export default LatestOrders;
