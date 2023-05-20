import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import Login from "./components/login/login";
import Register from "./components/register/register";
import "antd/dist/reset.css";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import AddPayment from "./pages/AddPayment";
import AdminDashboard from "./pages/AdminDashboard";
import OrdersTable from "./pages/NewOrders";
import ProductView from "./pages/ProductView";
import PaymentSuccessPage from "./pages/AddPayment";

function App() {
	/*
  step1 :  const { productItems } = Data 
  lai pass garne using props
  
  Step 2 : item lai cart ma halne using useState
  ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
 import Login from './components/login copy/login';

  Step 3 :  chai flashCard ma xa button ma

  Step 4 :  addToCart lai chai pass garne using props in pages and cart components
  */

	//Step 1 :
	const { productItems } = Data;
	const { shopItems } = Sdata;

	//Step 2 :
	const [CartItem, setCartItem] = useState([]);

	//Step 4 :
	const addToCart = (product) => {
		// if hamro product alredy cart xa bhane  find garna help garxa
		const productExit = CartItem.find(
			(item) => item.id === product.id,
		);
		// if productExit chai alredy exit in cart then will run fun() => setCartItem
		// ani inside => setCartItem will run => map() ani yo map() chai each cart ma
		// gayara check garxa if item.id ra product.id chai match bhayo bhane
		// productExit product chai display garxa
		// ani increase  exits product QTY by 1
		// if item and product doesnt match then will add new items
		if (productExit) {
			setCartItem(
				CartItem.map((item) =>
					item.id === product.id
						? { ...productExit, qty: productExit.qty + 1 }
						: item,
				),
			);
		} else {
			// but if the product doesnt exit in the cart that mean if card is empty
			// then new product is added in cart  and its qty is initalize to 1
			setCartItem([...CartItem, { ...product, qty: 1 }]);
		}
	};

	// Stpe: 6
	const decreaseQty = (product) => {
		// if hamro product alredy cart xa bhane  find garna help garxa
		const productExit = CartItem.find(
			(item) => item.id === product.id,
		);

		// if product is exit and its qty is 1 then we will run a fun  setCartItem
		// inside  setCartItem we will run filter to check if item.id is match to product.id
		// if the item.id is doesnt match to product.id then that items are display in cart
		// else
		if (productExit.qty === 1) {
			setCartItem(CartItem.filter((item) => item.id !== product.id));
		} else {
			// if product is exit and qty  of that produt is not equal to 1
			// then will run function call setCartItem
			// inside setCartItem we will run map method
			// this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
			setCartItem(
				CartItem.map((item) =>
					item.id === product.id
						? { ...productExit, qty: productExit.qty - 1 }
						: item,
				),
			);
		}
	};

	return (
		<Router>
			<Header CartItem={CartItem} />{" "}
			<Routes>
				<Route
					path="/"
					element={
						<Pages
							productItems={productItems}
							addToCart={addToCart}
							shopItems={shopItems}
						/>
					}
					exact
				/>
				<Route
					path="/auth/register"
					element={<Register />}
					exact
				/>
				<Route
					path="/cart"
					element={
						<Cart
							CartItem={CartItem}
							addToCart={addToCart}
							decreaseQty={decreaseQty}
						/>
					}
					exact
				/>
				<Route path="/auth/login" element={<Login />} exact />
				<Route
					path="/seller"
					element={
						<SellerDashboard
							productItems={productItems}
							shopItems={shopItems}
						/>
					}
				/>{" "}
				<Route path="/addproduct" element={<AddProduct />} />{" "}
				<Route path="/edit/:id" element={<UpdateProduct />} />{" "}
				<Route
					path="/addPayment"
					element={<AddPayment />}
					CartItem={CartItem}
					addToCart={addToCart}
					decreaseQty={decreaseQty}
				/>{" "}
				<Route
					path="/admin"
					element={
						<AdminDashboard
							productItems={productItems}
							shopItems={shopItems}
						/>
					}
				/>{" "}
				<Route path="/newOrders" element={<OrdersTable />} />{" "}
				<Route
					path="/seller"
					element={
						<SellerDashboard
							productItems={productItems}
							shopItems={shopItems}
						/>
					}
				/>{" "}
				<Route path="/addproduct" element={<AddProduct />} />{" "}
				<Route
					path="/product/view/:id"
					element={<ProductView addToCart={addToCart} />}
				/>
				<Route path="/edit/:id" element={<UpdateProduct />} />{" "}
				<Route
					path="/addPayment"
					element={<PaymentSuccessPage />}
					CartItem={CartItem}
					addToCart={addToCart}
					decreaseQty={decreaseQty}
				/>{" "}
				<Route
					path="/admin"
					element={
						<AdminDashboard
							productItems={productItems}
							shopItems={shopItems}
						/>
					}
				/>{" "}
				<Route path="/newOrders" element={<OrdersTable />} />{" "}
				{/* <Route path='/productDetails/:id' element={<ProductDetails/>}/> */}{" "}
			</Routes>{" "}
			<Footer />
		</Router>
	);
}

export default App;
