import sidebarMenuItemView from "./sidebar-menu-item.view.js" 



export class SidebarMenuComponent extends HTMLElement {
    static get selector() {
        return 'sidebar-menu-item'
    }

    static get observedAttributes() {
        return ['itemProperties']
    }

    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
        this.textValue = this.getAttribute('value')
        this.itemProperties  = JSON.parse(this.getAttribute('itemProperties'))
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(attrName, previousValue, newValue) {

    }

    render() {
        this.shadowElement.innerHTML = sidebarMenuItemView()
        const span = this.shadowElement.querySelector('div').querySelector('span')
        span.textContent = this.textValue   
    }
}

