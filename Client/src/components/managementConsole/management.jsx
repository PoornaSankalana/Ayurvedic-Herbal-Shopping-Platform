import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaProductHunt } from "react-icons/fa";

export default class Management extends Component {
	render() {
		return (
			<section className="flash">
				<div className="container">
					<div className="heading f_flex">
						<i className="fa fa fa-gear"></i>
						<h1>Management Console</h1>
					</div>
					<div
						className="row w-100"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							alignContent: "center",
						}}>
						<div className="col-lg-4">
							<Link to="/admin/users">
								<button style={{ padding: "20px 30px" }}>
									<i className="fa fa-user"></i> &nbsp;
									User Profile Management
								</button>
							</Link>
						</div>

						<div className="col-lg-4">
							<button style={{ padding: "20px 30px" }}>
								<FaProductHunt /> &nbsp; Product Management
							</button>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
