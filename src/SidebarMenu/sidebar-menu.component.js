import sidebarMenuView from "./sidebar-menu.view.js"
import sidebarMenuStyles from "./sidebar-menu.styles.css" assert { type: 'css' }

export class SidebarMenuComponent extends HTMLElement {
    static get selector() {
        return 'sidebar-menu-component'
    }

    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
        this.initializeMenuItems()
    }

    render() {
        const sidebarMenu = sidebarMenuView()
        this.shadowElement.innerHTML = sidebarMenu
        this.shadowRoot.adoptedStyleSheets = [sidebarMenuStyles]
    }

    initializeMenuItems() {
        this.shadowRoot.getElementById('menu-container').getElementsByClassName('menu-items')[0].shadowRoot.getElementById('menu-item').textContent = 'Schemas'
        this.shadowRoot.getElementById('menu-container').getElementsByClassName('menu-items')[1].shadowRoot.getElementById('menu-item').textContent = 'Tables'
        this.shadowRoot.getElementById('menu-container').getElementsByClassName('menu-items')[2].shadowRoot.getElementById('menu-item').textContent = 'References'
    }

}