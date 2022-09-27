import { useEffect, useState } from 'react';
import { SERVER_URL, get_my_id } from '@/context/utils';
import PlaceholderPuppy from '@/components/react/comunita/PlaceHolderPuppy'
import { initial } from 'lodash';


export default function ProfilePage({id}){
    const [currentPetProfile, setCurrentPetProfile] = useState(<PlaceholderPuppy />);

    async function fetch_a_puppy(id){
        return await fetch(`${SERVER_URL}/backoffice/get_a_puppy`, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({puppyId:id})
        });
    }

    async function init(){
        setCurrentPetProfile(await fetch_a_puppy(id));
    }
    useEffect(()=>{
        init();
    }, []);

    return (
        <></>
    );
}