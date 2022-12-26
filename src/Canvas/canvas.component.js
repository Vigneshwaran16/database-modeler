import canvasView from "./canvas.view.js"
import { TableComponent } from "../Shared/Table/table.component.js"

const SCROLL_SENSITIVITY = 0.8
export class CanvasComponent extends HTMLElement {
    static get selector() {
        return 'modeler-canvas'
    }
    
    constructor() {
        super()
        this.shadowElement = this.attachShadow({ mode: 'open' })
        
        // do not use variable names with html element's properties like scrollLeft, scrollTo to avoid collision 
        this.isDown = false;
        this.startX;
        this.startY;
        // hosrizontal scroll
        this.leftScroll; 
        // vertical scroll
        this.topScroll
    }
    
    connectedCallback() {
        const canvas = canvasView()
        this.shadowElement.innerHTML = canvas
        this.attachEventListeners()
    }

    attachEventListeners() {
        this.shadowRoot.addEventListener('click', (ev) => {
            
        })

        this.shadowRoot.addEventListener('addTable', (ev) => {
            this.shadowRoot.getElementById('pannable').appendChild(new TableComponent())
            ev.preventDefault()
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
            const pageScrollX = moveX * SCROLL_SENSITIVITY

            // vertical scrolling
            const moveY = e.offsetY - this.startY
            const pageScrollY = moveY * SCROLL_SENSITIVITY

            // scroll event
            this.scrollable.scrollLeft = this.leftScroll - pageScrollX
            this.scrollable.scrollTop = this.topScroll - pageScrollY

        });

    }

}