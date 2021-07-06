import {
	Box,
	Card,
	CardContent
} from '@material-ui/core';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CharttimeListToolbar4 = (props) => {
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
						<Box>
							특정 일자의 시간별 센서 데이터 :&nbsp;
							<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default CharttimeListToolbar4;
