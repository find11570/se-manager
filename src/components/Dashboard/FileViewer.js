import { Card, CardContent, Box, Button } from '@material-ui/core';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Api from '../../Api/Api';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const server_path = 'http://202.31.202.28:443/file/';

const FileViewer = () => {
	const [chartData] = useState({
		content: '파일뷰어 들어갈자리.'
	});
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

	const [file, setFile] = useState();
	const [fileUrl, setFileUrl] = useState(null);

	const processFile = async (event) => {
		const documentFile = event.target.files[0];
		const documentUrl = URL.createObjectURL(documentFile);
		setFile(documentFile);
		setFileUrl(documentUrl);
		const formData = new FormData();
		formData.append('attachments', documentFile);
		let response = await Api.getReadFile(formData);
		if (response.sucess) {
			let document_path = response.files[0].file_path.replace('file\\', '')
			let document = server_path + document_path;
			setFileUrl(document);
		} else {
			console.log('파일 업로드 실패');
		}
	};

	const deleteFile = (event) => {
		setFileUrl('');
		setFile(null);
	};

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
						파일 업로드
					</h3>
				</label>
				<input
					type="file"
					id="file"
					style={{
						color: '#ffffff',
						display: 'none'
					}}
					onChange={processFile}
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

        <Document
          file={fileUrl}
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
      </CardContent>
    </Card>
  );
};

export default FileViewer;
