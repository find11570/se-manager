import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import ChatboardNavbar from './ChatboardNavbar';
import ChatboardSidebar from './ChatboardSidebar';

const ChatboardLayoutRoot = experimentalStyled('div')(
	({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%'
	})
);

const ChatboardLayoutWrapper = experimentalStyled('div')(
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

const ChatboardLayoutContainer = experimentalStyled('div')({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden'
});

const ChatboardLayoutContent = experimentalStyled('div')({
	flex: '1 1 auto',
	height: '100%',
	overflow: 'auto'
});

const ChatboardLayout = () => {
	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<ChatboardLayoutRoot>
			<ChatboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<ChatboardSidebar
				onMobileClose={() => setMobileNavOpen(false)}
				openMobile={isMobileNavOpen}
			/>
			<ChatboardLayoutWrapper>
				<ChatboardLayoutContainer>
					<ChatboardLayoutContent>
						<Outlet />
					</ChatboardLayoutContent>
				</ChatboardLayoutContainer>
			</ChatboardLayoutWrapper>
		</ChatboardLayoutRoot>
	);
};

export default ChatboardLayout;
