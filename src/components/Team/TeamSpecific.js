import { Helmet } from 'react-helmet';
import { useState } from 'react';

const TeamSpecific = () => {
	const [value] = useState();

	return (
		<>
			<Helmet>
				<title>teamSpecific</title>
			</Helmet>
			<div>{value}</div>
		</>
	);
};

export default TeamSpecific;
