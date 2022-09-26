import React from "react";
import Navbar from '@/components/react/navbar/Navbar';

export default function HomeFrontOffice(){
    const styleobj = {
        height: "100%"
    }
    return (
        <>
            <Navbar />
            <main>
                <div className="container-fluid">
                    <div className="row justify-content-center mt-5">
                        <div className="col-8">
                            <h2 className="fs-1 text-center">Home del Front office</h2>
                            <p>Nel front office puoi trovare ... Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur officia, suscipit natus officiis fugiat sequi vel soluta odio dolore quia, ad assumenda, voluptatibus ut cupiditate magni numquam. Nam, omnis accusamus!</p>
                        </div>
                    </div>
                    <div className="row justify-content-around text-center mt-5">
                        <div className="col">
                            <button type="button" className="btn btn-primary p-5 fw-bold fs-2" onClick={()=>{window.location.pathname="/comunita/home"}}>SERVIZI DELLA COMUNITA</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-primary p-5 fw-bold fs-2" onClick={()=>{window.location.pathname="/presenza/home"}}>SERVIZI IN PRESENZA</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-primary p-5 fw-bold fs-2" onClick={()=>{window.location.pathname="/online/home"}}>SERVIZI ONLINE</button>
                        </div>
                        <div className="col">
                            <button type="button" style={styleobj} className="btn btn-primary p-5 fw-bold fs-2" onClick={()=>{window.location.pathname="/shop"}}>E-COMMERCE</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
