import tableView  from "./table.view.js";
import styles from "./table.styles.css" assert { type: 'css' }

export class TableComponent extends HTMLElement {
    static get selector() {
        return 'table-component'
    }

    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadowElement.innerHTML = tableView()
        this.shadowRoot.addEventListener('click', (ev) => {
            ev.stopImmediatePropagation()
            ev.preventDefault()
            console.log('event',ev.currentTarget)
            console.log('this style', ev.currentTarget)
        }, false)
    }
}