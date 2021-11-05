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
import axios from 'axios';

const api = 'https://se-disk.herokuapp.com/api';
var emailCode = null;

const Password = () => {
	const [postBody, setPostBody] = useState({
		email: '',
		checkemail: '',
		pw: '',
		checkpw: ''
	});
	const handleEmailChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			email: event.target.value
		}));
	};
	const handlecheckemailChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			checkemail: event.target.value
		}));
	};
	const handlepwChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			pw: event.target.value
		}));
	};
	const handlecheckpwChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			checkpw: event.target.value
		}));
	};
	// 이메일 인증 버튼 onClick함수
	const emailAuth = async () => {
		const email = postBody.email;
		const url = '/auth/email';
		console.log(api + url);
		const post = await axios.get(api + url, { params: { email: email } });
		if (post.data.emailId) {
			emailCode = post.data.emailId;
			alert('이메일이 전송되었습니다');
		} else {
			alert('이메일 전송에 실패했습니다');
		}
	};
	// 이메일 인증 확인
	const checkEmailAuth = async () => {
		var check = { auth: false, msg: '', err: '' };
		if (postBody.checkemail) {
			if (emailCode !== null) {
				const url = '/auth/email';
				const post = await axios.post(api + url, {
					emailId: emailCode,
					authStr: postBody.checkemail
				});
				check.auth = post.data.isAuth;
				if (check.auth === true) {
					check.msg = '인증되었습니다';
					alert(check.msg);
				} else {
					check.err = '인증에 실패하였습니다';
				}
				return check;
			} else {
				check.err = '인증번호 전송 후 진행해주세요';
				return check;
			}
		} else {
			check.err = '이메일 인증번호를 입력해주세요';
			return check;
		}
	};
	// 변경한 비밀번호 확인
	const checkPw = () => {
		return postBody.pw === postBody.checkpw;
	};
	const emptyCheck = () => {
		if (postBody.email === '' || postBody.pw === '') {
			return false;
		}
	};

	const logout = () => {
		if (sessionStorage.getItem('user_token')) {
		const url = '/auth/logout';
		const target = '/app/dashboard';
		const token = sessionStorage.getItem('user_token');
		axios
			.get(api + url, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				console.log(response);
				sessionStorage.clear();
				window.location.href = target;
			})
			.catch((err) => console.log(err));
		} else{
			const target = '/app/dashboard';
			window.location.href = target;
		}
	};

	const updatePassword = async () => {
		const isEmpty = emptyCheck();
		const isEmailAuth = await checkEmailAuth();
		const isDuplicatePw = checkPw();
		const target = '/app/dashboard';
		if (isEmpty === false) {
			alert('필수항목란을 채워주세요(이메일, 비밀번호)');
			return false;
		}
		if (isEmailAuth.auth === false) {
			alert(isEmailAuth.err);
			return false;
		}
		if (isDuplicatePw === false) {
			alert('비밀번호가 일치하지 않습니다');
			return false;
		}
		const url = '/auth/password';
		const token = sessionStorage.getItem('user_token');
		const post = await axios.post(
			api + url,
			{ changePassword: postBody.pw },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		console.log(post.data);
		console.log(post.status);
		if (post.data.sucess === true) {
			{logout()}
			alert('비밀번호가 변경되었습니다');
			window.location.href = target;
		} else {
			alert('비밀번호 변경 실패');
		}
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
							<h2 style={{ color: '#006400' }}>비밀번호 찾기</h2>
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
										py: 2
									}}
								/>
								<h3>이메일</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
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
											backgroundColor: 'primary.smoothgreen'
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SvgIcon fontSize="small" color="action" />
												</InputAdornment>
											)
										}}
										placeholder="email@email.com"
										variant="outlined"
										onChange={handleEmailChange}
									/>
									<Button
										variant="contained"
										size="large"
										color="success"
										sx={{
											width: 240,
											marginTop: 0.5
										}}
										onClick={emailAuth}
									>
										<h3
											style={{
												color: '#ffffff'
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
											backgroundColor: 'primary.smoothgreen'
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SvgIcon fontSize="small" color="action" />
												</InputAdornment>
											)
										}}
										placeholder="email@email.com"
										variant="outlined"
										onChange={handleEmailChange}
									/>
									<Box
										sx={{
											minHeight: '100%',
											py: 0.5
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
										onClick={emailAuth}
									>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											인증번호 전송
										</h3>
									</Button>
								</Hidden>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<Hidden lgDown>
									<TextField
										id="email"
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
											backgroundColor: 'primary.smoothgreen'
										}}
										placeholder="인증번호 입력"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SvgIcon fontSize="small" color="action" />
												</InputAdornment>
											)
										}}
										variant="outlined"
										onChange={handlecheckemailChange}
									/>
									<Button
										variant="contained"
										size="large"
										color="success"
										sx={{
											width: 240,
											marginTop: 0.5
										}}
										onClick={checkEmailAuth}
									>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											인증번호 확인
										</h3>
									</Button>
								</Hidden>
								<Hidden lgUp>
									<TextField
										id="email"
										halfwidth="true"
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
										placeholder="인증번호 입력"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SvgIcon fontSize="small" color="action" />
												</InputAdornment>
											)
										}}
										variant="outlined"
										onChange={handlecheckemailChange}
									/>
									<Box
										sx={{
											minHeight: '100%',
											py: 0.5
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
										// 수정
										onClick={checkEmailAuth}
									>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											인증번호 확인
										</h3>
									</Button>
								</Hidden>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>변경할 비밀번호</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
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
										backgroundColor: 'primary.smoothgreen'
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon fontSize="small" color="action" />
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
										py: 2
									}}
								/>
								<h3>변경할 비밀번호 확인</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
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
										backgroundColor: 'primary.smoothgreen'
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SvgIcon fontSize="small" color="action" />
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
										py: 2
									}}
								/>
								<Button
									variant="contained"
									size="medium"
									color="success"
									sx={{
										marginTop: 0.5,
										marginRight: 3,
										float: 'right'
									}}
									onClick={updatePassword}
								>
									<h3
										style={{
											color: '#ffffff'
										}}
									>
										변경
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

export default Password;
