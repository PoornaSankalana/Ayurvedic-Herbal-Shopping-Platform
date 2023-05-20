import React, { Component } from "react";
import {
	MDBInput,
	MDBCheckbox,
	MDBBtn,
	MDBTextArea,
} from "mdb-react-ui-kit";

export default class Contact extends Component {
	render() {
		return (
			// <!--Section: Contact v.2-->
			<section class="mb-4">
				{/* <!--Section heading--> */}
				<h2 class="h1-responsive font-weight-bold text-center my-4">
					Contact us
				</h2>
				{/* <!--Section description--> */}
				<p class="text-center w-responsive mx-auto mb-5">
					Do you have any questions? Please do not hesitate to
					contact us directly. Our team will come back to you
					within a matter of hours to help you.
				</p>

				<div className="container">
					<div class="row w-100">
						{/* <!--Grid column--> */}
						<div class="col-lg-9 mb-md-0 mb-5">
							<form
								id="contact-form"
								name="contact-form"
								action="mail.php"
								method="POST">
								{/* <!--Grid row--> */}
								<div class="row">
									{/* <!--Grid column--> */}
									<div class="col-lg-6">
										<div class="md-form mb-0">
											<input
												type="text"
												id="name"
												name="name"
												class="form-control"
											/>
											<label for="name" class="">
												Your name
											</label>
										</div>
									</div>
									{/* <!--Grid column--> */}

									{/* <!--Grid column--> */}
									<div class="col-lg-6">
										<div class="md-form mb-0">
											<input
												type="text"
												id="email"
												name="email"
												class="form-control"
											/>
											<label for="email" class="">
												Your email
											</label>
										</div>
									</div>
									{/* <!--Grid column--> */}
								</div>
								{/* <!--Grid row--> */}

								{/* <!--Grid row--> */}
								<div class="row">
									<div class="col-md-12">
										<div class="md-form mb-0">
											<input
												type="text"
												id="subject"
												name="subject"
												class="form-control"
											/>
											<label for="subject" class="">
												Subject
											</label>
										</div>
									</div>
								</div>
								{/* <!--Grid row--> */}

								{/* <!--Grid row--> */}
								<div class="row">
									{/* <!--Grid column--> */}
									<div class="col-md-12">
										<div class="md-form">
											<textarea
												type="text"
												id="message"
												name="message"
												rows="2"
												class="form-control md-textarea"></textarea>
											<label for="message">
												Your message
											</label>
										</div>
									</div>
								</div>
								{/* <!--Grid row--> */}
							</form>

							<div class="text-center text-md-left">
								<button
									class="btn btn-sm mt-lg-5"
									style={{
										background: "#e94560",
										color: "white",
										fontWeight: "bold",
										padding: "5px 10px",
										display: "flex",
										alignContent: "start",
										alignItems: "start",
										justifyContent: "start",
									}}
									onclick="document.getElementById('contact-form').submit();">
									Send
								</button>
							</div>
							<div class="status"></div>
						</div>

						{/* <!--Grid column--> */}

						{/* <!--Grid column--> */}
						<div class="col-md-3 text-center">
							<ul class="list-unstyled mb-0">
								<li>
									<i class="fas fa-map-marker-alt fa-2x"></i>
									<p>
										No 32, Mahawela Sinhapura, Gampaha.{" "}
									</p>
								</li>

								<li>
									<i class="fas fa-phone mt-4 fa-2x"></i>
									<p>+94 75 862 1230</p>
								</li>

								<li>
									<i class="fas fa-envelope mt-4 fa-2x"></i>
									<p>herballk.sl@gmail.com</p>
								</li>
							</ul>
						</div>
						{/* <!--Grid column--> */}
					</div>
				</div>
			</section>
		);
	}
}
