import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './supabase';
import { Document, Page, Text, View, Font, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';


Font.register({
  family: "Roboto Slab",
  src: "RobotoSlab-SemiBold.ttf"
});
Font.register({
  family: "Calibri",
  src: "calibri.ttf"
});

const styles = StyleSheet.create({
  page: {
    padding: 40
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto Slab",
    color: '#153D63',
    textAlign: "center",
    marginBottom: 20
  },
  text: {
    fontSize: 12,
    fontFamily: 'Calibri',
    textAlign: 'left',
    lineHeight: 1.2,
  },
  signoff: {
    fontSize: 12,
    textAlign: 'right'
  }
});

type MyPDFProps = {
  name: string;
  lastname: string;
  hiringManager: string;
  jobtitle: string;
  companyname: string;
};

const MyPDF = ({ name, lastname, hiringManager, jobtitle, companyname }: MyPDFProps) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>{name} {lastname}</Text>
      <View>
        <Text style={styles.text}>
          Dear {hiringManager}, {"\n"}
          I'm writing to apply for the {jobtitle} Position
        </Text>
      </View>
      <Text style={styles.signoff}>Sincerely,{"\n"} {name} {lastname}</Text>
    </Page>
  </Document>
);

function App() {
  const [showPreview, setShowPreview] = useState(false)
  const [name, setName] = useState("Sophie");
  const [lastname, setLastName] = useState("Hu");
  const [hirename, setHirename] = useState("Hiring Manager");
  const [jobname, setJobName] = useState("")
  const [company, setCompany] = useState("")

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className='text-input'>
        <div>
          <h3>First Name</h3>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h3>Last Name</h3>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <h3>Hiring Manager Name</h3>
          <input
            type="text"
            placeholder="Enter Hiring Manager Name"
            value={hirename}
            onChange={(e) => setHirename(e.target.value)}
          />
        </div>
        <div>
          <h3>Job Name</h3>
          <input
            type="text"
            placeholder="Enter Job Name"
            value={jobname}
            onChange={(e) => setJobName(e.target.value)}
          />
        </div>
        <div>
          <h3>Company Name</h3>
          <input
            type="text"
            placeholder="Enter Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      <button onClick={() => setShowPreview(!showPreview)}>
        {showPreview ? "Hide Preview" : "Show Preview"}
      </button>
      {showPreview && (
        <PDFViewer style={{ width: "100%", height: "600px", marginTop: 20 }}>
          <MyPDF name={name}
            lastname={lastname}
            hiringManager={hirename}
            jobtitle={jobname}
            companyname={company} />
        </PDFViewer>
      )}
    </div>
  );
}

export default App

