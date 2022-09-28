import { SERVER_URL } from '@/context/utils';
import { useRef } from 'react';

export default function Login(){
    const username = useRef("uname");
    const password = useRef("password");

    async function login(){
        let res = await fetch(`${SERVER_URL}/backoffice/login`, {
            method:"POST",
            credentials: 'include',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username":username.current.value, "password":password.current.value})
        });
        res = await res.json();
        if(res.response){
            //window.location = "/";
        }
    }
    
    return (
        <div className="container-fluid">
            <div className="row justify-content-center m-5 p-5">
                <div className="col-8">
                    <h1>Effettua il login</h1>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" ref={username} className="form-control" id="username" aria-describedby="usernameHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" ref={password} className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={login}>Submit</button>
                </div>
            </div>
        </div>
    );
}