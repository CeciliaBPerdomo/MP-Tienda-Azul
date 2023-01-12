from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Celular(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(20), unique=False, nullable=False)
    modelo = db.Column(db.String(150), unique=True, nullable=False)
    foto = db.Column(db.String(500), unique=False, nullable=False)
    descripcion = db.Column(db.String(500), unique=False, nullable=False)
    precio = db.Column(db.String(10), unique=False, nullable=False)
    cantidad = db.Column(db.String(5), unique=False, nullable=False)

    def __repr__(self):
        return f'<Celular {self.modelo}>'

    def serialize(self):
        return {
            "id": self.id,
            "marca": self.marca,
            "modelo": self.modelo,
            "foto": self.foto,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "cantidad": self.cantidad
        }

class Pagos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    payment_id = db.Column(db.Integer, unique=False, nullable=False)
    celular = db.Column(db.String(200), unique=False, nullable=False)
    foto = db.Column(db.String(500), unique=False, nullable=False)
    usuario = db.Column(db.String(500), unique=False, nullable=False)
    mail = db.Column(db.String(500), unique=False, nullable=False)
    precio = db.Column(db.String(10), unique=False, nullable=False)
    tarjeta = db.Column(db.String(15), unique=False, nullable=False)
    cuotas = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f'<Pagos {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "payment_id": self.payment_id,
            "celular": self.celular,
            "foto": self.foto,
            "usuario": self.usuario,
            "mail": self.mail,
            "precio": self.precio,
            "tarjeta": self.tarjeta,
            "cuotas": self.cuotas
        }