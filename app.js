document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const matrix = parseTextToMatrix(text);
        const initialList = createInitialList(matrix, 19, 17, 14);
        const dictionary = createDictionary(initialList);
        renderTable(dictionary);
    };
    reader.readAsText(file);
}

function parseTextToMatrix(text) {
    // Divide o texto em linhas
    const lines = text.split('\n');
    // Divide cada linha por vírgulas e cria uma matriz
    return lines.map(line => line.split('|'));
}

function createInitialList(matrix, descPos, statusPos, valuePos) {
    return matrix.map((row, index) => {
        const description = row[descPos - 1] || 'Não disponível'; // `descPos - 1` porque o índice é zero-based
        const status = row[statusPos - 1] || 'Não disponível'; // `statusPos - 1` porque o índice é zero-based
        const value = parseFloat(row[valuePos - 1]) || 0; // Assume que o valor é numérico
        return {
            linha: index + 1,
            descricao: description,
            status: status,
            valor: value
        };
    });
}

function createDictionary(list) {
    const dictionary = {};

    list.forEach(item => {
        const match = item.descricao.match(/VENDA (\d+) - ([^-]+) - (\d+)/);
        if (match) {
            const key = `${match[1]} - ${match[2].trim()}`;
            if (!dictionary[key]) {
                dictionary[key] = {
                    venda: match[1],
                    vendedor: match[2].trim(),
                    totalVenda: 0,
                    totalRecebido: 0,
                    totalPendente: 0,
                    totalAtrasado: 0
                };
            }
            // Verifica se o status contém o trecho desejado
            if (item.status.toLowerCase().includes('ecebid')) {
                dictionary[key].totalRecebido += item.valor;
            } else if (item.status.toLowerCase().includes('guardando')) {
                dictionary[key].totalPendente += item.valor;
            } else if (item.status.toLowerCase().includes('encida')) {
                dictionary[key].totalAtrasado += item.valor;
            } else {
                dictionary[key].totalVenda += item.valor;
            }
            dictionary[key].totalVenda += item.valor; // Adiciona ao totalVenda independentemente do status
        }
    });

    return dictionary;
}

function renderTable(dictionary) {
    const tbody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpa a tabela existente

    Object.values(dictionary).forEach(item => {
        // Calcula os percentuais
        const percentualRecebido = item.totalVenda > 0 ? (item.totalRecebido / item.totalVenda * 100).toFixed(2) : '0.00';
        const percentualPendente = item.totalVenda > 0 ? (item.totalPendente / item.totalVenda * 100).toFixed(2) : '0.00';
        const percentualAtrasado = item.totalVenda > 0 ? (item.totalAtrasado / item.totalVenda * 100).toFixed(2) : '0.00';
        const percentualReal = item.totalVenda > 0 ? ((item.totalRecebido )/ (item.totalAtrasado+item.totalRecebido ) * 100).toFixed(2) : '0.00';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.venda}</td>
            <td>${item.vendedor}</td>
            <td>${item.totalVenda.toFixed(2)}</td>
            <td>${item.totalRecebido.toFixed(2)} (${percentualRecebido}%)</td>
            <td>${item.totalPendente.toFixed(2)} (${percentualPendente}%)</td>
            <td>${item.totalAtrasado.toFixed(2)} (${percentualAtrasado}%)</td>
            <td>${(item.totalAtrasado+item.totalRecebido).toFixed(2)} (${percentualReal}%)</td>
        `;
        tbody.appendChild(row);
    });
}
