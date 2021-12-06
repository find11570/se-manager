import { Card, CardContent, Box, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Api from 'src/Api/Api';

const server_path = 'http://202.31.202.28:443/file/';

const Video = () => {
  const [videoUrl, setvideoUrl] = useState();
  const [videoTitle, setvideoTitle] = useState();

  useEffect(() => {
    if (videoUrl != null) setvideoUrl(videoUrl);
    if (videoTitle != null) setvideoTitle(videoTitle);
  }, [videoUrl]);

  const processVideo = async (event) => {
    const videoFile = event.target.files[0];
    props.setvideo(videoFile);
    const formData = new FormData();
    formData.append('attachments', videoFile);
    let response = await Api.getReadFile(formData);
    if (response.sucess) {
      console.log(response);
      let video_path = response.files[0].file_path.replace('file\\', '');
      let video = server_path + video_path;
      props.setVideovideoUrl(video);
      setvideoUrl(video);
      setvideoTitle(response.files[0].file_originname);
      props.setv_id(response.files[0].file_id);
    } else {
      console.log('비디오 업로드 실패');
    }
  };

  const deleteVideo = (event) => {
    props.setVideovideoUrl(null);
    setvideoUrl(null);
    props.setvideo(null);
    props.setv_id(null);
  };

  function FilevideoTitle(videoTitle) {
    if (videoTitle != null) {
      return (
        <div>
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
              <div>
                <h4>Upload Video</h4>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.2
                  }}
                />
                <h5
                  style={{
                    color: 'gray'
                  }}
                >
                  동영상을 업로드 해주세요
                </h5>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 1.5
                  }}
                />
                <h5>{videoTitle}</h5>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  function Screen() {
    if (videoUrl != null) {
      return (
        <div>
          <Box
            sx={{
              minHeight: '100%',
              py: 1.5
            }}
          />
          <h4>PreView</h4>
          <Box
            sx={{
              minHeight: '100%',
              py: 1.5
            }}
          />
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player fixed-bottom"
              url={videoUrl}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        </div>
      );
    }
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
          {FilevideoTitle(videoTitle)}
          {Screen()}
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
              htmlFor="videofile"
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
              id="videofile"
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
        <Box
          sx={{
            minHeight: '100%',
            py: 0.5
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Video;
