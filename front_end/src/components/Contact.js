import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import "../index.css"

const Contact = ({ contact, onDelete, onEdit }) => {
    return (
        <div>
            <div className="task">
                <div>
                    <p className="taskName">
                        <span className="textBold">First Name:</span> {contact.firstname}
                    </p>
                    <p className="taskName">
                        <span className="textBold">Last Name:</span> {contact.lastname}
                    </p> 
                    <p className="taskName">
                        <span className="textBold">Email:</span> {contact.email}
                    </p>
                    <p className="taskName">
                        <span className="textBold">Country:</span> {contact.country}
                    </p> 
                    <p className="taskName">
                        <span className="textBold">Phone:</span> {contact.phone}
                    </p> 
                    <p className="taskName">
                        <span className="textBold">About:</span> {contact.about}
                    </p>                                                                                 
                </div>
                <div>
                    <p><FaTimes onClick={() => onDelete(contact.id)} className="delIcon" /></p>
                    <p><FaPencilAlt onClick={() => onEdit(contact.id)} className="editIcon" /></p>
                </div>
            </div>
        </div>
    )
}

export default Contact
