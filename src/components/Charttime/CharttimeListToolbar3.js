import {
	Box,
	Card,
	CardContent
} from '@material-ui/core';

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
					<Box>
						최근 10일간, 하루 한건의 데이터
					</Box>
				</CardContent>
			</Card>
		</Box>
	</Box>
);

export default CharttimeListToolbar3;
