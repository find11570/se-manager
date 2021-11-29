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
	const temp = '';
	const {
		contents, members, postList
	} = props;

	const handleChange = (event, newValue) => {
		setValue({
			type: newValue,
			content: value.content
		});
	};

	function list(postList) {
		if (postList.length != 0) {
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
							{postList.map((p, index) => (
								<Tab key={p.post_id} label={p.post_title} {...a11yProps(index)} />
							))}
						</Tabs>
					</AppBar>
					{postList.map((p, index) => (
						mapList(p, index)
					))}
				</div>
			)
		}
		else {
			return temp;
		}
	}

	function mapList(p, index) {
		if (index == 0) {
			return (
				<TabPanel key={p.post_id} value={value.type} index={index}>
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
			);
		}
		else if (index == 1) {
			return (
				<TabPanel key={p.post_id} value={value.type} index={index}>
					<TeamProfile members={members} />
				</TabPanel>
			);
		}
		else {
			return (
				<TabPanel key={p.post_id} value={value.type} index={index}>

				</TabPanel>
			);
		}
	}

	return (
		list(postList)
	);
}
