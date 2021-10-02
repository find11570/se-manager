import { Helmet } from 'react-helmet';
import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	TextField,
	InputAdornment,
	SvgIcon
} from '@material-ui/core';

const TeamRegister = () => {
	const [postBody, setPostBody] = useState({
		title: '',
		content: '',
		count: ''
	});
	const handletitleChange = (event) => {
		setPostBody({
			title: event.currentTarget.value,
		});
	};
	const handlecontentChange = (event) => {
		setPostBody({
			content: event.currentTarget.value,
		});
	};
	const handlecountChange = (event) => {
		setPostBody({
			count: event.currentTarget.value,
		});
	};
	return (
		<>
			<Helmet>
				<title>TeamRegister</title>
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
								팀원 모집글 등록
							</h2>
							<h4>
								팀원을 모집하세요!
							</h4>
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
								<h3>글 제목&nbsp;(최대 40자)</h3>
								{postBody.name}
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<TextField
									halfWidth
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
									placeholder="최대 40자"
									variant="outlined"
									onChange={handletitleChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>글 내용</h3>
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
										height: 300
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
									onChange={handlecontentChange}
								/>
								<Box
									sx={{
										minHeight: '100%',
										py: 2,
									}}
								/>
								<h3>모집 인원&nbsp;(숫자만 입력)</h3>
								<Box
									sx={{
										minHeight: '100%',
										py: 0.5,
									}}
								/>
								<TextField
									halfWidth
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
									placeholder="숫자만 입력해주세요"
									variant="outlined"
									onChange={handlecountChange}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default TeamRegister;
