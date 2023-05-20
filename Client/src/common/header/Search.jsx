import React from "react";
import logo from "../../components/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import axios from "axios";

const Search = ({ CartItem }) => {
	const navigate = useNavigate();

	// fixed Header
	window.addEventListener("scroll", function () {
		const search = document.querySelector(".search");
		search.classList.toggle("active", window.scrollY > 100);
	});

	const logged = localStorage.getItem("login");

	const image = localStorage.getItem("image");

	const logout = async () => {
		await axios.post("api/auth/logout").then(() => {
			console.log("logout");
			localStorage.clear();
			navigate("/");
			window.location.reload();
		});
	};

	const role = localStorage.getItem("role");

	const id = localStorage.getItem("_id");

	const profileNavigate = () => {
		navigate("/user/" + id);
	};

	const redirectHome = () => {
		if (role === "user") {
			navigate("/");
		} else if (role === "admin") {
			navigate("/admin");
		} else if (role === "supplier") {
			navigate("/seller");
		}
	};

	return (
		<>
			<section className="search">
				<div className="container c_flex">
					<div className="logo width ">
						<img
							src={logo}
							alt=""
							style={{ width: "150px", cursor: "pointer" }}
							onClick={redirectHome}
						/>
					</div>

					<div
						className="search-box f_flex"
						style={{ marginRight: "20px" }}>
						<i className="fa fa-search"></i>
						<input
							type="text"
							placeholder="Search and hit enter..."
						/>
						<span>All Category</span>
					</div>

					<div className="icon f_flex width">
						{!logged ? (
							<div className="btn-group btn-group-sm">
								<Link to="/auth/login/">
									<button
										className="btn mt-2"
										style={{
											backgroundColor: "#f3f5f9",
											marginLeft: "10px",
										}}>
										Login
									</button>
								</Link>
								<Link to="/auth/register">
									<button
										className="btn mt-2"
										style={{
											backgroundColor: "#f3f5f9",
											marginLeft: "10px",
										}}>
										Register
									</button>
								</Link>
							</div>
						) : (
							<div className="btn-group btn-group-sm">
								<img
									src={image}
									alt="Avatar"
									class="avatar"
									onClick={profileNavigate}
									data-tooltip-id="tooltip"
									data-tooltip-content="Go to Profile"
									data-tooltip-place="bottom"
									style={{ objectFit: "cover" }}
								/>

								<button
									className="btn mt-2"
									style={{
										backgroundColor: "#f3f5f9",
										marginLeft: "10px",
									}}
									onClick={logout}>
									LogOut
								</button>
							</div>
						)}

						<div className="cart">
							<Link to="/cart">
								<i className="fa fa-shopping-bag icon-circle"></i>
								<span>
									{CartItem.length === 0
										? ""
										: CartItem.length}
								</span>
							</Link>
						</div>
					</div>
				</div>
				<Tooltip
					id="tooltip"
					style={{
						color: "#e94560",
						zIndex: "10",
						backgroundColor: "#e5e5e5",
						fontSize: "12px",
					}}
				/>
			</section>
		</>
	);
};

export default Search;
