export default (() => {
    return `
        <link rel="stylesheet" href="./src/Sidebar/sidebar.styles.css" />
        <div id="sidebar-menu-container">
            <sidebar-menu-item itemProperties='{}' id="schema-menu" class="menu" value="Schemas"></sidebar-menu-item>
            <sidebar-menu-item itemProperties='{}' id="table-menu" class="menu" value="Tables"></sidebar-menu-item>
            <sidebar-menu-item itemProperties='{}' id="reference-menu" class="menu" value="References"></sidebar-menu-item>
        </div>
    `
})