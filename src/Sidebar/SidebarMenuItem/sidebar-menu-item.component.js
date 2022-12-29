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
        // do not use variable names with html element's properties like scrollLeft, scrollTo to avoid collision

        this.textValue = this.getAttribute('value')

        // holds additional dynamic stuff
        this.itemProperties  = JSON.parse(this.getAttribute('itemProperties'))

        // holds tables and columns
        this.tables = []
        // holds schemas and tables
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

    render = () => {
        this.shadowElement.innerHTML = sidebarMenuItemView()
        const menuItemEl = this.shadowElement.querySelector('#dropdown-menu')
        menuItemEl.querySelector('span').textContent = this.textValue   
    }

    attachEventListeners = () => {
        this.shadowRoot.addEventListener('addTable', (ev) => {
            const dropdownListEl = this.shadowRoot.querySelector('#dropdown-list')

            // modify is-empty when first table is added
            if(this.tables.length === 0 ) dropdownListEl.setAttribute('is-empty', false)
            this.tables.push(ev.detail.key)

            this.appendTableToDropdownList(dropdownListEl, ev.detail.key)
        })

        this.shadowRoot.addEventListener('click', (ev) => {
            this.setAttribute('is-active', this.getAttribute('is-active') === 'false' )
        })
    }

    appendTableToDropdownList = (elm, tableName) => {
        const newTable = document.createElement('span')
        newTable.textContent = tableName
        elm.appendChild(newTable)
    }

}

