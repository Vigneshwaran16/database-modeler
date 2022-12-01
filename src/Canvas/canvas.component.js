import canvasView from "./canvas.view.js";
import canvasStyles from './canvas.styles.css' assert {type: 'css'}

export class CanvasComponent extends HTMLElement {
    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
    }

    static get selector() {
        return 'canvas-component'
    }

    connectedCallback() { 
        this.render()
        this.initializeButtons()
    }
    
    render() {
        this.shadowElement.innerHTML = canvasView()
        this.shadowRoot.adoptedStyleSheets = [canvasStyles]
    }

    initializeButtons( ) {
        this.shadowRoot.getElementById('btn-table').shadowRoot.getElementById('btn-component').textContent = 'Add Table'
        this.shadowRoot.getElementById('btn-schema').shadowRoot.getElementById('btn-component').textContent = 'Add Schema'
    }
}