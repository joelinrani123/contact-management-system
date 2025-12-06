import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const ContactList = forwardRef(({ contacts, setContacts }, ref) => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const API_URL = "https://contact-management-backend-1-3ic9.onrender.com";

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/contacts`, {
        params: { status: filter || undefined, search: search || undefined }
      });
      setContacts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({ fetchContacts }));

  useEffect(() => {
    fetchContacts();
  }, [filter, search]);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(`${API_URL}/contacts/${id}`, { status });
      setContacts(prev => prev.map(c => (c._id === id ? res.data : c)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`${API_URL}/contacts/${id}`);
        setContacts(prev => prev.filter(c => c._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="d-flex w-100 mb-3">
        <select
          className="form-select w-auto"
          style={{ backgroundColor: "navy", color: "white" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Interested">Interested</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or company"
          className="form-control p-2 rounded ms-3 flex-grow-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <div
          className="w-100 d-flex flex-column justify-content-center align-items-center rounded p-3 mt-4 gap-2"
          style={{
            height: "300px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <img src="/spinning-dots.svg" alt="loading" width={40} height={40} />
          <p className="mt-2 fw-bold" style={{ color: "navy", fontSize: "16px" }}>
            Loading...
          </p>
        </div>
      )}

      {!loading && contacts.length === 0 && (
        <div
          className="w-100 d-flex flex-column align-items-center justify-content-center rounded p-3 mt-4 gap-2 bg-light"
          style={{ height: "300px" }}
        >
          <img
            src="/ChatGPT Image Dec 3, 2025, 10_34_07 AM.png"
            alt="no contacts"
            width={200}
            height={200}
          />
          <p className="mt-1 fw-bold" style={{ color: "navy", fontSize: "16px" }}>
            No contacts found.
          </p>
        </div>
      )}

      {!loading && (
        <div className="row row-cols-2 g-3 mt-4">
          {contacts.map(c => (
            <div key={c._id}>
              <div className="bg-light shadow rounded p-3 d-flex flex-column justify-content-between">
                <div className="d-flex gap-2 mb-2 justify-content-between align-items-center">
                  <h3 className="fw-bold fs-5 text-primary">{c.name}</h3>
                  <p
                    className="px-2 py-1 rounded"
                    style={{
                      backgroundColor: "#d3e6ff",
                      fontWeight: 500,
                      fontSize: "12px"
                    }}
                  >
                    {c.company}
                  </p>
                </div>

                <div
                  className="d-flex gap-2 my-2 justify-content-between border rounded p-2"
                  style={{
                    borderColor: "#0027a2",
                    fontSize: "13px",
                    borderWidth: "1.5px"
                  }}
                >
                  <p className="mb-0">📧 {c.email}</p>
                  <p className="mb-0">📞 {c.phone}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <select
                    value={c.status}
                    className="form-select w-auto shadow-sm"
                    style={{ fontSize: "13px" }}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                  >
                    <option value="Interested">Interested</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button
                    className="btn btn-danger px-2 py-1"
                    style={{ fontSize: "13px" }}
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
});

export default ContactList;
