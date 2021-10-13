import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Badge,
	Box,
	Hidden,
	IconButton,
	Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Logo from 'src/components/Logo';

const LoginboardNavbar = ({ onMobileNavOpen, ...rest }) => {
	const [notifications] = useState([]);

	return (
		<AppBar
			elevation={0}
			{...rest}
		>
			<Toolbar>
				<Link to="/app/dashboard">
					<Logo height="50px" width="150px" />
				</Link>
				<Hidden lgDown>
					<h3>&nbsp;&gt;&nbsp; 로그인</h3>
				</Hidden>
				<Box sx={{ flexGrow: 1 }} />
				<Hidden lgDown>
					<IconButton color="inherit">
						<Badge
							badgeContent={notifications.length}
							color="primary"
							border-bottom="1px solid #d1d8e4"
							variant="dot"
						/>
					</IconButton>
				</Hidden>
				<IconButton
					color="inherit"
					onClick={onMobileNavOpen}
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
			<Box
				sx={{
					backgroundColor: '#D3D3D3',
					height: 2,
					boxShadow: 5
				}}
			/>
		</AppBar>
	);
};

LoginboardNavbar.propTypes = {
	onMobileNavOpen: PropTypes.func
};

export default LoginboardNavbar;
