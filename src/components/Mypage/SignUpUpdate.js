import { Helmet } from 'react-helmet';
import { useState, React } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Button,
	Avatar,
	TextField,
	InputAdornment,
	SvgIcon,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const SignUpUpdate = () => {
	const [postBody, setpostBody] = useState({
		id: '1',
		email: 'jinchaeyeon@naver.com',
		name: '진채연',
		number: '20191141',
		type: '학생',
		github: 'www.jinchaeyeon.com',
		blog: 'www.jinchaeyeon.com',
		content: '하하하하하하ㅏㅎ',
		position: '프론트임'
	});

	const handlecontentChange = (event) => {
		setpostBody({
			content: event.currentTarget.value,
		});
	};
	const handlegithubChange = (event) => {
		setpostBody({
			github: event.currentTarget.value,
		});
	};
	const handleblogChange = (event) => {
		setpostBody({
			blog: event.currentTarget.value,
		});
	};
	const handlepositionChange = (event) => {
		setpostBody({
			postion: event.currentTarget.value,
		});
	};
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
								<Avatar
									sx={{
										cursor: 'pointer',
										width: 60,
										height: 60,
										float: 'left',
										marginTop: 4,
										marginRight: 2,
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
									<h3 style={{
										color: '#ffffff',
									}}
									>
										사진선택
									</h3>
								</Button>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
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
									<h3 style={{
										color: '#ffffff',
									}}
									>
										기본 이미지로 변경
									</h3>
								</Button>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>비밀번호 수정</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<Link to="/login/password">
									<Button
										variant="contained"
										size="medium"
										color="success"
										sx={{
											marginTop: 1,
										}}
									>
										<h3 style={{
											color: '#ffffff',
										}}
										>
											비밀번호 수정
										</h3>
									</Button>
								</Link>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>github주소</h3>
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
									value={postBody.github}
									placeholder="www.github.com"
									variant="outlined"
									onChange={handlegithubChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>blog주소</h3>
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
									value={postBody.blog}
									placeholder="www.blog.com"
									variant="outlined"
									onChange={handleblogChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>포지션</h3>
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
									value={postBody.position}
									placeholder="포지션을 입력해주세요"
									variant="outlined"
									onChange={handlepositionChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>자기소개</h3>
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
									multiline
									rows={4}
									value={postBody.content}
									placeholder="자기소개를 입력해주세요"
									variant="outlined"
									onChange={handlecontentChange}
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
										color="success"
										onClick={() => {
											alert('수정되었습니다.');
										}}
									>
										<h3 style={{
											color: '#ffffff',
										}}
										>
											수정
										</h3>
									</Button>
								</Link>
								<Link to="/app/dashboard">
									<Button
										variant="contained"
										color="success"
										sx={{
											float: 'right'
										}}
										onClick={() => {
											alert('탈퇴되었습니다.');
										}}
									>
										<h3 style={{
											color: '#ffffff',
										}}
										>
											탈퇴
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

export default SignUpUpdate;
