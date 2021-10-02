import { Helmet } from 'react-helmet';
import { useState } from 'react';

const Dashboard = () => {
	const [value] = useState();

	return (
		<>
			<Helmet>
				<title>Main</title>
			</Helmet>
			<div>{value}</div>
		</>
	);
};

export default Dashboard;
