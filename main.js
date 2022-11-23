import { SidebarComponent } from "./src/Sidebar/sidebar.component.js";
import { CanvasComponent } from "./src/Canvas/canvas.component.js";
import { ButtonComponent } from "./src/Shared/Button/button.component.js";

const components = [ 
    ButtonComponent,
    SidebarComponent,
    CanvasComponent,
] 

components.forEach( (component) => {
    customElements.define(component.selector, component)
})