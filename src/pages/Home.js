import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ArtistsSlider from '../components/ArtistsSlider'
import ExploreDesigns from '../components/ExploreDesigns'

const Home = () => {
  return (
    <div className='bg-[#f8f7f4] '>
        <Header/>
        <Hero/>
        <ArtistsSlider/>
        <ExploreDesigns/>
    </div>
  )
}

export default Home