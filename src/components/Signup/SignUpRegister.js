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
	Hidden
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const SignUpRegister = () => {
	const [postBody, setPostBody] = useState({
		id: '',
		pw: '',
		checkpw: '',
		name: '',
		number: '',
		checkid: '',
		type: '학생',
		checked: false
	});
	const handlecheckChange = (event) => {
		setPostBody({ ...postBody, [event.target.name]: event.target.checked });
	};
	const handleChange = (event) => {
		setPostBody({
			type: event.currentTarget.value,
		});
	};
	const handlenumberChange = (event) => {
		setPostBody({
			number: event.currentTarget.value,
		});
	};
	const handlecheckidChange = (event) => {
		setPostBody({
			checkid: event.currentTarget.value,
		});
	};
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
	const handlenameChange = (event) => {
		setPostBody({
			name: event.currentTarget.value,
		});
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
								회원가입
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
										py: 1.5,
									}}
								/>
								<h3>회원 타입</h3>
								<FormControl component="fieldset">
									<RadioGroup aria-label="회원 타입" name="회원 타입" value={postBody.type} onChange={handleChange}>
										<FormControlLabel value="학생" control={<Radio color="success" />} label="학생" />
										<FormControlLabel value="교수" control={<Radio color="success" />} label="교수" />
									</RadioGroup>
								</FormControl>
								{postBody.id}
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
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
									placeholder="학번/교수코드"
									variant="outlined"
									onChange={handlenumberChange}
								/>
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
									placeholder="인증번호 확인"
									variant="outlined"
									onChange={handlecheckidChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>비밀번호</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
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
									placeholder="영어 대/소문자, 특수문자"
									variant="outlined"
									onChange={handlepwChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>비밀번호 확인</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
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
									placeholder="영어 대/소문자, 특수문자"
									variant="outlined"
									onChange={handlecheckpwChange}
								/>
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
									variant="outlined"
									onChange={handlenameChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<FormControlLabel
									control={(
										<Checkbox
											checked={postBody.checked}
											onChange={handlecheckChange}
											name="checked"
											color="success"
										/>
									)}
									label="이용약관, 개인정보취급방침에 동의합니다."
								/>
							</Box>
							<Link to="/app/dashboard">
								<Button
									variant="contained"
									size="medium"
									color="success"
									sx={{
										marginTop: 2,
										width: 240
									}}
								>
									<h3 style={{
										color: '#ffffff',
									}}
									>
										가입하기
									</h3>
								</Button>
							</Link>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default SignUpRegister;
