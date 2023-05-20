import React, { Component } from "react";
import "./about.css";

export default class About extends Component {
	render() {
		return (
			<div
				id="portfolio"
				class="container-fluid text-center bg-grey">
				<h2>About Us</h2>
				<br />
				<h4>Who are we - HerbalLk</h4>
				<div
					class="row text-center slideanim w-100 mt-lg-5"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "start",
						alignContent: "center",
					}}>
					<div class="col-lg-4">
						<div class="thumbnail">
							<img
								src="https://life.futuregenerali.in/Content/images/about/mission.jpg"
								alt="Paris"
								width="400"
								height="300"
							/>

							<ul style={{ textAlign: "justify" }}>
								<li className="list">
									To build and maintain leadership in
									providing effective and innovative
									Ayurveda products & services to the
									market
								</li>
								<li className="list">
									To promote true Ayurveda nationally &
									internationally while preserving Sri
									Lankan culture & heritage
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2"></div>
					<div class="col-lg-4">
						<div class="thumbnail">
							<img
								src="https://life.futuregenerali.in/Content/images/about/vision.jpg"
								alt="New York"
								width="400"
								height="300"
							/>

							<p style={{ textAlign: "justify" }}>
								At the forefront of holistic healthcare, we
								provide authentic Ayurveda based products
								and services that lead to happier,
								healthier and naturally longer lives, while
								propagating the values of Ayurveda across
								the globe.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
