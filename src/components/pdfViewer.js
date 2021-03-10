import React, { useState, } from 'react';
import { Page, Document, pdfjs} from 'react-pdf';
import PDFRenderer from '@react-pdf/renderer';
import styled from 'styled-components';
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;
let filePath = `${process.env.PUBLIC_URL}/sample.pdf`;

const PDFButton = styled.a`
  display: inline-block;
  width: 100px;
  border: 1px solid gray;
  background-color: blue;
`;

const Doc = (props)=> <PDFRenderer.Document
        onDocumentLoadSuccess={props.onDocumentLoadSuccess}
      >
        <PDFRenderer.Page pageNumber={props.pageNumber} />
      </PDFRenderer.Document>;

const PDFViewer = (props)=> {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) =>{
    setNumPages(numPages);
  }
  const onNext = ()=>{
    if(pageNumber < numPages)
      setPageNumber(pageNumber+1);
  }
  const onPrev = ()=>{
    if (pageNumber > 1)
      setPageNumber(pageNumber-1);
  }

  return (
    <div>
      <PDFRenderer.PDFDownloadLink  document={<Doc pageNumber={pageNumber}/>} fileName={filePath}>
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFRenderer.PDFDownloadLink>
       
      <PDFButton className="onPrev" onClick={onPrev}>Prev</PDFButton>
      <PDFButton className="onNext" onClick={onNext}>Next</PDFButton>
      <Document
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={e=>console.log(e)}
        file={filePath}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}
export default PDFViewer;

