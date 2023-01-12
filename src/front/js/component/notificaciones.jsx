import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Notificaciones = () => {
    const { store, actions } = useContext(Context);


    useEffect(() => {
        const getInfo = async () => {
           await actions.infoPagos()
        }
        getInfo()
    }, []);

    return (
        <>
            <div className="container" style={{ marginBottom: "35px" }}>
                <br />
                <h1 style={{ color: "#a0d2f3" }}><b>Pagos realizados</b></h1>
                <br />
                <table className="table">
                    <thead style={{background: "#a0d2f3"}}> 
                        <tr>
                            <th scope="col">Id de pago</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Mail</th>
                            <th scope="col" className="text-center">Monto</th>
                            <th scope="col" className="text-center">Tarjeta</th>
                            <th scope="col" className="text-center">Cuotas</th>
                            <th scope="col" className="text-center">+ Info</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        {store.realizados.map((item, id) => ( 
                        <tr key={id}>
                            <th>{item.payment_id}</th>
                            <td>{item.celular}</td>
                            <td>{item.usuario}</td>
                            <td>{item.mail}</td>
                            <td className="text-center"><b>${item.precio}</b></td>
                            <td className="text-center">{item.tarjeta}</td>
                            <td className="text-center">{item.cuotas}</td>
                            <td className="text-center"><Link to={"/infoPago/" + item.payment_id} style={{color: "black"}}>
                                <i className="fa fa-eye"></i>
                                </Link></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}