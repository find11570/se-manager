import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Hidden,
	TextField,
	InputAdornment,
	SvgIcon,
	Avatar,
	Button
} from '@material-ui/core';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SimpleTabs from 'src/components/Dashboard/SimpleTabs';
import { Link } from 'react-router-dom';
import Api from '../../Api/Api';

const people = JSON.parse(sessionStorage.getItem('user_data'));

const ProjectDetail = (props) => {
	const project_id = location.href
		.split('/')
	[location.href.split('/').length - 1].split('.')[0];
	const [data, setData] = useState([]);
	const [state, setstate] = useState(false);
	const [tag, settag] = useState([]);
	const [comment, setcomment] = useState([]);
	const [nestedComment, setNestedComment] = useState([]);
	const [postBody, setPostBody] = useState({
		comment: ''
	});
	const mem = data.project_members;
	const memResult = mem?.map((member) => member.user_name + ' ');

	useEffect(async () => {
		const list = [];
		let response = await Api.getProject(project_id);
		setData(response.data.project);
		const year = response.data.project.project_subject_year;
		list.push(year);
		const p_name = response.data.project.project_professor.user_name;
		list.push(p_name);
		const subject = response.data.project.project_subject;
		list.push(subject);
		const t = response.data.project.project_tags;
		if (t) {
			t.map((v) => {
				list.push(v);
			});
		}
		settag(list);
		if (sessionStorage.getItem('user_token')) {
			if (response.data.project.length != 0) {
				response.data.project.project_members.map((m) => {
					if (m.user_id === people.user_id) {
						setstate(true);
					}
				});
			}
		}

		let comment_response = await Api.getReadComment(project_id);
		divideComment(comment_response.data.comments);
	}, []);

	// 댓글과 대댓글 분리
	const divideComment = (comments) => {
		var comment = [];
		var nestedComment = [];
		for (var i = 0; i < comments.length; i++) {
			// 그냥 댓글
			if (comments[i].comment_parent === null) {
				comment.push(comments[i]);
			} else {
				nestedComment.push(comments[i]);
			}
		}
		setcomment(comment);
		setNestedComment(nestedComment);
	};

	// 댓글 등록 onClick 함수
	const createComment = async () => {
		if (!sessionStorage.getItem('user_token')) {
			return alert('로그인 후 댓글 작성가능합니다.');
		} else {
			if (postBody.comment) {
				let response = await Api.postComment(
					project_id,
					postBody.comment,
					0,
					null
				);
				document.getElementById('comment_field').value = '';
				location.replace(location.href);
			}
		}
	};

	// 자신 댓글만 수정버튼이 보이도록
	const showUpdateCommentBtn = (user_name) => {
		if (people) {
			if (people.user_name === user_name) {
				return (
					<Button
						variant="contained"
						color="success"
						size="small"
						onClick={updateComment}
						sx={{
							float: 'right'
						}}
					>
						수정
					</Button>
				);
			}
		}
	};

	// 자신의 대댓글에만 수정버튼이 보이도록
	const showUpdateNestedCommentBtn = (user_name) => {
		if (people) {
			if (people.user_name === user_name) {
				return (
					<Button
						variant="contained"
						color="success"
						size="small"
						onClick={updateNestedComment}
						sx={{
							float: 'right'
						}}
					>
						수정
					</Button>
				);
			}
		}
	};

	// 대댓글 버튼이 로그인 해야 보이도록
	const showNestedCommentBtn = () => {
		if (people) {
			return (
				<Button
					variant="contained"
					size="small"
					onClick={createNestedComment}
					sx={{
						float: 'right'
					}}
				>
					대댓글
				</Button>
			);
		}
	};

	// 댓글 삭제 버튼
	const showDeleteCommentBtn = (user_name) => {
		if (people) {
			if (people.user_name === user_name) {
				return (
					<Button
						variant="contained"
						color="success"
						size="small"
						onClick={deleteComment}
						sx={{
							float: 'right'
						}}
					>
						삭제
					</Button>
				);
			}
		}
	};

	// 대댓글 삭제 버튼
	const showDeleteNestedCommentBtn = (user_name) => {
		if (people) {
			if (people.user_name === user_name) {
				return (
					<Button
						variant="contained"
						color="success"
						size="small"
						onClick={deleteNestedComment}
						sx={{
							float: 'right'
						}}
					>
						삭제
					</Button>
				);
			}
		}
	};
	// 댓글 삭제
	const deleteComment = async (e) => {
		var commnet_id = e.target.parentNode.childNodes[2].id;
		let response = await Api.deleteComment(project_id, commnet_id);
		location.replace(location.href);
	};

	// 대댓글 삭제
	const deleteNestedComment = async (e) => {
		var commnet_id = e.target.parentNode.id;
		let response = await Api.deleteComment(project_id, commnet_id);
		location.replace(location.href);
	};

	// 대댓글 버튼 onClick 함수 -> 대댓글 등록창 열리게 끔
	const createNestedComment = (e) => {
		var card = e.target.parentNode;
		if (
			!(
				card.childNodes[card.childNodes.length - 1].id ===
				'nestedComment_input_' + card.childNodes[2].id
			)
		) {
			var nestedComment_Container = document.createElement('Card');
			var nestedComment_input = document.createElement('input');

			var btn = document.createElement('Button');
			btn.innerHTML = '대댓글 등록';
			btn.style.color = 'white';
			btn.style.padding = '4px 10px';
			btn.style.borderRadius = '4px';
			btn.style.backgroundColor = '#2e7d32';
			btn.style.boxShadow =
				'0 0 1px 0 rgb(0 0 0 / 31%), 0 2px 2px -2px rgb(0 0 0 / 25%)';
			btn.style.float = 'right';
			btn.style.border = '0';
			btn.style.cursor = 'pointer';
			btn.onclick = postNestedComment;

			nestedComment_Container.id =
				'nestedComment_input_' + card.childNodes[2].id;
			nestedComment_input.style.marginLeft = '50px';
			nestedComment_input.style.fontSize = '15px';
			nestedComment_input.style.fontWeight = 'bolder';
			nestedComment_input.style.width = '50%';

			nestedComment_Container.appendChild(nestedComment_input);
			nestedComment_Container.appendChild(btn);

			card.appendChild(nestedComment_Container);
		}
	};

	// 대댓글 등록 버튼 OnClick 함수
	const postNestedComment = async (e) => {
		var comment_content = e.target.parentNode.childNodes[0].value;
		if (comment_content) {
			var comment_parent = e.target.parentNode.id.substring(
				20,
				e.target.parentNode.id.length
			);
			let response = await Api.postComment(
				project_id,
				comment_content,
				1,
				comment_parent
			);
			location.replace(location.href);
		}
	};
	// 대댓글 Display 함수
	const showNestedComment = (comment_id) => {
		var nestedComments = [];
		for (var i = 0; i < nestedComment.length; i++) {
			if (nestedComment[i].comment_parent === comment_id) {
				nestedComments.push({
					id: nestedComment[i].comment_id,
					content: nestedComment[i].comment_content,
					user_name: nestedComment[i].user_name
				});
			}
		}
		var nestedComment_Container = (
			<div>
				{nestedComments.map((comment) => {
					return (
						<Card
							id={comment.id}
							key={comment.id}
							sx={{
								margin: 1,
								paddingLeft: 7,
								paddingTop: 1,
								paddingBottom: 1,
								fontWeight: 'bold',
								fontSize: 'medium'
							}}
						>
							{comment.user_name} : {comment.content}
							{showDeleteNestedCommentBtn(comment.user_name)}
							{showUpdateNestedCommentBtn(comment.user_name)}
						</Card>
					);
				})}
			</div>
		);
		return nestedComment_Container;
	};

	// 댓글 수정 onClick 함수
	const updateComment = async (e) => {
		var card = e.target.parentNode;
		if (card.childNodes[2].nodeName === 'INPUT') {
			var comment_id = card.childNodes[2].id;
			var comment_content = card.childNodes[2].value;
			let response = await Api.postUpdateComment(
				project_id,
				comment_id.substring(13, comment_id.length),
				comment_content
			);
			location.replace(location.href);
		} else {
			var comment_container = card.childNodes[2];
			var comment = comment_container.innerText;
			var comment_id = comment_container.getAttribute('id');
			card.removeChild(comment_container);
			var update_container = document.createElement('input');
			update_container.value = comment;
			update_container.id = 'update_input_' + comment_id;
			card.insertBefore(update_container, card.childNodes[2]);
		}
	};

	// 대댓글 수정 onClick 함수
	const updateNestedComment = async (e) => {
		var card = e.target.parentNode;
		if (card.childNodes[2].nodeName === 'INPUT') {
			var comment_id = card.childNodes[2].id;
			var comment_content = card.childNodes[2].value;
			let response = await Api.postUpdateComment(
				project_id,
				comment_id.substring(13, comment_id.length),
				comment_content
			);
			location.replace(location.href);
		}
		var comment_id = card.id;
		var comment = card.childNodes[2];
		var update_container = document.createElement('input');
		update_container.value = comment.data;
		update_container.id = 'update_input_' + comment_id;
		card.removeChild(comment);
		card.insertBefore(update_container, card.childNodes[2]);
	};

	// React Handle Function
	const handleTextChange = (event) => {
		setPostBody({
			comment: event.currentTarget.value
		});
	};

	const List = tag.map((t) => (
		<Box
			key={t}
			value={t}
			sx={{
				backgroundColor: 'primary.smoothgreen',
				display: 'inline-block',
				textAlign: 'center',
				marginRight: 2,
				borderBottomRightRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 5,
				borderTopLeftRadius: 5,
				borderColor: 'primary.main',
				paddingLeft: 2,
				paddingRight: 2,
				boxShadow: 1
			}}
		>
			{t}
		</Box>
	));

	return (
		<>
			<Helmet>
				<title>teamSpecific</title>
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
									py: 3
								}}
							>
								<Hidden lgDown>
									<Box
										sx={{
											float: 'left',
											display: 'inline-block',
											marginRight: 2
										}}
									>
										<img
											src={data.project_image}
											alt="profile"
											style={{
												width: 220,
												height: 180,
												borderBottomRightRadius: 10,
												borderBottomLeftRadius: 10,
												borderTopRightRadius: 10,
												borderTopLeftRadius: 10,
												display: 'inline-block'
											}}
										/>
									</Box>
								</Hidden>
								<Hidden lgDown>
									<Box
										sx={{
											display: 'inline-block'
										}}
									>
										<h1
											style={{
												color: '#ffffff',
												marginTop: 10
											}}
										>
											{data.project_title}
										</h1>
										<Box
											sx={{
												minHeight: '100%',
												py: 1
											}}
										/>
										<h3
											style={{
												color: '#ffffff'
											}}
										>
											{memResult}
										</h3>
										<Box
											sx={{
												minHeight: '100%',
												py: 1
											}}
										/>
										<h4 style={{ color: '#006400' }}>
											#&nbsp;
											{List}
										</h4>
										<Box
											sx={{
												minHeight: '100%',
												py: 1
											}}
										/>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block'
											}}
										/>
										<h4 style={{ display: 'inline-block' }}>
											&nbsp;
											{data.project_hit}
										</h4>
										<FavoriteIcon
											sx={{
												display: 'inline-block'
											}}
										/>
										<h4 style={{ display: 'inline-block' }}>
											&nbsp;
											{data.project_like}
										</h4>
									</Box>
								</Hidden>
								<Hidden lgUp>
									<h3 style={{ color: '#ffffff', marginLeft: 20 }}>
										{data.project_title}
									</h3>
								</Hidden>
							</Box>
						</CardContent>
						<CardContent
							sx={{
								backgroundColor: '#ffffff'
							}}
						>
							<SimpleTabs
								contents={data.project_introduction}
								members={data.project_members}
							/>
							<Box
								sx={{
									minHeight: '100%',
									py: 3
								}}
							/>
						</CardContent>
					</Card>
					<Box
						sx={{
							minHeight: '100%',
							py: 2
						}}
					/>
					{state ? (
						<Link
							to={{
								pathname: `/app/projectUpdate/${project_id}`,
								state: { index: project_id }
							}}
						>
							<Button
								variant="contained"
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
									수정하기
								</h3>
							</Button>
						</Link>
					) : (
						<Box
							sx={{
								minHeight: '100%'
							}}
						/>
					)}
					<Box
						sx={{
							minHeight: '100%',
							py: 4
						}}
					/>
					<Box
						sx={{
							bgcolor: 'primary.darkgreen',
							width: '100%',
							height: 2
						}}
					/>
					<Box
						sx={{
							minHeight: '100%',
							py: 2
						}}
					/>
					<h3>댓글/피드백</h3>
					<Box
						sx={{
							minHeight: '100%',
							py: 1
						}}
					/>
					<Grid container spacing={2}>
						<Grid item lg={10} md={10} sm={10} xs={10}>
							<TextField
								id="comment_field"
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
								placeholder="댓글을 입력하세요!"
								variant="outlined"
								onChange={handleTextChange}
							/>
						</Grid>
						<Grid item lg={2} md={2} sm={2} xs={2}>
							<Button
								variant="contained"
								color="success"
								size="large"
								onClick={createComment}
							>
								<h4
									style={{
										color: '#ffffff'
									}}
								>
									등록
								</h4>
							</Button>
						</Grid>
					</Grid>
					<Box
						sx={{
							minHeight: '100%',
							py: 3
						}}
					/>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						{comment.map((comments) => (
							<Card
								key={comments.comment_id}
								value={comments}
								sx={{
									borderBottomRightRadius: 10,
									borderBottomLeftRadius: 10,
									borderTopRightRadius: 10,
									borderTopLeftRadius: 10,
									boxShadow: 5,
									marginBottom: 3
								}}
							>
								<CardContent>
									<Box
										sx={{
											display: 'inline-block',
											marginRight: 2
										}}
									>
										<Avatar
											sx={{
												cursor: 'pointer',
												width: 30,
												height: 30
											}}
										/>
									</Box>
									<h4 style={{ display: 'inline-block' }}>
										{comments.user_name}
										&nbsp;:&nbsp;
									</h4>
									<h4
										id={comments.comment_id}
										className="comment"
										style={{ display: 'inline-block' }}
									>
										{comments.comment_content}
									</h4>
									{showDeleteCommentBtn(comments.user_name)}
									{showUpdateCommentBtn(comments.user_name)}
									{showNestedCommentBtn(comments.user_name)}
									{showNestedComment(comments.comment_id)}
								</CardContent>
							</Card>
						))}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default ProjectDetail;
