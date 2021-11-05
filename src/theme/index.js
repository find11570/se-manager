import { createTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
	palette: {
		background: {
			default: '#ffffff',
			paper: colors.common.white
		},
		primary: {
			green: '#2e6411',
			contrastText: '#000000',
			main: '#ffffff',
			smoothgreen: '#F0F7EC',
			darkgreen: '#006400'
		},
		text: {
			primary: '#172b4d',
			secondary: '#6b778c',
		}
	},
	shadows,
	typography
});

export default theme;
