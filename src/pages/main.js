import React, { useState } from 'react';

import ThreeAppContainer from '../containers/three/index';
import ARContainer from '../containers/ar/index';

const buttons = [
    { id: 'three-1', label: 'Three', value: 'three' },
    { id: 'ar-2', label: 'Ar', value: 'ar' }
]

export default function MainPage() {
    const [ viewType, setViewType ] = useState('three')

    function buttonDisplay() {
        const buttonEls = buttons.map((button) => {
            return <button key={button.id} className={button.id} type='button' onClick={ () => setViewType(button.value) } >{button.label}</button>
        });
    
        return (
            <div>
                { buttonEls }
            </div>
        )
    }

    return (
        <div>
            <div>This is the main page</div>
            { buttonDisplay () }

            { viewType === 'three' ? 
            <ThreeAppContainer /> :
            <ARContainer /> }
        </div>
    );
}