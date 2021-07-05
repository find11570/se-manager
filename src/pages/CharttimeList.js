import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import CharttimeLine from 'src/components/Charttime//CharttimeLine';
import CharttimeListToolbar from 'src/components/Charttime//CharttimeListToolbar';

const CharttimeList = () => (
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
				<CharttimeListToolbar />
				<Grid
					item
					pt={3}
				>
					<CharttimeLine />
				</Grid>
			</Container>
		</Box>
	</>
);

export default CharttimeList;
