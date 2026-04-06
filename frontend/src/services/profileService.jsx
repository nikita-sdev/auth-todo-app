const BASE_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");


export const getProfileFromServer =async ( )=>{
  const token=  localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/todo/user-profile`,
    {
      headers:{
      Authorization:token
      }
    }
  )
  const data= await res.json();
  if(res.ok){
    return data;
  }else{
    console.log(data.msg);
  }
}

export const addProfileToServer= async(userName, firstName, lastName, setError)=>{
  const token = localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/todo/user-profile`,
    {
      method:"POST",
      headers:{
      "Content-Type": "application/json",
      Authorization:token
      },
      body: JSON.stringify({userName,firstName,lastName}),
    })
    const data= await res.json();
    if(res.ok){
      return data;
    }else{
      setError(data.msg);
    }
}

export const deleteProfileFromServer = async ()=>{
  const res = await fetch(`${BASE_URL}/api/todo/user-profile`,{
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
      Authorization: token,
    }
  })
  const data= res.json();
  if(res.ok){
    return data;
  }
}

export const updateProfileInServer= async(userName,firstName, lastName, setError)=>{
  const res= await fetch(`${BASE_URL}/api/todo/user-profile`,{
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({userName, firstName, lastName}),
  })
  const data= await res.json();
  if(res.ok){
    return data;
  }else{
    setError(data.msg);
  }
}