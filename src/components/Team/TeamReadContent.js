import {
	Box,
	Card,
	CardContent,
	Hidden,
	Avatar,
	Grid
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const TeamReadContent = (props) => {
	const {
		id,
		title,
		tag,
		currentpeople,
		Maxpeople,
		date
	} = props;

	return (
		<Grid
			key={id}
			item
			lg={3}
			md={4}
			sm={5}
			xs={12}
		>
			<Link to=
				{{
					pathname: `/se/teamSpecific/${id}`,
					state: { index: id },
				}}
			>
				<Card
					sx={{
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10,
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						boxShadow: 5
					}}
				>
					<CardContent>
						<Box
							sx={{
								height: 110,
								position: 'relative',
							}}
						>
							<h3 style={{ color: 'red', float: 'right' }}>
								D-
								{date}
							</h3>
							<h2 style={{ color: '#006400', paddingTop: 30 }}>
								{title}
							</h2>
							<h4 style={{ paddingTop: 20 }}>
								#&nbsp;
								<Box
									sx={{
										backgroundColor: 'primary.smoothgreen',
										display: 'inline-block',
										textAlign: 'center',
										marginRight: 2,
										borderBottomRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderTopRightRadius: 5,
										borderTopLeftRadius: 5,
										borderColor: 'primary.main',
										paddingLeft: 1,
										paddingRight: 1,
										boxShadow: 1
									}}
								>
									{tag}
								</Box>
							</h4>
							<h4 style={{
									color: 'red',
									display: 'inline-block',
									float: 'right'
								}}
								>
									{currentpeople}
									/
									{Maxpeople}
							</h4>
							<Box
								sx={{
									py: 1,
								}}
							/>
						</Box>
					</CardContent>
				</Card>
			</Link>
		</Grid>
	);
};

export default TeamReadContent;
