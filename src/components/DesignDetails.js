import React from 'react';

const DesignDetails = ({ data }) => {
  return (
    <div className='fixed top-0 left-0 z-10 w-screen h-screen bg-black/50'>
        <div className='w-full h-auto max-h-[100vh] overflow-y-auto mt-10 bg-white rounded-t-lg py-[64px] px-[120px] flex flex-col gap-12'>
            <div className='text-xl font-bold'>{data?.title}</div>
            <div>{data?.description}</div>
            {/* Add more content as needed */}
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index}>{data?.title} {index + 1}</div>
            ))}
        </div>
    </div>
  );
}

export default DesignDetails;
