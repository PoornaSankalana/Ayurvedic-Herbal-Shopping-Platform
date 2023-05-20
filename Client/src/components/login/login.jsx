/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();

		const data = {
			email: email,
			password: password,
		};

		try {
			await axios.post("api/auth/", data).then((res) => {
				toast.success(res.data.message);
				localStorage.setItem("login", true);
				localStorage.setItem("_id", res.data.userData._id);
				localStorage.setItem(
					"FName",
					res.data.userData.firstname +
						" " +
						res.data.userData.lastname,
				);
				localStorage.setItem("image", res.data.userData.url);

				localStorage.setItem("role", res.data.Role);

				if (res.data.Role === "admin") {
					setInterval(() => {
						navigate("/admin");
						window.location.reload();
					}, 1700);
				} else if (res.data.Role === "user") {
					setInterval(() => {
						navigate("/");
						window.location.reload();
					}, 1700);
				} else if (res.data.Role === "supplier") {
					setInterval(() => {
						navigate("/seller");
						window.location.reload();
					}, 1700);
				}
			});
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message);
			}
		}
	};

	return (
		<div className="wrapper">
			<div className="container main">
				<div className="row rowLogin">
					<div className="col-md-6 side-image">
						<div className="image-overlay">
							<div className="text">
								{/* <header
									className="h2"
									style={{ color: "white" }}>
									Ayurvedic Medicine
								</header>
								<br />
								<p>
									The ancient Indian medical system, also
									known as Ayurveda, is based on ancient
									writings that rely on a “natural” and
									holistic approach to physical and
									mental health. Ayurvedic medicine is
									one of the world’s oldest medical
									systems and remains one of India’s
									traditional health care systems.
									Ayurvedic treatment combines products
									(mainly derived from plants, but may
									also include animal, metal, and
									mineral), diet, exercise, and
									lifestyle.
								</p> */}
							</div>
						</div>
					</div>
					<div className="col-md-6 right">
						<div className="input-box">
							<header
								className="h2"
								style={{ boxShadow: "none" }}>
								User Login
							</header>
							<div className="input-field">
								<input
									type="email"
									className="input"
									id="email"
									required
									autoComplete="off"
									value={email}
									onChange={(e) =>
										setEmail(e.target.value)
									}
								/>
								<label for="email"> Email </label>
							</div>
							<div className="input-field">
								<input
									type="password"
									className="input"
									id="password"
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<label for="password"> Password </label>
							</div>
							<div className="input-field">
								<input
									type="submit"
									className="submit"
									value="Login"
									onClick={submitHandler}
								/>
							</div>
							<div className="signin">
								<span>
									Don 't have an account?
									<a href="/auth/register"> Register </a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				transition={Flip}
				pauseOnHover={false}
				theme="colored"
			/>
		</div>
	);
};

export default Login;
