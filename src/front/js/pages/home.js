import React, {useState, useContext, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	// Inicio
    useEffect(() => {
        actions.mostrarCelulares();
    }, []);

	return (
		<>
			<div className="container" style={{marginBottom: "35px"}}>
				<div className="row">
					{store.celulares.map((item, id) => (
					<div className="col-sm-4" key={id}>
						<div className="card" style={{marginTop: "25px", height: "550px"}}>
							<div className="card-body">
								<h5 className="card-title fw-bold">{item.marca} {item.modelo}</h5>
								<img src={item.foto} className="d-flex justify-content-center" 
								style={{width: "320px", height: "220px", marginTop: "10px"}}/>
								<div className="card-body">
									<p className="card-text">{item.descripcion}</p>
									<p className="card-text">Disponibles: {item.cantidad}</p>
									<p className="card-text">Precio: u$s <b>{item.precio}</b></p>
									<Link to={"/compra/" + item.id} className="btn btn-outline-success position-absolute bottom-0 end-0"
									style={{marginRight: "25px", marginBottom: "25px"}}>
										Comprar
									</Link>
								</div>
							</div>
						</div>
					</div>
					))}
				</div>
			</div>	
		</>
	);
};
