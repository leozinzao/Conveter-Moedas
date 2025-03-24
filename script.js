async function converterMoeda() {
    const valor = document.getElementById("valor").value;
    const moedaOrigem = document.getElementById("moedaOrigem").value;
    const moedaDestino = document.getElementById("moedaDestino").value;
    const resultado = document.getElementById("resultado");

    if (valor === "" || valor <= 0) {
        resultado.innerHTML = "Por favor, insira um valor válido.";
        return;
    }

    const apiKey = "96126b156aa9c9f2cdb622be"; // Substitua pela sua chave da API
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${moedaOrigem}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (!dados.conversion_rates[moedaDestino]) {
            resultado.innerHTML = "Erro ao obter a taxa de câmbio.";
            return;
        }

        const taxa = dados.conversion_rates[moedaDestino];
        const valorConvertido = (valor * taxa).toFixed(2);

        resultado.innerHTML = `${valor} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}`;
    } catch (erro) {
        resultado.innerHTML = "Erro ao conectar à API.";
        console.error(erro);
    }
}
