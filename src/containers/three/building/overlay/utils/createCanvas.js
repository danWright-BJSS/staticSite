export function createCanvasElement( id, width, height ) {
    const virtualControlPanel = document.createElement('canvas');
    virtualControlPanel.setAttribute('id', id);
    virtualControlPanel.setAttribute("style", "z-index: 1; position: absolute;");
    virtualControlPanel.setAttribute("width", width/5);
    virtualControlPanel.setAttribute("height", height/8);
    document.querySelector('.buidingDisplay').appendChild(virtualControlPanel);
    return virtualControlPanel;
}