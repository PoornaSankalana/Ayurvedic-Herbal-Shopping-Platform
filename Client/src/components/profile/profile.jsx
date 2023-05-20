/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
	MDBCol,
	MDBCard,
	MDBCardText,
	MDBCardBody,
	MDBListGroup,
	MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { BsPhoneFill } from "react-icons/bs";
import "./profile.css";

export default function ProfilePage() {
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [nic, setNic] = useState("");
	const [DOB, setDOB] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");

	const id = window.location.pathname.split("/")[2];

	const image = localStorage.getItem("image");

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(
				`http://localhost:5000/api/user/${id}`,
			);
			// console.log(res.data);
			setFirstName(res.data.data.firstname);
			setLastname(res.data.data.lastname);
			setEmail(res.data.data.email);
			setMobile(res.data.data.mobile);
			setNic(res.data.data.nic);
			setDOB(res.data.data.dob);
			setAddress(res.data.data.address);
			setGender(res.data.data.gender);
		};

		fetchUser();
	}, []);

	return (
		<section style={{ backgroundColor: "#eee" }}>
			<div className="container py-5">
				<div className="row" style={{ width: "100%" }}>
					<div className="col-lg-4">
						<MDBCard className="mb-4">
							<MDBCardBody
								className="text-center"
								style={{
									marginBottom: "20px",
									marginTop: "20px",
								}}>
								<div
									className="row"
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										alignContent: "center",
										width: "100%",
										marginLeft: "2px",
									}}>
									<div className="col-lg-4">
										<img
											src={image}
											alt="avatar"
											className="rounded-circle"
											style={{
												width: "100px",
												height: "100px",
												objectFit: "cover",
											}}
											fluid
										/>
									</div>
									<div
										className="col-lg-8"
										style={{
											marginTop: "10px",
										}}>
										<p
											className="text-muted mb-1"
											style={{ fontSize: "16px" }}>
											Hello
										</p>
										<p
											className="text-muted mb-4"
											style={{ fontSize: "18px" }}>
											{firstname + " " + lastname}
										</p>
										<div className="d-flex justify-content-center mb-2">
											<button className="btn btn-sm resetBtn">
												Reset Password
											</button>
											<button
												className="btn btn-sm editBtn"
												style={{
													marginLeft: "10px",
												}}>
												Edit Profile
											</button>
										</div>
									</div>
								</div>
							</MDBCardBody>
						</MDBCard>
						<MDBCard className="mb-4 mb-lg-0">
							<MDBCardBody className="p-0">
								<MDBListGroup flush className="rounded-3">
									<MDBListGroupItem className="d-flex justify-content-start align-items-center p-3">
										<BsPhoneFill
											style={{ marginRight: "10px" }}
										/>
										<MDBCardText>
											<b>Telephone :</b> &nbsp;
											{mobile}
										</MDBCardText>
									</MDBListGroupItem>
									<MDBListGroupItem className="d-flex justify-content-start align-items-center p-3">
										<MdEmail
											style={{ marginRight: "10px" }}
										/>
										<MDBCardText>
											<b>Email :</b> &nbsp;
											{email}
										</MDBCardText>
									</MDBListGroupItem>
								</MDBListGroup>
							</MDBCardBody>
						</MDBCard>
					</div>
					<MDBCol lg="8">
						<MDBCard className="mb-4">
							<MDBCardBody>
								<div className="row">
									<div className="col-lg-5">
										<MDBCardText
											style={{ width: "100%" }}>
											First Name
										</MDBCardText>
									</div>
									<div className="col-lg-7">
										<MDBCardText
											className="text-muted"
											style={{ width: "100%" }}>
											{firstname}
										</MDBCardText>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-lg-5">
										<MDBCardText>
											Last Name
										</MDBCardText>
									</div>
									<div className="col-lg-7">
										<MDBCardText className="text-muted">
											{lastname}
										</MDBCardText>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-lg-5">
										<MDBCardText>
											Date Of Birth
										</MDBCardText>
									</div>
									<div className="col-lg-7">
										<MDBCardText className="text-muted">
											{DOB}
										</MDBCardText>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-lg-5">
										<MDBCardText>Address</MDBCardText>
									</div>
									<div className="col-lg-7">
										<MDBCardText className="text-muted">
											{address}
										</MDBCardText>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-lg-5">
										<MDBCardText>NIC</MDBCardText>
									</div>
									<div className="col-lg-7">
										<MDBCardText className="text-muted">
											{nic}
										</MDBCardText>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-lg-5">
										<MDBCardText>Gender</MDBCardText>
									</div>
									<div className="col-lg-7">
										<MDBCardText className="text-muted">
											{gender}
										</MDBCardText>
									</div>
								</div>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</div>
			</div>
		</section>
	);
}
