import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import CharttimeLine from 'src/components/Charttime//CharttimeLine';
import CharttimeListToolbar1 from 'src/components/Charttime//CharttimeListToolbar1';
import CharttimeListToolbar2 from 'src/components/Charttime//CharttimeListToolbar2';
import CharttimeListToolbar3 from 'src/components/Charttime//CharttimeListToolbar3';
import CharttimeListToolbar4 from 'src/components/Charttime//CharttimeListToolbar4';

const CharttimeList = () => (
	<>
		<Helmet>
			<title>time</title>
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
						<CharttimeListToolbar1 />
						<CharttimeLine />
					</Grid>
					<Grid
						item
						lg={12}
						md={12}
						xl={9}
						xs={12}
					>
						<CharttimeListToolbar2 />
						<CharttimeLine />
					</Grid>
					<Grid
						item
						lg={12}
						md={12}
						xl={9}
						xs={12}
					>
						<CharttimeListToolbar3 />
						<CharttimeLine />
					</Grid>
					<Grid
						item
						lg={12}
						md={12}
						xl={9}
						xs={12}
					>
						<CharttimeListToolbar4 />
						<CharttimeLine />
					</Grid>
				</Grid>
			</Container>
		</Box>
	</>
);

export default CharttimeList;
