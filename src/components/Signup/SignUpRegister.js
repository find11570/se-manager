import { Helmet } from 'react-helmet';
import { useState, React } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	TextField,
	InputAdornment,
	SvgIcon,
	Button,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	Checkbox,
	Hidden,
	Avatar
} from '@material-ui/core';
import axios from 'axios';

const api = 'https://se-disk.herokuapp.com/api';
var emailCode = null;
const SignUpRegister = () => {
	const [postBody, setPostBody] = useState({
		id: '',
		pw: '',
		checkpw: '',
		name: '',
		number: '',
		checkemail: '',
		email: '',
		type: 'STUDENT',
		checked: false,
		github: '',
		blog: '',
		content: '',
		position: ''
	});
	const handlecheckChange = (event) => {
		setPostBody({ ...postBody, [event.target.name]: event.target.checked });
	};
	const handleChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			type: event.currentTarget.value
		}));
	};
	const handleIdChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			id: event.target.value
		}));
	};
	const handlenumberChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			number: event.target.value
		}));
	};
	const handlecheckemailChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			checkemail: event.target.value
		}));
	};
	const handleEmailChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			email: event.target.value
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
	const handlenameChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			name: event.target.value
		}));
	};
	const handlecontentChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			content: event.target.value
		}));
	};
	const handlegithubChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			github: event.target.value
		}));
	};
	const handleblogChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			blog: event.target.value
		}));
	};
	const handlepositionChange = (event) => {
		setPostBody((prev) => ({
			...prev,
			position: event.target.value
		}));
	};
	// 이메일 인증 버튼 onClick함수
	const emailAuth = () => {
		const email = postBody.email;
		const url = '/auth/email';
		console.log(api + url);
		axios.get(api + url, { params: { email: email } })
			.then((response) => {
				emailCode = response.data.emailId;
				alert('이메일이 전송되었습니다');
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// 이메일 인증 확인
	const checkEmailAuth = () => {
		const url = '/auth/email';
		var check = false;
		axios
			.post(api + url, {
				emailId: emailCode,
				authStr: postBody.checkemail
			})
			.then((response) => {
				check = response.data.isAuth;
				if (check === true) {
					alert('인증되었습니다');
				} else {
					alert('인증에 실패하였습니다');
				}
				return check;
			})
			.catch((err) => console.log(err));
	};
	const input_thumbnail = () => {
		const input_image = document.getElementById('file');
		if (input_image.files) {
			const image_container = document.createElement('div');
			const image = document.createElement('img');
			image.style.width = '100px';
			image.style.height = '100px';
			image.style.borderRadius = '50%';
			const image_list = input_image.files;
			const reader = new FileReader();
			reader.readAsDataURL(image_list[0]);

			reader.onload = function () {
				image.src = reader.result;
				image.id = 'thumbnail_image';
			};
			image_container.id = 'thumbnail_image_container';
			image_container.appendChild(image);
			const thumbnail = document.getElementById('thumbnail');
			thumbnail.appendChild(image_container);
		}
	};
	const delete_thumbnail = () => {
		const image_container_id = document.getElementById(
			'thumbnail_image_container'
		);
		thumbnail.removeChild(image_container_id);
	};
	const join = () => {
		console.log(postBody);
		if (postBody.checked === false) {
			alert('약관동의에 체크해주세요');
			return false;
		}
		if (checkPw() === false) {
			alert('비밀번호가 일치하지 않습니다');
			return false;
		}
		if (emptyCheck() === false) {
			alert('필수항목란을 채워주세요(학번, 이메일, 아이디, 비밀번호, 이름)');
			return false;
		}
		if (checkEmailAuth() === false) {
			alert('이메일 인증번호가 맞지 않습니다');
			return false;
		}
		if (checkId() === true) {
			alert('중복된 아이디 입니다');
			return false;
		}
		console.log('조인 끝');
		const url = '/user';
		console.log(api + url);
		axios
			.post(api + url, {
				user_login_id: postBody.id,
				user_email: postBody.email,
				user_password: postBody.pw,
				user_type: postBody.type,
				user_name: postBody.name,
				user_image: 'hello',
				user_introduction: postBody.content,
				user_github: postBody.github,
				user_blog: postBody.blog,
				user_position: postBody.position,
				user_school_num: postBody.number

			})
			.then((response) => window.location.href = '/login/login')
			.catch((err) => console.log(err));
	};
	const checkPw = function () {
		return postBody.pw === postBody.checkpw;
	};
	const checkId = () => {
		const id = postBody.id;
		const url = '/auth/doubleId';
		const check = false;
		axios
			.get(api + url, { params: { loginId: id } })
			.then((response) => {
				check = response.data.isDouble;
				console.log(check);
				return check;
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const emptyCheck = () => {
		if (
			postBody.number === '' || postBody.email === '' || postBody.id === '' || postBody.pw === '' || postBody.name === ''
		) {
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
							<h2 style={{ color: '#006400' }}>회원가입</h2>
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
								<h3>회원 타입</h3>
								<FormControl component="fieldset">
									<RadioGroup
										id="type"
										aria-label="회원 타입"
										name="회원 타입"
										value={postBody.type ? postBody.type : ''}
										defaultValue={postBody.type}
										onChange={handleChange}
									>
										<FormControlLabel
											value="STUDENT"
											control={<Radio color="default" />}
											label="학생"
										/>
										<FormControlLabel
											value="PROFESSOR"
											control={<Radio color="default" />}
											label="교수"
										/>
									</RadioGroup>
								</FormControl>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<TextField
									//수정
									id="code"
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
									placeholder="학번/교수코드"
									variant="outlined"
									defaultValue={postBody.number}
									onChange={handlenumberChange}
								/>
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
										// 수정
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
										py: 2
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
									placeholder="아이디 입력"
									variant="outlined"
									onChange={handleIdChange}
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
									id="pw"
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
									type="password"
									placeholder="영어 대/소문자, 특수문자"
									variant="outlined"
									onChange={handlepwChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>비밀번호 확인</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
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
									type="password"
									placeholder="영어 대/소문자, 특수문자"
									variant="outlined"
									onChange={handlecheckpwChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>

								<Avatar
									sx={{
										cursor: 'pointer',
										width: 60,
										height: 60,
										float: 'left',
										marginTop: 4,
										marginRight: 2
									}}
								/>
								<Button
									variant="contained"
									size="medium"
									color="success"
									sx={{
										marginTop: 2,
										width: 180
									}}
								>
									<label
										htmlFor="file"
										style={{
											width: 100
										}}
									>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											사진선택
										</h3>
									</label>
									<input
										type="file"
										id="file"
										accept="image/*"
										style={{
											color: '#ffffff',
											display: 'none'
										}}
										onChange={input_thumbnail}
									/>
								</Button>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<Button
									variant="contained"
									size="medium"
									color="success"
									sx={{
										marginTop: 2,
										width: 180
									}}
									onClick={delete_thumbnail}
								>
									<h3
										style={{
											color: '#ffffff'
										}}
									>
										기본 이미지로 변경
									</h3>
								</Button>
								<Box id="thumbnail" />
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>이름</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<TextField
									id="name"
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
									placeholder="이름을 입력하세요"
									variant="outlined"
									onChange={handlenameChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>github주소</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<TextField
									id="github"
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
									placeholder="www.github.com"
									variant="outlined"
									onChange={handlegithubChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>blog주소</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<TextField
									id="blog"
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
									placeholder="www.blog.com"
									variant="outlined"
									onChange={handleblogChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>포지션</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<TextField
									id="position"
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
									placeholder="포지션을 입력하세요"
									variant="outlined"
									onChange={handlepositionChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>자기소개</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<TextField
									id="content"
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
									multiline
									rows={4}
									variant="outlined"
									onChange={handlecontentChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<FormControlLabel
									id="check"
									control={
										<Checkbox
											checked={postBody.checked}
											onChange={handlecheckChange}
											name="checked"
											color="default"
										/>
									}
									label="이용약관, 개인정보취급방침에 동의합니다."
								/>
							</Box>
							<Button
								variant="contained"
								size="medium"
								color="success"
								sx={{
									marginTop: 2,
									width: 240
								}}
								onClick={join}
							>
								<h3
									style={{
										color: '#ffffff'
									}}
								>
									가입하기
								</h3>
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default SignUpRegister;
