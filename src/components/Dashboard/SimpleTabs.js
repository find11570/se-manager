import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TeamProfile from 'src/components/Dashboard/TeamProfile';
import FileViewer from 'src/components/Dashboard/FileViewer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

export default function SimpleTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState({
		type: 0,
		content: '나는 키오스크야'
	});

	const handleChange = (event, newValue) => {
		setValue({
			type: newValue,
			content: value.content
		});
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs textColor="primary.darkgreen" value={value.type} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="프로젝트 소개" {...a11yProps(0)} />
					<Tab label="주제제안서" {...a11yProps(1)} />
					<Tab label="요구사항명세서" {...a11yProps(2)} />
					<Tab label="설계명세서" {...a11yProps(3)} />
					<Tab label="중간발표" {...a11yProps(4)} />
					<Tab label="최종발표" {...a11yProps(5)} />
					<Tab label="팀원 소개" {...a11yProps(6)} />
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
							{value.content}
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
				<FileViewer />
			</TabPanel>
			<TabPanel value={value.type} index={6}>
				<TeamProfile />
			</TabPanel>
		</div>
	);
}
