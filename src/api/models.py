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