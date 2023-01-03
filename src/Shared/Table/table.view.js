export default ((tableName) => {
    return `
    <link rel="stylesheet" href="./src/Shared/Table/table.styles.css"/>
    <table id="table" class="tab">
    <tbody>
        <tr>
            <th>${tableName}</th>
        </tr>
        <tr> 
            <td></td>
        </tr>
    </tbody
    </table>
    `
})