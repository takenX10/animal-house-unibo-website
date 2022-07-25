import React from "react";
import Navbar from "@/components/Navbar/Navbar";

export default function HomePage(){
    return(
        <>
            <Navbar />
            <main>
                <div>
                    <h2 className="fs-1 text-center p-4 m-3">Dove desideri andare?</h2>
                </div>
                <div className="container-fluid">
                    <div className="row fw-bold fs-2">
                        <div className="col d-flex my-2 justify-content-center align-items-center">
                            <button type="button" className="button button-danger text-light w-75 bg-danger p-5 rounded-pill" onClick={()=>{window.location="/games"}}>Giochi</button>
                        </div>
                        <div className="col d-flex my-2 justify-content-center align-items-center">
                            <button type="button" className="button button-danger text-light w-75 bg-danger p-5 rounded-pill" onClick={()=>{window.location="/office"}}>Front office</button>
                        </div>
                        <div className="col d-flex my-2 justify-content-center align-items-center">
                            <button type="button" className="button button-danger text-light w-75 bg-danger p-5 rounded-pill" onClick={()=>{window.location="/back"}}>Back office</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}