import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { supabase } from './supabase';
import { Document, Page, Text, View, Font, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';


Font.register({
    family: "Roboto Slab",
    src: "RobotoSlab-SemiBold.ttf"
});
Font.register({
    family: "Calibri",
    src: "calibri.ttf"
});
Font.register({
    family: "Calibri Bold",
    src: "calibrib.ttf"
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
    },
    title: {
        fontSize: 20,
        fontFamily: "Roboto Slab",
        color: '#153D63',
        textAlign: "center",
        marginBottom: 5
    },
    text: {
        fontSize: 12,
        fontFamily: 'Calibri',
        textAlign: 'left',
        lineHeight: 1.2,
        marginBottom: 20
    },
    signoff: {
        fontSize: 12,
        marginTop: 10,
        fontFamily: 'Calibri',
        textAlign: 'right',
        lineHeight: 1.5,
    },
    mydesc: {
        fontSize: 12,
        fontFamily: 'Calibri',
        textAlign: 'center',
        color: '#197097',
        marginBottom: 10
    },
    bold: {
        fontSize: 12,
        fontFamily: 'Calibri Bold',
        // color: '#197097',
        lineHeight: 1.5,
    },
    paragraph: {
        fontSize: 12,
        fontFamily: 'Calibri',
        lineHeight: 1.5,
        marginBottom: 10
    }
});

type MyPDFProps = {
    name: string;
    lastname: string;
    hiringManager: string;
    jobtitle: string;
    companyname: string;
    myaddress: string;
    mylinkedin: string;
    myemail: string;
    companylocation: string;
    date: string;
    ability: any[];
};

const MyPDF = ({
    name, lastname, hiringManager, jobtitle, companyname,
    myaddress, mylinkedin, myemail, companylocation, date, ability }: MyPDFProps) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.title}>{name} {lastname}</Text>
            <Text style={styles.mydesc}>{myaddress} | {myemail} | {mylinkedin}</Text>
            <Text style={styles.signoff}>
                {date}
                {"\n"}{"\n"}
            </Text>
            <Text style={styles.text}>
                {companyname}
                {"\n"}
                {companylocation}
            </Text>



            <View>
                <Text style={styles.paragraph}>
                    Dear {hiringManager}, {"\n"}
                </Text>
                <Text style={styles.paragraph}>
                    I am writing to apply for the <Text style={styles.bold}>{jobtitle}</Text> position listed on LinkedIn. I believe{" "}

                    {ability.map((a, index) => {
                        // Only return the JSX if it's NOT the last index
                        if (index < ability.length - 2) return (
                            <Text key={a.id} style={styles.paragraph}>
                                {a.description},{" "}
                            </Text>
                        );

                        if (index < ability.length - 1) return (
                            <Text key={a.id} style={styles.paragraph}>
                                {a.description}{" "}
                            </Text>
                        );

                        return (
                            <Text key={a.id} style={styles.paragraph}>
                                and {a.description} will make me a great fit for this position. The following are some highlights of my qualifications:
                            </Text>
                        );
                    })}

                </Text>
                {ability.map((a) => (
                    <View>
                        <Text key={a.id} style={styles.bold}>
                            {a.name} {"\n"}
                        </Text>
                        <Text key={a.id} style={styles.paragraph}>
                            {a.content}
                        </Text>
                    </View>
                ))}

                <Text style={styles.paragraph}>
                    Thank you for your time and consideration. I would be thrilled to be able to contribute my skills to {companyname}, and I look forward to the opportunitiy to further discuss
                    my qualification for this position.
                </Text>
            </View>
            <Text style={styles.signoff}>Sincerely,{"\n"} {name} {lastname}</Text>
        </Page>
    </Document>
);

function Home() {
    const [showPreview, setShowPreview] = useState(false)
    // my info
    const [name, setName] = useState("Sophie");
    const [lastname, setLastName] = useState("Hu");
    const [myaddress, setMyaddress] = useState("Vancouver, BC")
    const [mylinkedIn, setLinkedIn] = useState("www.linkedin.com/in/sophiejh")
    const [myemail, setMyemail] = useState("sophiehu.jh@gmail.com")
    // company info
    const [hirename, setHirename] = useState("Hiring Manager");
    const [jobname, setJobName] = useState("")
    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")
    // Date
    const [applyDate] = useState<string>(() => {
        const now = new Date();
        // Options to make it "Readable"
        return now.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    });
    const [applyDateNum] = useState<string>(() => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${year}${month}${day}`;
    });

    const [ability, setAbility] = useState<any[]>([]);
    const [selectedability, setSelectedAbility] = useState<any[]>([]);

    const toggleAbility = (targetAbility: any) => {
        setSelectedAbility((prev) => {
            // Check if the item is already selected
            const isSelected = prev.find((item) => item.id === targetAbility.id);

            if (isSelected) {
                // Remove it if it exists
                return prev.filter((item) => item.id !== targetAbility.id);
            } else {
                // Add it if it doesn't
                return [...prev, targetAbility];
            }
        });
    };



    // get data from supabase
    useEffect(() => {
        const fetchParag = async () => {
            const { data, error } = await supabase
                .from('CoverLetter')
                .select('*')
                .order('id', { ascending: false })

            if (error) {
                console.error(error)
            } else {
                setAbility(data ?? [])
                console.log("ability set!")
            }

        }
        fetchParag()
    }, [])

    useEffect(() => {
        console.log("Ability has been updated:", ability);
    }, [ability]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1280px', margin: '20px auto' }}>

            {ability.map((a) => {
                // Check if this specific item is currently in our selected list
                const isSelected = selectedability.some((item) => item.id === a.id);

                return (
                    <div
                        key={a.id}
                        onClick={() => toggleAbility(a)}
                        className={`ability-item ${isSelected ? 'selected' : ''}`}
                        style={{
                            padding: '10px',
                            margin: '5px',
                            border: isSelected ? '2px solid #b7902e' : '1px solid #ccc',
                            backgroundColor: isSelected ? '#fff4d6' : 'white',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {a.name}
                    </div>
                );
            })}

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
                    <h3>My Address</h3>
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={myaddress}
                        onChange={(e) => setMyaddress(e.target.value)}
                    />
                </div>
                <div>
                    <h3>My LinkedIn</h3>
                    <input
                        type="text"
                        placeholder="Enter linkedin"
                        value={mylinkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                    />
                </div>
                <div>
                    <h3>My Email</h3>
                    <input
                        type="text"
                        placeholder="Enter linkedin"
                        value={myemail}
                        onChange={(e) => setMyemail(e.target.value)}
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

                <div>
                    <h3>Company Address</h3>
                    <input
                        type="text"
                        placeholder="Enter Company Name"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                        companyname={company}
                        myaddress={myaddress}
                        mylinkedin={mylinkedIn}
                        myemail={myemail}

                        companylocation={location}
                        date={applyDate}
                        ability={selectedability}
                    />
                </PDFViewer>
            )}
            <PDFDownloadLink
                document={
                    <MyPDF name={name}
                        lastname={lastname}
                        hiringManager={hirename}
                        jobtitle={jobname}
                        companyname={company}
                        myaddress={myaddress}
                        mylinkedin={mylinkedIn}
                        myemail={myemail}
                        companylocation={location}
                        date={applyDate}
                        ability={selectedability}
                    />
                }
                fileName={`${applyDateNum}_${name}_${company}_cover.pdf`}
            >
                {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
            </PDFDownloadLink>

        </div>
    );
}

export default Home

