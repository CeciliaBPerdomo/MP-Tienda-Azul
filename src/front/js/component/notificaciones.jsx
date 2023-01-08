import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Notificaciones = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const getInfo = async () => {
            await actions.infoPagos(store.idPago)
        }
        getInfo()
    }, []);

    console.log(store.idPago)

    return (
        <>
            <div className="container" style={{marginBottom: "25px"}}>
                <br />
                <h1 style={{color: "#a0d2f3"}}><b>Pagos realizados</b></h1>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id de pago</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Mail</th>
                            <th scope="col" className="text-center">Monto</th>
                            <th scope="col">Tarjeta</th>
                            <th scope="col">Cuotas</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                    {/* {store.pagos.map((item, id) => ( */}
                        <tr >
                            <th>{store.pagos.order?.id}</th>
                            <td><img src={store.pagos.additional_info?.items[0].picture_url} 
                            style={{width: "15%"}}/> {store.pagos.additional_info?.items[0].title} </td>
                            <td>{store.pagos.additional_info?.payer.first_name} {store.pagos.additional_info?.payer.last_name}</td>
                            <td>{store.pagos.payer?.email}</td>
                            <td className="text-center"><b>${store.pagos.transaction_amount}</b></td>
                            <td className="text-center">{store.pagos.payment_method?.id}</td>
                            <td className="text-center">{store.pagos.installments}</td>
                        </tr>
                    {/* ))} */}
                    </tbody>
                </table>
            </div>
        </>
    )
}