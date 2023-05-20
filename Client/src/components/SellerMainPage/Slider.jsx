import React from "react"
import SlideCard from "./SlideCard"
import { useNavigate } from 'react-router-dom';
import { Stack } from "@mui/material";
import { color } from "@mui/system";

const SliderHome = () => {
  let navigate = useNavigate()
  const handleClick = () => {
    navigate('/addproduct')
  }

  return (
    <>
      <section className='homeSlide contentWidth'>
        <div className='container'>
          <SlideCard />
        </div>
        <>
        <Stack sx={{display:"flex",Flexdirection:"row"}}>
          
          <button className='btn-primary2' onClick={handleClick}>Add New Product</button>
          <button className='btn-primary2' onClick={handleClick}>New Orders</button>
        </Stack>
        </>
      </section>
    </>
  )
}

export default SliderHome
