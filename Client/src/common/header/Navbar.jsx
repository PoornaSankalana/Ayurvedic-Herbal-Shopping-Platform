import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	// Toogle Menu
	const [MobileMenu, setMobileMenu] = useState(false);

	const name = localStorage.getItem("FName");
	const logged = localStorage.getItem("login");

	const role = localStorage.getItem("role");

	const id = localStorage.getItem("_id");

	console.log("role - ", role);

	return (
		<>
			<header className="header">
				<div className="container d_flex">
					<div className="d_flex">
						{/* <span
							class="fa-solid fa-border-all"
							style={{ fontSize: "18px" }}></span>
						<h6 className="mt-2">
							Categories
							<i className="fa fa-chevron-down"></i>
						</h6> */}
					</div>

					<div className="navlink">
						<ul
							className={
								MobileMenu
									? "nav-links-MobileMenu"
									: "link f_flex capitalize"
							}
							onClick={() => setMobileMenu(false)}>
							{/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
							{role === "user" ? (
								<li>
									<Link to="/">home</Link>
								</li>
							) : (
								<></>
							)}

							{role === "admin" ? (
								<li>
									<Link to="/admin">home</Link>
								</li>
							) : (
								<></>
							)}

							{role === "supplier" ? (
								<li>
									<Link to="/seller">home</Link>
								</li>
							) : (
								<></>
							)}

							{role === null ? (
								<li>
									<Link to="/">home</Link>
								</li>
							) : (
								<></>
							)}

							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/contact">Contact</Link>
							</li>
							{/* <li>
								<Link to="/products">Products</Link>
							</li> */}
							{!logged ? (
								<li></li>
							) : (
								<li>
									<Link to={`/user/${id}`}>
										<p className="account">{name}</p>
									</Link>
								</li>
							)}
						</ul>

						<button
							className="toggle"
							onClick={() => setMobileMenu(!MobileMenu)}>
							{MobileMenu ? (
								<i className="fas fa-times close home-btn"></i>
							) : (
								<i className="fas fa-bars open"></i>
							)}
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
