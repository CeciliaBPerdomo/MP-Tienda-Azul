import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js"
import { useParams } from "react-router-dom";

export const Failure = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.obtenerCelularId(parseInt(params.theid))
    }, []);
    return (
        <>
            <div className="container" style={{ marginBottom: "25px" }}>
                <br />
                <h3 className="text-center">
                    Algo salió mal en la compra de tu <b style={{color: "blue"}}>
                    {store.celular.marca} {store.celular.modelo}</b>
                </h3>
                <br />

                <div className="d-flex justify-content-center" style={{marginBottom: "20px"}}>
                    <img src={store.celular.foto} 
                    style={{width: "30%"}}/>
                </div>

                <h3 className="text-end">
                    Por favor, vuelve a intentarlo más tarde.
                </h3>

            </div>
        </>
    )
}