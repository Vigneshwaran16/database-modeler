import { SidebarComponent } from "./src/Sidebar/sidebar.component.js";
import { CanvasComponent } from "./src/Canvas/canvas.component.js";
import { ButtonComponent } from "./src/Shared/Button/button.component.js";

import { TableComponent } from "./src/Shared/Table/table.component.js";
import { SidebarMenuComponent } from "./src/Sidebar/SidebarMenuItem/sidebar-menu-item.component.js";


/*
  Begin rendering from nested components so that their shadow root
  can be accessed from parent components
*/
const components = [ 
    ButtonComponent,
    TableComponent,
    SidebarMenuComponent,
    SidebarComponent,
    CanvasComponent,
] 

components.forEach( (component) => {
    customElements.define(component.selector, component)
})