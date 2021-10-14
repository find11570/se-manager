import { Helmet } from 'react-helmet';
import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Avatar,
	Hidden,
	Button
} from '@material-ui/core';
import MypageTabs from 'src/components/Mypage/MypageTabs';
import { Link } from 'react-router-dom';
import Modal2 from 'src/components/modal/Modal2';

const Mypage = () => {
	const [chartData] = useState({
		id: '1',
		name: '진채연',
		number: '20191141',
		github: 'www.jinchaeyeon.com',
		blog: 'www.jinchaeyeon.com',
		content: '하하하하하하ㅏㅎ 개좋열먼ㅇ래ㅑㅓ매ㅑㅈ두랴ㅐ무ㅑㄷ주뭊랴ㅐ무르ㅐ',
	});

	return (
		<>
			<Helmet>
				<title>Mypage</title>
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
										<h3 style={{ marginRight: 15, color: '#ffffff', display: 'inline-block' }}>
											{chartData.name}
										</h3>
										<Link to="/chat/chat">
											<Button
												variant="contained"
												size="small"
												sx={{
													float: 'right',
												}}
											>
												<h3 style={{
													color: '#006400',
												}}
												>
													채팅하기
												</h3>
											</Button>
										</Link>
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
								backgroundColor: '#ffffff',
							}}
						>
							<MypageTabs />
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

export default Mypage;
