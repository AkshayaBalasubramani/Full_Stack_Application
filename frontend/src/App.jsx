import { useState,useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'


function App() {

  const [contacts, setContacts] = useState([])

  //reuse the form
  const [isModalOpen, setIsModalOpen] = useState(false)

  //stores contact we are currently editing
  const [currentContact, setCurrentContact] = useState({})

  //test const [contacts,setContacts]=useState([{firstName:"John",lastName:"Doe",email:"john.doe@example.com"}])
  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {

    const response = await fetch(
      "http://127.0.0.1:5000/contacts"
    )

    const data = await response.json()

    setContacts(data.contacts)

    console.log(data.contacts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal=(contact)=>{
    if (isModalOpen) return

    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  // closes modal and fetched all contacts
  const onUpdate=(contact)=>{
    closeModal()
    fetchContacts()
  }

  //to edit contact we should know what contact that we are editing
  //know what the contact is that we are editing
  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={fetchContacts} />

      <button onClick={openCreateModal}>
        Create New Contact
      </button>

      {
        isModalOpen && (

          <div className="modal">

            <div className="modal-content">

              <span
                className='close'
                onClick={closeModal}
              >
                &times;
              </span>

              <ContactForm
                updateContacts={fetchContacts}
                closeModal={closeModal}
                existingContact={currentContact}
                updateCallback={onUpdate}
              />

            </div>

          </div>
        )
      }
    </>
  )
}

export default App
