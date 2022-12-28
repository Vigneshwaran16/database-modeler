import sidebarMenuItemView from "./sidebar-menu-item.view.js" 



export class SidebarMenuComponent extends HTMLElement {
    static get selector() {
        return 'sidebar-menu-item'
    }

    static get observedAttributes() {
        return ['is-active']
    }

    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
        this.textValue = this.getAttribute('value')
        this.itemProperties  = JSON.parse(this.getAttribute('itemProperties'))
        this.tables = []
        this.schema = []
    }

    connectedCallback() {
        this.render()
        this.attachEventListeners()
    }

    attributeChangedCallback(attribute, previousValue, newValue) {
        if(previousValue){
        switch(attribute) {
            case 'is-active':
                const iconEl = this.shadowRoot.querySelector('i') 
                iconEl.setAttribute('is-active', newValue)
                const dropdownListEl = this.shadowRoot.querySelector('#dropdown-list')
                dropdownListEl.setAttribute('is-active', newValue)
            break;
        }
        }
    }

    attachEventListeners() {
        this.shadowRoot.addEventListener('addTable', (ev) => {
            console.log('event', ev.target)
            this.tables.push(ev.detail.key)

            //append table
            const dropdownListEl = this.shadowRoot.querySelector('#dropdown-list')
            dropdownListEl.setAttribute('is-empty', false)
            const newTable = document.createElement('span')
            newTable.textContent = ev.detail.key
            dropdownListEl.appendChild(newTable)
        })
    }

    render() {
        this.shadowElement.innerHTML = sidebarMenuItemView()
        const menuItemEl = this.shadowElement.querySelector('#dropdown-menu')
        menuItemEl.querySelector('span').textContent = this.textValue   
    }

}

