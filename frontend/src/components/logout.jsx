import { useNavigate } from "react-router-dom"

const Logout= ({setToken})=>{
  const navigate= useNavigate();
  const handleLogout= ()=>{
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  const handleNotLogout=()=>{
    navigate("/todos");
  }
  return(
    <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow p-4 text-center w-100" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">Are you sure you want to logOut :(</h3>
      <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">
      <button className="btn btn-success w-100" onClick={handleLogout}>Yes</button>
      <button className="btn btn-danger w-100" onClick={handleNotLogout}>No</button>
      </div>
    </div>
    </div>
  )
}

export default Logout;