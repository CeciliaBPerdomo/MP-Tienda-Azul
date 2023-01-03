import axios from "axios"
let direccion = process.env.BACKEND_URL;
let accessToken = process.env.GETACCESS_TOKEN;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			celulares: [],
			celular: {},
			mercadopago: {}, 
			comprador: [],
		},
		actions: {
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			///                                          ///
			///             CELULARES                    /// 
			///                                          ///
			////////////////////////////////////////////////
			////////////////////////////////////////////////

			/* Listar celulares */ 
			mostrarCelulares: async () => {
				try {
                    const response = await axios.get(direccion + "/api/celular", {});
                    setStore({
                        celulares: response.data,
                    });
                } catch (error) {
                    console.log(error);
                    if (error.code === "ERR_BAD_REQUEST") {
                        console.log(error.response.data.msg);
                    }
                }
			},

			// obtener celular por Id
            obtenerCelularId: async (id) => {
                try {
                    const response = await axios.get(direccion + "/api/celular/" + id, {});
                    setStore({
                        celular: response.data,
                    });
                    return response.data;
                } catch (error) {
                    if (error.code === "ERR_BAD_REQUEST") {
                        console.log(error.response.data.msg);
                    }
                }
            },

			// Buscador de celular
			buscarCelular: async (valor) => {
				// Carga todos los celulares por si hay una segunda busqueda
				await getActions().mostrarCelulares()

                let resultados = getStore().celulares.filter((item) => {
					// Busca por marca
                    if (item.marca.toString().toLowerCase().includes(valor.toLowerCase())) {
                        return valor;
					// Busca por modelo
                    } else if (item.modelo.toString().toLowerCase().includes(valor.toLowerCase())) {
						return valor;
					}
                });

                setStore({
                    celulares: resultados,
                });
            },

			////////////////////////////////////////////////
			////////////////////////////////////////////////
			///                                          ///
			///            MERCADO PAGO                  /// 
			///                                          ///
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			pagoMercadoPago: async (id, marca, modelo, foto, precio, cantidad) => {
                try {
                    const response = await axios.post(
                        direccion + "/api/createPreference", {
                           	id: id, 
							marca: marca,
							modelo: modelo,
							foto: foto,
							precio: precio,
							cantidad: cantidad
                        }
                    );
                    setStore({
                        mercadopago: response.data,
                    });
                    console.log(response.data);
                } catch (error) {
                    console.log(error);
                }
            },

			obtenerPagoMercado: async (id) => {
				try {
					const response = await axios.get(
						"https://api.mercadopago.com/v1/payments/" + id, {
						headers: { 
                            Authorization: "Bearer " + accessToken,
                        }
					})
					setStore({
                        comprador: response.data,
                    });
					// Id de pago
					console.log(response.data.id)
				} catch(error){
					console.log(error);
				}
			}, 

			// Datos que se pueden obtener
			// # {
			// #   "id": 1,
			// #   "date_created": "2017-08-31T11:26:38.000Z",
			// #   "date_approved": "2017-08-31T11:26:38.000Z",
			// #   "date_last_updated": "2017-08-31T11:26:38.000Z",
			// #   "money_release_date": "2017-09-14T11:26:38.000Z",
			// #   "payment_method_id": "account_money",
			// #   "payment_type_id": "credit_card",
			// #   "status": "approved",
			// #   "status_detail": "accredited",
			// #   "currency_id": "BRL",
			// #   "description": "Pago Pizza",
			// #   "collector_id": 2,
			// #   "payer": {
			// #     "id": 123,
			// #     "email": "afriend@gmail.com",
			// #     "identification": {
			// #       "type": "DNI",
			// #       "number": 12345678
			// #     },
			// #     "type": "customer"
			// #   },
			// #   "metadata": {},
			// #   "additional_info": {},
			// #   "transaction_amount": 250,
			// #   "transaction_amount_refunded": 0,
			// #   "coupon_amount": 0,
			// #   "transaction_details": {
			// #     "net_received_amount": 250,
			// #     "total_paid_amount": 250,
			// #     "overpaid_amount": 0,
			// #     "installment_amount": 250
			// #   },
			// #   "installments": 1,
			// #   "card": {}
			// # }

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
