import React, { useEffect } from 'react';
import { init } from './clock';

const Clock = () => {

	useEffect(() => {
		
		(async function clockCreation() {
			init();
		})();

	}, [])

    return (
        <div>
            <div id="container"></div>
        </div>
    );
}

export default Clock;
