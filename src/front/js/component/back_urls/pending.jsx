import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js"
import { useParams } from "react-router-dom";

export const Pending = () => {
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
                    Tu compra del <b style={{color: "blue"}}>
                    {store.celular.marca} {store.celular.modelo} </b>
                    está siendo procesada.
                </h3>
                <br />

                <div className="d-flex justify-content-center" style={{marginBottom: "20px"}}>
                    <img src={store.celular.foto} 
                    style={{width: "30%"}}/>
                </div>

                <h3 className="text-end">
                    A la brevedad, nos comunicaremos contigo.
                </h3>

            </div>
        </>
    )
}