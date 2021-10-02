import {
	Box,
	Card,
	CardContent,
	Hidden,
	Avatar
} from '@material-ui/core';
import { useState } from 'react';

const TeamRead = () => {
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
		<Box sx={{
			backgroundColor: 'primary.smoothgreen',
			display: 'inline-block',
			textAlign: 'center',
			marginRight: 2,
			borderBottomRightRadius: 5,
			borderBottomLeftRadius: 5,
			borderTopRightRadius: 5,
			borderTopLeftRadius: 5,
			borderColor: 'primary.main',
			boxShadow: 1
		}}
		>
			{t}
		</Box>
	));

	return (
		<Card
			sx={{
				borderBottomRightRadius: 10,
				borderBottomLeftRadius: 10,
				borderTopRightRadius: 10,
				borderTopLeftRadius: 10,
				boxShadow: 5
			}}
		>
			<CardContent>
				<Hidden lgDown>
					<Avatar
						sx={{
							cursor: 'pointer',
							width: 60,
							height: 60,
							float: 'left',
							marginTop: 4,
							marginRight: 2,
						}}
					/>
				</Hidden>
				<Box
					sx={{
						height: 145,
						position: 'relative',
					}}
				>
					<Hidden lgDown>
						<h3 style={{ color: 'red' }}>
							D-
							{chartData.date}
						</h3>
					</Hidden>
					<Box
						sx={{
							marginTop: 2,
							marginBottom: 4
						}}
					>
						<h3 style={{ color: '#006400' }}>
							{chartData.title}
						</h3>
					</Box>
					<Hidden lgDown>
						<Box
							sx={{
								marginTop: 1
							}}
						>
							<h4 style={{ color: '#006400' }}>
								&nbsp;
								{chartData.name}
							</h4>
						</Box>
					</Hidden>
					<Hidden lgUp>
						<h4 style={{ color: '#006400' }}>
							#&nbsp;
							{List}
						</h4>
					</Hidden>
					<Hidden lgDown>
						<Box
							sx={{
								marginLeft: 10
							}}
						>
							<h4>
								#&nbsp;
								{List}
							</h4>
						</Box>
					</Hidden>
					<Box
						sx={{
							py: 0.5,
						}}
					/>
					<Box>
						<h3 style={{
							color: 'red',
							display: 'inline-block',
							float: 'right'
						}}
						>
							{chartData.currentpeople}
							/
							{chartData.Maxpeople}
						</h3>
					</Box>
					<Box
						sx={{
							py: 0.5,
						}}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};

export default TeamRead;
