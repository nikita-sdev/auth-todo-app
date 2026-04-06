

export const addLoginToServer= async (email,password,navigate,setToken,setError)=>{
  const res= await fetch("http://localhost:5000/api/todo/login", {
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
    navigate("/todos");
  }else{
    setError(data.msg);
  }
}

export const createUserinServer= async(email,password,navigate,setError)=>{
  const res= await fetch("http://localhost:5000/api/todo/signup",{
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

