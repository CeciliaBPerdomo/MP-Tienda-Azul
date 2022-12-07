import React, {useState, useContext, useEffect} from "react";
import {Context} from "../store/appContext";
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";

export const Compra = () => {
    const {store, actions} = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.obtenerCelularId(parseInt(params.theid))
    }, []);

    return (
        <>
        <div className="container">
            <br />
            <h3>¡¡Felicitaciones!!</h3>
            <br />
            <div className="container text-center">
                <div className="row">
                    {/* Celular elegido */}
                    <div className="col">
                        <div className="card" style={{marginBottom: "25px", marginLeft: "25px"}}>
                            <h5 className="card-header">¡Tu nuevo <b>{store.celular.marca} {store.celular.modelo}</b>, está más cerca!</h5>
                            <div className="card-body">
                            <img src={store.celular.foto} className="justify-content-center" 
								style={{width: "320px", height: "220px", marginTop: "10px"}}/>
                                <hr />
                                <p className="card-text">{store.celular.descripcion}</p>
                                <hr />
                                <p className="card-text text-end" style={{fontSize: "18px", marginRight: "10px"}}><b>u$s {store.celular.precio}</b></p>
                            </div>
                        </div>
                    </div>

                    {/* Mercado pago */}
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <img src="https://www.dogmaind.com/wp-content/uploads/2016/10/mercadopago-01-2.png" 
                                className="float-start"
                                style={{width: "35%"}}/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                            </div>
                    </div>
                </div>
                </div>
        </div>
        </>
    )
}