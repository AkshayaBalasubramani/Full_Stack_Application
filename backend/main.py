#API ENDPOINTS
#just 4 crud operations

from flask import request, jsonify
from config import app, db
from models import Contact

#To test the flask end point we can do it with Postman

@app.route("/contacts",methods=["GET"])
def get_contacts():
    #uses flask SQL Alechemy in all database from the contact table
    contacts = Contact.query.all()

    #Contacts are python objects we cant return python objects hence we will hav to return the json data
    #contact is a list of contact objects call the to_json a new list
    json_contacts=list(map(lambda x:x.to_json(),contacts))

    #even if 200 is not specifies its the defauls
    return (jsonify({"contacts":json_contacts}),200)

@app.route("/create_contacts",methods=["POST"])
def create_contact():
    #check if its a valid req
    first_name=request.json.get("firstName")
    last_name=request.json.get("lastName")
    email=request.json.get("email")

    if not first_name or not last_name or not email:
        return (jsonify({"error":"You must include a firstname,last name and email"}),400)
    
    new_contact=Contact(first_name=first_name,last_name=last_name,email=email)

    #commit the contact and add to the db
    try:
        #added to the db
        db.seesion.add(new_contact)
        #write into the db
        db.session.commit()
    except Exception as e:
        return (jsonify({"message":str(e)}),400)
    
    return (jsonify({"message":"User created"}),201)

#we hav to pass no indicating id of the user
# update_contact/1
@app.route("/update_contact/<int:user_id>",methods=["PATCH"])
def update_contact(user_id):
    contact=Contact.query.get(user_id)

    if not contact:
        return (jsonify({"error":"Contact not found"}),404)
    
    data=request.json

    #just overwriting the data the is currently present in the db
    contact.first_name=data.get("firstName",contact.first_name)
    contact.last_name=data.get("lastName",contact.last_name)
    contact.email=data.get("email",contact.email)

    #since the data is already we just hav to commit to the current session
    db.session.commit()

    return (jsonify({"message":"User updated"}),200)

#here as well the id will be passed
@app.route("/delete_contact/<int:user_id>",methods=["DELETE"])
def delete_contact(user_id):
    contact=Contact.query.get(user_id)

    if not contact:
        return (jsonify({"error":"Contact not found"}),404)
    
    #delete the contact and commit to the db
    db.session.delete(contact)
    db.session.commit()

    return (jsonify({"message":"User deleted"}),200)

#run application
#when we run the main.py prevents import of main.py in other files and only run when we run main.py
if __name__ == "__main__":
    #we gwt context of the app
    #we hav to create all models in the database before we run the application - if it doesnt exist
    with app.app_context():
        db.create_all()
    app.run(debug=True)