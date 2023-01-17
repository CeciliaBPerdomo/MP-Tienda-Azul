import axios from "axios";
let direccion = process.env.BACKEND_URL;
let accessToken = process.env.GETACCESS_TOKEN;
let token = process.env.ACCESS_TOKEN;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      celulares: [],
      celular: {},
      mercadopago: {},
      comprador: [],
      pagos: [],
      idPago: {},
	    realizados: [],
      compraRealizada: {}, 
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
          await fetch(direccion + "/api/celular")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setStore({ celulares: data });
            });
        } catch (error) {
          console.error(error);
          if (error.code === "ERR_BAD_REQUEST") {
            console.log(error.response.data.msg);
          }
        }
      },

      agregarCelular: async (
        marca,
        modelo,
        foto,
        descripcion,
        precio,
        cantidad,
      ) => {
        try {
          const response = await axios.post(direccion + "/api/celular", {
            marca: marca,
            modelo: modelo,
            foto: foto,
            descripcion: descripcion,
            precio: precio,
            cantidad: cantidad,
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
          const response = await axios.get(
            direccion + "/api/celular/" + id,
            {},
          );
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
        await getActions().mostrarCelulares();

        let resultados = getStore().celulares.filter((item) => {
          // Busca por marca
          if (
            item.marca.toString().toLowerCase().includes(valor.toLowerCase())
          ) {
            return valor;
            // Busca por modelo
          } else if (
            item.modelo.toString().toLowerCase().includes(valor.toLowerCase())
          ) {
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
      pagoMercadoPago: async (id, marca, modelo, foto, precio, cuota) => {
        try {
          const response = await axios.post(
            direccion + "/api/createPreference",
            {
              id: id,
              marca: marca,
              modelo: modelo,
              foto: foto,
              precio: precio,
              cuota: cuota,
            },
          );
          console.log(response.data)
          setStore({
            mercadopago: response.data,
          });
        } catch (error) {
          console.log(error);
        }
      },

      infoPagos: async () => {
        try {
			    await fetch(direccion + "/api/listarPagos")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setStore({ realizados: data });
            });
        } catch (error) {
          console.error(error);
        }
      },

      obtenerPagoMercado: async (id) => {
        try {
          const response = await axios.get(
            "https://api.mercadopago.com/v1/payments/" + id,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            },
          );
          setStore({
            comprador: response.data,
          });
          console.log(response.data)
          // de aca se guarda la info en la bd
          await axios.post(direccion + "/api/guardarPago", {
            payment_id: response.data.id,
            celular: response.data.additional_info.items[0].title,
            foto: response.data.additional_info.items[0].picture_url,
            usuario: response.data.additional_info.payer.first_name + " " +
              response.data.additional_info.payer.last_name,
            mail: response.data.payer.email,
            precio: response.data.additional_info.items[0].unit_price,
            tarjeta: response.data.payment_method.id,
            cuotas: response.data.installments,
          });
        } catch (error) {
          console.error(error);
        }
      },

      obtenerPago: async (id) => {
        try {
          const response = await axios.get(
            "https://api.mercadopago.com/v1/payments/" + id,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },      
            },
          );
          console.log(response.data)
          setStore({
            compraRealizada: response.data
          });
          } catch (error){
            console.error(error)
          }
      },


      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
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
      },
    },
  };
};

export default getState;
