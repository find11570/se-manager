import { Helmet } from 'react-helmet';
import {
	Box,
	Container,
	Grid,
} from '@material-ui/core';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import Saleswp from 'src/components/dashboard//Saleswp';
import Salestp from 'src/components/dashboard//Salestp';
import ChooseFarms from 'src/components/dashboard//ChooseFarms';
import { useState } from 'react';

const Dashboard = () => {
	const [value, setvalue] = useState();

	return (
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
							<ChooseFarms value={value} setvalue={setvalue} />
						</Grid>
						<Grid
							item
							lg={12}
							md={12}
							xl={9}
							xs={12}
						>
							<Saleswp value={value} />
						</Grid>
						<Grid
							item
							lg={12}
							md={12}
							xl={9}
							xs={12}
						>
							<Salestp value={value} />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Dashboard;
