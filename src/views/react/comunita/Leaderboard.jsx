import React, { useState, useEffect } from 'react';
import { SERVER_URL, isAdmin } from '@/context/utils';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

async function getValidLeaderboards() {
  try {
    let res = await fetch(`${SERVER_URL}/backoffice/get_valid_leaderboards`, { method: "POST" });
    res = await res.json();
    if (res.success) {
      return res.valids;
    } else {
      // throw "unable to fetch";
    }
  } catch (e) {
    console.log(e)
  }
  return null;
}

async function getLeaderboard(l) {
  try {
    let res = await fetch(`${SERVER_URL}/backoffice/get_leaderboard`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ leaderboard: l })
    });
    res = await res.json();
    if (!res.success) {
      throw "unable to fetch leaderboard";
    }
    return res.leaderboard;
  } catch (e) {
    console.log(e)
  }
  return [];
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState({});
  const [validLeaderboards, setValidLeaderboards] = useState([]);
  const [isadmin, setIsadmin] = useState(false);
  async function leaderboardSetter() {
    let mylead = {};
    for (let l of validLeaderboards) {
      mylead[l] = await getLeaderboard(l);
    }
    setLeaderboard(mylead);
  }
  async function init() {
    let leaders = await getValidLeaderboards()
    setValidLeaderboards(leaders);
    if (await isAdmin()) {
      setIsadmin(true);
    }
  }
  function formatDate(d) {
    d = new Date(d);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}`
  }

  async function removeLeaderboard(id) {
    try {
      let res = await fetch(`${SERVER_URL}/backoffice/remove_leaderboard`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });
      res = await res.json();
      if (res.success) {
        setValidLeaderboards(await getValidLeaderboards());
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    leaderboardSetter();
  }, [validLeaderboards]);
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Container fluid className='justify-content-center w-100'>
        <Row className="mx-auto">
          {validLeaderboards &&
            validLeaderboards.map((l) => {
              return (
                <Col key={`leaderboard-${l}`} md="4" sm="12" lg="3" className='justify-content-center align-items-center d-flex'>
                  {(!leaderboard[l] ? <></> :
                    <Table striped bordered hover responsive>
                      <caption className='fw-bold fs-2 text-center' style={{ captionSide: "top" }}>{l}</caption>
                      <thead>
                        <tr className="text-center">
                          <th>#</th>
                          <th>Name</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          leaderboard[l].map((e) => {
                            return (
                              <tr key={`${l}-${e.position}`}>
                                <td className='p-3'>{e.position}</td>
                                <td className='p-3'>{e.author}</td>
                                <td className='p-3'>{e.score}</td>
                                {isadmin ?
                                  <td className='p-3'>
                                    <Button variant="danger" onClick={() => { removeLeaderboard(e.id) }}>Remove</Button>
                                  </td> :
                                  <></>
                                }
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </Table>
                  )}
                </Col>
              );
            })
          }
        </Row>
      </Container>
    </>
  );
}
