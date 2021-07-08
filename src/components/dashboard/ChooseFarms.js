import {
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

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
					placeholder="농장 검색"
					variant="outlined"
				/>
			</CardContent>
		</Card>
	</Card>
);

export default LatestOrders;
