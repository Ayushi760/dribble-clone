import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import DesignCard from './DesignCard';
import DesignDetails from './DesignDetails';

const ExploreDesigns = () => {
  const { state } = useContext(GlobalStateContext);
  const { categories } = state;
  const [selectedDesign, setSelectedDesign] = useState(null);
  useEffect(() => {
    if (selectedDesign) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedDesign]);
  return (
    <div className='flex flex-col items-center justify-center w-full mt-[43px] mb-[150px]'>
      <p className='text-[48px] leading-[56px] mb-12' style={{ fontFamily: "Mona-Sans" }}>
        Explore inspiring designs
      </p>
      <div className='flex flex-wrap w-full px-[72px] justify-center'>
        {categories.length > 0 && 
          categories.map((category) => (
            <div key={category.name} className='flex flex-wrap justify-center mb-10'>
              {category?.designs?.slice(0, 1).map(design => (
                <div key={design.id} className='m-2' onClick={()=>setSelectedDesign(design)}>
                  <DesignCard data={design}/>
                </div>
              ))}
            </div>
          ))
        }
      </div>
      {selectedDesign!==null && <DesignDetails data={selectedDesign} setSelectedDesign={setSelectedDesign}/>}
    </div>
  );
}

export default ExploreDesigns;
