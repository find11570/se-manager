import { Helmet } from 'react-helmet';
import {
	Box,
	Container,
	Grid
} from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import Sales from 'src/components/dashboard//Sales';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';

const Dashboard = () => (
	<>
		<Helmet>
			<title>Main</title>
		</Helmet>
		<Box
			sx={{
				backgroundColor: 'background.default',
				minHeight: '100%',
				py: 3
			}}
		>
			<Container maxWidth={false}>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						lg={6}
						md={12}
						xl={4.5}
						xs={12}
					>
						<Budget />
					</Grid>
					<Grid
						item
						lg={6}
						md={12}
						xl={4.5}
						xs={12}
					>
						<TotalCustomers />
					</Grid>
					<Grid
						item
						lg={12}
						md={12}
						xl={9}
						xs={12}
					>
						<LatestOrders />
					</Grid>
					<Grid
						item
						lg={12}
						md={12}
						xl={9}
						xs={12}
					>
						<Sales />
					</Grid>
				</Grid>
			</Container>
		</Box>
	</>
);

export default Dashboard;
