import React from "react";
import Navbar from '@/components/react/navbar/Navbar';

export default function HomeComunita(){
    const stylecol = {
        height:"100%",
        width: "100%"
    };
    return (
        <>
            <main>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-8 mt-5">
                            <h2 className="fs-1 mb-3">Servizi della comunita</h2>
                            <p>Nei servizi della comunita... Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi distinctio iusto iste, pariatur error qui cumque adipisci modi esse perspiciatis dignissimos mollitia vitae dolores nemo dolor laborum numquam dolorum quaerat.</p>
                        </div>
                    </div>
                    <div className="row justify-content-around text-center mt-5">
                        <div className="col">
                            <button type="button" className="btn btn-success rounded-pill p-4 fs-3 fw-bold" onClick={()=>{window.location.pathname="/comunita/leaderboard-giochi"}}>LEADERBOARD DEI GIOCHI</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-success rounded-pill p-4 fs-3 fw-bold" onClick={()=>{window.location.pathname="/comunita/eccolo-qua"}}>BACHECA ECCOLO QUA</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-success rounded-pill p-4 fs-3 fw-bold" onClick={()=>{window.location.pathname="/comunita/cerco-partner"}}>BACHECA CERCO PARTNER</button>
                        </div>
                        <div className="col">
                            <button type="button" style={stylecol} className="btn btn-success rounded-pill p-4 fs-3 fw-bold" onClick={()=>{window.location.pathname="/comunita/aiutatemi"}}>CERCO AIUTO</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
