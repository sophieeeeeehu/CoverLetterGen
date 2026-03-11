import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './supabase';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20
  },
  text: {
    fontSize: 12,
    color: "gray"
  }
});

const MyPDF = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>My Report</Text>

      <View>
        <Text style={styles.text}>
          This PDF was generated using React + TypeScript.
        </Text>
      </View>
    </Page>
  </Document>
);

function App() {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div>
      <button onClick={() => setShowPreview(!showPreview)}>
        {showPreview ? "Hide Preview" : "Show Preview"}
      </button>
      {showPreview && (
        <PDFViewer style={{ width: "100%", height: "600px", marginTop: 20 }}>
          <MyPDF />
        </PDFViewer>
      )}
      <PDFDownloadLink document={<MyPDF />} fileName="report.pdf">
        Download PDF
      </PDFDownloadLink>
    </div>
  );
}

export default App

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
