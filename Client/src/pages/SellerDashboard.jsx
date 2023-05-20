import React from "react";
import Home from "../components/MainPage/Home";
import FlashDeals from "../components/flashDeals/FlashDeals";
import TopCate from "../components/top/TopCate";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Discount from "../components/discount/Discount";
import Shop from "../components/shops/Shop";
import Annocument from "../components/annocument/Annocument";
import Wrapper from "../components/wrapper/Wrapper";
import SellerHome from "../components/SellerMainPage/Home";

const SellerDashboard = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <SellerHome CartItem={CartItem} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <Annocument />
      <Wrapper />
    </>
  );
}

export default SellerDashboard;
