import canvasView from "./canvas.view.js"
import { TableComponent } from "../Shared/Table/table.component.js"
import canvasStyles from './canvas.styles.css' assert {type: 'css'}
import { constants } from "../utils.js"

export class CanvasComponent extends HTMLElement {
    static get selector() {
        return 'modeler-canvas'
    }
    
    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
        
        // do not use variable names with html element's properties like scrollLeft, scrollTo to avoid collision
        // detect mousedown event
        this.isDown = false;

        // holds initial click postion to scroll from
        this.startX;
        this.startY;

        // horizontal scroll
        this.leftScroll;

        // vertical scroll
        this.topScroll

        // current count of tables in canvas
        this.tables = [];
    }
    
    connectedCallback() {
        const canvas = canvasView()
        this.shadowElement.innerHTML = canvas   
        this.positionScrollbar()
        this.attachEventListeners()
    }

    attachEventListeners = () => {
        
        this.shadowRoot.addEventListener('addTable', (ev) => {
            ev.preventDefault()

            const { initialStartX, initialStartY } = this.getDynamicInitialTablePosition()

            const tableId = `table-${this.tables.length+1}`
            const table = new TableComponent({tableName: tableId, tableColumns: []})
            table.setAttribute('id', tableId)
            this.shadowRoot.getElementById('pannable').appendChild(table)
            table.setAttribute('left', initialStartX)
            table.setAttribute('top',initialStartY)
            table.setAttribute('table-properties', tableId)
            this.tables.push(tableId)
        })
        this.scrollable = this.shadowRoot.querySelector('.pannable-root')

        this.scrollable.addEventListener('mousedown', (e) => {

            // this prevents if the event is a click-event on tables
            if(e.target.id !== 'pannable' ) return

            this.isDown = true;
            this.scrollable.classList.add('active');

            this.startX = e.offsetX
            this.startY = e.offsetY
            this.leftScroll = this.scrollable.scrollLeft
            this.topScroll = this.scrollable.scrollTop

        });

        this.scrollable.addEventListener('mouseleave', () => {
            this.isDown = false;
            this.scrollable.classList.remove('active');
        });

        this.scrollable.addEventListener('mouseup', (ev) => {
            // this prevents if the event is a click-event on tables
            if(ev.target.id !== 'pannable' ) return

            this.isDown = false;
            this.scrollable.classList.remove('active');
            
            // save previous drag event's state changes
            this.startX = ev.offsetX
            this.startY = ev.offsetY

        });
        
        this.scrollable.addEventListener('mousemove', (e) => {
            if(!this.isDown) return;
            e.preventDefault();

            // horizontal scrolling
            const moveX = e.offsetX - this.startX
            const pageScrollX = moveX * constants.SCROLL_SENSITIVITY

            // vertical scrolling
            const moveY = e.offsetY - this.startY
            const pageScrollY = moveY * constants.SCROLL_SENSITIVITY

            // scroll event
            this.scrollable.scrollLeft = this.leftScroll - pageScrollX
            this.scrollable.scrollTop = this.topScroll - pageScrollY
        });

        // attach to element accessible in light DOM (instead of this.shadowRoot)
        this.addEventListener('dragover', (ev) => {
            ev.dataTransfer.dropEffect = 'move'
            ev.preventDefault()
        })

    }

    positionScrollbar = () => {
        const scrollBar = this.shadowRoot.querySelector('.pannable-root')
        addEventListener('load', (e) => {
            scrollBar.scrollLeft = constants.SCROLLABLE_CANVAS_WIDTH/3
            scrollBar.scrollTop = constants.SCROLLABLE_CANVAS_HEIGHT/5
        })
    }

    getDynamicInitialTablePosition = () => {
        const canvasEl = this.shadowRoot.querySelector('.pannable-root')
        const canvasShadowEl = document.querySelector('modeler-canvas')
        // get the current visible part of the scrollable canvas
        // Horizontal
        const pannableRootWidth = canvasShadowEl.clientWidth
        const currentScrollLeft = canvasEl.scrollLeft
        const viewableWidthStart = currentScrollLeft
        const viewableWidthEnd = currentScrollLeft + pannableRootWidth

        // Vertical
        const pannableRootHeight = canvasShadowEl.clientHeight
        const currentScrollTop = canvasEl.scrollTop
        const viewableHeightStart = currentScrollTop
        const viewableHeightEnd = currentScrollTop + pannableRootHeight

        const initialStartX = Math.floor(Math.random() * (viewableWidthEnd - viewableWidthStart + 1)) + viewableWidthStart;
        const initialStartY = Math.floor(Math.random() * (viewableHeightEnd - viewableHeightStart + 1)) + viewableHeightStart;

        return { initialStartX, initialStartY };
    }
}