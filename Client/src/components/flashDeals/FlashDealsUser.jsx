import React from "react";
import FlashCard from "./FlashCard";
import "./style.css";
import FlashCardUser from "./FlashCardUser";

const FlashDealsUser = ({ productItems, addToCart }) => {
	return (
		<>
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa-bolt"></i>
						<h1>Products</h1>
					</div>
					<FlashCardUser
						productItems={productItems}
						addToCart={addToCart}
					/>
				</div>
			</section>
		</>
	);
};

export default FlashDealsUser;
