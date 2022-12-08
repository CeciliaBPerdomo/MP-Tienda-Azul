import React, {useState, useContext, useEffect} from "react";
import {Context} from "../store/appContext";
import PropTypes from "prop-types";
import {Link, useParams} from "react-router-dom";

export const Compra = () => {
    const {store, actions} = useContext(Context);
    const params = useParams();

    const [cantidad, setCantidad] = useState(1)

    useEffect(() => {
        actions.obtenerCelularId(parseInt(params.theid))
    }, []);
    
    const pagar = async () => {
        let marca =  store.celular.marca
        let modelo = store.celular.modelo
        let foto = store.celular.foto
        let precio = store.celular.precio
        
        // Mercado pago
        await actions.pagoMercadoPago()
        //window.location.replace(store?.mercadopago.sandbox_init_point)
    }
    
    return (
        <>
        <div className="container" style={{marginBottom: "25px"}}>
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
                                <p className="card-text text-start" style={{marginTop: "8px"}}>Seleccione la <b>cantidad de cuotas</b> en que desea realizar el pago:</p>
                                {/* Cuotas: 1, 2, 4, 6, 12 */} 
                                    <select className="form-select" size="5" 
                                    onChange={(e) => setCantidad(e.target.value)} 
                                    style={{border: "none", marginLeft: "5px", marginBottom: "15px", scrollbarWidth: "none"}}>
                                        <option value="1" selected>Pago contado: u$s {store.celular.precio}</option>
                                        <option value="2">2 cuotas: u$s {parseInt(store.celular.precio)/2}</option>
                                        <option value="4">4 cuotas: u$s {(parseInt(store.celular.precio)/4).toFixed()}</option>
                                        <option value="6">6 cuotas: u$s {(parseInt(store.celular.precio)/6).toFixed()}</option>
                                        <option value="12">12 cuotas: u$s {(parseInt(store.celular.precio)/12).toFixed()}</option>
                                    </select>
                                <hr />
                                <h5 className="card-title text-end">El total de tú compra es de {cantidad} cuota(s) por <b style={{color: "red"}}>u$s {(parseInt(store.celular.precio)/cantidad).toFixed()}</b></h5>
                                <hr />
                                <h5 className="card-title text-end"> ¡Ya casi es tuyo! </h5>

                                <div className="card-body">
                                    <a className="btn btn-outline-primary position-absolute bottom-0 end-0" 
                                    style={{marginRight: "10px", marginBottom: "10px"}}
                                    onClick={pagar}>Finalizar compra</a>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
                </div>
        </div>
        </>
    )
}