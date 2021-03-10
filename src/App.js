import PDFViewer from './components/pdfViewer';

const App = ()=> {
  return (
    <div className="App" style={{height: "100%", width: "80%", margin: "0 auto", backgroundColor: "green"}}>
      <header className="App-header">
        <PDFViewer/>
      </header>
    </div>
  );
}


export default App;
