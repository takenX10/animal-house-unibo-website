
import React from 'react';
import './Navbar.scss';
import Dropdown from './Dropdown';
import { FaBars } from 'react-icons/fa'

const NavbarServizi = () => {
    return (
        <>
            <Dropdown
                title={{
                    href:"comunita/home",
                    id:"home-comunita",
                    name:"Servizi della comunita",
                }}
                elements={[
                    { title:"Leaderboard giochi", href:"comunita/giochi", disabled:true },
                    { title:"Bacheca eccolo qua", href:"comunita/eccolo-qua" },
                    { title:"Bacheca cerco partner", href:"comunita/cerco-partner", disabled:true },
                    { title:"Bacheca aiutatemi", href:"comunita/aiutatemi", disabled:true },
                ]}
            ></Dropdown>
            <Dropdown
                title={{
                    href:"presenza/home",
                    id:"servizi-presenza-home",
                    name:"Servizi in presenza",
                }}
                elements={[
                    { title:"Veterinario", href:"presenza/veterinario", disabled:true},
                    { title:"Dogsitter", href:"presenza/dogsitter", disabled:true},
                    { title:"Toelettatura", href:"presenza/toelettatura", disabled:true},
                    { title:"Visite animali soli", href:"presenza/visite-animali-soli", disabled:true},
                ]}
            ></Dropdown>
            <Dropdown
                title={{
                    href:"online/home",
                    id:"servizi-online-home",
                    name:"Servizi online",
                }}
                elements={[
                    { title:"Videoconferenza con l'esperto", href:"online/esperto", disabled:true},
                    { title:"Videoconferenza con il veterinario", href:"online/veterinario", disabled:true},
                    { title:"Videoconferenza con il tuo animale", href:"online/tuo-animale", disabled:true},
                ]}
            ></Dropdown>
        </>
    );
}

const NavbarGiochi = () => {
    return (
        <Dropdown   
            title={{
                href : "games/home",
                id : "home-giochi",
                name : "Giochi",
            }} 
            elements={[
                {
                    title: "Hangman",
                    href: "games/hangman"
                },
                {
                    title: "Wordle",
                    href: "games/wordle"
                },
                {
                    title: "Memory",
                    href: "games/memory"
                },
                {
                    title: "Slider",
                    href: "games/slider"
                },
            ]}>
        </Dropdown>
    );
}

const NavbarShop = () => {
    return (
        <Dropdown
            title={{
                href:"shop/home",
                id:"home-shop",
                name:"E-commerce",
            }}
            elements={[
                { title:"Cibo", href:"shop/cibo", disabled:true },
                { title:"Prodotti sanitari", href:"shop/sanitari", disabled:true },
                { title:"Accessoristica", href:"shop/accessori", disabled:true },
            ]}
        ></Dropdown>
    );
        
}

export default function Navbar(){
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-light p-3 border-bottom border-5">
                <div class="container-fluid">
                    <h1><a class="navbar-brand fs-1 text-dark" href="#">AnimalHouse</a></h1>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"  data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon text-dark"><FaBars></FaBars></span>
                    </button>
                    <div class="collapse navbar-collapse mx-lg-5 px-lg-5 p-2" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <NavbarShop></NavbarShop>
                            <NavbarGiochi></NavbarGiochi>
                            <NavbarServizi></NavbarServizi>
                            <a class="text-dark nav-link disabled text-muted" href="back/home">Back office</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}