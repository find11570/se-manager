
import { Card, CardContent, Box, Button } from '@material-ui/core';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import Api from '../../Api/Api';

const server_path = 'http://202.31.202.28:443/file/';

const Video = () => {
	const [chartData] = useState({
		videoPath: 'file:///C:\Users\Administrator\Documents\GitHub\se-manager\src\components\Dashboard\video.mp4'
	});

	const [videofile, setVideofile] = useState();
	const [fileUrl, setFileUrl] = useState(null);

	const processVideo = async (event) => {
		const videoFile = event.target.files[0];
		const videoUrl = URL.createObjectURL(videoFile);
		setVideofile(videoFile);
		setFileUrl(videoUrl);
		const formData = new FormData();
		formData.append('attachments', videoFile);
		let response = await Api.getReadFile(formData);
		if (response.sucess) {
			let video_path = response.files[0].file_path.replace('file\\', '')
			let video = server_path + video_path;
			setFileUrl(video);
		} else {
			console.log('비디오 업로드 실패');
		}
	};

	const deleteVideo = (event) => {
		setFileUrl('');
		setVideofile(null);
	};

	function Screen() {
		return (
			<div className='player-wrapper'>
			  <ReactPlayer
				className='react-player fixed-bottom'
				url= {fileUrl}
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
				<div className="video__box">
					<Box
						sx={{
							minHeight: '100%',
							py: 1.5
						}}
					/>
					<Button
						variant="contained"
						size="small"
						color="info"
						sx={{
							marginTop: 2,
							width: 180
						}}
					>
						<label
							htmlFor="file"
							style={{
								width: 100
							}}
						>
							<h3
								style={{
									color: '#ffffff'
								}}
							>
								비디오 업로드
							</h3>
						</label>
						<input
							type="file"
							id="file"
							accept="video/*"
							style={{
								color: '#ffffff',
								display: 'none'
							}}
							onChange={processVideo}
						></input>
					</Button>
					<Box
						sx={{
							minHeight: '100%',
							py: 0.5
						}}
					/>
					<Button
						variant="contained"
						size="small"
						color="success"
						sx={{
							marginTop: 2,
							width: 180
						}}
						onClick={deleteVideo}
					>
						<h3
							style={{
								color: '#ffffff'
							}}
						>
							비디오 삭제
						</h3>
					</Button>
				</div>

				{Screen()}
			</CardContent>
		</Card>
	);
};

export default Video;
