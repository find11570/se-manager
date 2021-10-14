import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Badge,
	Box,
	Hidden,
	IconButton,
	Toolbar,
	Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Logo from 'src/components/Logo';

const MypageboardNavbar = ({ onMobileNavOpen, ...rest }) => {
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
					<h3>&nbsp;&gt;&nbsp; 마이페이지</h3>
				</Hidden>
				<Box sx={{ flexGrow: 1 }} />
				<Hidden lgDown>
					<Link to="/mypage/update">
						<Button
							variant="contained"
							size="small"
							sx={{
								float: 'right',
								marginTop: 0.5,
								marginLeft: 2
							}}
						>
							<h3 style={{
								color: '#006400',
							}}
							>
								마이페이지 수정
							</h3>
						</Button>
					</Link>
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

MypageboardNavbar.propTypes = {
	onMobileNavOpen: PropTypes.func
};

export default MypageboardNavbar;
