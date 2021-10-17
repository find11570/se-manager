import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import SignUpboardNavbar from 'src/components/Signup/SignUpboardNavbar';
import DashboardSidebar from 'src/components/Dashboard/DashboardSidebar';

const SignUpboardLayoutRoot = experimentalStyled('div')(
	({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%'
	})
);

const SignUpboardLayoutWrapper = experimentalStyled('div')(
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

const SignUpboardLayoutContainer = experimentalStyled('div')({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden'
});

const SignUpboardLayoutContent = experimentalStyled('div')({
	flex: '1 1 auto',
	height: '100%',
	overflow: 'auto'
});

const SignUpboardLayout = () => {
	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<SignUpboardLayoutRoot>
			<SignUpboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<DashboardSidebar
				onMobileClose={() => setMobileNavOpen(false)}
				openMobile={isMobileNavOpen}
			/>
			<SignUpboardLayoutWrapper>
				<SignUpboardLayoutContainer>
					<SignUpboardLayoutContent>
						<Outlet />
					</SignUpboardLayoutContent>
				</SignUpboardLayoutContainer>
			</SignUpboardLayoutWrapper>
		</SignUpboardLayoutRoot>
	);
};

export default SignUpboardLayout;
