import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import TeamboardNavbar from './TeamboardNavbar';
import TeamboardSidebar from './TeamboardSidebar';

const TeamboardLayoutRoot = experimentalStyled('div')(
	({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%'
	})
);

const TeamboardLayoutWrapper = experimentalStyled('div')(
	({ theme }) => ({
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden',
		paddingTop: 64,
		[theme.breakpoints.up('lg')]: {
			paddingLeft: '20%',
		}
	})
);

const TeamboardLayoutContainer = experimentalStyled('div')({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden'
});

const TeamboardLayoutContent = experimentalStyled('div')({
	flex: '1 1 auto',
	height: '100%',
	overflow: 'auto'
});

const TeamboardLayout = () => {
	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<TeamboardLayoutRoot>
			<TeamboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<TeamboardSidebar
				onMobileClose={() => setMobileNavOpen(false)}
				openMobile={isMobileNavOpen}
			/>
			<TeamboardLayoutWrapper>
				<TeamboardLayoutContainer>
					<TeamboardLayoutContent>
						<Outlet />
					</TeamboardLayoutContent>
				</TeamboardLayoutContainer>
			</TeamboardLayoutWrapper>
		</TeamboardLayoutRoot>
	);
};

export default TeamboardLayout;
