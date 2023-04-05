import Head from 'next/head'
import { FiUpload } from 'react-icons/fi'

export default function Home() {
  return (
    <>
      <Head>
        <title>Upload Document</title>
        <meta name="description" content="Upload maths documents" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-[#EDEFF1] h-screen flex justify-center items-center'>
        
        <div className='p-5 bg-white rounded-xl'>
          <h1>Upload Document</h1>
          <div className='p-10 my-5 flex flex-col justify-center items-center border-dashed border-2 border-[#DEDDDF] rounded-xl cursor-pointer select-none'>
            <FiUpload size={23} className='text-[#838891] my-2'/>
            <h1 className='my-2 text-[15px] md:text-md'>Drag & Drop or <mark className='text-[#3063D6] bg-transparent'>Choose a file</mark> to upload</h1>
            <h2 className='text-[#838891] my-2'>PDF</h2>
            
          </div>
          <div className='border-t border-[#EBECF0] py-3 flex flex-col gap-4'>
            <div>
              <h1>Name</h1>
              <input type='text' placeholder='Your files name' className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full text-[14px] my-2 shadow-sm placeholder:text-[#808B96] focus:outline-[#3063D6]'/>
            </div>
            <div>
              <h1>Grade</h1>
              <select className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full focus:outline-[#3063D6] text-[14px] my-2 shadow-sm'>
                <option value="grade10">Grade 10</option>
                <option value="grade11">Grade 11</option>
                <option value="grade12">Grade 12</option>
              </select>
            </div>
          </div> 
          <div className='flex justify-end gap-3'>
            <button className='border border-[#D6D7DA] rounded-xl px-4 py-2 shadow-sm'>Cancel</button>
            <button className='bg-[#3063D6] text-white rounded-xl px-4 py-2 shadow-sm'>Import</button>
          </div>
        </div>
      </div>
    </>
  )
}
