import sidebarView from "./sidebar.view.js"
import { addTableEvent } from "../custom-events.js"
export class SidebarComponent extends HTMLElement {
    
    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
    }
    
    
    static get selector() {
        return 'sidebar-component'
    }

    // life cycle functions
    connectedCallback() {
        this.render()
        this.attachEventListeners()
    }

    render() {
        this.shadowElement.innerHTML = sidebarView()
    }

    attachEventListeners() {
        const menuItemElements = this.shadowRoot.querySelectorAll('sidebar-menu-item')
        menuItemElements.forEach(menuItemEl => {
            menuItemEl.addEventListener('click', (ev) => {
                menuItemEl.setAttribute('is-active', menuItemEl.getAttribute('is-active') === 'false' )
            })
        });

        const addBtn = this.shadowRoot.querySelector('#btn-table')
        addBtn.addEventListener('click', () => {

            document.querySelector('modeler-canvas').shadowRoot.dispatchEvent(addTableEvent)
            this.shadowRoot.querySelector('#table-menu').shadowRoot.dispatchEvent(addTableEvent)   
        })
    }

}