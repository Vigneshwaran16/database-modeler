import { SidebarComponent } from "./src/Sidebar/sidebar.component.js";
import { CanvasComponent } from "./src/Canvas/canvas.component.js";
import { ButtonComponent } from "./src/Shared/Button/button.component.js";
import { SidebarMenuComponent } from "./src/SidebarMenu/sidebar-menu.component.js";
import { MenuItemComponent } from "./src/SidebarMenu/MenuItem/menu-item.component.js";
import { ModelerComponent } from "./src/Modeler/modeler.component.js";


/*
  Begin rendering from nested components so that their shadow root
  can be accessed from parent components
*/
const components = [ 
    ButtonComponent,
    ModelerComponent,
    MenuItemComponent,
    SidebarMenuComponent,
    SidebarComponent,
    CanvasComponent,
] 

components.forEach( (component) => {
    customElements.define(component.selector, component)
})