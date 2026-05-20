import { useState } from "react";

const ContactForm=({existingContact={},updateCallback})=>{

    //if the contact is already is existing contact we want to prefill the form with the existing contact details
    const [firstName,setFirstName]=useState(existingContact.firstName || "")
    const [lastName, setLastName]=useState(existingContact.lastName || "")
    const [email, setEmail]=useState(existingContact.email || "")

    //to know if it update/create
    //if cantact 
    const updating=Object.entries(existingContact).length!==0

    //once we click the button we go into the function
    const onSubmit=async(e)=>{
        //take e not refresh the page
        e.preventDefault();
        
        //post req
        //js object
        const data={
            firstName,
            lastName,
            email
        }

        //since it'll be the same form we hav we either create new or update
        const url = "http://127.0.0.1:5000/"+(updating ? `update_contact/${existingContact.id}` : "create_contact");

        //set options
        const options={
            method:updating? "PATCH" : "POST",
            headers:{
                "Content-Type":"application/json"
            },
            //json object
            body:JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status!=201 && response.status!==200){
            const message = await response.json()
            alert(message.message)
        }
        else{
            updateCallback()      
        }
    }

    //get details and send it to api to create a new contact
    //basic form
    return (<form onSubmit={onSubmit}>
        <div>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <button type="submit">{updating ? "Update Contact" : "Create Contact"}</button>
    </form>
    );
};

export default ContactForm
