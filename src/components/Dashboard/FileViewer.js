import { Card, CardContent, Box, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import Api from '../../Api/Api';

const server_path = 'http://202.31.202.28:443/file/';

const FileViewer = (props) => {
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

  const [file, setFile] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [titleList, setTitleList] = useState([]);

  const processFile = async (event) => {
    const documentFile = event.target.files;
    setLocalFile(documentFile);
    const formData = new FormData();
    for (let i = 0; i < documentFile.length; i++) {
      const fileForm = documentFile[i];
      formData.append('attachments', fileForm);
    }
    let response = await Api.getReadFile(formData);
    if (response.sucess) {
      for (var i = 0; i < documentFile.length; i++) {
        let document_path = response.files[i].file_path.replace('file\\', '');
        let document = server_path + document_path;
        urlList.push(document);

        titleList.push(response.files[i].file_originname);

        file.push(response.files[i].file_id);

        if (response.files[i].file_extension == 'pdf') {
          setFileUrl(document);
        }
      }
      setLocalFileUrl(urlList);
      setf_id(file);
    } else {
      console.log('파일 업로드 실패');
    }
  };

  const deleteFile = (event) => {
    setFileUrl(null);
    setFile(null);
    setLocalFile(null);
    setLocalFileUrl(null);
    setf_id(null);
  };

  function FileTitleList(titleList) {
    if (titleList != null) {
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
  }

  function FileView() {
    if (fileUrl != null) {
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
          {FileView()}
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
  );
};

export default FileViewer;
