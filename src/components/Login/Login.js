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
	Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Api from '../../Api/Api';

const Login = () => {
	const [postBody, setPostBody] = useState({
		id: '',
		pw: ''
	});

	const handleidChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			id: event.target.value
		}));
	};
	const handlepwChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			pw: event.target.value
		}));
	};
	const handleLogin = async () => {
		const isEmpty = emptyCheck();
		if (isEmpty === false) {
			alert('아이디, 비밀번호를 입력하세요');
			return false;
		}
		let response = await Api.postLogin(postBody.id, postBody.pw);
		if (response.sucess === true) {
			alert('로그인 성공');
			const target = '/app/dashboard';
			sessionStorage.setItem('user_data', JSON.stringify(response.user));
			sessionStorage.setItem('user_token', response.token);
			window.location.href = target;
		} else {
			alert('로그인 실패');
		}
	};
	const emptyCheck = () => {
		if (postBody.id === '' || postBody.pw === '') {
			return false;
		}
	};
	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>
			<Box>
				<Box
					sx={{
						minHeight: '100%',
						py: 3
					}}
				/>
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
						<CardContent>
							<h2 style={{ color: '#006400' }}>로그인</h2>
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
										py: 1.5
									}}
								/>
								<h3>아이디</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<TextField
									id="id_field"
									fullWidth
									sx={{
										flex: '1',
										flexDirection: 'row',
										boxShadow: 5,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderTopRightRadius: 5,
										borderTopLeftRadius: 5,
										backgroundColor: 'primary.smoothgreen'
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon fontSize="small" color="action" />
											</InputAdornment>
										)
									}}
									// 새로 추가한 부분 - > defaultValue
									defaultValue={postBody.id}
									placeholder="아이디 입력"
									variant="outlined"
									onChange={handleidChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>비밀번호</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<TextField
									id="pw_field"
									fullWidth
									sx={{
										flex: '1',
										flexDirection: 'row',
										boxShadow: 5,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderTopRightRadius: 5,
										borderTopLeftRadius: 5,
										backgroundColor: 'primary.smoothgreen'
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon fontSize="small" color="action" />
											</InputAdornment>
										)
									}}
									// 새로 추가한 부분 - > defaultValue
									defaultValue={postBody.pw}
									type="password"
									placeholder="비밀번호 입력"
									variant="outlined"
									onChange={handlepwChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<Link to="/login/password">
									<Button
										variant="contained"
										size="medium"
										color="success"
										sx={{
											marginTop: 1
										}}
									>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											비밀번호 찾기
										</h3>
									</Button>
								</Link>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<Link to="/sign/up">
									<Button
										variant="contained"
										size="medium"
										color="success"
										sx={{
											float: 'right'
										}}
									>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											회원가입
										</h3>
									</Button>
								</Link>
								<Button
									variant="contained"
									size="medium"
									color="success"
									sx={{
										float: 'left'
									}}
									// 새로 추가한 부분
									onClick={handleLogin}
								>
									<h3
										style={{
											color: '#ffffff'
										}}
									>
										로그인
									</h3>
								</Button>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
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

export default Login;
