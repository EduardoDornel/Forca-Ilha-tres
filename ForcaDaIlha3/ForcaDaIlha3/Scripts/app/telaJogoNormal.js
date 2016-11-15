class TelaJogoNormal extends TelaJogo{

    constructor(seletor) {
        super(seletor);
        this.dica = "";
        this.dificuldade = 'normal';
    }

    registrarBindsEventos(self) {
        self.$btnDica = $('#btn-dica');
        self.$btnDica.on('click', self.exibirDica.bind(self));
        super.registrarBindsEventos(self);
    }
    exibirDica() {
        this.$btnDica.prop("disabled", true);
        this.$divUtilitaria.append("<h2 id=\"dica-temporaria\">" + this.dica + "</h2>");
        setTimeout(function () {
            $("#dica-temporaria").remove();
        }, 2000);
    }
    registrarJogada(jogada) {
        if(this.palavraDaJogada.indexOf(jogada) != -1){
            for (let i = 0; i < this.palavraDaJogada.length; i++) {
                let letraAtual = this.palavraDaJogada.substring(i, i+1);
                if (letraAtual === jogada) {
                    $('#letra' + i).append("<h2>" + jogada.toUpperCase() + "</h2>");
                    this.acertos++;
                    this.letrasAcertadas += jogada;
                }
            }
            if (this.acertos === this.quantidadeDeLetras) {
                this.ganhou(1);
            }
        } else {
            if(this.erros == 4){
                this.gameOver(this);
            }else{
                this.erros++;
                this.letrasErradas += jogada;
                $('.letras-erradas').append("<h2>" + jogada.toUpperCase() + "</h2>"); 
            }
        }
    }
    reiniciar() {
        super.reiniciar(this);
    }
    renderizarPalavra(self) {
        super.renderizarPalavra(self, 'NORMAL')
    }
}