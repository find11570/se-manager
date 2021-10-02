import {
	NavLink as RouterLink,
	matchPath,
	useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';

const NavItem = ({
	href,
	title,
	...rest
}) => {
	const location = useLocation();

	const active = href ? !!matchPath({
		path: href,
		end: false
	}, location.pathname) : false;

	return (
		<ListItem
			disableGutters
			sx={{
				display: 'flex',
				py: 0
			}}
			{...rest}
		>
			<Button
				component={RouterLink}
				sx={{
					color: 'text.secondary',
					fontWeight: 'medium',
					justifyContent: 'flex-start',
					letterSpacing: 0,
					py: 1.25,
					textTransform: 'none',
					width: '100%',
					...(active && {
						color: 'primary.contrastText'
					}),
					'& svg': {
						mr: 1
					}
				}}
				to={href}
			>
				<span>
					{title}
				</span>
			</Button>
		</ListItem>
	);
};

NavItem.propTypes = {
	href: PropTypes.string,
	title: PropTypes.string
};

export default NavItem;
