import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography
} from '@material-ui/core';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import { red } from '@material-ui/core/colors';

const Budget = (props) => (
	<Card
		sx={{ height: '100%' }}
		{...props}
	>
		<CardContent>
			<Grid
				container
				spacing={3}
				sx={{ justifyContent: 'space-between' }}
			>
				<Grid item>
					<Typography
						color="textSecondary"
						gutterBottom
						variant="h6"
					>
						온도
					</Typography>
					<Typography
						color="textPrimary"
						variant="h3"
					>
						36.8°C
					</Typography>
				</Grid>
				<Grid item>
					<Avatar
						sx={{
							backgroundColor: red[600],
							height: 56,
							width: 56
						}}
					>
						<LocalFloristIcon />
					</Avatar>
				</Grid>
			</Grid>
			<Box
				sx={{
					pt: 2,
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<Typography
					sx={{
						mr: 1
					}}
					variant="body2"
				>
					2021-05-14 12:25:22
				</Typography>
				<Typography
					color="textSecondary"
					variant="caption"
				>
					덕교농장
				</Typography>
			</Box>
		</CardContent>
	</Card>
);

export default Budget;
