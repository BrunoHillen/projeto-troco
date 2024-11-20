class JogoTroco {
    constructor() {
        this.produtos = [
            { id: 1, nome: 'Chocolate', preco: 2.50 },
            { id: 2, nome: 'Suco', preco: 3.00 },
            { id: 3, nome: 'Biscoito', preco: 1.75 },
            { id: 4, nome: 'Pipoca', preco: 2.25 }
        ];
        this.nivel = 1;
        this.pontuacao = 0;
        this.produtosSelecionados = [];
        this.valorDinheiroDado = 0;
    }

    gerarDesafio() {
        // Limpa produtos selecionados anteriormente
        this.produtosSelecionados = [];

        // Seleciona produtos baseado no nível
        const quantidadeProdutos = Math.min(this.nivel, 2);
        
        // Embaralha e seleciona produtos
        const produtosEmbaralhados = this.produtos.sort(() => 0.5 - Math.random());
        this.produtosSelecionados = produtosEmbaralhados.slice(0, quantidadeProdutos);

        // Calcula valor total da compra
        const valorTotal = this.produtosSelecionados.reduce((soma, produto) => soma + produto.preco, 0);

        // Gera valor de dinheiro dado sempre um pouco maior
        this.valorDinheiroDado = Number((valorTotal * (1 + Math.random() * 0.5)).toFixed(2));

        return {
            produtos: this.produtosSelecionados,
            valorTotal: Number(valorTotal.toFixed(2)),
            valorDinheiroDado: this.valorDinheiroDado
        };
    }

    verificarTroco(trocoInformado) {
        const valorTotal = this.produtosSelecionados.reduce((soma, produto) => soma + produto.preco, 0);
        const trocoCorreto = Number((this.valorDinheiroDado - valorTotal).toFixed(2));
        
        if (Number(trocoInformado) === trocoCorreto) {
            this.nivel++;
            this.pontuacao += 10;
            return {
                correto: true, 
                mensagem: 'Parabéns! Troco correto! 🎉', 
                trocoCorreto: trocoCorreto
            };
        } else {
            return {
                correto: false, 
                mensagem: `Ops! O troco correto é R$ ${trocoCorreto}. Tente novamente.`, 
                trocoCorreto: trocoCorreto
            };
        }
    }
}