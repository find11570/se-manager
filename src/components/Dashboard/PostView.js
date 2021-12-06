import { Card, CardContent, Box, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from 'src/Api/Api';
import FileView from 'src/components/Dashboard/FileView';

const people = JSON.parse(sessionStorage.getItem('user_data'));
const server_path = 'http://202.31.202.28:443/file/';

const PostView = (props) => {
  const { project_id, post_id } = props;
  var tempUrl = project_id + ':' + post_id;
  var postUrl = String(tempUrl);
  const [state, setstate] = useState(false);
  const [content, setcontent] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [fileUrl, setFileUrl] = useState([]);
  const [fileTitle, setFileTitle] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [pdfUrl, setPdfUrl] = useState();

  useEffect(async () => {
    let response = await Api.getProject(project_id);
    if (sessionStorage.getItem('user_token')) {
      if (response.data.project.length != 0) {
        response.data.project.project_members.map((m) => {
          if (m.user_id === people.user_id) {
            setstate(true);
          }
        });
      }
    }
    let response2 = await Api.getReadPosting(project_id, post_id);
    setFileList(response2.data.result.files);
    const fileurl_list = [];
    const filetitle_list = [];
    if (response2.data.result.post_content != null)
      setcontent(response2.data.result.post_content);
    for (let i = 0; i < response2.data.result.files.length; i++) {
      if (
        response2.data.result.files[i].file_extension == 'png' ||
        response2.data.result.files[i].file_extension == 'jpg' ||
        response2.data.result.files[i].file_extension == 'jpeg' ||
        response2.data.result.files[i].file_extension == 'gif'
      ) {
        let image_path = response2.data.result.files[i].file_path.replace(
          'file\\',
          ''
        );
        let image = server_path + image_path;
        setImageUrl(image);
      } else if (
        response2.data.result.files[i].file_extension == 'mp4' ||
        response2.data.result.files[i].file_extension == 'avi' ||
        response2.data.result.files[i].file_extension == 'mp3' ||
        response2.data.result.files[i].file_extension == 'mov' ||
        response2.data.result.files[i].file_extension == 'wmv' ||
        response2.data.result.files[i].file_extension == 'webm'
      ) {
        let video_path = response2.data.result.files[i].file_path.replace(
          'file\\',
          ''
        );
        let video = server_path + video_path;
        setVideoUrl(video);
        setVideoTitle(response2.data.result.files[i].file_originname);
      } else {
        let document_path = response2.data.result.files[i].file_path.replace(
          'file\\',
          ''
        );
        let document = server_path + document_path;
        fileurl_list.push(document);
        filetitle_list.push(response2.data.result.files[i].file_originname);
        if (response2.data.result.files[i].file_extension == 'pdf') {
          setPdfUrl(document);
        }
      }
      setFileUrl(fileurl_list);
      setFileTitle(filetitle_list);
    }
  }, []);

  const downloadFileList = fileList.map((file, index) => {
    if (fileList.length - 1 > index) {
      if (!file.file_originname.includes('file__')) {
        let document_path = file.file_path.replace('file\\', '');
        let document = server_path + document_path;
        return (
          <div>
            <p style={{ float: 'left' }}>
              {index + 1} : {file.file_originname} ({file.file_filename})
            </p>
            <button type="button">
              <a type="file" href={document} download>
                download
              </a>
            </button>
          </div>
        );
      } else {
        return;
      }
    }
  });

  function Picture() {
    if (imageUrl != null)
      return (
        <div>
          <Box
            sx={{
              minHeight: '100%',
              py: 3
            }}
          />
          <h4>Reference Img</h4>
          <Box
            sx={{
              minHeight: '100%',
              py: 0.5
            }}
          />
          <img
            src={imageUrl}
            style={{
              width: '70%',
              height: '15%'
            }}
          />
        </div>
      );
  }

  function Screen() {
    if (videoUrl != null)
      return (
        <div className="player-wrapper">
          <Box
            sx={{
              minHeight: '100%',
              py: 3
            }}
          />
          <h4>Video View : {videoTitle}</h4>
          <Box
            sx={{
              minHeight: '100%',
              py: 0.5
            }}
          />
          <video src={videoUrl} width="80%" height="80%" controls></video>
        </div>
      );
  }

  function Viewer() {
    if (fileUrl != null && fileList.length != 0) {
      if (pdfUrl != null) {
        return (
          <div>
            <Box
              sx={{
                minHeight: '100%',
                py: 3
              }}
            />
            <h4>Pdf File View : {fileTitle}</h4>
            <Box
              sx={{
                minHeight: '100%',
                py: 0.5
              }}
            />
            <div>{downloadFileList}</div>
            <FileView fileUrl={pdfUrl} />
          </div>
        );
      }
    }
  }

  function contentView() {
    if (fileList.length == 0) {
      return (
        <div>
          <Box
            sx={{
              minHeight: '100%',
              py: 0.5
            }}
          />
          <h4>Content</h4>
          <Box
            sx={{
              minHeight: '100%',
              py: 0.5
            }}
          />
          <h5>내용이 없습니다.</h5>
        </div>
      );
    }
    if (content != null) {
      return (
        <div>
          <Box
            sx={{
              minHeight: '100%',
              py: 0.5
            }}
          />
          <h4>Content</h4>
          <Box
            sx={{
              minHeight: '100%',
              py: 0.5
            }}
          />
          {content}
        </div>
      );
    } else if (fileUrl == null) {
      return (
        <div>
          <Box
            sx={{
              minHeight: '100%',
              py: 0.5
            }}
          />
          <h4>Content</h4>
          <Box
            sx={{
              minHeight: '100%',
              py: 0.5
            }}
          />
          <h5>내용이 없습니다.</h5>
        </div>
      );
    }
  }

  return (
    <div>
      <div>{contentView()}</div>
      <div>{Picture()}</div>
      <div>{Screen()}</div>
      <div>{Viewer()}</div>
      <div>
        {state ? (
          <Link
            to={{
              pathname: `/app/postUpdate/${postUrl}`,
              state: { index: postUrl }
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                float: 'right'
              }}
            >
              <h3
                style={{
                  color: '#ffffff'
                }}
              >
                수정하기
              </h3>
            </Button>
          </Link>
        ) : (
          <Box
            sx={{
              minHeight: '100%'
            }}
          />
        )}
      </div>
      <Box
        sx={{
          minHeight: '100%',
          py: 3
        }}
      />
    </div>
  );
};

export default PostView;
