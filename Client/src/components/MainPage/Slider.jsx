import React from "react";
import SlideCard from "./SlideCard";
import { useNavigate } from "react-router-dom";
const SliderHome = () => {
	let navigate = useNavigate();

	const handleClick = () => {
		navigate("/newOrders");
	};

	return (
		<>
			<section className="homeSlide contentWidth">
				<div className="container">
					<SlideCard />
				</div>
				<>
					{/* <button className='btn-primary2' onClick={handleClick}>Add New Product</button> */}
				</>
			</section>
		</>
	);
};

export default SliderHome;
