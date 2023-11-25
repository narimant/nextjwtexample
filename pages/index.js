import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLogedIn,setIsLogedIn]=useState(false);
  useEffect(()=>{
    fetch('/api/user').then(res=>res.json()).then(data=>{
      if(data.status==='success') setIsLogedIn(true);
    })
  },[])
  const signoutHandler=async()=>{
      const res=await fetch('/api/signout');
      const data=await res.json();
      console.log(data);
      if(data.status==='success')
      {
        setIsLogedIn(false)
      }
     
  }
  return (
    <div>
      <Head>
        <title>nariman web site</title>
        <meta name="description" content="این سایت نرمیان تاتاری میباشد" />
      </Head>
      <div>
        
        
        {isLogedIn ?(
          <>
          <Link href='/dashboard' className="signup-btn">dashboard</Link>
        <button className="signup-btn" onClick={signoutHandler}>logout</button>
        </>
        ) : (
          <>
          <Link href='/signup' className="signup-btn">signup</Link>
        <Link href='/signin' className="signup-btn">singin</Link></>
        )}
      </div>
    </div>
  );
}
