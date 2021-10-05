import { Helmet } from 'react-helmet';
import { useState } from 'react';

const TeamSpecificQuestion = () => {
	const [value] = useState();

	return (
		<>
			<Helmet>
				<title>TeamSpecificQuestion</title>
			</Helmet>
			<div>{value}</div>
		</>
	);
};

export default TeamSpecificQuestion;
