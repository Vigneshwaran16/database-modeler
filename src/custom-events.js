

export const addTableEvent = new CustomEvent('addTable', {
    bubbles: true,
    composed: true,
    detail: {
        key: 'table-1'
    }
})