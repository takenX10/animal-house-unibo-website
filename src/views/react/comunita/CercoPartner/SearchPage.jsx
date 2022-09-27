import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '@/context/utils';
import styled from 'styled-components';
import TinderCard from './TinderCard';
import PlaceholderPuppy from '@/components/react/comunita/PlaceHolderPuppy'

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


export default function SearchPage(){
    
    const [currentSearchPet, setCurrentSearchPet] = useState(PlaceholderPuppy);
    
    async function fetch_new_puppy(){
        let res = await fetch(`${SERVER_URL}/backoffice/get_new_puppy`, {method:"POST"});
        setCurrentSearchPet(await res.json());
    }
    function reject(){
        fetch_new_puppy();
    }
    async function like(){
        let _ = await fetch(`${SERVER_URL}/backoffice/add_like`, {
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id:myId, likedid:currentSearchPet.petid})
            });
        fetch_new_puppy();
    }

    useEffect(()=>{
        fetch_new_puppy();
    }, []);

    return (
        <StyledCercoPartner className='p-5'>
            <div className='view'>
                <TinderCard 
                    age={currentSearchPet.age}
                    weight={currentSearchPet.weight}
                    name={currentSearchPet.name} 
                    sex={currentSearchPet.sex} 
                    description={currentSearchPet.description}
                    imgList={(currentSearchPet.imgList ? currentSearchPet.imgList: [])}
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
    );
}