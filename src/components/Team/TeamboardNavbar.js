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
import axios from 'axios';

const api = 'https://se-disk.herokuapp.com/api';

const logout = () => {
	const url = '/auth/logout';
	const target = '/app/dashboard';
	const token = sessionStorage.getItem('user_token');
	axios
		.get(api + url, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			console.log(response);
			sessionStorage.clear();
			window.location.href = target;
		})
		.catch((err) => console.log(err));
};
const TeamboardNavbar = ({ onMobileNavOpen, ...rest }) => {
	const [notifications] = useState([]);
	const isLogin = () => {
		if (sessionStorage.getItem('user_token')) {
			return true;
		} else {
			return false;
		}
	}


	function check() {
		if (isLogin()) {
			return (
				<Box>
					<Hidden lgUp>
						<Link to="/se/teamRegister">
							<Button
								variant="contained"
								size="small"
								sx={{
									float: 'right',
									marginTop: 0.5,
								}}
							>
								<h4 style={{
									color: '#006400',
								}}
								>
									글생성
								</h4>
							</Button>
						</Link>
					</Hidden>
					<Hidden lgDown>
						<Link to="/se/teamRegister">
							<Button
								variant="contained"
								size="small"
								sx={{
									float: 'right',
									marginRight: 2,
									marginTop: 0.5,
									marginLeft: 2
								}}
							>
								<h3 style={{
									color: '#006400',
								}}
								>
									팀원모집글 생성
								</h3>
							</Button>
						</Link>
						<Link to="/mypage/page">
							<Button
								variant="contained"
								size="small"
								sx={{
									float: 'right',
									marginRight: 2,
									marginTop: 0.5,
									marginLeft: 2
								}}
							>
								<h3 style={{
									color: '#006400',
								}}
								>
									마이페이지
								</h3>
							</Button>
						</Link>
						<Button
							variant="contained"
							size="small"
							sx={{
								float: 'right',
								marginRight: 2,
								marginTop: 0.5,
								marginLeft: 2
							}}
							onClick={() => {
								logout()
							}}
						>
							<h3 style={{
								color: '#006400',
							}}
							>
								로그아웃
							</h3>
						</Button>
					</Hidden>
				</Box>
			);
		} else {
			return (
				<Box>
					<Hidden lgDown>
						<Link to="/login/login">
							<Button
								variant="contained"
								size="small"
								sx={{
									float: 'right',
									marginRight: 2,
									marginTop: 0.5,
									marginLeft: 2
								}}
							>
								<h3 style={{
									color: '#006400',
								}}
								>
									로그인
								</h3>
							</Button>
						</Link>
					</Hidden>
					<Hidden lgUp>
						<Link to="/login/login">
							<Button
								variant="contained"
								size="small"
								sx={{
									float: 'right',
									marginRight: 2,
									marginTop: 0.5,
									marginLeft: 2
								}}
							>
								<h4 style={{
									color: '#006400',
								}}
								>
									로그인
								</h4>
							</Button>
						</Link>
					</Hidden>
				</Box>
			);
		}
	}
	return (
		<AppBar
			elevation={0}
			{...rest}
		>
			<Toolbar>
				<Hidden lgDown>
					<Link to="/app/dashboard">
						<Logo height="50px" width="150px" />
					</Link>
				</Hidden>
				<Hidden lgUp>
					<Link to="/app/dashboard">
						<Logo height="40px" width="120px" />
					</Link>
				</Hidden>
				<Hidden lgDown>
					<h3>&nbsp;&gt;&nbsp; 팀원 모집</h3>
				</Hidden>
				<Box sx={{ flexGrow: 1 }} />
				{check()}
				<IconButton color="inherit">
					<Badge
						badgeContent={notifications.length}
						color="primary"
						border-bottom="1px solid #d1d8e4"
						variant="dot"
					/>
				</IconButton>
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

TeamboardNavbar.propTypes = {
	onMobileNavOpen: PropTypes.func
};

export default TeamboardNavbar;
