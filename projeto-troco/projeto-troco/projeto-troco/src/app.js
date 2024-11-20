document.addEventListener('DOMContentLoaded', () => {
    const jogo = new JogoTroco();
    
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnVerificar = document.getElementById('btn-verificar');
    const inputTroco = document.getElementById('troco');
    const feedbackDiv = document.getElementById('feedback');
    const nivelSpan = document.getElementById('nivel');
    const pontuacaoSpan = document.getElementById('pontuacao');
    const listaProdutos = document.getElementById('lista-produtos');
    const totalCompraSpan = document.getElementById('total-compra');
    const valorDadoSpan = document.getElementById('valor-dado');

    function iniciarDesafio() {
        const desafio = jogo.gerarDesafio();
        
        // Limpa lista de produtos
        listaProdutos.innerHTML = '';
        
        // Adiciona produtos na tela
        desafio.produtos.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.innerHTML = `${produto.nome}: R$ ${produto.preco.toFixed(2)}`;
            listaProdutos.appendChild(produtoDiv);
        });
        
        // Atualiza total
        totalCompraSpan.textContent = desafio.valorTotal.toFixed(2);
        valorDadoSpan.textContent = desafio.valorDinheiroDado.toFixed(2);
        
        // Reseta input e feedback
        inputTroco.value = '';
        feedbackDiv.textContent = '';
        
        // Habilita botão de verificar
        btnVerificar.disabled = false;
    }

    btnIniciar.addEventListener('click', iniciarDesafio);

    btnVerificar.addEventListener('click', () => {
        const trocoInformado = Number(inputTroco.value);
        const resultado = jogo.verificarTroco(trocoInformado);
        
        // Atualiza feedback
        feedbackDiv.textContent = resultado.mensagem;
        feedbackDiv.className = `feedback ${resultado.correto ? 'sucesso' : 'erro'}`;
        
        if (resultado.correto) {
            // Atualiza nível e pontuação
            nivelSpan.textContent = jogo.nivel;
            pontuacaoSpan.textContent = jogo.pontuacao;
            
            // Desabilita botão
            btnVerificar.disabled = true;
            
            // Inicia próximo desafio após 2 segundos
            setTimeout(iniciarDesafio, 2000);
        }
    });
});