import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import LoginboardNavbar from './LoginboardNavbar';
import LoginboardSidebar from './LoginboardSidebar';

const LoginboardLayoutRoot = experimentalStyled('div')(
	({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%'
	})
);

const LoginboardLayoutWrapper = experimentalStyled('div')(
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

const LoginboardLayoutContainer = experimentalStyled('div')({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden'
});

const LoginboardLayoutContent = experimentalStyled('div')({
	flex: '1 1 auto',
	height: '100%',
	overflow: 'auto'
});

const LoginboardLayout = () => {
	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<LoginboardLayoutRoot>
			<LoginboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<LoginboardSidebar
				onMobileClose={() => setMobileNavOpen(false)}
				openMobile={isMobileNavOpen}
			/>
			<LoginboardLayoutWrapper>
				<LoginboardLayoutContainer>
					<LoginboardLayoutContent>
						<Outlet />
					</LoginboardLayoutContent>
				</LoginboardLayoutContainer>
			</LoginboardLayoutWrapper>
		</LoginboardLayoutRoot>
	);
};

export default LoginboardLayout;
