import {BrowserRouter, Navigate, Route,Routes} from 'react-router-dom'
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/navbar'
import Addtask from './components/addtask'
import Home from './components/home'
import { addTodoToServer, deleteTodoFromServer, editTaskInServer, getTodoFromServer } from './services/todo';
import { useEffect } from 'react';
import UserLogin from './components/login';
import UserSignup from './components/signup';
import Logout from './components/logout';
import Profile from './components/profile';

function App() {
  
  const [token,setToken]= useState(localStorage.getItem("token"));
  const [newTodo, setNewTodo] =useState([]);
  const [error, setError]=useState();

  useEffect(()=>{
    if(token){
      getTodoFromServer().then((initialItems)=>{
        setNewTodo(initialItems)
      })
    }
  },[token])

  const handleNewTodo=async (newTask,newDate)=>{ 
    const item =  await addTodoToServer(newTask,newDate,setError)
    if(!item)return;
    const newTodoItem=[...newTodo, item]
    setNewTodo(newTodoItem);
    return item;
  }

  const handleDeleteItem=async (id)=>{
    const deleteId= await deleteTodoFromServer(id);
    const newTodoItems= newTodo.filter(item=>item.id!=deleteId);
    setNewTodo(newTodoItems);
  }

  const handleUpdateItem = async(id,updatedTask,date)=>{
    try{
      await  editTaskInServer(id,updatedTask,date);
    }
    catch{
      console.log("Error");
    }
    const updatedTodo= newTodo.map(item=>{
      if(item.id===id){
        return ({
          ...item,
          task:updatedTask,
        })
      }else{
        return item;
      }
    })
    setNewTodo(updatedTodo);
  }

  useEffect(()=>{
    const handleStorage=()=>{
      setToken(localStorage.getItem("token"));
    }

    window.addEventListener("storage", handleStorage);

    return ()=> window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <>
    <BrowserRouter>
    {token ? (
      <Navbar></Navbar>
    ):<></>}
    <Routes>
      <Route
        path='/'
        element={token? <Navigate to="/todos"></Navigate>: <Navigate to="/login"></Navigate>}
      ></Route>
      {!token? (
        <>
        <Route path="/login" element={<UserLogin setToken={setToken} ></UserLogin>} ></Route>
        <Route path="/signup" element={<UserSignup></UserSignup>}></Route>
        <Route path='*' element={<UserLogin></UserLogin>}></Route>
        </>
      ):(
        <>
        <Route path="/todos" element={<Home todoItems={newTodo} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} ></Home>}></Route>
        <Route path="/add-task" element={<Addtask handleNewTodo={handleNewTodo} error={error} ></Addtask>}></Route>
        <Route path="/user-profile" element={<Profile></Profile>}></Route>
        <Route path="/logout" element={<Logout setToken={setToken} ></Logout>}></Route>
        <Route path="*" element={<Home todoItems={newTodo} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem}></Home>}></Route>
        </>
      )
      }
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
