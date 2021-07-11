import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import CharttimeLine2 from 'src/components/Charttime//CharttimeLine2';
import CharttimeLine3 from 'src/components/Charttime//CharttimeLine3';
import CharttimeLine4 from 'src/components/Charttime//CharttimeLine4';
import CharttimeListToolbar1 from 'src/components/Charttime//CharttimeListToolbar1';
import CharttimeListToolbar2 from 'src/components/Charttime//CharttimeListToolbar2';
import CharttimeListToolbar3 from 'src/components/Charttime//CharttimeListToolbar3';
import CharttimeListToolbar4 from 'src/components/Charttime//CharttimeListToolbar4';
import { useState } from 'react';

const CharttimeList = () => {
	const [data, setdata] = useState();
	const [dat, setdat] = useState();
	const [data4, setdata4] = useState();

	return (
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
						</Grid>
						<Grid
							item
							lg={12}
							md={12}
							xl={9}
							xs={12}
						>
							<CharttimeListToolbar2 data={data} setdata={setdata} />
							<CharttimeLine2 data={data} />
						</Grid>
						<Grid
							item
							lg={12}
							md={12}
							xl={9}
							xs={12}
						>
							<CharttimeListToolbar3 dat={dat} setdat={setdat} />
							<CharttimeLine3 dat={dat} />
						</Grid>
						<Grid
							item
							lg={12}
							md={12}
							xl={9}
							xs={12}
						>
							<CharttimeListToolbar4 data4={data4} setdata4={setdata4} />
							<CharttimeLine4 data4={data4} />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default CharttimeList;
