import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const InfoPago = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.obtenerPago(parseInt(params.theid))
    }, []);

    return (
        <>
            <div className="container" style={{ marginBottom: "35px" }}>
                <br />
                <h2 style={{ color: "#a0d2f3" }}><b>Pago: {store.compraRealizada.id}</b></h2>
                <br />


                {/* Info producto */}
                <h3 style={{ color: "#a0d2f3" }}><b>Producto:</b></h3>
                <div className="card mb-3" style={{ width: "540px", marginLeft: "25px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={store.compraRealizada.additional_info?.items[0].picture_url} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{store.compraRealizada.additional_info?.items[0].title}</h5>
                                <br />
                                <p className="card-text">Precio: $<b>{store.compraRealizada.additional_info?.items[0].unit_price}</b></p>
                                <p className="card-text">Cantidad: {store.compraRealizada.additional_info?.items[0].quantity}</p>
                                <p className="card-text">Cuotas: {store.compraRealizada.installments}</p>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 g-4">
                {/* Comprador */}
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                            <h3 className="card-title" style={{ color: "#a0d2f3" }}><b>Comprador</b></h3>
                                <p className="card-text" style={{marginLeft: "10px"}}>Nombre: {store.compraRealizada.additional_info?.payer.first_name} {store.compraRealizada.additional_info?.payer.last_name}</p>
                                <p className="card-text" style={{marginLeft: "10px"}}>Telefono: {store.compraRealizada.additional_info?.payer.phone.area_code}{store.compraRealizada.additional_info?.payer.phone.number}</p>
                                <p className="card-text" style={{marginLeft: "10px"}}>Dirección: {store.compraRealizada.additional_info?.payer.address.street_name} {store.compraRealizada.additional_info?.payer.address.street_number}, {store.compraRealizada.additional_info?.payer.address.zip_code}, Uruguay</p>
                            </div>
                        </div>
                    </div>

                    {/* Info del pago */}
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title" style={{ color: "#a0d2f3" }}><b>Info del pago</b></h3>
                                <p className="card-text" style={{marginLeft: "10px"}}>Fecha: {store.compraRealizada.money_release_date}</p>
                                <p className="card-text" style={{marginLeft: "10px"}}>Tarjeta: {store.compraRealizada.payment_method_id}</p>
                                <p className="card-text" style={{marginLeft: "10px"}}>Estado: <b>{store.compraRealizada.status}</b>, {store.compraRealizada.status_detail}</p>
                            </div>
                        </div>
                    </div>
                    
                    

                    {/* <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                    </div> */}
                    
                </div>
            </div>
        </>
    )
}
