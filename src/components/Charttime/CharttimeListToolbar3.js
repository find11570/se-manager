import {
	Box,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	Button
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const CharttimeListToolbar3 = (props) => (
	<Box {...props}>
		<Box
			sx={{
				flex: '1',
				flexDirection: 'row'
			}}
		/>
		<Box sx={{ mt: 3 }}>
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
					<Box>
						최근 10일간, 하루 한건의 데이터
						<Button onClick={() => alert('Click!')}>조회</Button>
					</Box>
				</CardContent>
			</Card>
		</Box>
	</Box>
);

export default CharttimeListToolbar3;
