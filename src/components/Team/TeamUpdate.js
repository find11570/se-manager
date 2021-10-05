import { Helmet } from 'react-helmet';
import { useState } from 'react';

const TeamUpdate = () => {
	const [value] = useState();

	return (
		<>
			<Helmet>
				<title>Update</title>
			</Helmet>
			<div>{value}</div>
		</>
	);
};

export default TeamUpdate;
