import {
	Box,
	Card,
	CardContent,
	Avatar,
	Grid,
	Hidden
} from '@material-ui/core';
import { useState } from 'react';

const TeamProfile = () => {
	const [chartData] = useState(
		{
			id: '1',
			name: '김현수',
			email: 'khs@email.com',
			blog: 'www.blog.com',
			git: 'www.github.com'
		}
	);

	return (
		<Grid
			container
		>
			<Grid
				item
				lg={6}
				md={6}
				sm={12}
				xs={12}
			>
				<Card
					sx={{
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10,
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						boxShadow: 5,
						marginRight: 1,
						marginTop: 1,
						marginLeft: 1,
						marginBottom: 1
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
									marginTop: 1,
									marginBottom: 1,
									marginRight: 2,
									marginLeft: 1,
								}}
							/>
						</Hidden>
						<Box
							sx={{
								height: 100,
								position: 'relative',
							}}
						>
							<Box
								sx={{
									marginTop: 1,
								}}
							>
								<h5 style={{ color: '#006400' }}>
									{chartData.name}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.email}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.blog}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.git}
								</h5>
							</Box>
							<Box
								sx={{
									py: 0.5,
								}}
							/>
							<Box />
						</Box>
					</CardContent>
				</Card>
			</Grid>
			<Grid
				item
				lg={6}
				md={6}
				sm={12}
				xs={12}
			>
				<Card
					sx={{
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10,
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						boxShadow: 5,
						marginRight: 1,
						marginTop: 1,
						marginLeft: 1,
						marginBottom: 1
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
									marginTop: 1,
									marginBottom: 1,
									marginRight: 2,
									marginLeft: 1,
								}}
							/>
						</Hidden>
						<Box
							sx={{
								height: 100,
								position: 'relative',
							}}
						>
							<Box
								sx={{
									marginTop: 1,
								}}
							>
								<h5 style={{ color: '#006400' }}>
									{chartData.name}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.email}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.blog}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.git}
								</h5>
							</Box>
							<Box
								sx={{
									py: 0.5,
								}}
							/>
							<Box />
						</Box>
					</CardContent>
				</Card>
			</Grid>
			<Grid
				item
				lg={6}
				md={6}
				sm={12}
				xs={12}
			>
				<Card
					sx={{
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10,
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						boxShadow: 5,
						marginRight: 1,
						marginTop: 1,
						marginLeft: 1,
						marginBottom: 1
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
									marginTop: 1,
									marginBottom: 1,
									marginRight: 2,
									marginLeft: 1,
								}}
							/>
						</Hidden>
						<Box
							sx={{
								height: 100,
								position: 'relative',
							}}
						>
							<Box
								sx={{
									marginTop: 1,
								}}
							>
								<h5 style={{ color: '#006400' }}>
									{chartData.name}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.email}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.blog}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.git}
								</h5>
							</Box>
							<Box
								sx={{
									py: 0.5,
								}}
							/>
							<Box />
						</Box>
					</CardContent>
				</Card>
			</Grid>
			<Grid
				item
				lg={6}
				md={6}
				sm={12}
				xs={12}
			>
				<Card
					sx={{
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10,
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						boxShadow: 5,
						marginRight: 1,
						marginTop: 1,
						marginLeft: 1,
						marginBottom: 1
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
									marginTop: 1,
									marginBottom: 1,
									marginRight: 2,
									marginLeft: 1,
								}}
							/>
						</Hidden>
						<Box
							sx={{
								height: 100,
								position: 'relative',
							}}
						>
							<Box
								sx={{
									marginTop: 1,
								}}
							>
								<h5 style={{ color: '#006400' }}>
									{chartData.name}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.email}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.blog}
								</h5>
							</Box>
							<Box>
								<h5 style={{ color: '#006400' }}>
									{chartData.git}
								</h5>
							</Box>
							<Box
								sx={{
									py: 0.5,
								}}
							/>
							<Box />
						</Box>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default TeamProfile;
