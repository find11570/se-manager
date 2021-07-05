import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import OpacityIcon from '@material-ui/icons/Opacity';

const TotalCustomers = (props) => (
	<Card {...props}>
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
						수분장력값
					</Typography>
					<Typography
						color="textPrimary"
						variant="h3"
					>
						-53625.8
					</Typography>
				</Grid>
				<Grid item>
					<Avatar
						sx={{
							backgroundColor: blue[600],
							height: 56,
							width: 56
						}}
					>
						<OpacityIcon />
					</Avatar>
				</Grid>
			</Grid>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					pt: 2
				}}
			>
				<Typography
					variant="body2"
					sx={{
						mr: 1
					}}
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

export default TotalCustomers;
