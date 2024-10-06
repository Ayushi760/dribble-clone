import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ArtistsSlider from '../components/ArtistsSlider'
import ExploreDesigns from '../components/ExploreDesigns'
import { GlobalStateContext } from '../context/GlobalStateContext'
import CallToAction from '../components/CallToAction'
import CategorySlider from '../components/CategorySlider'
import Footer from '../components/Footer'

const Home = () => {
  const { dispatch } = useContext(GlobalStateContext);
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await fetch("http://localhost:3001/categories")
        .then((response) => response.json())
        .catch((error) => console.error(error));

      if (categoriesData) {
        console.log(categoriesData)
        dispatch({ type: "SET_CATEGORIES", payload: categoriesData });
      }
    };

    fetchCategories();
  }, [dispatch]);
  return (
    <div className='bg-[#f8f7f4] flex flex-col items-center w-screen'>
        <Header/>
        <Hero/>
        <ArtistsSlider/>
        <ExploreDesigns/>
        <CallToAction/>
        <CategorySlider/>
        <Footer/>
    </div>
  )
}

export default Home