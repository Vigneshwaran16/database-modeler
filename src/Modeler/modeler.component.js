import modelerView from "./modeler.view.js"


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
    }
}