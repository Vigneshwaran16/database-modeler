
export default (() => {
    return `
        <link rel="stylesheet" href="./src/Canvas/canvas.styles.css"/>
        <div id="button-container">
            <button-component class="btn" id="btn-table"></button-component>
            <button-component class="btn" id="btn-schema"></button-component>
        </div>
        <modeler-canvas></modeler-canvas>
        
    `
})