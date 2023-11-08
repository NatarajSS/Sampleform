import { useState } from 'react';
import Swal from "sweetalert2";

const AddContact = ({ onSave }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [about, setAbout] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (!firstname) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your firstname!'
            })
        } else if (!lastname) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your lastname!'
            })
        } else if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your email!'
            })
        } else {
            onSave({ firstname, lastname, email, country, phone, about});
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setCountry('');
        setPhone('');
        setAbout('');
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Firstname</label>
                <input type="text" placeholder="add firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Lastname</label>
                <input type="text" placeholder="add lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Email</label>
                <input type="text" placeholder="add email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Country</label>
                <input type="text" placeholder="add country" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div> 
            <div className="form-control">
                <label>Phone</label>
                <input type="text" placeholder="add phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-control">
                <label>About</label>
                <input type="text" placeholder="add about" value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>                                                 

            <input type="submit" className="btn btn-block" value="Save Contact" />
        </form>
    )
}

export default AddContact
