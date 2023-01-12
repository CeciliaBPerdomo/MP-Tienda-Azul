import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js"
import { useParams } from "react-router-dom";

export const Success = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.obtenerCelularId(parseInt(params.theid))

        // Obtiene el id de pago que viene por parametro en la URL
        const querystring = window.location.search
        const valorURL = new URLSearchParams(querystring)
        let id = valorURL.get('payment_id')

        const getPago = async () => {
            await actions.obtenerPagoMercado(id)
        }
        
        getPago()
        }, []);


    return (
        <>
            <div className="container" style={{ marginBottom: "25px" }}>
                <br />
                <h3 className="text-center">
                    ¡¡Felicitaciones, tu nuevo <b style={{color: "blue"}}>
                    {store.celular.marca} {store.celular.modelo}</b> ya es tuyo!!
                </h3>
                <br />

                <div className="d-flex justify-content-center" style={{marginBottom: "20px"}}>
                    <img src={store.celular.foto} 
                    style={{width: "45%"}}/>
                </div>

                <h3 className="text-end">
                    ¡¡Esperamos que lo disfrutes!!
                </h3>

            </div>
        </>
    )
}