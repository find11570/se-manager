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

const TeamSpecificQuestion = () => {
	const [chartData] = useState({
		id: '1',
		question: '너무졸린심경을 표현하시오',
	});
	const [answer, setanswer] = useState([]);

	const handleanswerChange = (event) => {
		setanswer(event.currentTarget.value);
	};

	return (
		<>
			<Helmet>
				<title>TeamSpecificQuestion</title>
			</Helmet>
			<Box
				sx={{
					minHeight: '100%',
					py: 5,
				}}
			>
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
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
								}}
							/>
							<h1>추가 질문</h1>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
								}}
							/>
							<Box
								sx={{
									backgroundColor: '#F0F7EC',
									paddingTop: 5,
									paddingBottom: 5,
									paddingLeft: 1
								}}
							>
								<h2>
									{chartData.question}
								</h2>
							</Box>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
								}}
							/>
							{answer}
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
								placeholder="위 질문에 답을 적어주세요"
								variant="outlined"
								rows={4}
								onChange={handleanswerChange}
							/>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
								}}
							/>
							<Link to="/se/team">
								<Button
									variant="contained"
									size="medium"
									color="success"
									onClick={() => {
										alert('신청되었습니다.');
									}}
									sx={{
										float: 'right',
										marginRight: 2,
										marginTop: 0.5,
										marginLeft: 2
									}}
								>
									<h3 style={{
										color: '#ffffff',
									}}
									>
										신청하기
									</h3>
								</Button>
							</Link>
							<Box
								sx={{
									minHeight: '100%',
									py: 2,
								}}
							/>
						</CardContent>
					</Card>
				</Grid>
			</Box>
		</>
	);
};

export default TeamSpecificQuestion;
