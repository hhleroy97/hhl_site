import React from 'react'

const SimpleTest: React.FC = () => {
  return (
    <div className='min-h-screen bg-black p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-white text-4xl mb-8'>SIMPLE TEST COMPONENT</h1>

        {/* Header */}
        <div className='bg-red-500 p-4 mb-4 text-white'>
          <h2>HEADER SECTION</h2>
          <p>This should be red</p>
        </div>

        {/* Main Container */}
        <div className='bg-purple-500 p-6 mb-4'>
          <h2 className='text-white mb-4'>MAIN CONTAINER (Purple)</h2>

          {/* Work Experience Box */}
          <div className='bg-blue-500 p-4 mb-4'>
            <h3 className='text-white mb-2'>WORK EXPERIENCE (Blue)</h3>
            <div className='grid grid-cols-3 gap-2'>
              <div className='bg-blue-300 p-2 text-black'>Box 1</div>
              <div className='bg-blue-300 p-2 text-black'>Box 2</div>
              <div className='bg-blue-300 p-2 text-black'>Box 3</div>
              <div className='bg-blue-300 p-2 text-black'>Box 4</div>
              <div className='bg-blue-300 p-2 text-black'>Box 5</div>
              <div className='bg-blue-300 p-2 text-black'>Box 6</div>
            </div>
          </div>

          {/* Achievements Box */}
          <div className='bg-green-500 p-4'>
            <h3 className='text-white mb-2'>ACHIEVEMENTS (Green)</h3>
            <div className='grid grid-cols-4 gap-2'>
              <div className='bg-green-300 p-2 text-black'>Badge 1</div>
              <div className='bg-green-300 p-2 text-black'>Badge 2</div>
              <div className='bg-green-300 p-2 text-black'>Badge 3</div>
              <div className='bg-green-300 p-2 text-black'>Badge 4</div>
              <div className='bg-green-300 p-2 text-black'>Badge 5</div>
              <div className='bg-green-300 p-2 text-black'>Badge 6</div>
              <div className='bg-green-300 p-2 text-black'>Badge 7</div>
              <div className='bg-green-300 p-2 text-black'>Badge 8</div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className='bg-yellow-500 p-4 text-black'>
          <h2>PROFILE SECTION (Yellow)</h2>
          <p>This should be at the bottom</p>
        </div>
      </div>
    </div>
  )
}

export default SimpleTest
