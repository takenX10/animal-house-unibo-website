import { useState, useEffect } from 'react';
import { SERVER_URL } from '@/context/utils';
import { Button } from 'react-bootstrap';

export default function MatchPage({setCurrentPage, setPageId}){
    const [matches, setMatches] = useState([]);
    async function getMatches(){
        try{
            let res = await fetch(`${SERVER_URL}/backoffice/get_matches`, {method:"POST", credentials:'include'});
            setMatches((await res.json()).matches);
        }catch(e){
            alert(e);
        }
    }

    async function showProfile(id){
        setPageId(id);
        setCurrentPage("profile");
    }

    useEffect(()=>{
        getMatches();
    }, []);

    return (
        <>
            <div className='container-fluid w-100'>
                <div className='row'>
                    <div className="col p-2 m-3">
                        <h1 className='w-100 text-danger fw-bold text-center'>Lista dei match</h1>
                    </div>
                </div>
                <div className='row d-flex w-100'>
                    {
                        matches.map((match)=>{return (
                            <div key={match.id} className="col border border-dark p-2 m-3">
                                <h2>{match.name}</h2>
                                <p>{match.contact}</p>
                                <Button variant='success' onClick={()=>{showProfile(match.id)}}>Vedi profilo</Button>
                                <Button variant='danger' className='m-2'>Unmatch</Button>
                            </div>);
                        })
                    }
                    
                </div>
            </div>
        </>
    );
}