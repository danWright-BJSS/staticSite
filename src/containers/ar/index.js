import React, { useState } from 'react';

// import Clock from '../three/clock'
// import Train from '../three/train'
// import Canal from './canal'

// const buttons = [
//     { id: 'clock-1', label: 'Clock', value: 'clock' },
//     { id: 'train-2', label: 'Train', value: 'train' },
//     { id: 'lock-3', label: 'Lock', value: 'lock' }
// ]

export default function ARContainer() {
    // const [ display, setDisplay ] = useState(<Canal />);

    // function switchView(viewType){
    //     switch(viewType){
    //         case 'clock':
    //             return <Clock />
    //         case 'train':
    //             return <Train />
    //         case 'lock':
    //             return <Canal />
    //     }
    // }

    // function setView(setView) {
    //     if(setView !== display){
    //         setDisplay(switchView(setView));
    //     }
    // }

    // function buttonDisplay() {
    //     const buttonEls = buttons.map((button) => {
    //         return <button key={button.id} className={button.id} type='button' onClick={ () => setView(button.value) } >{button.label}</button>
    //     });
    
    //     return (
    //         <div>
    //             { buttonEls }
    //         </div>
    //     )
    // }

    return ( 
        <div>
            {/* { buttonDisplay() } */}
            <div>The container has loaded!</div>
            {/* { display } */}

            <a-scene
                vr-mode-ui="enabled: false;"
                renderer="logarithmicDepthBuffer: true;"
                embedded
                arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
            >
                <a-nft
                type="nft"
                url="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex"
                smooth="true"
                smoothCount="10"
                smoothTolerance=".01"
                smoothThreshold="5"
                >
                <a-entity
                    gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
                    scale="5 5 5"
                    position="50 150 0"
                >
                </a-entity>
                </a-nft>
                <a-entity camera></a-entity>
            </a-scene>

        </div>
    );
}