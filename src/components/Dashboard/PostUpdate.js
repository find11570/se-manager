import 'date-fns';
import { Helmet } from 'react-helmet';
import { useState, React, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  Button
} from '@material-ui/core';
import Api from 'src/Api/Api';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const server_path = 'http://202.31.202.28:443/file/';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const PostUpdate = () => {
  const postUrl = location.href
    .split('/')
    [location.href.split('/').length - 1].split('.')[0];
  const project_id = postUrl.split(':')[0];
  const post_id = postUrl.split(':')[1];

  // 제목 내용
  const [title, settitle] = useState();
  // 글 내용
  const [content, setcontent] = useState();
  // 사진 내용
  const [image, setimage] = useState();
  const [imageFileUrl, setImageFileUrl] = useState();
  const [i_id, seti_id] = useState();
  // 동영상 내용
  const [video, setvideo] = useState();
  const [videoFileUrl, setVideoFileUrl] = useState();
  const [v_id, setv_id] = useState();
  const [videoTitle, setVideoTitle] = useState();

  // 파일 뷰어 내용
  const [fileUrl, setFileUrl] = useState([]);
  const [f_id, setf_id] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [localFile, setLocalFile] = useState([]);
  const [urlList, setUrlList] = useState([]);

  useEffect(async () => {
    let response = await Api.getReadPosting(project_id, post_id);
    settitle(response.data.result.post_title);
    if (response.data.result.post_content != null) {
      setcontent(response.data.result.post_content);
    }
    if (response.data.result.files != null) {
      const data_files = response.data.result.files;
      data_files.map((file) => {
        //image일때
        if (
          file.file_extension == 'png' ||
          file.file_extension == 'jpg' ||
          file.file_extension == 'jpeg' ||
          file.file_extension == 'gif'
        ) {
          let image_path = file.file_path.replace('file\\', '');
          let image = server_path + image_path;
          setimage(image);
          setImageFileUrl(image);
          seti_id(file.file_id);
        }
        //video일때
        else if (
          file.file_extension == 'mp4' ||
          file.file_extension == 'mp3' ||
          file.file_extension == 'avi' ||
          file.file_extension == 'mov' ||
          file.file_extension == 'wmv' ||
          file.file_extension == 'webm'
        ) {
          let video_path = file.file_path.replace('file\\', '');
          let video = server_path + video_path;
          setvideo(video);
          setVideoFileUrl(video);
          setv_id(file.file_id);
          setVideoTitle(file.file_originname);
        } else {
          f_id.push(file.file_id);
          titleList.push(file.file_originname);
          if (file.file_extension == 'pdf') {
            let pdf_path = file.file_path.replace('file\\', '');
            let pdf = server_path + pdf_path;
            setFileUrl(pdf);
          }
        }
      });
    }
  }, []);

  // 게시글 수정버튼 OnClick 함수
  const postUpdate = async () => {
    const p_list = [];

    if (i_id != null) {
      p_list.push(i_id);
    }
    if (v_id != null) {
      p_list.push(v_id);
    }
    if (f_id != null) {
      for (let i = 0; i < f_id.length; i++) {
        p_list.push(f_id[i]);
      }
    }

    const reqObject = {
      post_title: title,
      post_content: content,
      post_files: p_list
    };
    console.log(reqObject);
    let response2 = await Api.postUpdatePosting(project_id, post_id, reqObject);
    console.log(response2);
    if (response2.sucess) {
      alert('수정되었습니다.');
      var target = '/app/projectDetail/' + project_id;
      window.location.href = target;
    } else {
      alert('수정 실패');
    }
  };

  // title 중복 검사
  const handletitleChange = async (event) => {
    settitle(event.currentTarget.value);
  };

  const handlecontentChange = async (event) => {
    setcontent(event.currentTarget.value);
  };

  // 사진 첨부
  const processImage = async (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setimage(imageFile);
    setImageFileUrl(imageUrl);
    const formData = new FormData();
    formData.append('attachments', imageFile);
    let response = await Api.getReadFile(formData);
    if (response.sucess) {
      let image_path = response.files[0].file_path.replace('file\\', '');
      let image = server_path + image_path;
      setimage(image);
      seti_id(response.files[0].file_id);
    } else {
      console.log('이미지 업로드 실패');
    }
  };

  const deleteImage = (event) => {
    setImageFileUrl(null);
    setimage(null);
    seti_id(null);
  };

  // 동영상 첨부
  const processVideo = async (event) => {
    const videoFile = event.target.files[0];
    const videoUrl = URL.createObjectURL(videoFile);
    setvideo(videoFile);
    setVideoFileUrl(videoUrl);
    const formData = new FormData();
    formData.append('attachments', videoFile);
    let response = await Api.getReadFile(formData);
    if (response.sucess) {
      let video_path = response.files[0].file_path.replace('file\\', '');
      let video = server_path + video_path;
      setVideoFileUrl(video);
      setVideoTitle(response.files[0].file_originname);
      setv_id(response.files[0].file_id);
    } else {
      console.log('비디오 업로드 실패');
    }
  };

  const deleteVideo = (event) => {
    setVideoFileUrl(null);
    setvideo(null);
    setv_id(null);
    setVideoTitle(null);
  };

  function FilevideoTitle(videoTitle) {
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

  function Screen() {
    if (videoFileUrl != null) {
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
            <video src={videoFileUrl} width="80%" height="80%" controls></video>
          </div>
        </div>
      );
    }
  }

  // 파일 첨부
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const processFile = async (event) => {
    const documentFile = event.target.files;
    setLocalFile(documentFile);
    const formData = new FormData();
    for (let i = 0; i < documentFile.length; i++) {
      const fileForm = documentFile[i];
      formData.append('attachments', fileForm);
    }
    let response = await Api.getReadFilePDF(formData);
    console.log(response);

    if (response.sucess && response.sucess) {
      titleList.length = 0;
      for (var i = 0; i < documentFile.length; i++) {
        titleList.push(response.files[i].file_originname);
      }

      for (var i = 0; i < response.files.length; i++) {
        let document_path = response.files[i].file_path.replace('file\\', '');
        let document = server_path + document_path;
        localFile.push(response.files[i].file_id);
        urlList.push(document);
        if (response.files[i].file_extension == 'pdf') {
          setFileUrl(document);
        }
      }
      setLocalFile(localFile);
      setFileUrl(urlList);
      setf_id(localFile);
      setTitleList(titleList);
    } else {
      console.log('파일 업로드 실패');
    }
  };

  const deleteFile = (event) => {
    setFileUrl([]);
    setLocalFile([]);
    setf_id([]);
    setTitleList([]);
  };

  function FileTitleList(titleList) {
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
              <h4>Upload File List</h4>
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
                파일을 업로드 해주세요
              </h5>
              <Box
                sx={{
                  minHeight: '100%',
                  py: 1.5
                }}
              />
              <h5>{titleList.join(', ')}</h5>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  function FileView() {
    if (fileUrl.length !== 0) {
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
          <Document
            file={fileUrl}
            width="100%"
            height="100%"
            onLoadError={console.error}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p>
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>PostUpdate</title>
      </Helmet>
      <Box>
        <Box
          sx={{
            minHeight: '100%',
            py: 3
          }}
        />
        <Grid item lg={10} md={10} sm={12} xs={12}>
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
              <h2 style={{ color: '#006400' }}>게시글 수정</h2>
              <Box
                sx={{
                  minHeight: '100%',
                  py: 2,
                  borderBottom: '1px solid grey'
                }}
              />
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  paddingLeft: 0.5
                }}
              >
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 1.5
                  }}
                />
                <h3>게시글 제목</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  value={title || ''}
                  variant="outlined"
                  onChange={handletitleChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>게시글 내용</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  fullWidth
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  value={content}
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handlecontentChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>사진 첨부</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <Grid item lg={3} md={3} sm={6} xs={12}>
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
                      <div className="img__box">
                        <img
                          src={imageFileUrl}
                          style={{
                            width: '100%',
                            height: '15%'
                          }}
                        />
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
                              사진 선택
                            </h3>
                          </label>
                          <input
                            type="file"
                            id="file"
                            accept="image/*"
                            style={{
                              color: '#ffffff',
                              display: 'none'
                            }}
                            onChange={processImage}
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
                          onClick={deleteImage}
                        >
                          <h3
                            style={{
                              color: '#ffffff'
                            }}
                          >
                            기본 이미지로 변경
                          </h3>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>동영상 첨부</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <Grid>
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
                </Grid>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>파일 첨부</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <Grid>
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
                      <div className="file__box">
                        {FileTitleList(titleList)}
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
                            htmlFor="localfile"
                            style={{
                              width: 100
                            }}
                          >
                            <h3
                              style={{
                                color: '#ffffff'
                              }}
                            >
                              파일 업로드
                            </h3>
                          </label>
                          <input
                            type="file"
                            id="localfile"
                            style={{
                              color: '#ffffff',
                              display: 'none'
                            }}
                            onChange={processFile}
                            multiple
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
                          onClick={deleteFile}
                        >
                          <h3
                            style={{
                              color: '#ffffff'
                            }}
                          >
                            파일 삭제
                          </h3>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={postUpdate}
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
              </Box>
              <Box
                sx={{
                  minHeight: '100%',
                  py: 4
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Box
          sx={{
            minHeight: '100%',
            py: 3
          }}
        />
      </Box>
    </>
  );
};

export default PostUpdate;
