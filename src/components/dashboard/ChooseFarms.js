import {
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useEffect } from 'react';

const LatestOrders = (props) => {
	const { value, setvalue } = props;

	const handleChange = (event) => {
		setvalue(event.target.value);
		console.log(value);
	};

	useEffect(() => {
	}, [value]);

	return (
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
						value={value || ''}
						name="farm"
						onChange={handleChange}
						placeholder="찾아볼 농장 입력"
						variant="outlined"
					/>
				</CardContent>
			</Card>
		</Card>
	);
};

export default LatestOrders;
