import menuItemView from "./menu-item.view.js"


export class MenuItemComponent extends HTMLElement {
    static get selector() {
        return 'menu-item-component'
    }

    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const menuItem = menuItemView()
        this.shadowElement.innerHTML = menuItem
    }

}