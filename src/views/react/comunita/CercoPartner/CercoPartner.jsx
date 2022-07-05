import React, { useEffect, useRef } from 'react';
import './CercoPartner.scss';
import { Stack } from 'swing';
import Navbar from '@/components/Navbar/Navbar';


export default function CercoPartner() {
    const cardList = [
        { name: 'clubs', simbol: '♣' },
        { name: 'spades', simbol: '♠' },
        { name: 'diamonds', simbol: '♦' },
        { name: 'hearts', simbol: '♥' },
    ];
    useEffect(() => {
        var stack;
        stack = Stack();
        // this is not really React style, but I didn't find a better way to do this.
        // the React component version of this snippet was made for React 16.0.2 and is 
        // not compatible with our version, so we are stuck with this.
        [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
            stack.createCard(targetElement);
            targetElement.classList.add('in-deck');
        });

        stack.on('throwout', function (e) {
            console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');

            e.target.classList.remove('in-deck');
        });
        stack.on('throwin', function (e) {
            console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection, 'direction.');

            e.target.classList.add('in-deck');
        });
    }, []);


    return (
        <>
            <Navbar />
            <div id="viewport">
                <ul className="stack">
                    {cardList.map(card => {
                            var element = (<li key={card.name} className={`${card.name}`}>{card.simbol}</li>);
                            return (element);
                        }
                    )}
                </ul>
            </div>
        </>
    );
}