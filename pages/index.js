import { message } from 'antd';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSpring, animated, config } from 'react-spring';

export default function Home() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [inputStyle, setInputStyle] = useState('text-white bg-transparent rounded-full pl-6 py-3 w-full text-md placeholder:text-[#808B96] outline-none')

  const handleUnlock = () => {
    if (password === '13596') {
      localStorage.setItem('unlocked', 'true')
      message.success('Login Successful')
      router.push('/upload')
    } else {
      setErrorMessage('Incorrect password!')
      message.error('Incorrect password!')
      setInputStyle('text-white bg-transparent rounded-full pl-6 py-3 w-full text-md shadow-sm placeholder:text-red-500 outline-none')
      document.getElementById('passwordContainer').style.border = '1px solid red';
    }
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setErrorMessage('')
    setInputStyle('text-white bg-transparent rounded-full pl-6 py-3 w-full text-md placeholder:text-[#808B96] outline-none')
    document.getElementById('passwordContainer').style.border = 'none';
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleUnlock()
    }
  }

  //Animation
  const popUpAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(300px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 0,
  });

  return (
    <>
      <Head>
        <title>Unlock</title>
        <meta name="description" content="Upload maths documents" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-[#1D1D21] h-screen flex flex-col justify-center items-center'>
        <animated.div style={popUpAnimation}>
          <h1 className='text-white text-[25px] md:text-5xl m-10 text-center font-medium'>Please enter password<br /> to access <mark className='bg-transparent text-[#9B9AAA]'>upload console</mark></h1>
          {/* {errorMessage && <p className='text-red-500 text-sm w-full text-center m-2'>{errorMessage}</p>} */}
          <div id="passwordContainer" className='flex justify-center items-center bg-[#292B34] rounded-full'>
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
              className={inputStyle}
            />
            <div className='flex justify-center items-center'>
              <button
                className='bg-white text-black rounded-full px-11 py-3'
                onClick={handleUnlock}
              >
                Unlock
              </button>
            </div>
          </div>
        </animated.div>
      </div>
    </>
  )
}
