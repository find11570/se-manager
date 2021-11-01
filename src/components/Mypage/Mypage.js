import { Helmet } from 'react-helmet';
import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Avatar,
	Hidden,
} from '@material-ui/core';
import MypageTabs from 'src/components/Mypage/MypageTabs';

const data = JSON.parse(sessionStorage.getItem('user_data'));
const Mypage = () => {
	const [chartData] = useState({
		id: data.user_id,
		name: data.user_name,
		number: data.user_school_num,
		github: data.user_github,
		blog: data.user_blog,
		content: data.user_introduction,
		position: data.user_position
	});

	return (
		<>
			<Helmet>
				<title>Mypage</title>
			</Helmet>
			<Box
				sx={{
					minHeight: '100%',
					py: 3
				}}
			>
				<Grid item lg={10} md={10} sm={12} xs={12}>
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
								backgroundColor: '#81C147'
							}}
						>
							<Box
								sx={{
									minHeight: '100%',
									py: 3,
									display: 'inline-block'
								}}
							>
								<Hidden lgDown>
									<Box
										sx={{
											marginLeft: 5
										}}
									>
										<Avatar
											sx={{
												cursor: 'pointer',
												width: 80,
												height: 80,
												marginTop: 1.5,
												marginBottom: 1.5
											}}
										/>
										<h3 style={{ marginLeft: 20, color: '#ffffff' }}>
											{chartData.name}
										</h3>
									</Box>
								</Hidden>
								<Hidden lgUp>
									<Box
										sx={{
											marginLeft: 1
										}}
									>
										<h2
											style={{
												marginRight: 15,
												color: '#ffffff',
												display: 'inline-block'
											}}
										>
											{chartData.name}
										</h2>
									</Box>
								</Hidden>
							</Box>
							<Hidden lgDown>
								<Box
									sx={{
										display: 'inline-block',
										marginLeft: 5
									}}
								>
									<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
										학번:&nbsp;{chartData.number}
									</h3>
									<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
										포지션:&nbsp;{chartData.position}
									</h3>
								</Box>
								<Box
									sx={{
										display: 'inline-block',
										marginLeft: 5
									}}
								>
									<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
										Github:&nbsp;{chartData.github}
									</h3>
									<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
										Blog:&nbsp;{chartData.blog}
									</h3>
									<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
										자기소개:&nbsp;{chartData.content}
									</h3>
								</Box>
							</Hidden>
							<Hidden lgUp>
								<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
									학번:&nbsp;{chartData.number}
								</h3>
								<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
									포지션:&nbsp;{chartData.position}
								</h3>
								<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
									Github:&nbsp;{chartData.github}
								</h3>
								<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
									Blog:&nbsp;{chartData.blog}
								</h3>
								<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
									자기소개:&nbsp;{chartData.content}
								</h3>
							</Hidden>
						</CardContent>
						<CardContent
							sx={{
								backgroundColor: '#ffffff'
							}}
						>
							<MypageTabs />
							<Box
								sx={{
									minHeight: '100%',
									py: 3
								}}
							/>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default Mypage;
