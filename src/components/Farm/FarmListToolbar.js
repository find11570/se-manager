import {
	Box,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const FarmListToolbar = (props) => (
	<Box {...props}>
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-end'
			}}
		/>
		<Box sx={{ mt: 3 }}>
			<Card>
				<CardContent>
					<Box>
						<TextField
							fullWidth
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
					</Box>
				</CardContent>
			</Card>
		</Box>
	</Box>
);

export default FarmListToolbar;
