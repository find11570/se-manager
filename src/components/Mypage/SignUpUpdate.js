import { Helmet } from 'react-helmet';
import { useState, React } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
} from '@material-ui/core';

const SignUpUpdate = () => {
	const [postBody] = useState({
		id: '1',
		email: 'jinchaeyeon@naver.com',
		name: '진채연',
		number: '20191141',
		type: '학생',
	});
	return (
		<>
			<Helmet>
				<title>Mypage</title>
			</Helmet>
			<Box>
				<Box
					sx={{
						minHeight: '100%',
						py: 3,
					}}
				/>
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
						<CardContent>
							<h2 style={{ color: '#006400' }}>
								회원 정보 수정
							</h2>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
									borderBottom: '1px solid grey'
								}}
							/>
							<Box
								sx={{
									backgroundColor: '#ffffff',
									paddingLeft: 0.5
								}}
							>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>아이디</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<h4>{postBody.email}</h4>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>회원타입</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<h4>{postBody.type}</h4>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>학번</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<h4>{postBody.number}</h4>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>이름</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<h4>{postBody.name}</h4>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default SignUpUpdate;
