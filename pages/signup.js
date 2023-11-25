import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUpHandler=async ()=>{
   const res=await fetch('/api/auth/signup',{
    method:"POST",
    body:JSON.stringify({email,password}),
    headers:{'Content-Type':'application/json'},
   })
   const data=await res.json();
   console.log(data);
  }
  return (
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
      <button onClick={signUpHandler}>Signup</button>
    </div>
  );
};

export default Signup;
