import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-2 text-center" 
	style={{backgroundColor: "#a0d2f3", height: "120px"}}>
		<b>
			<p style={{ marginTop: "18px", fontSize: "17px"}}>
				Hecho con <i className="fa fa-heart text-danger" /> por Cecilia Perdomo
			</p>
		</b>
		<small>Ver <a href="https://github.com/CeciliaBPerdomo/MP-Tienda-Azul" style={{textDecoration: "none"}}>
			repositorio</a> en gitHub 
			<a href="https://github.com/CeciliaBPerdomo/MP-Tienda-Azul" style={{textDecoration: "none"}}>
				<img className="rounded-circle" src="https://pbs.twimg.com/profile_images/1372304699601285121/5yBS6_3F_400x400.jpg" style={{width: "2%", marginLeft: "5px"}}/>
			</a>
		</small>
	</footer>
);
