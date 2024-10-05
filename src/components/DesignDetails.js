import React from 'react';
import closeIcon from "../assets/close.svg";

const DesignDetails = ({ data, setSelectedDesign }) => {
  return (
    <div className='fixed top-0 left-0 z-10 w-screen h-screen bg-black/50'>
      <img
        src={closeIcon}
        className='absolute right-0 items-end h-6 mt-3 text-white cursor-pointer'
        onClick={() => setSelectedDesign(null)}
        alt="Close"
      />
      <div className='w-full h-auto max-h-[100vh] overflow-y-auto mt-10 bg-white rounded-t-lg py-[64px] px-[220px] flex flex-col'>
        <div className='text-xl font-bold mb-[10px]'>{data?.title}</div>
        <div className='flex items-center gap-3 my-6'>
          <img
            src={data?.designer?.image}
            className='w-12 h-12 rounded-full'
            alt={data?.designer?.name}
          />
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-bold'>{data?.designer?.name}</p>
            <div className='flex items-center gap-3'>
              <p className='text-xs text-green-600'>Available for work</p>
              <button className='text-xs text-gray-500'>Follow</button>
            </div>
          </div>
        </div>
        {data?.media.map((item, index) => {
          const isVideo = item.endsWith('.mp4') || item.endsWith('.webm') || item.endsWith('.ogg');
          return (
            <div key={index} className='mb-4'>
              {isVideo ? (
                <video src={item} autoPlay muted loop className='w-full h-full rounded-md'></video>
              ) : (
                <img src={item} alt={`media-${index}`} className='w-full h-full rounded-md' />
              )}
            </div>
          );
        })}
        <div className='text-[20px] text-center my-10 font-normal'>{data?.description}</div>
        <div className="relative flex items-center justify-center my-[30px] w-full">
          <hr className="w-full h-[1px] bg-gray-200 border-0" />
          <img src={data?.designer?.image} className='absolute w-12 h-12 rounded-full' />
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-[20px] font-medium text-center mt-4'>{data?.designer?.name}</div>
          <div className='flex items-center justify-center gap-2 mt-2'>
            {data?.tags.map((item, index) => (
              <div key={index} className='text-sm text-center'>
                {item}
              </div>
            ))}
          </div>
          <button className='flex items-center justify-center h-10 p-5 mt-4 text-white bg-black rounded-full text-[13px] font-medium w-[150px]'>Get in touch</button>
        </div>
      </div>
    </div>
  );
}

export default DesignDetails;
