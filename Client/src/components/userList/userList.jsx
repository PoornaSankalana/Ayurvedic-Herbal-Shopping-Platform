import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Tooltip } from "react-tooltip";
import { Radio, ConfigProvider, DatePicker, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import { Link } from "react-router-dom";
import "./userList.css";

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [show, setShow] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [nic, setNIC] = useState("");
	const [DOB, setDOB] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [isForigner, setIsForigner] = useState(false);
	const [error, setError] = useState("");
	const [image, setImage] = useState("");
	const [_id, setID] = useState("");
	const [delId, setDelID] = useState("");
	const [status, setStatus] = useState(false);

	const loggedID = localStorage.getItem("_id");
	const checkAccountStatus = document.getElementById("isDeactive");

	const options1 = [
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
	];

	const onChange1 = ({ target: { value } }) => {
		setGender(value);
	};

	const handleClose = () => {
		setShow(false);
		setShowEdit(false);
		setShowDelete(false);
	};
	const handleShow = async (id) => {
		await axios
			.get("http://localhost:5000/api/user/" + id)
			.then((res) => {
				setFirstName(res.data.data.firstname);
				setLastname(res.data.data.lastname);
				setEmail(res.data.data.email);
				setMobile(res.data.data.mobile);
				setNIC(res.data.data.nic);
				setDOB(res.data.data.dob);
				setAddress(res.data.data.address);
				setGender(res.data.data.gender);
				setImage(res.data.data.url);
			});
		setShow(true);
	};

	const handleEditShow = async (id) => {
		await axios
			.get("http://localhost:5000/api/user/" + id)
			.then((res) => {
				setFirstName(res.data.data.firstname);
				setLastname(res.data.data.lastname);
				setEmail(res.data.data.email);
				setMobile(res.data.data.mobile);
				setNIC(res.data.data.nic);
				setDOB(res.data.data.dob);
				setAddress(res.data.data.address);
				setGender(res.data.data.gender);
			});
		setShowEdit(true);
	};

	const updateUser = async () => {
		const data = {
			firstname: firstname,
			lastname: lastname,
			email: email,
			mobile: mobile,
			nic: nic,
			address: address,
			gender: gender,
			isForiegner: isForigner,
		};
		await axios
			.put("http://localhost:5000/api/user/update/" + _id, data)
			.then((res) => {
				toast.success(res.data.message);
				localStorage.setItem(
					"name",
					res.data.firstname + " " + res.data.lastname,
				);
				setShowEdit(false);
				check();
				setInterval(() => {
					window.location.reload();
				}, 1700);
			});
	};

	const updateActiveStatus = async (id, sts) => {
		if (id === loggedID) {
			toast.error(
				"Already logged as this user. Cannot Chage Account Status !",
			);
		} else {
			const data = {
				isActive: sts,
			};

			await axios
				.put("http://localhost:5000/api/user/status/" + id, data)
				.then((res) => {
					if (sts) {
						toast.success(res.data.message);
						setInterval(() => {
							check();
						}, 1700);
					} else {
						toast.warning(res.data.message);
						setInterval(() => {
							check();
						}, 1700);
					}
				});
		}
	};

	const handleDeleteShow = () => {
		setShowDelete(true);
	};

	const handleDelete = async () => {
		if (delId === loggedID) {
			toast.error("Already logged as this user. Cannot Delete !");
			setShowDelete(false);
		} else {
			await axios
				.delete("http://localhost:5000/api/user/delete/" + delId)
				.then((res) => {
					toast.success(res.data.message);
					setShowDelete(false);
					check();
					setInterval(() => {
						window.location.reload();
					}, 1700);
				});
		}
	};

	// user email search
	const getUserDataEmail = async (searchFilter) => {
		const UserFilterModel = {
			searchFilter: searchFilter,
		};

		const response = await axios.post(
			"http://localhost:5000/api/user/filter/email",
			UserFilterModel,
		);

		setUsers(response.data.data);

		if (response.data.data.length === 0) {
			setError("Cannot find this email. Please check again !");
		} else {
			setError("");
		}
	};

	// user data by isActive
	const getUserDataIsActive = async () => {
		const response = await axios.get(
			"http://localhost:5000/api/user/filter/active",
		);

		setUsers(response.data.data);

		if (response.data.data.length === 0) {
			setError("No Deactive Users !");
		} else {
			setError("");
		}
	};

	const check = () => {
		if (checkAccountStatus.checked === true) {
			setStatus(true);
			getUserDataIsActive();
		} else {
			setStatus(false);
			getUserDataEmail();
		}
	};

	// onInput condition
	const onSearchTextChanged = (searchFilter) => {
		getUserDataEmail(searchFilter);
	};

	useEffect(() => {
		getUserDataEmail();
	}, []);

	return (
		<div className="mx-4 my-4">
			<div
				className="row"
				style={{
					marginBottom: "10px",
					color: "red",
					fontSize: "12px",
					marginLeft: "2px",
				}}>
				{error}
			</div>
			<div
				class="row"
				style={{
					marginBottom: "10px",
					marginLeft: "1px",
				}}>
				<div
					class="col-lg-4 px-0"
					style={{
						display: "flex",
						alignContent: "center",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<input
						type="text"
						class="form-control rounded-0 bg-light searchTxt"
						placeholder="Enter email to search"
						onInput={(e) =>
							onSearchTextChanged(e.target.value)
						}
						style={{ border: "1px solid #eee" }}
					/>
				</div>
				<div
					class="col-lg-4 pl-4"
					style={{
						display: "flex",
						alignContent: "center",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Link to="/auth/register">
						<button
							data-mdb-ripple-color="green"
							type="button"
							class="btn btn-light rounded-0 search"
							style={{
								border: "1px solid #eee",
								fontWeight: "normal",
								color: "white",
								backgroundColor: "#e94560",
							}}>
							<AiFillPlusCircle /> Add New User
						</button>
					</Link>
				</div>
				<div
					class="col-lg-4"
					style={{
						display: "flex",
						alignContent: "center",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<label
						class="switch"
						style={{
							marginRight: "10px",
						}}>
						<input
							type="checkbox"
							id="isDeactive"
							onChange={check}
						/>
						<div class="slide"></div>
						<div class="slide-card">
							<div class="slide-card-face slide-card-front"></div>
							<div class="slide-card-face slide-card-back"></div>
						</div>
					</label>
					<label
						class="form-check-label"
						for="flexSwitchCheckDefault"
						style={{ fontSize: "14px" }}>
						Filter Deactive Accounts
					</label>
				</div>
			</div>
			<table
				border="2"
				class="table table-bordered table-striped table-hover align-middle mb-0 bg-white rounded-4 text-center">
				<thead class="thead-dark">
					<tr>
						<th>Name</th>
						<th>Mobile</th>
						<th>NIC</th>
						<th>Role</th>
						<th>Account Status</th>
						<th>Action</th>
						<th>Change Account Status</th>
					</tr>
				</thead>
				<tbody>
					{users.map((value) => (
						<tr>
							<td>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}>
									<img
										src={value.url}
										alt=""
										style={{
											width: "45px",
											height: "45px",
											borderRadius: "50px",
											position: "initial",
											objectFit: "cover",
										}}
										class="avatarImg"
									/>
									<div class="ms-3 text-start">
										<p class="fw-bold mb-1">
											{value.firstname +
												" " +
												value.lastname}
										</p>
										<p class="text-muted mb-0">
											{value.email}
										</p>
									</div>
								</div>
							</td>
							<td>{value.mobile}</td>
							<td>{value.nic}</td>
							<td>
								{value.role === "admin" ? (
									<span
										class="badge badge-success rounded-pill d-inline px-2 py-1"
										id="role"
										style={{
											backgroundColor: `#FF5733 `,
										}}>
										Admin
									</span>
								) : (
									<></>
								)}
								{value.role === "supplier" ? (
									<span
										class="badge badge-success rounded-pill d-inline px-3"
										id="role"
										style={{
											backgroundColor: `#04699c`,
										}}>
										Supplier
									</span>
								) : (
									<></>
								)}
								{value.role === "user" ? (
									<span
										class="badge badge-success rounded-pill d-inline px-3"
										id="role"
										style={{
											backgroundColor: `#FFC300`,
										}}>
										User
									</span>
								) : (
									<></>
								)}
							</td>
							<td>
								{value.isActive ? (
									<span
										class="badge badge-success rounded-pill d-inline px-3"
										id="role"
										style={{
											backgroundColor: `#198754`,
										}}>
										Active
									</span>
								) : (
									<span
										class="badge badge-success rounded-pill d-inline px-2 py-1"
										id="role"
										style={{
											backgroundColor: `#cc0000`,
										}}>
										Deactive
									</span>
								)}
							</td>

							<td>
								<div className="btn-group">
									<button
										type="button"
										class="btn btn-sm btn-rounded view"
										onClick={() => {
											handleShow(value._id);
										}}>
										<BsFillEyeFill
											data-tooltip-id="tooltip"
											data-tooltip-content="View"
											data-tooltip-place="bottom"
										/>
									</button>
									<button
										type="button"
										class="btn btn-sm btn-rounded update"
										onClick={() => {
											handleEditShow(value._id);
											setID(value._id);
										}}>
										<FiEdit
											data-tooltip-id="tooltip"
											data-tooltip-content="Edit"
											data-tooltip-place="bottom"
										/>
									</button>
									<button
										type="button"
										class="btn btn-sm btn-rounded delete"
										onClick={() => {
											handleDeleteShow();
											setDelID(value._id);
										}}>
										<MdDelete
											data-tooltip-id="tooltip"
											data-tooltip-content="Delete"
											data-tooltip-place="bottom"
										/>
									</button>
								</div>
							</td>
							<td>
								<div
									class="btn-group"
									role="group"
									aria-label="Basic example">
									<button
										type="button"
										class="btn btn-sm btn-outline-dark"
										onClick={() => {
											updateActiveStatus(
												value._id,
												true,
											);
										}}>
										Activate
									</button>
									<button
										type="button"
										class="btn btn-sm btn-danger"
										onClick={() => {
											updateActiveStatus(
												value._id,
												false,
											);
										}}>
										Deactivate
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* view details */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					style={{ backgroundColor: "#5ebc67", color: "white" }}>
					<img
						src={image}
						alt=""
						style={{
							width: "50px",
							height: "50px",
							objectFit: "cover",
							borderRadius: "100px",
							position: "initial",
							marginRight: "20px",
							border: "2px solid white",
						}}
					/>
					<Modal.Title>{firstname + " " + lastname}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlInput1">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								autoFocus
								disabled
								value={email}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>Mobile</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								disabled
								value={mobile}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>DOB</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								disabled
								value={DOB}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>NIC</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								disabled
								value={nic}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								disabled
								value={address}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>Gender</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								disabled
								value={gender}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
			{/* edit details */}
			<Modal show={showEdit} onHide={handleClose}>
				<Modal.Header
					closeButton
					style={{ backgroundColor: "#ffc107", color: "white" }}>
					<Modal.Title>Edit User Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlInput1">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								value={firstname}
								onChange={(e) =>
									setFirstName(e.target.value)
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlInput1">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								value={lastname}
								onChange={(e) =>
									setLastname(e.target.value)
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlInput1">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								autoFocus
								disabled
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>Mobile</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								value={mobile}
								onChange={(e) => setMobile(e.target.value)}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>NIC</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								onChange={(e) => setNIC(e.target.value)}
								value={nic}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								autoFocus
								value={address}
								onChange={(e) =>
									setAddress(e.target.value)
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1">
							<Form.Label>Gender</Form.Label>
							<ConfigProvider
								theme={{
									token: {
										colorPrimary: "#ffc107",
									},
								}}>
								<Radio.Group
									options={options1}
									onChange={onChange1}
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
										color: "#ffc107",
									}}
								/>
							</ConfigProvider>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button variant="secondary" onClick={handleClose}>
						Close
					</Button> */}
					<Button
						variant=""
						style={{
							backgroundColor: "#ffc107",
							color: "white",
							border: "1px solid #ffc107",
							width: "200px",
						}}
						onClick={updateUser}>
						Update Details
					</Button>
				</Modal.Footer>
			</Modal>
			{/* <!-- Modal Delete --> */}
			<Modal
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				backdrop="static"
				show={showDelete}
				onHide={handleClose}>
				<Modal.Header
					closeButton
					style={{ backgroundColor: "#d11a2a", color: "white" }}>
					<Modal.Title>Delete User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete this user ?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant=""
						onClick={handleDelete}
						style={{
							backgroundColor: "#d11a2a",
							border: "1px solid #d11a2a",
							color: "white",
						}}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
			<Tooltip
				id="tooltip"
				style={{
					color: "#53a65b",
					zIndex: "10",
					backgroundColor: "#e5e5e5",
					fontSize: "12px",
				}}
			/>
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

export default UserList;
