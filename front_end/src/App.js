// Importing Components
import Header from './components/Header';
import Contacts from './components/Contactlist';
import AddContact from './components/AddContact';
// Importing React Hooks
import { useState, useEffect } from 'react';
// Importing Packages
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

function App() {
    // All States
    const [loading, setloading] = useState(true); // Pre-loader before page renders
    const [contacts, setContacts] = useState([]); // Contact State
    const [showAddContact, setShowAddContact] = useState(false); // To reveal add contact form

    // Pre-loader
    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 3500);
    }, [])

    // Fetching from Local Storage
    const getContacts = JSON.parse(localStorage.getItem("contactAdded"));

    useEffect(() => {
        if (getContacts == null) {
            setContacts([])
        } else {
            setContacts(getContacts);
        }
        // eslint-disable-next-line
    }, [])

    // Add Contact
    const addContact = (contact) => {
        const id = uuidv4();
        const newContact = { id, ...contact }

        setContacts([...contacts, newContact]);

        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully added a new contact!'
        })

        localStorage.setItem("contactAdded", JSON.stringify([...contacts, newContact]));
    }

    // Delete Contact
    const deleteContact = (id) => {
        const deleteContact = contacts.filter((contact) => contact.id !== id);

        setContacts(deleteContact);

        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'You have successfully deleted a contact!'
        })

        localStorage.setItem("contactAdded", JSON.stringify(deleteContact));
    }

    // Edit Contact
    const editContact = (id) => {

        const firstname = prompt("Firstname");
        const lastname = prompt("Lastname");
        const email = prompt("Email");
        const country = prompt("Country");
        const phone = prompt("Phone");
        const about = prompt("About");
        let data = JSON.parse(localStorage.getItem('contactAdded'));

        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    country: country,
                    phone: phone,
                    about: about,
                    id: uuidv4()
                }
            }
            return x;
        })

        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully updated the contact!'
        })

        localStorage.setItem("contactAdded", JSON.stringify(myData));
        window.location.reload();
    }

    return (
        <>
            {
                loading
                    ?
                    <div className="spinnerContainer">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <div className="container">
                        {/* App Header that has open and App Name */}
                        <Header showForm={() => setShowAddContact(!showAddContact)} changeTextAndColor={showAddContact} />

                        {/* Revealing of Add Contact Form */}
                        {showAddContact && <AddContact onSave={addContact} />}

                        {/* Contact Counter */}
                        <h3>Number of Contacts: {contacts.length}</h3>

                        {/* Displaying of Contacts */}
                        {
                            contacts.length > 0
                                ?
                                (<Contacts contacts={contacts} onDelete={deleteContact} onEdit={editContact} />)
                                :
                                ('No Contact Found!')
                        }
                    </div>
            }
        </>
    )
}

export default App;