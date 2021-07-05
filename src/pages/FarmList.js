import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FarmListResults from 'src/components/Farm//FarmListResults';
import FarmListToolbar from 'src/components/Farm//FarmListToolbar';
import Farms from 'src/__mocks__/Farms';

const FarmList = () => (
	<>
		<Helmet>
			<title>Farms</title>
		</Helmet>
		<Box
			sx={{
				backgroundColor: 'background.default',
				minHeight: '100%',
				py: 3
			}}
		>
			<Container maxWidth={false}>
				<FarmListToolbar />
				<Box sx={{ pt: 3 }}>
					<FarmListResults Farms={Farms} />
				</Box>
			</Container>
		</Box>
	</>
);

export default FarmList;
