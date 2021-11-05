import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	AppBar,
	Tabs,
	Tab,
	Typography,
	Box,
	Grid,
	Card,
	CardContent,
} from '@material-ui/core';
import MyCard from 'src/components/Mypage/MyCard';
import Favorite from 'src/components/Mypage/Favorite';
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
				<Box
					sx={{
						paddingTop: 2
					}}
				>
					<Typography component="span">{children}</Typography>
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
		type: 0
	});

	const handleChange = (event, newValue) => {
		setData({
			type: newValue,
		});
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs textColor="inherit" value={Data.type} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="내 프로젝트" {...a11yProps(0)} />
					<Tab label="좋아요 한 프로젝트" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={Data.type} index={0}>
				<MyCard />
			</TabPanel>
			<TabPanel value={Data.type} index={1}>
				<Favorite />
			</TabPanel>
		</div>
	);
}
