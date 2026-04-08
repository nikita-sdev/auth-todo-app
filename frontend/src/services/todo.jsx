const BASE_URL = import.meta.env.VITE_API_URL

export const addTodoToServer= async(task,date,setError)=>{
  const token= localStorage.getItem("token");
  const res=await fetch(`${BASE_URL}/api/todo/add-task`, {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({task,date})
  })
  const data= await res.json();
  if(res.ok){
    return mapServerItemToLocalIte(data);
  }else{
    console.log(data.msg);
    setError(data.msg);
  }
}

export const getTodoFromServer = async ()=>{
  const token= localStorage.getItem("token")
  const res= await fetch(`${BASE_URL}/api/todo/todos`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  const items = await res.json();
  return items.map(mapServerItemToLocalIte);
}

export const deleteTodoFromServer= async(id)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/todo/${id}`,{
    method:"DELETE",
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
  const item= await res.json();
  return item._id;
}

export const editTaskInServer = async(id, updatedTask,date)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/todo/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({
      task:updatedTask,
      date,
    })
  })
  console.log("server hit")
  const item= await res.json();
  return item._id;
}

const mapServerItemToLocalIte = (serverItem)=>{
  return {
    id: serverItem._id,
    task: serverItem.task,
    date: serverItem.date,
  }
}