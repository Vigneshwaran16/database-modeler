import canvasView from "./canvas.view.js"
import { TableComponent } from "../Shared/Table/table.component.js"
import canvasStyles from './canvas.styles.css' assert {type: 'css'}

const SCROLL_SENSITIVITY = 0.8
const SCROLLABLE_CANVAS_WIDTH = 2000
const SCROLLABLE_CANVAS_HEIGHT = 1000
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
            ev.preventDefault()
            const canvasEl = this.shadowRoot.querySelector('.pannable-root')
            const pannableRootWidth = document.querySelector('modeler-canvas').clientWidth
            const currentScrollLeft = canvasEl.scrollLeft
            let viewableWidthStart = currentScrollLeft
            let viewableWidthEnd = currentScrollLeft + pannableRootWidth
            this.shadowRoot.getElementById('pannable').appendChild(new TableComponent())
            const table = this.shadowRoot.querySelector('table-component')
            table.setAttribute('left', Math.floor(Math.random() * (viewableWidthEnd - viewableWidthStart + 1)) + viewableWidthStart)
            table.setAttribute('top',0)
            // const table = this.shadowRoot.querySelector('table-component')
            // let tableStyles = `top: 100px; left: 300px;`
            // table.setAttribute('style', tableStyles)
            // console.log('table', table)
            // update the index if `table-component` style is changed and vice-versa 
            // console.log('tab', this.shadowRoot.styleSheets[0])
            // this.shadowRoot.styleSheets[0].deleteRule(4)
            // this.shadowRoot.styleSheets[0].insertRule("table-component { top: 50px; left: 100px; position: 'relative';}", 4)
            // // tab.right = '50px'
            // tab.position = 'relative'
            // tab.setAttribute('style', 'position: "relative"; top: 50; left: 100;')
            // tab.left = '50px'
            // console.log('upd', this.shadowRoot.styleSheets[0])
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