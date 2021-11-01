import { Helmet } from 'react-helmet';
import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	TextField,
	InputAdornment,
	SvgIcon,
	Button,
	Hidden
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Password = () => {
	const [postBody, setPostBody] = useState({
		id: '',
		pw: '',
		checkpw: '',
	});
	const handleidChange = (event) => {
		setPostBody({
			id: event.currentTarget.value,
		});
	};
	const handlepwChange = (event) => {
		setPostBody({
			pw: event.currentTarget.value,
		});
	};
	const handlecheckpwChange = (event) => {
		setPostBody({
			checkpw: event.currentTarget.value,
		});
	};
	return (
		<>
			<Helmet>
				<title>Password</title>
			</Helmet>
			<Box>
				{postBody.id}
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
								비밀번호 찾기
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
								<h3>이메일</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<Hidden lgDown>
									<TextField
										halfwidth="true"
										sx={{
											flex: '1',
											flexDirection: 'row',
											boxShadow: 5,
											borderBottomRightRadius: 5,
											borderBottomLeftRadius: 5,
											borderTopRightRadius: 5,
											borderTopLeftRadius: 5,
											marginRight: 3,
											backgroundColor: 'primary.smoothgreen',
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SvgIcon
														fontSize="small"
														color="action"
													/>
												</InputAdornment>
											)
										}}
										placeholder="email@email.com"
										variant="outlined"
										onChange={handleidChange}
									/>
									<Button
										variant="contained"
										size="large"
										color="success"
										sx={{
											width: 240,
											marginTop: 0.5
										}}
									>
										<h3 style={{
											color: '#ffffff',
										}}
										>
											인증번호 전송
										</h3>
									</Button>
								</Hidden>
								<Hidden lgUp>
									<TextField
										halfwidth="true"
										sx={{
											flex: '1',
											flexDirection: 'row',
											boxShadow: 5,
											borderBottomRightRadius: 5,
											borderBottomLeftRadius: 5,
											borderTopRightRadius: 5,
											borderTopLeftRadius: 5,
											backgroundColor: 'primary.smoothgreen',
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SvgIcon
														fontSize="small"
														color="action"
													/>
												</InputAdornment>
											)
										}}
										placeholder="email@email.com"
										variant="outlined"
										onChange={handleidChange}
									/>
									<Box
										sx={{
											minHeight: '100%',
											py: 0.5,
										}}
									/>
									<Button
										variant="contained"
										size="large"
										color="success"
										sx={{
											width: 240,
											marginTop: 0.5
										}}
									>
										<h3 style={{
											color: '#ffffff',
										}}
										>
											인증번호 전송
										</h3>
									</Button>
								</Hidden>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>변경할 비밀번호</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<TextField
									fullWidth
									sx={{
										flex: '1',
										flexDirection: 'row',
										boxShadow: 5,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderTopRightRadius: 5,
										borderTopLeftRadius: 5,
										backgroundColor: 'primary.smoothgreen',
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon
													fontSize="small"
													color="action"
												/>
											</InputAdornment>
										)
									}}
									placeholder="영어 대/소문자,특수문자"
									variant="outlined"
									onChange={handlepwChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>변경할 비밀번호 확인</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<TextField
									fullWidth
									sx={{
										flex: '1',
										flexDirection: 'row',
										boxShadow: 5,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderTopRightRadius: 5,
										borderTopLeftRadius: 5,
										backgroundColor: 'primary.smoothgreen',
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon
													fontSize="small"
													color="action"
												/>
											</InputAdornment>
										)
									}}
									placeholder="영어 대/소문자,특수문자"
									variant="outlined"
									onChange={handlecheckpwChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<Link to="/app/dashboard">
									<Button
										variant="contained"
										size="medium"
										color="success"
										sx={{
											marginTop: 0.5,
											marginRight: 3,
											float: 'right'
										}}
									>
										<h3 style={{
											color: '#ffffff',
										}}
										>
											변경
										</h3>
									</Button>
								</Link>
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

export default Password;
