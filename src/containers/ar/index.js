import React, { useState } from 'react';
require('./aframe');
require('./aframe-ar');

export default function ARContainer() {

    return ( 
        <div>

<a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.05 0.05 0.05"
          gltf-model="../../../resources/building/assets/avatar_image.png"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>

        </div>
    );
}