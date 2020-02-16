const textLabels = {
    body: {
        noMatch: "Nenhum registro encontrado",
        toolTip: "Filtro",
        columnHeaderTooltip: column => `Filtrar por ${column.label}`
    },
    pagination: {
        next: "Próxima",
        previous: "Anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
    },
    toolbar: {
        search: "Pesquisa",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Colunas",
        filterTable: "Filtros",
    },
    filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Reset",
    },
    viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Mostrar/Esconder Coluna",
    },
    selectedRows: {
        text: "linhas(s) selecionada(s)",
        delete: "Remover",
        deleteAria: "Remover Linhas Selecionadas",
    },
};

module.exports = textLabels;