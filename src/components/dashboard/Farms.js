import { Component } from 'react';

function Farms() {
	const [data, newData] = useState(null);
	useEffect(() => {
		fetch(URL)
			.then((response) => response.text())
			.then((response) => newData(response));
	}, []);
	return <div>{data ? data : 'No data yet...'}</div>;
}
