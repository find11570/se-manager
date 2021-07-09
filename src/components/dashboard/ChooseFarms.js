import {
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const handleKeyPress = (event) => {
	if (event.key === 'Enter') {
		alert('enter press here! ');
	}
};

const LatestOrders = (props) => (
	<Card {...props}>
		<Card>
			<CardContent>
				<TextField
					fullWidth
					sx={{
						flex: '1',
						flexDirection: 'row',
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SvgIcon
									fontSize="small"
									color="action"
								>
									<SearchIcon />
								</SvgIcon>
							</InputAdornment>
						)
					}}
					onKeyPress={handleKeyPress}
					placeholder="찾아볼 농장 입력"
					variant="outlined"
				/>
			</CardContent>
		</Card>
	</Card>
);

export default LatestOrders;
