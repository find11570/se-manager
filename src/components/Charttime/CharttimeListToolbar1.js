import {
	Box,
	Card,
	CardContent,
	Button,
	TextField,
	InputAdornment,
	SvgIcon,
} from '@material-ui/core';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Search as SearchIcon } from 'react-feather';

const CharttimeListToolbar1 = (props) => {
	const [startDate, setStartDate] = useState(new Date());

	return (
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
							특정 일자의 5개의 센서 데이터 :&nbsp;
							<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
							<Button onClick={() => alert('Click!')}>조회</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default CharttimeListToolbar1;
