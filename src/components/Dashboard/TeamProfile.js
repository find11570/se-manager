import {
	Box,
	Card,
	CardContent,
	Avatar,
	Grid,
	Hidden
} from '@material-ui/core';
import { useState } from 'react';

const TeamProfile = (props) => {
	const {
		members
	} = props;

	return (
		<Grid
			container
		>
			{
				members.map(row => (
					<Grid
						key={row.user_id}
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
											width: 100,
											height: 100,
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
										height: 140,
										maxwidth: 300,
										position: 'relative',
									}}
								>
									<Box
										sx={{
											marginTop: 1,
										}}
									>
										<h5 style={{ color: '#006400' }}>
											{row.user_name}
										</h5>
									</Box>
									<Box>
										<h5 style={{ color: '#006400' }}>
											포지션: {row.user_position}
										</h5>
									</Box>
									<Box>
										<h5 style={{ color: '#006400' }}>
											이메일: {row.user_email}
										</h5>
									</Box>
									<Box>
										<h5 style={{ color: '#006400' }}>
											블로그: {row.user_blog}
										</h5>
									</Box>
									<Box>
										<h5 style={{ color: '#006400' }}>
											깃허브: {row.user_github}
										</h5>
									</Box>
									<Box>
										<h5 style={{ color: '#006400' }}>
											소개: {row.user_introduction}
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
				))
			}
		</Grid>
	);
};

export default TeamProfile;
