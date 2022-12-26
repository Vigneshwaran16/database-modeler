import sidebarView from "./sidebar.view.js"

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
        // this.initializeMenuItems()
    }

    render() {
        this.shadowElement.innerHTML = sidebarView()
    }


}