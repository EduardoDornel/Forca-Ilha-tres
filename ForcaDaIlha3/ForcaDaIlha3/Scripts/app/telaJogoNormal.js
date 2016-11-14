class TelaJogoNormal {

    constructor(seletor) {
        this.erros = 0;
        this.acertos = 0;
        this.letrasErradas = "";
        this.palavraDaJogada = "";
        this.quantidadeDeLetras = 0;
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
        this.$textoErro = $('#error');
        var self = this;
        //registra o evento de pressionar uma tecla
        document.onkeypress = function (evento) {
            let tecla = teclaPressionada(evento);
            let alfabeto = 'abcdefghijklmnopqrstuvwxyz';
            if (alfabeto.indexOf(tecla) != -1) {
                if(self.letrasErradas.indexOf() == -1){
                    self.registrarJogada(tecla);
                }
            } else {
                self.$textoErro.html("Insira somente letras!");
                setTimeout(function () {
                    self.$textoErro.html();
                }, 1000);
            }
        }

        //recebe um evento de tecla pressionada e retorna o valor da tecla pressionada
        function teclaPressionada(evento) {
            evento = evento || window.event;
            let tecla = evento.keyCode || evento.which;
            return String.fromCharCode(tecla);
        }
        
    }

    registrarJogada(jogada) {
        if(this.palavraDaJogada.indexOf(jogada) != -1){
            for (let i = 0; i < this.palavraDaJogada.length; i++) {
                let letraAtual = this.palavraDaJogada.substring(i, i+1);
                if (letraAtual === jogada) {
                    $('#letra' + i).append("<h2>" + jogada.toUpperCase() + "</h2>");
                    this.acertos++;
                }
            }
            if (this.acertos === this.quantidadeDeLetras) {
                this.ganhou();
            }
        } else {
            if(this.erros == 4){
                this.gameOver();
            }else{
                this.erros++;
                this.letrasErradas += jogada;
                $().append("<h2>" + jogada.toUpperCase() + "</h2>"); 
            }
        }
    }

    gameOver() {
        console.log("HA HA");
    }

    ganhou() {
        console.log("BOA");
    }

    pegarPalavra() {
        this.palavraDaJogada = 'teste';
        this.quantidadeDeLetras = 5;
    }

    renderizarEstadoInicial() {
        this.pegarPalavra();
        this.$elem.show();
        forca.render('.tela', 'tela-jogo');
    }
}