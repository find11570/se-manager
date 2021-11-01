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
import Modal2 from 'src/components/modal/Modal2';

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
									<Avatar
										sx={{
											cursor: 'pointer',
											width: 80,
											height: 80,
											marginTop: 1.5,
											marginBottom: 1.5
										}}
									/>
									<h3 style={{ marginLeft: 10, color: '#ffffff' }}>
										{chartData.name}
									</h3>
								</Hidden>
								<Hidden lgUp>
									<Box
										sx={{
											marginLeft: 3
										}}
									>
										<h3
											style={{
												marginRight: 15,
												color: '#ffffff',
												display: 'inline-block'
											}}
										>
											{chartData.name}
										</h3>
									</Box>
								</Hidden>
							</Box>
							<Box
								sx={{
									display: 'inline-block',
									marginLeft: 2
								}}
							>
								<h4 style={{ marginLeft: 10, color: '#ffffff' }}>
									{chartData.number}
								</h4>
								<h4 style={{ marginLeft: 10, color: '#ffffff' }}>
									{chartData.position}
								</h4>
								<h4 style={{ marginLeft: 10, color: '#ffffff' }}>
									{chartData.github}
								</h4>
								<h4 style={{ marginLeft: 10, color: '#ffffff' }}>
									{chartData.blog}
								</h4>
							</Box>
							<Box
								sx={{
									display: 'inline-block',
									marginLeft: 2
								}}
							>
								<h4 style={{ marginLeft: 10, color: '#ffffff' }}>
									{chartData.content}
								</h4>
							</Box>
							<Box
								sx={{
									display: 'inline-block',
									float: 'right'
								}}
							>
								<Hidden lgDown>
									<Modal2 />
								</Hidden>
							</Box>
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
