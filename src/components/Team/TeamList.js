import { Helmet } from 'react-helmet';
import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Hidden,
} from '@material-ui/core';
import OKTable from 'src/components/Team/OKTable';
import WaitTable from 'src/components/Team/WaitTable';

const TeamSpecific = () => {
	const [chartData] = useState({
		id: '1',
		title: '창의 융합 종합 설계 1 프로젝트 인원 모집',
	});

	return (
		<>
			<Helmet>
				<title>teamList</title>
			</Helmet>
			<Box
				sx={{
					minHeight: '100%',
					py: 3,
				}}
			>
				<Grid
					item
					lg={10}
					md={10}
					sm={12}
					xs={12}
				>
					<Card
						sx={{
							borderBottomRightRadius: 10,
							borderBottomLeftRadius: 10,
							borderTopRightRadius: 10,
							borderTopLeftRadius: 10,
							boxShadow: 5
						}}
					>
						<CardContent
							sx={{
								backgroundColor: '#81C147',
							}}
						>
							<Box
								sx={{
									minHeight: '100%',
									py: 7,
								}}
							>
								<Hidden lgDown>
									<h1 style={{ color: '#ffffff', marginLeft: 25 }}>
										{chartData.title}
									</h1>
								</Hidden>
								<Hidden lgUp>
									<h3 style={{ color: '#ffffff', marginLeft: 20 }}>
										{chartData.title}
									</h3>
								</Hidden>
							</Box>
						</CardContent>
						<CardContent
							sx={{
								backgroundColor: '#ffffff',
							}}
						>
							<OKTable />
							<WaitTable />
							<Box
								sx={{
									minHeight: '100%',
									py: 3,
								}}
							/>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default TeamSpecific;
