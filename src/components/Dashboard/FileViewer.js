import {
	Card,
	CardContent,
} from '@material-ui/core';
import { useState } from 'react';

const FileViewer = () => {
	const [chartData] = useState({
		content: '파일뷰어 들어갈자리.'
	});

	return (
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
				<h3>
					{chartData.content}
				</h3>
			</CardContent>
		</Card>
	);
};

export default FileViewer;
