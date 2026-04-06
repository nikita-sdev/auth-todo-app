import { useEffect, useState } from "react"
import { addProfileToServer, deleteProfileFromServer, getProfileFromServer, updateProfileInServer } from "../services/profileService";
import { useNavigate } from "react-router-dom";

const Profile=()=>{

  const navigate= useNavigate();

  const [userName, setUserName]= useState("");
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName]= useState("");
  const [error, setError]= useState("");
  const [profile, setProfile]=useState(null);
  const [editing, setEditing]= useState(false);

  const addProfile= async()=>{
    const res = await addProfileToServer(userName,firstName,lastName,setError);
    if(res){
      const data = await getProfileFromServer();
      setProfile(data);
    }
  }


  const updateProfile = async()=>{
    const res = await updateProfileInServer(userName, firstName, lastName, setError);
    console.log(res);
    if(!res){
      return;
    }else{
      const data = await getProfileFromServer();
      setProfile(data);
    }
    setEditing(false);
    setUserName("");
    setFirstName("");
    setLastName("");
  }


  const deleteProfile= async()=>{
    const res= await deleteProfileFromServer();
    if(res){
      const data = await getProfileFromServer();
      setProfile(data);
    }
  }

  useEffect(()=>{
    const fetchProfile = async()=>{
      const data= await getProfileFromServer();
      setProfile(data);
    };
    fetchProfile();
  }, []);


  return (
    <>
    {profile ? (
      !editing? (
        <>
        {/* <div className="add-todo">
        <h1>Your Profile</h1>
        <div className="profile-form">
          <span>UserName :  {profile.userName}</span>
          <span>FirstName :  {profile.firstName}</span>
          <span>LastName :  {profile.lastName}</span>
        </div>
        <div className="btns">
          <button className="btn btn-danger" onClick={deleteProfile}>Delete</button>
          <button className="btn btn-info" onClick={()=>{
            setEditing(true);
            setUserName(profile.userName)
            setFirstName(profile.firstName)
            setLastName(profile.lastName);
          }}>Edit</button>
        </div>
        </div> */}
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>

            <h2 className="text-center mb-4">Your Profile</h2>

            <div className="d-flex flex-column gap-3">
              <div><strong>UserName:</strong> {profile.userName}</div>
              <div><strong>FirstName:</strong> {profile.firstName}</div>
              <div><strong>LastName:</strong> {profile.lastName}</div>
            </div>

            <div className="d-flex flex-column flex-md-row gap-2 mt-4">
              <button
                className="btn btn-danger w-100"
                onClick={deleteProfile}
              >
                Delete
              </button>
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  setEditing(true);
                  setUserName(profile.userName);
                  setFirstName(profile.firstName);
                  setLastName(profile.lastName);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        </>
      ):(
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
            <h2 className="text-center mb-4 fw-bold">Edit Profile</h2>
            <div>
              <label className="form-label">Username</label>
              <input
              type="text"
              className="form-control mb-3"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              ></input>
              <label className="form-label">First Name</label>
              <input
              type="text"
              className="form-control mb-3"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              ></input>
              <label className="form-label">Last Name</label>
              <input
              type="text"
              className="form-control mb-3"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              ></input>
              <p className="text-danger">{error}</p>
              <button className="btn btn-primary w-100 mt-2"
              onClick={updateProfile}
              >Update</button>
            </div>
          </div>
        </div>
      )
    ) : (
      <>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4 fw-bold">Add Profile</h2>
        <div>
          <label className="form-label">Username</label>
          <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e)=>setUserName(e.target.value)}
          ></input>
          <label className="form-label">First Name</label>
          <input
          type="text"
          className="form-control mb-3"
          placeholder="Firstname..."
          onChange={(e)=>setFirstName(e.target.value)}
          ></input>
          <label className="form-label">Last Name</label>
          <input
          type="text"
          className="form-control mb-3"
          placeholder="LastName"
          onChange={(e)=>setLastName(e.target.value)}
          ></input>
          <p className="text-danger">{error}</p>
          <button className="btn btn-success w-100 mt-2"
          onClick={()=>{addProfile()}}
          >Add</button>
        </div>
      </div>
    </div>
      </>
    )}
    
    
    </>
  )
}

export default Profile