import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);

  return (
    <div className="container-xl p-5 mx-auto row row-cols-3 g-custom">
      <div className="col-4">
        <h1 style={{ color: "navy", fontSize: "25px"}}>Contact Management</h1>
        <ContactForm setContacts={setContacts} contacts={contacts} />
      </div>

      <div className="col-8">
        <ContactList setContacts={setContacts} contacts={contacts} />
      </div>
    </div>
  );
}
