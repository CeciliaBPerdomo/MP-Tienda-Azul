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

from mercadopago.config import RequestOptions

request_options = RequestOptions(
    #corporation_id="CORPORATION_ID",
    integrator_id="dev_24c65fb163bf11ea96500242ac130004",
   # platform_id="PLATFORM_ID"
)
# Agrega credenciales
sdk = mercadopago.SDK(os.getenv('ACCESS_TOKEN'), request_options=request_options)
GETACCESS_TOKEN = os.getenv("GETACCESS_TOKEN")


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
                "category_id": "celular",
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
                    "zip_code": "70000"
                },
            "email": "test_user_17805074@testuser.com",
            "name": "Lalo",
            "surname": "Landa",
            "first_name": "Lalo", 
            "last_name": "Landa",
            "phone": {
                "area_code": "+598",
                "number": "991234567"
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
        "notification_url": "https://tiendaazul.onrender.com/notificaciones",
        # Adonde te re-dirige en caso de exito total / o no
        "back_urls": {
	     	"success": "https://tiendaazul.onrender.com/success/" + str(id),
	 		"failure": "https://tiendaazul.onrender.com/failure/" + str(id),
	 		"pending": "https://tiendaazul.onrender.com/pending/" + str(id)
	     },
        "auto_return": "approved"
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]

    return preference, 200