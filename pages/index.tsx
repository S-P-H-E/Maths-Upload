import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { HiLockClosed } from 'react-icons/hi'

export default function Home() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [inputStyle, setInputStyle] = useState('border border-[#D6D7DA] rounded-md px-3 py-2 w-full text-2xl my-4 shadow-sm placeholder:text-[#808B96] focus:outline-[#3063D6]')

  const handleUnlock = () => {
    if (password === '13596') {
      localStorage.setItem('unlocked', 'true')
      router.push('/upload')
    } else {
      setErrorMessage('Incorrect password!')
      setInputStyle('border border-red-500 rounded-md px-3 py-2 w-full text-2xl my-4 shadow-sm placeholder:text-red-500 focus:outline-red-500')
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setErrorMessage('')
    setInputStyle('border border-[#D6D7DA] rounded-md px-3 py-2 w-full text-2xl my-4 shadow-sm placeholder:text-[#808B96] focus:outline-[#3063D6]')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUnlock()
    }
  }

  return (
    <>
      <Head>
        <title>Unlock</title>
        <meta name="description" content="Upload maths documents" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-[#EDEFF1] h-screen flex justify-center items-center'>
        <div className='p-5 bg-white rounded-xl flex flex-col justify-center items-center'>
        {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>}
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            className={inputStyle}
          />
          <div className='flex justify-center items-center w-full'>
            <button
              className='bg-[#3063D6] text-white rounded-xl px-4 py-2 shadow-sm w-full flex justify-center items-center gap-2'
              onClick={handleUnlock}
            >
              <HiLockClosed/>
              Unlock
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
