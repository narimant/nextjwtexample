import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Singin = () => {
  const [email, setEmail] = useState("");
  const [authData,setAuthData]=useState('')
  const router=useRouter();
  const [password, setPassword] = useState("failed");
  const signUpHandler=async ()=>{
   const res=await fetch('/api/auth/signin',{
    method:"POST",
    body:JSON.stringify({email,password}),
    headers:{'Content-Type':'application/json'},
   })
   const data=await res.json();

  }
  useEffect(()=>{
    fetch('/api/user').then(res=>res.json()).then(data=>{
      if(data.status==="success"){
        setAuthData(data.status);
        
        setInterval(() => {
          // router.replace('/dashboard');
          window.location.href='/dashboard';
        }, 10);
      }
    })
  },[])
  return (
    <>
    {authData==='success'? (<div className="alert">your not access to this page</div>) : ( 
      <div>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUpHandler}>singin</button>
    </div>
    )}
   </>
  );
};

export default Singin;
