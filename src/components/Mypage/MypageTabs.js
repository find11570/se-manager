import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Tabs,
	Tab,
	Typography,
	Box,
	Grid,
	Card,
	CardContent
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';

function TabPanel(props) {
	const {
		children,
		value,
		index,
		...other
	} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function MypageTabs() {
	const classes = useStyles();
	const [Data, setData] = React.useState({
		title: 'SE-Manager',
		people: '진채연, 김현수, 황영민, 김지영',
		see: '50',
		good: '200',
		picture: '/static/picture.PNG',
		type: 0
	});

	const handleChange = (event, newValue) => {
		setData({
			type: newValue,
			title: Data.title,
			people: Data.people,
			see: Data.see,
			good: Data.good,
			picture: Data.picture,
		});
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs textColor="primary.darkgreen" value={Data.type} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="내 프로젝트" {...a11yProps(0)} />
					<Tab label="좋아요 한 프로젝트" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={Data.type} index={0}>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
				</Grid>
			</TabPanel>
			<TabPanel value={Data.type} index={1}>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
					<Grid
						item
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<Link to="/app/projectDetail">
							<Card
								sx={{
									boxShadow: 5,
									width: 200,
									height: 250
								}}
							>
								<CardContent>
									<img
										src={Data.picture}
										alt="profile"
										style={{
											width: 180,
											height: 100
										}}
									/>
									<h4>{Data.title}</h4>
									<h5>{Data.people}</h5>
									<Box
										sx={{
											float: 'right'
										}}
									>
										<RemoveRedEyeIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.see}
										</h5>
										<FavoriteIcon
											sx={{
												display: 'inline-block',
											}}
										/>
										<h5 style={{ display: 'inline-block', fontSize: 'small' }}>
											&nbsp;
											{Data.good}
										</h5>
									</Box>
								</CardContent>
							</Card>
						</Link>
					</Grid>
				</Grid>
			</TabPanel>
		</div>
	);
}
