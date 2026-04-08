import { useState } from "react";
import { editTaskInServer } from "../services/todo";


const Home=({todoItems, onDeleteItem,onUpdateItem, loading})=>{
  const [editing,setEditing]=useState(null);
  const [updatedTask, setUpdatedTask] = useState("");
  const [curDate, setCurDate]= useState("");

  if(loading)return(
    <>
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary"></div>
    </div>
    </>
  )

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 fw-bold">
        Here are your Todos:
      </h1>
      <div className="d-flex flex-column gap-3">
        {todoItems.map((item)=>(
          
          <ul>
            <div className="card shadow-sm p-3">
              {editing==item.id? (
              <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center">
              <input
              className="form-control"
              value={updatedTask}
              onChange={(e)=>setUpdatedTask(e.target.value)}
              ></input>
              <input 
              type="date"
              className="form-control"
              onChange={(e)=>setCurDate(e.target.value)}
              ></input>
              <button className="btn btn-primary w-100 mt-2"
              onClick={()=>{
                onUpdateItem(editing,updatedTask,curDate)
                setEditing(null);
                setUpdatedTask("");
              }}
              >Update
              </button>
              </div>
            ) :( 
              <>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div className="mb-2 mb-md-0">
                <span className="fw-semibold me-3">{item.task}</span>
                <span className="text-muted">{item.date}</span>
              </div>
              <div className="d-flex gap-2">
              <button className="btn btn-danger btn-sm"
                onClick={()=>onDeleteItem(item.id)}
              >Delete</button>
              <button onClick={()=>{
                setEditing(item.id);
                setUpdatedTask(item.task);
                setCurDate(item.date);
              }} className="btn btn-primary btn-sm">Edit</button>
              </div>
              </div>
              </>)
              }
            </div>
          </ul>
        ))}
        <a href="/add-task" className="btn btn-primary w-100">Add Todo</a>
      </div>
    </div>
  )
}

export default Home;