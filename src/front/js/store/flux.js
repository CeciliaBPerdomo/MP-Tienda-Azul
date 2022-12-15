import axios from "axios"
let direccion = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			celulares: [],
			celular: {},
			mercadopago: {}, 
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
                    const response = await axios.get(direccion + "celular", {});
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
                    const response = await axios.get(direccion + "celular/" + id, {});
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
                        direccion + "createPreference", {
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



			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "hello")
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
