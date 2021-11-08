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
	SvgIcon
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Api from '../../Api/Api';

const data = JSON.parse(sessionStorage.getItem('user_data'));

const SignUpUpdate = () => {
	const [postBody, setpostBody] = useState({
		id: data.user_id,
		login_id: data.user_login_id,
		email: data.user_email,
		name: data.user_name,
		number: data.user_school_num,
		image: data.user_image,
		type: data.user_type,
		github: data.user_github,
		blog: data.user_blog,
		content: data.user_introduction,
		position: data.user_position
	});

	const handlecontentChange = (event) => {
		setpostBody((prev) => ({
			...prev,
			content: event.target.value
		}));
	};
	const handlegithubChange = (event) => {
		setpostBody((prev) => ({
			...prev,
			github: event.target.value
		}));
	};
	const handleblogChange = (event) => {
		setpostBody((prev) => ({
			...prev,
			blog: event.target.value
		}));
	};
	const handlepositionChange = (event) => {
		setpostBody((prev) => ({
			...prev,
			position: event.target.value
		}));
	};
	const update_user = async () => {
		let response = await Api.postUpdateUser(
			postBody.id,
			postBody.image,
			postBody.content,
			postBody.github,
			postBody.blog,
			postBody.position
		);

		if (response.sucess === true) {
			const target = 'page';
			var user_data = JSON.parse(sessionStorage.getItem('user_data'));
			user_data.user_image = 'blank';
			user_data.user_introduction = postBody.content;
			user_data.user_github = postBody.github;
			user_data.user_blog = postBody.blog;
			user_data.user_position = postBody.position;
			sessionStorage.removeItem('user_data');
			sessionStorage.setItem('user_data', JSON.stringify(user_data));
			alert('수정 성공');
			window.location.href = target;
		} else {
			alert('수정 실패');
		}
	};
	const delete_user = async () => {
		let response = await Api.deleteUser(postBody.id);
	};

	const input_thumbnail = () => {
		var input_image = document.getElementById('file');
		var thumbnail = document.getElementById('thumbnail');
		if (!thumbnail.hasChildNodes()) {
			if (input_image.files) {
				var image_container = document.createElement('div');
				var image = document.createElement('img');
				image.style.width = '100px';
				image.style.height = '100px';
				image.style.borderRadius = '50%';
				var image_list = input_image.files;
				var reader = new FileReader();
				reader.readAsDataURL(image_list[0]);
				reader.onload = function () {
					image.src = reader.result;
					image.id = 'thumbnail_image';
				};
				image_container.id = 'thumbnail_image_container';
				image_container.appendChild(image);
				thumbnail.appendChild(image_container);
			}
		}
	};
	const delete_thumbnail = () => {
		var image_container_id = document.getElementById(
			'thumbnail_image_container'
		);
		thumbnail.removeChild(image_container_id);
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
							<h2 style={{ color: '#006400' }}>회원 정보 수정</h2>
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
								<h3>아이디</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<h4>{postBody.login_id}</h4>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>회원타입</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<h4>{postBody.type}</h4>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								<h3>학번</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
									}}
								/>
								<h4>{postBody.number}</h4>
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
								<h4>{postBody.name}</h4>
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
								<h3>비밀번호 수정</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5
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
											비밀번호 수정
										</h3>
									</Button>
								</Link>
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
									value={postBody.github}
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
									value={postBody.blog}
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
									placeholder="포지션을 입력해주세요"
									value={postBody.position}
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
									placeholder="자기소개를 입력해주세요"
									value={postBody.content}
									variant="outlined"
									onChange={handlecontentChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2
									}}
								/>
								{/* <Link to="/app/dashboard"> */}
								<Button
									variant="contained"
									color="success"
									onClick={update_user}
								>
									<h3
										style={{
											color: '#ffffff'
										}}
									>
										수정
									</h3>
								</Button>
								{/* </Link> */}
								<Link to="/app/dashboard">
									<Button
										variant="contained"
										color="success"
										sx={{
											float: 'right'
										}}
										onClick={delete_user}
									>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											탈퇴
										</h3>
									</Button>
								</Link>
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

export default SignUpUpdate;
