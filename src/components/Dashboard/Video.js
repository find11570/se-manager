
import {
	Card,
	CardContent,
} from '@material-ui/core';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import video from 'src/components/Dashboard/video.mp4';

const Video = () => {
	const [chartData] = useState({
		videoPath: 'file:///C:\Users\Administrator\Documents\GitHub\se-manager\src\components\Dashboard\video.mp4'
	});

	function Screen() {
		return (
			<div className='player-wrapper'>
			  <ReactPlayer
				className='react-player fixed-bottom'
				url= {video}
				width='100%'
				height='100%'
				controls = {true}
			  />
			</div>
		);
	}

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
				{Screen()}
			</CardContent>
		</Card>
	);
};

export default Video;
