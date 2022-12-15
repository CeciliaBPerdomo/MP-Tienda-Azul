import React, {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [busqueda, setBusqueda] = useState("");


	// Buscador
	const buscar = async (valor) => {
        if (busqueda === "") {
            actions.mostrarCelulares();
        } else {
            await actions.buscarCelular(valor);
			
			// if (store.celulares.length === 0) {
			// 	console.log("Hola")
			// 	document.getElementsByName("invisible").className = "visible"
			// }
        }
    };

	// Inicio
    useEffect(() => {
        actions.mostrarCelulares();
    }, []);

	return (
		<>
			<div className="container" style={{marginBottom: "35px"}}>
				{/* Barra de busqueda */}
				<div className="d-flex" style={{marginTop: "20px"}}>
					<input className="form-control me-2 rounded-pill" 
						placeholder="Busca tu celular preferido..." 
						onChange={(e) => setBusqueda(e.target.value)}
						value={busqueda}/>
					{/* Boton de busqueda */}
					<button className="btn btn-outline-primary rounded-pill" type="submit"
						onClick={() => buscar(busqueda)}>
							Buscar
					</button>
				</div>

				
				{store.celulares.length === 0 ?
					<div className="card mb-3" style={{maxWidth: "540px", marginTop: "30px", marginLeft: "25px"}}>
					<div className="row g-0">
					  <div className="col-md-4">
						<img src="https://static.vecteezy.com/system/resources/previews/008/142/942/non_2x/no-cell-phone-sign-no-mobile-phones-icon-no-phone-symbol-no-telephone-sign-vector.jpg" 
						className="img-fluid rounded-start"
						style={{width: "95%", padding: "5%"}}

						/>
					  </div>
					  <div className="col-md-8">
						<div className="card-body">
						  <h5 className="card-title">Ups! Lo sentimos mucho!</h5>
						  <br />
						  <p className="card-text">Pero no podemos encontrar el módelo de celular qué necesitas, intentá con otro!</p>
						</div>
					  </div>
					</div>
				  </div> 
				 : null }

				{/* Celulares */}
				<div className="row">
					{store.celulares.map((item, id) => (
					<div className="col-sm-4" key={id}>
						<div className="card" style={{marginTop: "25px", height: "650px"}}>
							<div className="card-body">
								<h5 className="card-title fw-bold">{item.marca} {item.modelo}</h5>
								<div className="d-flex justify-content-center">	
									<img src={item.foto}
									style={{width: "320px", height: "235px", marginTop: "10px"}}/>
									
								</div>
								<hr/>
								<div className="card-body" style={{height: "135px"}}>
									<p className="card-text" style={{textAlign: "justify"}}>{item.descripcion}</p>
								</div>
								<div>
									<br />
									<p className="card-text">Disponibles: <b style={{color: "red"}}>{item.cantidad}</b></p>
									<p className="card-text text-end">
										Precio: <b style={{color: "red", marginRight: "15px"}}>u$s {item.precio}</b>
									</p>
									<hr />
								</div>
								<div className="card-body">
									<Link to={"/compra/" + item.id} 
									className="btn btn-outline-primary float-end">
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
