import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const AgregarCelular = () => {

    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [foto, setFoto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");

    const {actions} = useContext(Context);

    const nuevoCelular = (e) => {
        e.preventDefault()

        actions.agregarCelular(marca, modelo, foto, descripcion, parseInt(precio), parseInt(cantidad))

        // Limpiar el formulario
        setMarca("")
        setModelo("")
        setFoto("")
        setDescripcion("")
        setPrecio("")
        setCantidad("")
    }

    return (
        <>
            <div className="container" style={{ marginBottom: "35px", marginTop: "15px" }}>
                <h3 style={{color: "#a0d2f3"}}> <b>
                    Agregar nuevo celular
                </b></h3>
                <br />
                
                <form className="row g-3" onSubmit={nuevoCelular}>
                    <div className="col-md-6">
                        {/* Marca */}
                        <label htmlFor="marca" className="form-label">Marca:</label>
                        <input type="text" className="form-control" id="marca"
                        onChange={(e) => setMarca(e.target.value)}
                        value={marca} />
                    </div>

                    <div className="col-md-6">
                        {/* Modelo */}
                        <label htmlFor="modelo" className="form-label">Modelo:</label>
                        <input type="text" className="form-control" id="modelo"
                        onChange={(e) => setModelo(e.target.value)}
                        value={modelo} />
                    </div>

                    <div className="col-12">
                        {/* Foto */}
                        <label htmlFor="foto" className="form-label">URL Foto:</label>
                        <input type="text" className="form-control" id="foto"
                        onChange={(e) => setFoto(e.target.value)}
                        value={foto} />
                    </div>

                    <div className="col-12">
                        {/* Descripcion */}
                        <label htmlFor="descripcion" className="form-label">Descripción:</label>
                        <input type="text" className="form-control" id="descripcion"
                        onChange={(e) => setDescripcion(e.target.value)}
                        value={descripcion} />
                    </div>

                    <div className="col-md-6">
                        {/* Precio */}
                        <label htmlFor="precio" className="form-label">Precio:</label>
                        <input type="text" className="form-control" id="precio" 
                        onChange={(e) => setPrecio(e.target.value)}
                        value={precio} />
                    </div>

                    <div className="col-md-6">
                        {/* Stock */}
                        <label htmlFor="cantidad" className="form-label">Disponibles:</label>
                        <input type="text" className="form-control" id="cantidad"
                        onChange={(e) => setCantidad(e.target.value)}
                        value={cantidad} />
                    </div>

                    <div className="col-12" style={{marginTop: "45px", marginBottom: "25px"}}>
                        {/* Agregar */}
                        <button type="submit" className="btn btn-outline-primary w-50 float-end"
                        style={{color: "black"}}>
                            Agregar celular
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}