import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Compra } from "./component/compra.jsx";
import { Success } from "./component/back_urls/success.jsx"
import { Failure } from "./component/back_urls/failure.jsx";
import { Pending } from "./component/back_urls/pending.jsx";
import { AgregarCelular } from "./component/agregarCelular.jsx";
import { Notificaciones } from "./component/notificaciones.jsx"
import { InfoPago } from "./component/infoPago.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* Home */}
                        <Route element={<Home />} path="/" />
                        {/* Para agregar un nuevo celular */}
                        <Route element={<AgregarCelular />} path="/agregarCelular" />

                        {/* Compra */}
                        <Route element={<Compra />} path="/compra/:theid" /> 
                        {/* Compra exitosa */}
                        <Route element={<Success />} path="/success/:theid" />
                        {/* Compra fallida */}
                        <Route element={<Failure />} path="/failure/:theid" />
                        {/* Compra pendiente */}
                        <Route element={<Pending />} path="/pending/:theid" />

                        {/* WebHooks */}
                        <Route element={<Notificaciones />} path="/notificaciones" />
                        <Route element={<InfoPago />} path="/infoPago/:theid" />

                        {/* Por defecto en la plantilla */}
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
