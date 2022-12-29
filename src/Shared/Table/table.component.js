import tableView  from "./table.view.js";
import styles from "./table.styles.css" assert { type: 'css' }

export class TableComponent extends HTMLElement {
    static get selector() {
        return 'table-component'
    }

    static get observedAttributes() {
        return ['top', 'left']
    }

    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        switch(attribute) {
            case 'top':
                this.style.top = newValue
            break;

            case 'left':
                this.style.left = newValue
            break;
        }
    }

    render() {
        this.shadowElement.innerHTML = tableView()
        this.shadowRoot.addEventListener('click', (ev) => {
            ev.stopImmediatePropagation()
            ev.preventDefault()
        }, false)

        this.shadowRoot.addEventListener('mousedown', (ev) => {
            console.log('mousedown', ev.target)
        })
    }
}