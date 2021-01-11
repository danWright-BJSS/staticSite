import React, { useState } from 'react';

import Clock from './clock'
import Train from './train'
import Building from './building'

const buttons = [
    { id: 'train-2', label: 'Train', value: 'train' },
    { id: 'clock-1', label: 'Clock', value: 'clock' },
    { id: 'building-3', label: 'Building', value: 'building' }
]

export default function ThreeAppContainer() {
    const [ display, setDisplay ] = useState(<Building />);

    function switchView(viewType){
        switch(viewType){
            case 'clock':
                return <Clock />
            case 'train':
                return <Train />
            case 'lock':
                return <Building />
        }
    }

    function setView(setView) {
        if(setView !== display){
            setDisplay(switchView(setView));
        }
    }

    function buttonDisplay() {
        const buttonEls = buttons.map((button) => {
            return <button key={button.id} className={button.id} type='button' onClick={ () => setView(button.value) } >{button.label}</button>
        });
    
        return (
            <div>
                { buttonEls }
            </div>
        )
    }

    return ( 
        <div>
            { buttonDisplay() }
            { display }
        </div>
    );
}