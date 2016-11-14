class TelaJogoBH {

    constructor(seletor) {
        this.erros = 0;
        this.acertos = 0;
        this.letrasErradas = "";
        this.letrasAcertadas = "";
        this.palavraDaJogada = "";
        this.quantidadeDeLetras = 0;
        this.$elem = $(seletor);
        this.renderizarEstadoInicial();
        this.timer;
    }
    registrarBindsEventos(self) {
        self.$btnReiniciar = $('#btn-reiniciar-jogo');
        self.$btnDica = $('#btn-reiniciar-jogo');
        self.$divDica = $('#dica');
        self.$btnPalpitar = $('#btn-palpitar-palavra');
        self.$btnReiniciar.on('click', self.reiniciar.bind(self));
        self.$btnDica.prop('disable', true);
        self.$btnPalpitar.on('click', self.palpitar.bind(self));
        //registra o evento de pressionar uma tecla
        document.onkeypress = function (evento) {
            let tecla = teclaPressionada(evento);
            if (self.letrasErradas.indexOf(tecla) == -1 && self.letrasAcertadas.indexOf(tecla) == -1) {
                self.registrarJogada(tecla);
            }
        }

        //recebe um evento de tecla pressionada e retorna o valor da tecla pressionada
        function teclaPressionada(evento) {
            evento = evento || window.event;
            let tecla = evento.keyCode || evento.which;
            return String.fromCharCode(tecla);
        }
        self.iniciarTimer();
    }
    iniciarTimer() {
        this.timer = window.setInterval(this.registrarJogada(null), 5000);
    }
    palpitar() {

    }
    registrarJogada(jogada) {
        clearInterval(this.timer);
        if (jogada !== null) {
            if(this.palavraDaJogada.indexOf(jogada) != -1)
            {
                for (let i = 0; i < this.palavraDaJogada.length; i++) {
                    let letraAtual = this.palavraDaJogada.substring(i, i + 1);
                    if (letraAtual === jogada) {
                        $('#letra' + i).append("<h2>" + jogada.toUpperCase() + "</h2>");
                        this.acertos++;
                        this.letrasAcertadas += jogada;
                    }
                }
            }
            if (this.acertos === this.quantidadeDeLetras) {
                this.ganhou();
            }
        } else {
            if (this.erros == 1) {
                this.gameOver(this);
            } else {
                this.erros++;
                if(jogada !== null){
                    this.letrasErradas += jogada;
                    $('.letras-erradas').append("<h2>" + jogada.toUpperCase() + "</h2>");
                }
            }
        }
        this.iniciarTimer();
    }

    gameOver(self) {
        let pontuacao = window.localStorage.getItem('pontuacao');
        let idUsuario = window.localStorage.getItem('id-usuario');
        $.get('/api/jogo', { pontos: pontuacao, idUsuario: idUsuario, dificuldade: 'normal' })
            .done(function (res) {
                self.reiniciar();
            })
    }

    ganhou() {
        let pontuacao = window.localStorage.getItem('pontuacao');
        window.localStorage.setItem('pontuacao', JSON.parse(pontuacao) + 1);
        forca.renderizarTela('normal');
    }

    pegarPalavra(self) {
        let ids = window.localStorage.getItem('ids-palavras');
        $.ajax({
            url: '/api/jogo',
            type: 'POST',
            contentType: 'application/json',
            data: ids,
            success: function (res) {
                self.palavraDaJogada = res.palavra.texto;
                console.log(self.palavraDaJogada);
                self.quantidadeDeLetras = res.palavra.tamanhoDaPalavra;
                console.log(self.quantidadeDeLetras);
                self.dica = res.palavra.dica;
                window.localStorage.setItem('ids-palavras', JSON.stringify(res.ids));
                self.renderizarPalavra(self);
            },
            error: function (jqXHR, exception) {
                alert('Falha ao resgatar palavra!');
            }
        });
    }
    renderizarPalavra(self) {
        let listaDeLetras = [];
        for (let i = 0; i < self.palavraDaJogada.length; i++) {
            let letraAtual = self.palavraDaJogada.substring(i, i + 1);
            let ehTraco = letraAtual === "-";
            let ehEspaco = letraAtual === " ";
            listaDeLetras.push({ letra: letraAtual, espaco: ehEspaco, traco: ehTraco, id: i });
        }
        console.log(listaDeLetras);
        forca.render('.tela', 'tela-jogo', {
            pontuacao: window.localStorage.getItem('pontuacao'),
            letras: listaDeLetras,
            dificuldade: 'BH'
        }).then(() => {
            self.registrarBindsEventos(self)
        });
    }

    reiniciar() {
        $.get('/api/jogo', { dificuldade: 'bh' })
            .done(function (res) {
                window.localStorage.setItem('pontuacao', 0);
                window.localStorage.setItem('ids-palavras', JSON.stringify(res.dados));
                forca.renderizarTela('bh');
            });
    }

    renderizarEstadoInicial() {
        this.pegarPalavra(this);
        this.$elem.show();
    }
}