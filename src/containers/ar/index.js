import React, { useState } from 'react';

require('./aframe.min.js');


export default function ARContainer() {

    return ( 
        <div>
        <script src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"></script>

    <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.05 0.05 0.05"
          gltf-model="../../../resources/building/assets/avatar1.glb"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>

        </div>
    );
}