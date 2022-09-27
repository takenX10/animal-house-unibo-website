import React, { useEffect, useState } from 'react';
import Navbar from '@/components/react/navbar/Navbar';
import { check_login, get_my_id, SERVER_URL } from '@/context/utils'
import MatchPage from './MatchPage'
import ProfilePage from './ProfilePage'
import SearchPage from './SearchPage'



export default function CercoPartner() {
    const [pageId, setPageId] = useState(null);
    const [currentPage, setCurrentPage] = useState("search");
    const [myId, setMyId] = useState(null);

    const pages = {
        match: <MatchPage />,
        profile: <ProfilePage id={pageId}/>,
        search: <SearchPage />
    }

    async function init(){
        await check_login();
        setMyId(await get_my_id());
    }
    useEffect(()=>{
        init();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-5">
                        <MatchPage />
                    </div>
                    <div className="col-5">
                        {pages[currentPage]}
                    </div>
                </div>
            </div>
        </>
    );
}