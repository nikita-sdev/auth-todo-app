import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addtask=({handleNewTodo, error})=>{

  const navigate = useNavigate();

  const [newTask, setNewTask] = useState();
  const [newDate, setNewDate] =useState();
  const [loading, setLoading] = useState(false);

  const handleTask=(e)=>{
      setNewTask(e.target.value);
  }
  const handleDate=(e)=>{
    setNewDate(e.target.value);
  }

  const onButtonClick=async()=>{
    setLoading(true);
    const item= await handleNewTodo(newTask,newDate);
    if(item){
      navigate("/todos");
      setLoading(false);
    }
  }

  if(loading)return(
    <>
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary"></div>
    </div>
    </>
  )

  return (
    <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
      <h1 className="text-center mb-4 fw-bold">
        Add Todo
      </h1>
      <div >
        <label className="form-label">Task</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter the task here"
          onChange={(e)=>handleTask(e)}
        ></input>
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control mb-3"
          onChange={(e)=>{handleDate(e)}}
        >
        </input>
        <p className="text-danger">{error}</p>
        <button className="btn btn-success w-100 mt-2"
        onClick={onButtonClick}
        >Add</button>
      </div>
    </div>
    </div>
  )
}

export default Addtask;