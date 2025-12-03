import { useState } from "react";
import axios from 'axios';

export default function ContactForm({ setContacts, contacts }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('Interested');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !email) return alert("Name and Email are required");

    try {
      const res = await axios.post("http://localhost:5000/contacts", {
        name, company, email, phone, status,
      });
      setContacts([res.data, ...contacts]);
      setName(""); setCompany(""); setEmail(""); setPhone(""); setStatus('Interested');
      alert("Form submitted successfully");
    } catch(err) {
      console.log("Error:", err.response ? err.response.data : err); 
      alert(err.response?.data?.message || "Form submit failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded" autoComplete="off">
      <input type="text" placeholder="Name" className="form-control mb-3" style={{ backgroundColor: '#ffffffff' }} value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Company" className="form-control mb-3" style={{ backgroundColor: '#ffffffff' }} value={company} onChange={(e) => setCompany(e.target.value)} />
      <input type="email" placeholder="Email" className="form-control mb-3" style={{ backgroundColor: '#ffffffff' }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="tel" placeholder="Phone" className="form-control mb-3" style={{ backgroundColor: '#ffffffff' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
      <select className="form-select mb-3" style={{ backgroundColor: '#ffffffff' }} value={status} onChange={(e) => setStatus(e.target.value)} >
        <option value="Interested">Interested</option>
        <option value="Follow-up">Follow-up</option>
        <option value="Closed">Closed</option>
      </select>
      <button type="submit" className="btn btn-primary text-white w-100 mt-2">Submit</button>
    </form>
  )
}
