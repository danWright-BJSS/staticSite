import { roundRect } from '../../models/roundedRect'

export function detailsModal(w, h) {
    const vcp = createCanvasElement('personModal', w, h);
    const ctx = vcp.getContext("2d");

    const buttonWidth = 850;
    const buttonHeight = 350;
    const left = 175;
    const top = 100;
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.fillStyle = "rgba(255, 255, 0, .5)";
    roundRect(ctx, left, top, buttonWidth, buttonHeight, 10, true);

    const base_image = new Image();
    base_image.src = '../../../resources/building/assets/avatar_image.png';
    base_image.onload = function(){
        ctx.drawImage(base_image, 200, 125, 200, 200);
    }
    const base_image2 = new Image();
    base_image2.src = '../../../resources/building/assets/hiro.png';
    base_image2.onload = function(){
        ctx.drawImage(base_image2, 800, 225, 200, 200);
    }
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Name: Dave Smith", 425, 150 );
    ctx.fillText("Desk: 1st Floor, 16", 425, 200 );
    ctx.fillText("Desk Tel: (123)-323-987", 425, 250 );
    ctx.fillText("Email: dave@bjss.com", 425, 300 );

    ctx.canvas.addEventListener('mousedown', handleOnClick, false);
};

function createCanvasElement( id, width, height ) {
    const virtualControlPanel = document.createElement('canvas');
    virtualControlPanel.setAttribute('id', id);
    virtualControlPanel.setAttribute("style", "z-index: 1; position: absolute;");
    virtualControlPanel.setAttribute("width", width);
    virtualControlPanel.setAttribute("height", height);
    document.querySelector('.buidingDisplay').appendChild(virtualControlPanel);
    return virtualControlPanel;
}

function handleOnClick() {
    console.log('Clicked modal overlay')
    document.getElementById("personModal").remove();
}
