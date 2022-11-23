import buttonView from "./button.view.js"


export class ButtonComponent extends HTMLElement {
    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
    }

    static get selector() {
        return 'button-component'
    }

    connectedCallback() {
        this.shadowElement.innerHTML = buttonView()
    }
}