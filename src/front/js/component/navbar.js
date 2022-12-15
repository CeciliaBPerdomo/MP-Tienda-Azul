import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar" style={{backgroundColor: "#a0d2f3", height: "150px"}}>
			<div className="container">
				<Link to="/">
					<img src="data:image/png;base64,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" 
					className="rounded-circle" 
					style={{width: "130px"}}/>
				</Link>
			</div>
		</nav>
	);
};
