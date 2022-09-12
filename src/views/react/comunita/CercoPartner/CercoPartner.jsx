import React from 'react';
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
    button {
        height: 100%;
    }
`

export default function CercoPartner() {    
    async function like(id, likedid){
        let res = await fetch("http://localhost:8000/backoffice/add_like", {
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({id:1, likedid:2})
            }).then(res => res.json()).then(data => console.log(data));
        console.log(res);
    }

    function reject(){

    }
    return (
        <>
            <Navbar />
            <StyledCercoPartner className='p-5'>
                <div className='view'>
                    <TinderCard 
                        age="11 anni" 
                        weight="5kg" 
                        name="Baloo" 
                        sex="Maschio" 
                        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus placeat, cumque maiores eligendi blanditiis, eaque reprehenderit id repellat ab dolorem exercitationem est quam, veniam aperiam consequatur eveniet praesentium accusantium ducimus!"
                        imgList={["http://www.petpaw.com.au/wp-content/uploads/2014/06/Maltese-4.jpg", "http://www.dogalize.com/wp-content/uploads/2017/01/maltese.jpg", "https://www.littlepuppiesonline.com/wp-content/uploads/otto1-1.jpg"]}
                    />                            
                    <div className='button-container m-1'>
                        <button type='button' className='rounded rounded-circle p-4 btn btn-danger' onClick={reject}>
                            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                        </button>
                        <button type='button' className='rounded rounded-circle p-4 btn btn-success' onClick={like}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            </StyledCercoPartner>
        </>
    );
}