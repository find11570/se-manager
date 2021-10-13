import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import {
	ThemeProvider,
	Hidden
} from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import Modal from './components/modal/Modal';

const App = () => {
	const routing = useRoutes(routes);

	return (
		<ThemeProvider theme={theme}>
			<Hidden lgDown>
				<Modal />
			</Hidden>
			<GlobalStyles />
			{routing}
		</ThemeProvider>
	);
};

export default App;
