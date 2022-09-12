import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const StyledTinderCard = styled.div`
    overflow: auto;
    .img-div {
        width:100%;
        height: 100%;
        background-position: center;
        background-size:cover;
    }
    .mySwiper {
        width: 100%;
        height: 500px;
    }
`

export default function TinderCard({sex, age, weight, name, description, imgList}) {
    return (
        <StyledTinderCard>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {imgList.map((url)=>
                    <SwiperSlide key={url}>
                        <div className='img-div' aria-roledescription='img' style={{"backgroundImage":`url('${url}')`}}></div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className='description-container p-3'>
                <h2>{name}</h2>
                <b>{`${sex}, ${age}, ${weight}`}</b>
                <p>{description}</p>
            </div>
        </StyledTinderCard>
    );
}