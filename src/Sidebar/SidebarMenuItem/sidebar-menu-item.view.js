export default (() => {
    return `
    <link rel="stylesheet" href="./src/Sidebar/SidebarMenuItem/sidebar-menu-item.styles.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
    <div id="dropdown-menu">
        <span></span>
        <i class="fas fa-caret-right"></i>
    </div>
    <div id="dropdown-list" is-active="false" is-empty="true">
    </div>
    `
})