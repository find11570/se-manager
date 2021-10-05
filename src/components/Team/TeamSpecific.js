import { Helmet } from 'react-helmet';
import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Hidden,
	Avatar,
	Button
} from '@material-ui/core';

const TeamSpecific = () => {
	const [chartData] = useState({
		id: '1',
		name: '진채연',
		date: '5',
		title: '창의 융합 종합 설계 1 프로젝트 인원 모집',
		tag: ['hi', 'my', 'name', 'is', 'door'],
		Maxpeople: '4',
		currentpeople: '2'
	});

	const List = chartData.tag.map((t) => (
		<Box
			key={t}
			value={t}
			sx={{
				backgroundColor: 'primary.smoothgreen',
				display: 'inline-block',
				textAlign: 'center',
				marginRight: 2,
				borderBottomRightRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 5,
				borderTopLeftRadius: 5,
				borderColor: 'primary.main',
				paddingLeft: 2,
				paddingRight: 2,
				boxShadow: 1
			}}
		>
			{t}
		</Box>
	));

	return (
		<>
			<Helmet>
				<title>teamSpecific</title>
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
								<h2 style={{
									color: 'red',
									float: 'right',
									marginRight: 2
								}}
								>
									마감까지 D-
									{chartData.date}
								</h2>
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
								<h3 style={{ marginTop: 20 }}>
									<Hidden lgUp>
										<h4 style={{ color: '#006400' }}>
											#&nbsp;
											{List}
										</h4>
									</Hidden>
									<Hidden lgDown>
										<Box
											sx={{
												marginLeft: 2,
											}}
										>
											<h4 style={{ color: '#006400' }}>
												#&nbsp;
												{List}
											</h4>
										</Box>
									</Hidden>
								</h3>
								<Box>
									<Button
										variant="contained"
										size="small"
										sx={{
											float: 'right',
											marginRight: 2,
											marginTop: 0.5,
											marginLeft: 2
										}}
									>
										<h3 style={{
											color: '#006400',
										}}
										>
											채팅하기
										</h3>
									</Button>
									<h2 style={{
										color: '#ffffff',
										float: 'right',
										marginTop: 3
									}}
									>
										{chartData.name}
									</h2>
									<Avatar
										sx={{
											cursor: 'pointer',
											width: 40,
											height: 40,
											float: 'right',
											marginRight: 2
										}}
									/>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default TeamSpecific;
