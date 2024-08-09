# Organizador Asaas

Este projeto processa e renderiza dados de um arquivo de texto para uma tabela HTML. O arquivo de entrada deve ser formatado com linhas separadas por quebras de linha e colunas separadas por "|". Este projeto é especialmente útil para organizar dados financeiros, como vendas, e visualizá-los de forma clara.

## Demonstração

Você pode ver o projeto em ação [aqui](https://betinribeiro.github.io/organizador_asaas).

## Funcionalidades

- Carregamento de arquivos de texto e conversão para uma matriz de dados.
- Processamento de dados para calcular totais de vendas, recebidos, pendentes e atrasados.
- Renderização de uma tabela HTML com os resultados processados.
- Cálculo de percentuais para valores recebidos, pendentes e atrasados.

## Como Usar

1. Faça o download ou clone o repositório:
    ```bash
    git clone https://github.com/betinribeiro/organizador_asaas.git
    ```

2. Abra o arquivo `index.html` em seu navegador.

3. Selecione um arquivo de texto formatado corretamente usando o botão "Choose File".

4. Visualize os resultados processados na tabela.

## Formato do Arquivo de Entrada

O arquivo de entrada deve seguir o seguinte formato:

- As linhas são separadas por quebras de linha.
- As colunas dentro de cada linha são separadas por "|".
- O script espera que certas colunas contenham informações específicas, como descrições, status e valores.

Exemplo:
VENDA 1 - João - 123 | Recebido | 100.00
VENDA 2 - Maria - 456 | Aguardando | 200.00
VENDA 3 - José - 789 | Vencida | 150.00


## Código

O código principal está localizado no arquivo `app.js`, que inclui as funções para:

- Processar o arquivo de texto e converter para uma matriz de dados (`parseTextToMatrix`).
- Criar uma lista inicial com base na matriz e posições de colunas específicas (`createInitialList`).
- Criar um dicionário para organizar as informações de vendas (`createDictionary`).
- Renderizar a tabela HTML com os dados processados (`renderTable`).

## Contribuições

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
