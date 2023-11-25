
import { verifyToken } from '@/utils/auth';
import React, { useState } from 'react';

const Dashboard = ({result}) => {
    const [name,setName]=useState('');
    const [lastName,setLastName]=useState('');
    const [password,setPassword]=useState('');
    const submitHandler=async()=>{
        const result=await fetch('/api/update-info',{
            method:"POST",
            body:JSON.stringify({name,lastName,password}),
            headers:{'Content-Type':'application/json'},

        })
        const data=await result.json();
        console.log(data);
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>your email {result.email}</p>
            <div>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div>
            <input type='text' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            </div>
            <div>
            <input type='text' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={submitHandler}>submit</button>
            </div>
            
        </div>
    );
};

export default Dashboard;


export async function getServerSideProps(context){
    const {token}=context.req.cookies;
    const secretKey=process.env.SECRET_KEY;
    const result=verifyToken(token,secretKey);

    if(!result)return{
        redirect:{destination:'/signin',permanent:false}
    }
    return{
        props:{result}
    }
}