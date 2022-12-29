import sidebarView from "./sidebar.view.js"

export class SidebarComponent extends HTMLElement {
    
    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
        // do not use variable names with html element's properties like scrollLeft, scrollTo to avoid collision 
    }
    
    static get selector() {
        return 'sidebar-component'
    }

    // life cycle functions
    connectedCallback() {
        this.render()
        this.attachEventListeners()
    }

    render = () => {
        this.shadowElement.innerHTML = sidebarView()
    }

    attachEventListeners = () =>{

        //TO BE SCRAPPED LATER
        // temporary button to test functionality
        const addBtn = this.shadowRoot.querySelector('#btn-table')
        addBtn.addEventListener('click', () => {
            const tableCount = document.querySelector('modeler-canvas').tables.length
            const addTableEvent = new CustomEvent('addTable', {
                bubbles: true,
                composed: true,
                detail: {
                    key: `table-${tableCount+1}`
                }
            })
            document.querySelector('modeler-canvas').shadowRoot.dispatchEvent(addTableEvent)
            this.shadowRoot.querySelector('#table-menu').shadowRoot.dispatchEvent(addTableEvent)   
        })
    }

}