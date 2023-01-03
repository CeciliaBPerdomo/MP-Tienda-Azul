"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Celular
from api.utils import generate_sitemap, APIException
import json
import os

# SDK de Mercado Pago
import mercadopago
# Agrega credenciales
sdk = mercadopago.SDK(os.getenv('ACCESS_TOKEN'))

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
    print(results)
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
    #cuota = body["cuota"]
    marca = body["marca"]
    modelo = body["modelo"]
    precio = body["precio"]
    id = body["id"]
    foto = body["foto"]
    cantidad = body["cantidad"]
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
                "number": "99387921"
            }
        },
        "payment_methods": {
            # Cantidad de cuotas
            "installments": cantidad,
            "excluded_payment_methods": [
                {
                    # Exclusion de visa
                    "id": "visa"
                }
            ],
        },
        "external_reference": "cecilia.perdomo@gmail.com",
        # Adonde te re-dirige en caso de exito total / o no
        "back_urls": {
	     	"success": "localhost:3000/success/" + str(id),
	 		"failure": "localhost:3000/failure/" + str(id),
	 		"pending": "localhost:3000/pending/" + str(id)
	     },
        "auto_return": "approved"
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]
    return preference