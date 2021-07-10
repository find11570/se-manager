import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import ChartLine from 'src/components/Chart//ChartLine';
import ChartListToolbar from 'src/components/Chart//ChartListToolbar';
import { useState } from 'react';

const ChartList = () => {
	const [data, setdata] = useState();

	return (
		<>
			<Helmet>
				<title>Chart</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					minHeight: '100%',
					py: 3
				}}
			>
				<Container maxWidth={false}>
					<ChartListToolbar data={data} setdata={setdata} />
					<Grid
						item
						pt={3}
					>
						<ChartLine data={data} />
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default ChartList;
