/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space, Radio, ConfigProvider } from "antd";
import "./register.css";

const Register = () => {
	const navigate = useNavigate();

	const options = [
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
	];

	const options1 = [
		{ label: "User", value: "user" },
		{ label: "Supplier", value: "supplier" },
		{ label: "Admin", value: "admin" },
	];

	const initialValues = {
		firstname: "",
		lastname: "",
		email: "",
		mobile: "",
		nic: "",
		address: "",
		url: "",
		password: "",
		confirmPassword: "",
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [gender, setGender] = useState("Male");
	const [dob, setDob] = useState("");
	const [message, setMessage] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [image, setImage] = useState(false);
	const [userRole, setUserRole] = useState("user");

	const login = localStorage.getItem("login");

	function isObjEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	const status = isObjEmpty(message);

	const dateofBirth = dayjs(dob.$d).format("YYYY-MM-DD");

	const onChange = ({ target: { value } }) => {
		setGender(value);
	};

	const onChange1 = ({ target: { value } }) => {
		setUserRole(value);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
		console.log(formValues);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(validate(formValues));
		setIsSubmit(true);

		if (
			!(formValues.password === formValues.confirmPassword) &&
			status
		) {
			toast.error("Passwords does not match");
		} else {
			const data = {
				firstname: formValues.firstname,
				lastname: formValues.lastname,
				email: formValues.email,
				mobile: formValues.mobile,
				nic: formValues.nic,
				dob: dateofBirth,
				gender: gender,
				url: formValues.url,
				address: formValues.address,
				role: userRole,
				password: formValues.password,
			};

			try {
				await axios.post("api/auth/user", data).then((res) => {
					if (login) {
						toast.success(res.data.message);
						setInterval(() => {
							navigate("/admin/users");
							window.location.reload();
						}, 1700);
					} else {
						toast.success(res.data.message);
						setInterval(() => {
							navigate("/auth/login");
							// window.location.reload();
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
		}
	};

	const handleImage = async (e) => {
		e.preventDefault();

		try {
			const file = e.target.files[0];
			if (!file) return alert("File not exist.");
			if (file.size > 1024 * 1024)
				// 1mb
				return alert("Size too large!");
			if (file.type !== "image/jpeg" && file.type !== "image/png")
				// 1mb
				return alert("File format is incorrect.");
			let formData = new FormData();
			formData.append("file", file);

			const res = await axios.post(
				"http://localhost:5000/api/user/profilePicture",
				formData,
				{
					headers: {
						"content-type": "multipart/form-data",
					},
				},
			);
			setImage(res.data.url);
			setFormValues({
				...formValues,
				url: res.data.url,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.firstname) {
			errors.firstname = "Firstname is required !";
		} else if (!values.lastname) {
			errors.lastname = "Lastname is required !";
		} else if (!values.email) {
			errors.email = "Email is required !";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email !";
		} else if (!values.mobile) {
			errors.mobile = "Mobile Number is required !";
		} else if (!values.mobile.length === 10) {
			errors.mobile = "This is not a valid mobile number !";
		} else if (!values.nic) {
			errors.nic = "NIC is required !";
		} else if (
			!(values.nic.length === 12 || values.nic.length === 10)
		) {
			errors.nic = "This is not a valid NIC !";
		} else if (!dob) {
			errors.dob = "Date of Birth is required !";
		} else if (!values.address) {
			errors.address = "Address is required !";
		} else if (!values.password) {
			errors.password = "Password is required !";
		} else if (values.password.length < 8) {
			errors.password = "Password must be more than 5 characters !";
		}

		return errors;
	};

	// useEffect(() => {
	// 	console.log(message);
	// 	if (Object.keys(message).length === 0 && isSubmit) {
	// 		console.log(formValues);
	// 		setMessage(validate(formValues));
	// 	}
	// }, [message]);

	const role = localStorage.getItem("role");

	return (
		<div className="wrapper">
			<div className="container main">
				<div
					className="row rgisterRow"
					style={{ backgroundColor: "white" }}>
					<header
						className="h2"
						style={{ boxShadow: "none", marginTop: "15px" }}>
						User Register
					</header>
					<div className="col-md-6 side-image-register right">
						<form
						// onSubmit={handleSubmit}
						>
							<div className="input-box">
								{/* first name */}
								<div className="input-field">
									<input
										type="text"
										className="input"
										id="firstname"
										name="firstname"
										required
										autoComplete="off"
										value={formValues.firstname}
										onChange={handleChange}
										style={{
											marginBottom: "0px",
										}}
									/>
									<label for="firstname">
										{" "}
										First Name{" "}
									</label>
									<p
										style={{
											marginBottom: "0px",
											fontSize: "12px",
											color: "red",
											display: "flex",
											alignItems: "start",
											justifyContent: "start",
										}}>
										{message.firstname}
									</p>
								</div>
								{/* last name */}
								<div className="input-field">
									<input
										type="text"
										className="input"
										id="lastname"
										name="lastname"
										required
										autoComplete="off"
										value={formValues.lastname}
										onChange={handleChange}
										style={{
											marginBottom: "0px",
										}}
									/>
									<label for="lastname">
										{" "}
										Last Name{" "}
									</label>
									<p
										style={{
											marginBottom: "0px",
											fontSize: "12px",
											color: "red",
											display: "flex",
											alignItems: "start",
											justifyContent: "start",
										}}>
										{message.lastname}
									</p>
								</div>
								{/* email */}
								<div className="input-field">
									<input
										type="email"
										className="input"
										id="email"
										name="email"
										required
										autoComplete="off"
										value={formValues.email}
										onChange={handleChange}
										style={{
											marginBottom: "0px",
										}}
									/>
									<label for="email"> Email </label>
									<p
										style={{
											marginBottom: "0px",
											fontSize: "12px",
											color: "red",
											display: "flex",
											alignItems: "start",
											justifyContent: "start",
										}}>
										{message.email}
									</p>
								</div>
								{/* mobile */}
								<div className="input-field">
									<input
										type="text"
										className="input"
										id="mobile"
										name="mobile"
										required
										value={formValues.mobile}
										onChange={handleChange}
										style={{
											marginBottom: "0px",
										}}
									/>
									<label for="mobile"> Mobile </label>
									<p
										style={{
											marginBottom: "0px",
											fontSize: "12px",
											color: "red",
											display: "flex",
											alignItems: "start",
											justifyContent: "start",
										}}>
										{message.mobile}
									</p>
								</div>
								{/* nic */}
								<div className="input-field">
									<input
										type="text"
										className="input"
										id="nic"
										name="nic"
										required
										value={formValues.nic}
										onChange={handleChange}
										style={{
											marginBottom: "0px",
										}}
									/>
									<label for="nic"> NIC </label>
									<p
										style={{
											marginBottom: "0px",
											fontSize: "12px",
											color: "red",
											display: "flex",
											alignItems: "start",
											justifyContent: "start",
										}}>
										{message.nic}
									</p>
								</div>
								{/* dob */}
								<div className="input-field">
									<ConfigProvider
										theme={{
											token: {
												colorPrimary: "#e94560",
											},
										}}>
										<Space
											direction="vertical"
											style={{ width: "100%" }}>
											<DatePicker
												placeholder="Select Date of Birth"
												style={{
													background:
														"transparent",
													border: "none",
													borderRadius: "0px",
													borderBottom:
														"1px solid #0b3c5d",
													marginTop: "0px",
													width: "100%",
													color: "#265673",
												}}
												className="input"
												name="dob"
												onChange={(date) => {
													setDob(date);
												}}
												value={dob}
											/>
										</Space>
									</ConfigProvider>
								</div>
								<div className="input-field">
									<label
										className="form-label"
										for="proPic">
										Profile Picture
									</label>
									<input
										class="form-control form-control-sm"
										id="formFileSm"
										type="file"
										onChange={handleImage}
										style={{
											marginTop: "35px",
											marginBottom: "40px",
										}}
									/>
								</div>
							</div>
						</form>
					</div>
					<div className="col-md-6 right">
						<div className="input-box">
							{/* gender */}
							<div className="input-box">
								<label
									for="gender"
									style={{
										display: "flex",
										justifyContent: "start",
										alignItems: "start",
										alignContent: " start",
										marginBottom: "10px",
									}}>
									{" "}
									Gender{" "}
								</label>
								<ConfigProvider
									theme={{
										token: {
											colorPrimary: "#e94560",
										},
									}}>
									<Radio.Group
										options={options}
										onChange={onChange}
										value={gender}
										name="gender"
										optionType="button"
										buttonStyle="solid"
										style={{
											marginBottom: "25px",
											display: "flex",
											justifyContent: "start",
											alignItems: "start",
											alignContent: " start",
											color: "#e94560",
										}}
									/>
								</ConfigProvider>
							</div>
							{/* user role */}
							{role === "admin" ? (
								<div className="input-box">
									<label
										for="gender"
										style={{
											display: "flex",
											justifyContent: "start",
											alignItems: "start",
											alignContent: " start",
											marginBottom: "10px",
										}}>
										{" "}
										User Role{" "}
									</label>
									<ConfigProvider
										theme={{
											token: {
												colorPrimary: "#e94560",
											},
										}}>
										<Radio.Group
											options={options1}
											onChange={onChange1}
											value={userRole}
											name="gender"
											optionType="button"
											buttonStyle="solid"
											style={{
												marginBottom: "25px",
												display: "flex",
												justifyContent: "start",
												alignItems: "start",
												alignContent: " start",
												color: "#e94560",
											}}
										/>
									</ConfigProvider>
								</div>
							) : (
								<></>
							)}

							{/* address */}
							<div className="input-field">
								<input
									type="text"
									className="input"
									id="address"
									name="address"
									required
									value={formValues.address}
									onChange={handleChange}
									style={{
										marginBottom: "1px",
									}}
								/>
								<label for="address"> Address </label>
								<p
									style={{
										marginBottom: "5px",
										fontSize: "12px",
										color: "red",
										display: "flex",
										alignItems: "start",
										justifyContent: "start",
									}}>
									{message.address}
								</p>
							</div>
							{/* password */}
							<div className="input-field">
								<input
									type="password"
									className="input"
									id="password"
									name="password"
									required
									value={formValues.password}
									onChange={handleChange}
									style={{
										marginBottom: "1px",
									}}
								/>
								<label for="password"> Password </label>
								<small
									id="passwordHelpBlock"
									class="form-text text-muted"
									style={{
										textAlign: "left",
										marginBottom: "2px",
									}}>
									Your password must be 8-20 characters
									long.
								</small>
								<p
									style={{
										marginBottom: "5px",
										fontSize: "12px",
										color: "red",
										display: "flex",
										alignItems: "start",
										justifyContent: "start",
									}}>
									{message.password}
								</p>
							</div>
							{/* confirm password */}
							<div className="input-field">
								<input
									type="password"
									className="input"
									id="confirmPassword"
									name="confirmPassword"
									required
									value={formValues.confirmPassword}
									onChange={handleChange}
								/>
								<label for="Cpassword">
									{" "}
									Confirm Password{" "}
								</label>
							</div>

							<div className="input-field">
								<input
									type="submit"
									className="submit"
									value="Register"
									onClick={handleSubmit}
								/>
							</div>
							{login ? (
								<></>
							) : (
								<div
									className="signin"
									style={{
										marginTop: "10px",
										marginBottom: "30px",
									}}>
									<span>
										Already have an account ?
										<a href="/auth/login"> Login </a>
									</span>
								</div>
							)}
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

export default Register;
