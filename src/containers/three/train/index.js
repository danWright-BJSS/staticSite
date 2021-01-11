import React, { useEffect } from 'react';
import { init } from './train';

const Train = () => {

	useEffect(() => {
		
		(async function trainCreation() {
			init();
		})();

	}, [])

    return (
        <div>
            <div id="trainContainer"></div>
        </div>
    );
}

export default Train;
