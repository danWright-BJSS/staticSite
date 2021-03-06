import { createCanvasElement } from '../utils/createCanvas';
import * as pubSub from '../../pubSub';

export function printersButton (w, h){
    console.log('create context')
    const vcp = createCanvasElement('printers', w, h);
    const ctx = vcp.getContext("2d");

    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.fillStyle = "rgba(255, 255, 0, .5)";
    ctx.fillStyle = "green";
    ctx.font = "30px Arial";
    ctx.fillText("Printers", vcp.width/2 - 95, vcp.height/2 + 10 );

    ctx.canvas.addEventListener('mousedown', handleOnClick, false);
};

function handleOnClick() {
    console.log('Clicked')
    pubSub.publish('printerEvent', {toggle: true})
}
