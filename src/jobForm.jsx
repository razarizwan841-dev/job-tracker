import { useContext, useState } from "react";
import React from "react";
import { db } from "./fireBase/fireBase";
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from "./context/AuthProvider";
import "./componentCss/jobForm.css";

function JobForm() {
  const { user } = useContext(AuthContext);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      company: company,
      position: position,
      status: status,
      date: date,
      notes: notes,
    };
    addDoc(collection(db, "jobs"), {
      company: company,
      position: position,
      status: status,
      date: date,
      notes: notes,
      userId: user.uid,
    })
      .then(() => {
        alert("save ho gaya ");
        setCompany("");
        setPosition("");
        setStatus("Applied");
        setDate("");
        setNotes("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className="job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="position"
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          required
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        ></textarea>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default JobForm;