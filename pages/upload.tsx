import Head from 'next/head'
import Link from 'next/link'
import { FiUpload } from 'react-icons/fi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Upload() {
    const router = useRouter()

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
          <div className='border-t border-[#EBECF0] py-3 flex flex-col gap-5'>
            <div>
              <h1>Name</h1>
              <input type='text' placeholder='Your files name' className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full text-[14px] my-2 shadow-sm placeholder:text-[#808B96] focus:outline-[#3063D6]'/>
            </div>
            <div>
              <h1>Topic</h1>
              <select className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full focus:outline-[#3063D6] text-[14px] my-2 shadow-sm'>
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
              <select className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full focus:outline-[#3063D6] text-[14px] my-2 shadow-sm'>
                <option value="grade10">Grade 10</option>
                <option value="grade11">Grade 11</option>
                <option value="grade12">Grade 12</option>
              </select>
            </div>
            <div>
              <h1>Term</h1>
              <select className='border border-[#D6D7DA] rounded-md px-3 py-2 w-full focus:outline-[#3063D6] text-[14px] my-2 shadow-sm'>
                <option value="term1">Term 1</option>
                <option value="term2">Term 2</option>
                <option value="term3">Term 3</option>
                <option value="term4">Term 4</option>
              </select>
            </div>
          </div> 
          <div className='flex justify-end gap-3'>
            <button className='border border-[#D6D7DA] rounded-xl px-4 py-2 shadow-sm' onClick={handleLogOut}>Log Out</button>
            <button className='bg-[#3063D6] text-white rounded-xl px-4 py-2 shadow-sm'>Import</button>
          </div>
        </div>
      </div>
    </>
  )
}
