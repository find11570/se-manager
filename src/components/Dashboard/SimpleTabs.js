import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TeamProfile from 'src/components/Dashboard/TeamProfile';
import FileViewer from 'src/components/Dashboard/FileViewer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Video from 'src/components/Dashboard/Video';
import { useState, useEffect } from 'react';
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

export default function SimpleTabs(props) {
	const classes = useStyles();
	const [value, setValue] = useState({
		type: 0,
		content: '',
	});
	const {
		contents, members
	} = props;

	const handleChange = (event, newValue) => {
		setValue({
			type: newValue,
			content: value.content
		});
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs
					textColor="inherit"
					value={value.type}
					onChange={handleChange}
					aria-label="simple tabs example"
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
				>
					<Tab label="프로젝트소개" {...a11yProps(0)} />
					<Tab label="주제제안서" {...a11yProps(1)} />
					<Tab label="요구사항명세서" {...a11yProps(2)} />
					<Tab label="설계명세서" {...a11yProps(3)} />
					<Tab label="중간발표" {...a11yProps(4)} />
					<Tab label="최종발표" {...a11yProps(5)} />
					<Tab label="팀원소개" {...a11yProps(6)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value.type} index={0}>
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
						<h3>
							{contents}
						</h3>
					</CardContent>
				</Card>
			</TabPanel>
			<TabPanel value={value.type} index={1}>
				<FileViewer />
			</TabPanel>
			<TabPanel value={value.type} index={2}>
				<FileViewer />
			</TabPanel>
			<TabPanel value={value.type} index={3}>
				<FileViewer />
			</TabPanel>
			<TabPanel value={value.type} index={4}>
				<FileViewer />
			</TabPanel>
			<TabPanel value={value.type} index={5}>
				<Video />
			</TabPanel>
			<TabPanel value={value.type} index={6}>
				<TeamProfile members={members}/>
			</TabPanel>
		</div>
	);
}
