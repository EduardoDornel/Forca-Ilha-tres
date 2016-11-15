class TelaJogoBH extends TelaJogo {

    constructor(seletor) {
        super(seletor);
        this.dificuldade = 'bh';
    }
    registrarBindsEventos(self) {
        $('body').addClass('fundo-escuro');
        $('#btn-dica').prop('disabled', true);
        super.registrarBindsEventos(self);
        self.iniciarTimer();
    }
    iniciarTimer() {
        console.log('iniciou timer');
        var self = this;
        self.timer = window.setInterval(function () {
            self.gameOver();
        }, 20000);
    }
    registrarJogada(jogada) {
        clearInterval(this.timer);
        if (this.palavraDaJogada.indexOf(jogada) !== -1) {
            for (let i = 0; i < this.palavraDaJogada.length; i++) {
                let letraAtual = this.palavraDaJogada.substring(i, i + 1);
                if (letraAtual === jogada) {
                    $('#letra' + i).append("<h2>" + jogada.toUpperCase() + "</h2>");
                    this.acertos++;
                    this.letrasAcertadas += jogada;
                }
            }
            this.iniciarTimer();
            if (this.acertos === this.quantidadeDeLetras) {
                this.ganhou();
            }
        } else {
            if (this.erros === 1) {
                this.gameOver(this);
            } else {
                this.erros++;
                this.letrasErradas += jogada;
                $('.letras-erradas').append("<h2>" + jogada.toUpperCase() + "</h2>");
                this.iniciarTimer();
            }
        }
    }
    reiniciar() {        
        clearInterval(this.timer);
        super.reiniciar(this);
    }
    renderizarPalavra(self) {
        super.renderizarPalavra(self, 'BH');
    }
    palpitar() {
        clearInterval(this.timer);
        super.palpitar('bh');
    }
    gameOver() {
        clearInterval(this.timer);
        super.gameOver();
    }
    ganhou(pontosDaRodada) {
        clearInterval(this.timer);
        super.ganhou(pontosDaRodada);
    }
}