const BASE_URL = import.meta.env.VITE_API_URL;

export const addLoginToServer= async (email,password,navigate,setToken,setError)=>{
  const res= await fetch(`${BASE_URL}/api/todo/login`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email,password})
  })
  
  const data= await res.json();
  if(res.ok){
    localStorage.setItem("token", data.token);
    setToken(data.token);
    navigate("/todos")
  }else{
    setError(data.msg);
  }
}

export const createUserinServer= async(email,password,navigate,setError)=>{
  const res= await fetch(`${BASE_URL}/api/todo/signup`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"    
    },
    body: JSON.stringify({email, password}),
  })

  const data= await res.json();
  if(res.ok){
    navigate("/login")
  }else{
    setError(data.msg)
  }
}

