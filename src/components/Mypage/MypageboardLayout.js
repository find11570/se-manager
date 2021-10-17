import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import MypageboardNavbar from 'src/components/Mypage/MypageboardNavbar';
import DashboardSidebar from 'src/components/Dashboard/DashboardSidebar';

const MypageboardLayoutRoot = experimentalStyled('div')(
	({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%'
	})
);

const MypageboardLayoutWrapper = experimentalStyled('div')(
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

const MypageboardLayoutContainer = experimentalStyled('div')({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden'
});

const MypageboardLayoutContent = experimentalStyled('div')({
	flex: '1 1 auto',
	height: '100%',
	overflow: 'auto'
});

const MypageboardLayout = () => {
	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<MypageboardLayoutRoot>
			<MypageboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<DashboardSidebar
				onMobileClose={() => setMobileNavOpen(false)}
				openMobile={isMobileNavOpen}
			/>
			<MypageboardLayoutWrapper>
				<MypageboardLayoutContainer>
					<MypageboardLayoutContent>
						<Outlet />
					</MypageboardLayoutContent>
				</MypageboardLayoutContainer>
			</MypageboardLayoutWrapper>
		</MypageboardLayoutRoot>
	);
};

export default MypageboardLayout;
