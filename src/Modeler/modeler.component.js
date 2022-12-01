import modelerView from "./modeler.view.js"
import modelerStyles from "./modeler.styles.css" assert { type: 'css' }

export class ModelerComponent extends HTMLElement {
    static get selector() {
        return 'modeler-canvas'
    }

    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
    }
    
    connectedCallback() {
        const modeler = modelerView()
        this.shadowElement.innerHTML = modeler
        this.shadowRoot.adoptedStyleSheets = [modelerStyles]
        this.attachEventListeners()
    }

    attachEventListeners() {
        
    }
}