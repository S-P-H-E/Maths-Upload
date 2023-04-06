import Head from 'next/head'
import Link from 'next/link'
import { FiUpload } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSpring, animated, config } from 'react-spring';
import { Button, Progress, Space, message, notification } from 'antd'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FilePdfTwoTone, LinkOutlined } from '@ant-design/icons'
import { storage, db } from '@/firebase.Config';
import { addDoc, collection } from 'firebase/firestore';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};


export default function Upload() {
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [progressUpload, setProgressUpload] = useState(0);
    const [downloadURL, setDownloadURL] = useState();
    const [name, setName] = useState();
    const [fileName, setFileName] = useState();
    const [pdfFile, setPdfFile] = useState();
    const router = useRouter();

    const [showProgressBar, setShowProgressBar] = useState(false);


    const openLink = () => {
      const newWindow = window.open(downloadURL, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    };    

    const addDocumentToCollection = async (collectionName, data) => {
      try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
      const key = `open${Date.now()}`;
      const btn = (
        <Space>
          <button type="link" size="small" onClick={() => api.destroy()} className='border border-[#D6D7DA] rounded-xl px-4 py-2 shadow-sm'>
            Close
          </button>
          <button type="primary" size="small" onClick={() => openLink()} className='bg-[#1D1D21] text-white rounded-xl px-4 py-2 shadow-sm'>
            Open
          </button>
        </Space>
      );
      api.open({
        message: 'File Link Available',
        description:
          'The file has been uploaded to firebase and the link is now available',
        btn,
        key,
        onClose: close,
      });
    };

    useEffect(() => {
        const unlocked = localStorage.getItem('unlocked')
        if (!unlocked || unlocked !== 'true') {
            router.push('/')
        }
    }, [])

    const handleLogOut = () => {
        localStorage.setItem('unlocked', 'locked')
        router.push('/')
    }

    const handleNameChange = (names) => {
      setName(names)
    }

    const handlefileName = (names) => {
      setFileName(names)
    }

    const handleFileChange = (files) => {
      if (files && files[0].size < 10000000) {
        setPdfFile(files[0]);

        console.log(files[0]);
        } else {
            message.error("File size too large");
        }
    }

    const [showName, setShowName] = useState(false);

    useEffect(() => {
      if (name) {
        setShowName(true);
      } else {
        setShowName(false);
      }
    }, [name]);
    

    //Animation
    const popUpAnimation = useSpring({
        from: { opacity: 0, transform: 'scale(0)' },
        to: { opacity: 1, transform: 'scale(1)' },
        delay: 0,
      });

      const fadeInAnimation = useSpring({
        opacity: showName ? 1 : 0,
        config: { duration: 200 },
        reset: true,
      });
    

      const handleUploadFile = (names) => {
        if (pdfFile) {
          setShowProgressBar(true);
      
          const val = Math.floor(1000 + Math.random() * 9000);
          console.log(val);
      
          const name = `${names} ${val}.pdf`;
          const storageRef = ref(storage, `${selectedGrade}/${selectedTerm}/${name}`);
          const uploadTask = uploadBytesResumable(storageRef, pdfFile);
      
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
              setProgressUpload(progress);
      
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              message.error(error.message);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setDownloadURL(url);
                setTimeout(() => {
                  message.success("Uploaded Successfully");
                }, 50);
      
                // Call the function to add the document to the collection
                addDocumentToCollection(selectedGrade, {
                  name: names,
                  link: url,
                  term: selectedTerm,
                  topic: selectedTopic,
                });
              });
            }
          );
        } else {
          message.error("File not found");
        }
      };      

  return (
    <>
    {contextHolder}
      <Head>
        <title>Upload Document</title>
        <meta name="description" content="Upload maths documents" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-[#1D1D21] h-screen flex justify-center items-center'>
        
        <animated.div style={popUpAnimation} className='p-5 bg-white rounded-xl'>
          <h1>Upload Document</h1>
          <div className='w-[350px] border-dashed border-2 border-[#DEDDDF] p-5 rounded-md my-3'>
            <input type='file' accept='application/pdf' className='w-full file:bg-[#DEDDDF] file:border-0 file:rounded-full file:px-4 file:py-2 file:mr-4 file:transition-all file:hover:bg-[#c8c8c8]' onChange={(files) => handleFileChange(files.target.files)}/>
          </div>
            {
              pdfFile && 
              <>
                {
                  name &&
                  <>
                    <animated.div style={fadeInAnimation} className='bg-[#DEDDDF] p-4 my-2 rounded-md flex flex-col justify-start items-center'>
                      <div className='flex flex-col justify-start items-center w-full'>
                        <div className='flex justify-start items-center w-full gap-1'>
                          <FilePdfTwoTone twoToneColor="#ff1919"/>
                          <h1 className='text-xl mx-1'>{name}.pdf</h1>
                        </div>
                      </div>
                      {
                        showProgressBar && <Progress percent={progressUpload} className='px-1' status="active"/>
                      }
                    </animated.div>
                  </>
                }
              </>
            }
          <div className='border-t border-[#EBECF0] py-3 flex flex-col gap-4'>
            <div>
              <h1>Name</h1>
              <input type='text' placeholder='Your files name' maxlength='20' className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full text-[14px] my-2 shadow-sm placeholder:text-[#808B96] focus:outline-[#1D1D21]' onChange={(names) => handleNameChange(names.target.value)}/>
            </div>
            <div>
              <h1>Topic</h1>
              <select
                className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full focus:outline-[#1D1D21] text-[14px] my-2 shadow-sm'
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value)}
              >
                <option value="">- Select -</option>
                <option value="algebra">Algebra</option>
                <option value="analytical geometry">Analytical Geometry</option>
                <option value="euclidean geometry">Euclidean Geometry</option>
                <option value="finance">Finance</option>
                <option value="functions and graphs">Functions and Graphs</option>
                <option value="patterns">Patterns</option>
                <option value="probability">Probability</option>
                <option value="statistics">Statistics</option>
                <option value="trigonometry">Trigonometry</option>
                <option value="measurement">Measurement</option>
                <option value="revision">Revision</option>
                <option value="not applicable">Not Applicable</option>
              </select>
            </div>
            <div>
              <h1>Grade</h1>
              <select
                className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full focus:outline-[#1D1D21] text-[14px] my-2 shadow-sm'
                value={selectedGrade}
                onChange={(event) => setSelectedGrade(event.target.value)}
              >
                <option value="null">- Select -</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            <div>
              <h1>Term</h1>
              <select
                className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full focus:outline-[#1D1D21] text-[14px] my-2 shadow-sm'
                value={selectedTerm}
                onChange={(event) => setSelectedTerm(event.target.value)}
              >
                <option value="null">- Select -</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>
          </div> 
          <div className='flex justify-end gap-3'>
            <button className='border border-[#D6D7DA] rounded-xl px-4 py-2 shadow-sm' onClick={handleLogOut}>Log Out</button>
            <button className='bg-[#1D1D21] text-white rounded-xl px-4 py-2 shadow-sm' onClick={() => handleUploadFile(name)}>Import</button>
          </div>
        </animated.div>
      </div>
    </>
  )
}