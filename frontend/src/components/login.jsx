import { useState } from "react";
import { addLoginToServer } from "../services/auth.services";
import { useNavigate } from "react-router-dom";

const UserLogin = ({setToken})=>{

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] =useState("");

  const handlemailChange= (e)=>{
    setEmail(e.target.value)
  }

  const handlePassChnage= (e)=>{
    setPassword(e.target.value);
  }

  const handleLogin=async ()=>{
    const user= await addLoginToServer(email,password,navigate, setToken, setError);
    console.log(user);
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4 fw-bold">Login</h2>
      <div>
        <label className="form-label">Email</label>
        <input 
          type= "email"
          className="form-control mb-3"
          placeholder="Enter your email"
          onChange={(e)=>{handlemailChange(e)}}
        />
        <label className="form-label">Password</label>
        <input 
          type="password"
          className="form-control mb-3"
          placeholder="enter your password"
          onChange={(e)=>{handlePassChnage(e)}}
        />
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary w-100 mt-2" onClick={handleLogin}>Login</button>
        <p className="text-center mt-3">Do not have an account?<a href="/signup" className="text-decoration-none">Signup</a></p>
      </div>
    </div>
  </div>
  )
}

export default UserLogin;