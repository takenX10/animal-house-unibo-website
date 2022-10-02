import { useEffect, useState } from 'react';
import { SERVER_URL } from '@/context/utils';
import PlaceholderPuppy from './PlaceHolderPuppy'
import TinderCard from './TinderCard';


export default function ProfilePage({id}){
    const [currentPetProfile, setCurrentPetProfile] = useState(<PlaceholderPuppy />);

    async function fetch_a_puppy(id){
        try{
            let res = await fetch(`${SERVER_URL}/backoffice/get_a_puppy`, {
                method:"POST",
                credentials:'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({id:id})
            });
            res = await res.json();
            return res;
        }catch(e){
            alert(e);
        }
    }

    async function init(){
        setCurrentPetProfile(await fetch_a_puppy(id));
    }
    useEffect(()=>{
        init();
    }, []);

    async function newid(){
        setCurrentPetProfile(await fetch_a_puppy(id));
    }
    useEffect(()=>{
        newid();
    }, [id]);

    return (
        <TinderCard 
            age={currentPetProfile.age}
            weight={currentPetProfile.weight}
            name={currentPetProfile.name} 
            sex={currentPetProfile.sex} 
            description={currentPetProfile.description}
            imgList={(currentPetProfile.imgList ? currentPetProfile.imgList: [])}
        />
    );
}