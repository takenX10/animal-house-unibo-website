import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { check_login, get_my_id, SERVER_URL } from '@/context/utils'
import { Button, Row, Col } from 'react-bootstrap';
import MatchPage from '@/components/react/comunita/cercopartner/MatchPage'
import ProfilePage from '@/components/react/comunita/cercopartner/ProfilePage'
import SearchPage from '@/components/react/comunita/cercopartner/SearchPage'



export default function CercoPartner() {
  const [myPuppies, setMyPuppies] = useState([]);
  const [pageId, setPageId] = useState(null);
  const [currentPage, setCurrentPage] = useState("search");
  const navigate = useNavigate();
  const [myId, setMyId] = useState(null);

  const pages = {
    match: <MatchPage />,
    profile: <ProfilePage id={pageId} />,
    search: <SearchPage />
  }

  async function get_my_puppies() {
    try {
      let res = await fetch(`${SERVER_URL}/api/backoffice/get_my_puppies`, { method: "POST", credentials: "include" });
      res = await res.json();
      return res.pets;
    } catch (e) {
      alert(e);
    }
  }

  async function init() {
    if (!(await check_login())) {
      navigate("/backoffice/login");
    }
    setMyId(await get_my_id());
    setMyPuppies(await get_my_puppies());
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className='container-fluid'>
        <Row className="justify-content-start m-3">
          <Col lg="2">
            {
              myPuppies.map((pup) => {
                return (
                  <Button
                    key={pup.id}
                    variant='secondary'
                    className='p-2'
                    onClick={() => {
                      setPageId(pup.id);
                      setCurrentPage("profile");
                    }}
                  >Show {pup.name} profile</Button>);
              })
            }
          </Col>
          <Col lg="2">
            <Button variant='dark' className='p-2' onClick={() => { setCurrentPage("search"); }}>Find new profiles</Button>
          </Col>
        </Row>
        <div className="row d-flex justify-content-center">
          <div className="col-5">
            {pages[currentPage]}
          </div>
          <div className="col-5">
            <MatchPage setCurrentPage={setCurrentPage} setPageId={setPageId} />
          </div>
        </div>
      </div>
    </>
  );
}
