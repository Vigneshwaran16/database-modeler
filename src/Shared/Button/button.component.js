import buttonView from "./button.view.js"


export class ButtonComponent extends HTMLElement {
    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
        this.buttonLabel
    }

    static get selector() {
        return 'button-component'
    }

    static get observedAttributes() {
        return ['value']
    }

    attributeChangedCallback(attribute, previousValue, newValue) {
        this.buttonLabel = newValue
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadowElement.innerHTML = buttonView()
        this.shadowElement.querySelector('button').textContent = this.buttonLabel
    }

}