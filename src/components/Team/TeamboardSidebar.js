import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Box,
	Drawer,
	List
} from '@material-ui/core';
import NavItem from 'src/components/NavItem';

const items = [
	{
		href: '/app/dashboard',
		title: '인터넷디스크'
	},
	{
		href: '/se/team',
		title: '팀원 모집'
	},
];

const TeamboardSidebar = ({ onMobileClose, openMobile }) => {
	const location = useLocation();

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
	}, [location.pathname]);

	const content = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%'
			}}
		>
			<Box sx={{ p: 2 }}>
				<List>
					{items.map((item) => (
						<NavItem
							href={item.href}
							key={item.title}
							title={item.title}
						/>
					))}
				</List>
			</Box>
			<Box sx={{ flexGrow: 1 }} />
		</Box>
	);

	return (
		<>
			<Drawer
				anchor="left"
				onClose={onMobileClose}
				open={openMobile}
				variant="temporary"
				PaperProps={{
					sx: {
						width: 256
					}
				}}
			>
				{content}
			</Drawer>
		</>
	);
};

TeamboardSidebar.propTypes = {
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool
};

TeamboardSidebar.defaultProps = {
	onMobileClose: () => { },
	openMobile: false
};

export default TeamboardSidebar;
