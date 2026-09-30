import React from 'react'

const Start = () => {
  return (
    <div>
      <div style={{ backgroundImage: `url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)` }} className='bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-20   ml-8' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold'>Get started with Uber</h2>
          <a href="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</a>
        </div>

      </div>
    </div>
  )
}

export default Start