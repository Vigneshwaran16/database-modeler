import tableView  from "./table.view.js";
import styles from "./table.styles.css" assert { type: 'css' }

export class TableComponent extends HTMLElement {
    static get selector() {
        return 'table-component'
    }

    static get observedAttributes() {
        return ['top', 'left', 'table-properties']
    }

    constructor(options) {
        super(options)
        this.shadowElement = this.attachShadow({ mode: 'open' })
        this.tableName = options.tableName
        this.tableColumns = options.tableColumns
    }

    connectedCallback() {
        this.render()
        this.attachEventListeners()
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        switch(attribute) {
            case 'top':
                this.style.top = newValue
            break;

            case 'left':
                this.style.left = newValue
            break;

            case 'table-properties':
                this.tableName = newValue
            break;
        }
    }

    render() {
        this.shadowElement.innerHTML = tableView(this.tableName)
        this.setAttribute('draggable','true')
    }

    attachEventListeners() {

        this.addEventListener('dragstart', (ev) => {
            this.dragStartX = ev.offsetX
            this.dragStartY = ev.offsetY
            ev.dataTransfer.effectAllowed = 'move'
        })
        
        this.addEventListener('dragend', (ev) => {
            const updatedOffsetX = this.dragStartX - ev.offsetX
            const updatedOffsetY = this.dragStartY - ev.offsetY

            //set attributes here for better accessibility
            this.setAttribute('left', parseFloat(this.getAttribute('left')) - updatedOffsetX) 
            this.setAttribute('top', parseFloat(this.getAttribute('top')) - updatedOffsetY) 
        })
    }
}