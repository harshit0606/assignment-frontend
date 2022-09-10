import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal} from "react-bootstrap";

function App() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [contact,setContact]=useState("");
  const [location,setLocation]=useState("");
  const [editname, setEditName] = useState("");
  const [editemail, setEditEmail] = useState("");
  const [editcontact, setEditContact] = useState("");
  const [editlocation, setEditLocation] = useState("");
  const [show,setShow]=useState(false);
  const [editId,setEditId]=useState("");


  useEffect(() => {
    axios.get("http://localhost:5000/api/getcompany").then((res) => {
      console.log(res.data);
      setAllCompanies(res.data);
    });
  }, []);

  function addCompany(){
    axios.post("http://localhost:5000/api/addcompany",{
      name:name,
      email:email,
      contactNo:contact,
      location:location
    }).then((res)=>{
      setAllCompanies((e)=>[...e,res.data]);
      setName("");
      setContact("");
      setEmail("");
      setLocation("");
    });
  }

  function handleClose(){
    setShow(false);
    setEditName("");
    setEditContact("");
    setEditEmail("");
    setEditLocation("");
    setEditId("");
  }function handleShow(c){
    setShow(true);
    console.log(c._id);
    setEditName(c.name);
    setEditContact(c.contactNo);
    setEditEmail(c.email);
    setEditId(c._id);
    setEditLocation(c.location);
  }

  function editCompany(){
    console.log(editId);
    axios.patch( `http://localhost:5000/api/editcompany/${editId}`,{
      name:editname,
      email:editemail,
      location:editlocation,
      contactNo:editcontact
    }).then((res)=>{
      let b = allCompanies.findIndex((a) => a._id === editId);
      var dummyarr = [...allCompanies];
      dummyarr[b].name = editname;
      dummyarr[b].email = editemail;
      dummyarr[b].editlocation = editlocation;
      dummyarr[b].contactNo=editcontact;
      setEditName("");
      setEditContact("");
      setEditEmail("");
      setEditLocation("");
      setEditId("");
      handleClose();
     });
  }

  function deleteCompany(id){
    axios.delete(`http://localhost:5000/api/deletecompany/${id}`).then(() => {
      console.log("Company deleted");
      let b = allCompanies.findIndex((a) => a._id === id);
      var dummyarr = [...allCompanies];
      dummyarr.splice(b, 1);
      setAllCompanies(dummyarr);
    });;
  }

  function handleChange(e){
    e.preventDefault();
    const {name,value}=e.target;
    if(name==="name"){
      setName(value);
    }
    if(name==="email"){
      setEmail(value);
    }
    if(name==="location"){
      setLocation(value);
    }
    if(name==="contact"){
      setContact(value);
    }
    if (name === "editname") {
      setEditName(value);
    }
    if (name === "editemail") {
      setEditEmail(value);
    }
    if (name === "editlocation") {
      setEditLocation(value);
    }
    if (name === "editcontact") {
      setEditContact(value);
    }
  }
  return (
    <div className="App">
      <div style={{ marginBottom: "40px" }}>
        <label> Company Name</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={name}
          name="name"
        />
        <br></br>
        <label> Company Email</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={email}
          name="email"
        />
        <br></br>
        <label> Company Location</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={location}
          name="location"
        />
        <br></br>
        <label> Company Contact No</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={contact}
          name="contact"
        />
        <br></br>
        <button onClick={addCompany}>Add</button>
      </div>
      <table>
        <tr>
          <td style={{ width: "200px" }}>Name</td>
          <td style={{ width: "200px" }}>Email</td>
          <td style={{ width: "200px" }}>Location</td>
          <td style={{ width: "200px" }}>Contact No</td>
          <td style={{ width: "200px" }}>Actions</td>
        </tr>
        {allCompanies.map((c) => (
          <tr>
            <td style={{ width: "200px" }}>{c.name}</td>
            <td style={{ width: "200px" }}>{c.email}</td>
            <td style={{ width: "200px" }}>{c.location}</td>
            <td style={{ width: "200px" }}>{c.contactNo}</td>
            <td style={{ width: "200px" }}>
              <button onClick={() => handleShow(c)}>Edit</button>
            </td>
            <td style={{ width: "200px" }}>
              <button onClick={() => deleteCompany(c._id)}>Delete</button>
            </td>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>Edit Details</Modal.Header>
              <Modal.Body>
                <div>
                  <label> Company Name</label>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={editname}
                    name="editname"
                  />
                  <br></br>
                  <label> Company Email</label>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={editemail}
                    name="editemail"
                  />
                  <br></br>
                  <label> Company Location</label>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={editlocation}
                    name="editlocation"
                  />
                  <br></br>
                  <label> Company Contact No</label>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={editcontact}
                    name="editcontact"
                  />
                  <br></br>
                  <button onClick={() => editCompany(c)}>Edit</button>
                </div>
              </Modal.Body>
            </Modal>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
