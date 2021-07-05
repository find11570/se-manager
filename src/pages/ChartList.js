import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import ChartLine from 'src/components/Chart//ChartLine';
import ChartListToolbar from 'src/components/Chart//ChartListToolbar';

const ChartList = () => (
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
				<ChartListToolbar />
				<Grid
					item
					pt={3}
				>
					<ChartLine />
				</Grid>
			</Container>
		</Box>
	</>
);

export default ChartList;
