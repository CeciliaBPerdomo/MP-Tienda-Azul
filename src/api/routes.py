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
# Crea un ítem en la preferencia
    preference_data = {
        "items": [
            {
                "title": "Tienda Azul - Celulares",
                "quantity": 1,
                "unit_price": 1200, 
                "currency_id": "USD",
            }
        ], 
        # Adonde te re-dirige en caso de exito total / o no
        "back_urls": {
	     	"success": "https://3000-ceciliabper-activafitne-6190l7lo399.ws-us75.gitpod.io/",
	 		"failure": "https://3000-ceciliabper-activafitne-6190l7lo399.ws-us75.gitpod.io/",
	 		"pending": "https://3000-ceciliabper-activafitne-6190l7lo399.ws-us75.gitpod.io/"
	     },
        "auto_return": "approved"
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]
    return preference