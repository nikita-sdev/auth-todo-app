import { useState } from "react"
import { createUserinServer } from "../services/auth.services";
import { useNavigate } from "react-router-dom";

const UserSignup= ()=>{

  const navigate= useNavigate();

  const [email,setEmail] =useState();
  const [password, setPassword] =useState();
  const [error, setError] = useState("");

  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }
  const handlePassChange = (e)=>{
    setPassword(e.target.value);
  }

  const handleSignup= async()=>{
    await createUserinServer(email,password,navigate,setError);
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4 fw-bold">SignUp</h2>
        <div className="todo-form">
          <label className="form-label">Email</label>
          <input 
            type="email"
            className="form-control mb-3"
            placeholder="Eg: someone@gmail.com"
            onChange={(e)=>{handleEmailChange(e)}}
          />
          <label className="form-label">Password</label>
          <input 
            type="password"
            className="form-control mb-3"
            placeholder="enter your password"
            onChange={(e)=>{handlePassChange(e)}}
          />
          <p className="text-danger">{error}</p>
          <button onClick={handleSignup} className="btn btn-primary w-100 mt-2" >  SignUp</button>
          <p className="text-center mt-3">Already have an account<a className="text-decoration-none" href="/login">Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup