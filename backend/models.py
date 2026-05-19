#database models-fields,keys to check the data and store it in the database
#create and modify the data

#instance that helps access the SQL Alchemy
from config import db

class Contact(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    first_name=db.Column(db.String(80),unique=False,nullable=False)
    last_name=db.Column(db.String(80),unique=False,nullable=False)
    email=db.Column(db.String(120),unique=True,nullable=False)

    #take fields and convert to python dictionary and then convert into a JSON to pass to our api
    #camel casing for json to match convention
    def to_json(self):
        return {
            "id":self.id,
            "firstName":self.first_name,
            "lastName":self.last_name,     
            "email":self.email
        }