"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Celular, Pagos
from api.utils import generate_sitemap, APIException
import json
import os
from sqlalchemy import desc

# SDK de Mercado Pago
import mercadopago
# Agrega credenciales
sdk = mercadopago.SDK(os.getenv('ACCESS_TOKEN'))
#GETACCESS_TOKEN = os.getenv("GETACCESS_TOKEN")

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


################################################
################################################
###                                          ###
###             CELULARES                    ### 
###                                          ###
################################################
################################################

@api.route('/celular', methods=['GET'])
def getCelular():
    celular = Celular.query.all()
    results = list(map(lambda x: x.serialize(), celular))

    if results is None: 
        response_body = {"msg": "No existe datos"}
        return jsonify(response_body), 400

    return jsonify(results), 200

# Busca por id de celular
@api.route('/celular/<int:celular_id>', methods=['GET'])
def get_celular(celular_id):
    celular = Celular.query.filter_by(id=celular_id).first()

    if celular is None: 
        response_body = {"msg": "No existe ese celular"}
        return jsonify(response_body), 400

    result = celular.serialize()
    return jsonify(result), 200

# Crea un nuevo celular 
@api.route('/celular', methods=['POST'])
def postCelular():
    body = json.loads(request.data)
    queryNewCelular = Celular.query.filter_by(modelo=body["modelo"]).first()

    if queryNewCelular is None: 
        newCelular = Celular(
            marca = body["marca"], 
            modelo = body["modelo"], 
            foto = body["foto"],
            descripcion = body["descripcion"],
            precio = body["precio"],
            cantidad = body["cantidad"]
        )

        db.session.add(newCelular)
        db.session.commit()

        response_body = { "msg": "Celular creado" }
        return jsonify(response_body), 200
    
    response_body = { "msg": "Celular ya creado" }
    return jsonify(response_body), 400

################################################
################################################
###                                          ###
###           MERCADO PAGO                   ### 
###                                          ###
################################################
################################################
@api.route('/createPreference', methods=['POST'])
def createPreference():
    body = json.loads(request.data)
    marca = body["marca"]
    modelo = body["modelo"]
    precio = body["precio"]
    id = body["id"]
    foto = body["foto"]
    cuota = body["cuota"]
# Crea un ítem en la preferencia
    preference_data = {
        "items": [
            {
                "category_id": "cellular",
                "title": marca + " " + modelo,
                "quantity": 1,
                "unit_price": precio, 
                "currency_id": "USD",
                "description": "Tienda Azul (Celulares)",
                "id": id,
                "picture_url": foto
            }, 
        ], 
        "payer": {
            "address": 
                {
                    "street_name": "calle falsa", 
                    "street_number": 123,
                    "zip_code": 70000
                },
            "email": "test_user_17805074@testuser.com",
            "name": "Lalo",
            "surname": "Landa",
            "phone": {
                "area_code": "+598",
                "number": "99123456"
            }
        },
        "payment_methods": {
            # Cantidad de cuotas
            "installments": cuota,
            "excluded_payment_methods": [
                {
                    # Exclusion de visa
                    "id": "visa"
                }
            ],
        },
        "external_reference": "cecilia.perdomo@gmail.com",
        # URL donde van las notificaciones de pago.
        # Para pruebas de las notificaciones instalar ngrok (choco install ngrok en cmd como admin)
        # https://ngrok.com/docs/getting-started, genera un url como copia del localhost
        "notification_url": "https://tiendaazul.onrender.com/notificaciones", #/str(id)
        # Adonde te re-dirige en caso de exito total / o no
        "back_urls": {
	     	"success": "https://tiendaazul.onrender.com/success/" + str(id),
            #"success": "http://localhost:3000/success/" + str(id),
	 		"failure": "https://tiendaazul.onrender.com/failure/" + str(id),
	 		"pending": "https://tiendaazul.onrender.com/pending/" + str(id)
	     },
        "auto_return": "approved"
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]

    return preference, 200

# Guarda la informacion del pago
@api.route('/guardarPago', methods=['POST'])
def postPago():
    body = json.loads(request.data)
    queryNewPago = Pagos.query.filter_by(payment_id=body["payment_id"]).first()

    if queryNewPago is None: 
        newPago = Pagos(
            payment_id = body["payment_id"], 
            celular = body["celular"], 
            foto = body["foto"],
            usuario = body["usuario"],
            mail = body["mail"],
            precio = body["precio"],
            tarjeta = body["tarjeta"],
            cuotas = body["cuotas"]
        )

        db.session.add(newPago)
        db.session.commit()

        response_body = { "msg": "Pago creado" }
        return jsonify(response_body), 200
    
    response_body = { "msg": "Ya existe ese pago" }
    return jsonify(response_body), 400

# Listar pagos
@api.route('/listarPagos', methods=['GET'])
def getPagos():
    pagos = Pagos.query.order_by(desc(Pagos.payment_id)).all()
    results = list(map(lambda x: x.serialize(), pagos))

    if results is None: 
        response_body = {"msg": "No existe datos"}
        return jsonify(response_body), 400

    return jsonify(results), 200