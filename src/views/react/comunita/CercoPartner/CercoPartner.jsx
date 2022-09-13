import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar/Navbar';
import TinderCard from './TinderCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import "swiper/css/pagination";
import "swiper/css";

const StyledCercoPartner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .view {
        height: 700px;
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 3px solid gray;
        overflow: hidden;
    }
    .button-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 10%;
    }
`

export default function CercoPartner() {
    const [currentPet, setCurrentPet] = useState({
        age: 0,
        weight: 0,
        name: "loading...",
        sex: "n/a",
        description: "loading...",
        imgList: ["https://www.cedarcityutah.com/wp-content/uploads/2019/06/cropped-maltese-puppies-STGNews.jpg"]
    });
    const [myId, setMyId] = useState(null);
    async function get_my_id(){
        let res = await fetch("http://localhost:8000/backoffice/get_my_id");
        res = await res.json();
        setMyId(res.id);
    }

    async function fetch_new_puppy(){
        let res = await fetch("http://localhost:8000/backoffice/get_new_puppy", {method:"POST"});
        setCurrentPet(await res.json());
    }

    useEffect(()=>{
        get_my_id();
        fetch_new_puppy();
    }, []);

    useEffect(()=>{
        console.log(currentPet);
    }, [currentPet]);

    async function like(){
        let res = await fetch("http://localhost:8000/backoffice/add_like", {
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({id:myId, likedid:currentPet.petid})
            });
        fetch_new_puppy();
    }
    function reject(){
        fetch_new_puppy();
    }

    return (
        <>
            <Navbar />
            <StyledCercoPartner className='p-5'>
                <div className='view'>
                    <TinderCard 
                        age={currentPet.age}
                        weight={currentPet.weight}
                        name={currentPet.name} 
                        sex={currentPet.sex} 
                        description={currentPet.description}
                        imgList={(currentPet.imgList ? currentPet.imgList: [])}
                    />                            
                    <div className='button-container m-1 justify-content-around'>
                        <button type='button' className='p-4 btn btn-danger m-3 w-25 shadow' onClick={reject}>
                            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                        </button>
                        <button type='button' className='p-4 btn btn-success m-3 w-25 shadow' onClick={like}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            </StyledCercoPartner>
        </>
    );
}