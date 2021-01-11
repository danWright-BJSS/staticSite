import React, { useEffect } from 'react';
import { init } from './scene';

require('./styles.css');

const Building = () => {

	useEffect(() => {
		
		(async function createBuilding() {
			init();
        })();

	}, [])

    return (
        <div className="buidingDisplay">
            <canvas id="buildingContainer" className="container"></canvas>
        </div>
    );
}

export default Building;