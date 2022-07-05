import React from 'react';

export default function Dropdown({title, elements}){
    return (
        <li class="nav-item dropdown px-lg-2">
            <a class="text-dark nav-link dropdown-toggle" href={title.href} id={title.id} role="button" data-bs-toggle="dropdown" aria-expanded="false">{title.name}</a>
            <ul class="dropdown-menu" aria-labelledby="comunita-dropdown">
                {
                    elements.map((element)=>{
                        return (
                            <li><a class={"dropdown-item"+(element.disabled?" disabled":"")} href={element.href}>{element.title}</a></li>            
                        )
                    })
                }
            </ul>
        </li>
    );
}