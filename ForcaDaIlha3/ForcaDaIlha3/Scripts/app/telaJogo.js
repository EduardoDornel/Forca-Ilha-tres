class TelaJogo {
    constructor(seletor) {
        this.dificuldade = "";
        this.erros = 0;
        this.timer = null;
        this.acertos = 0;
        this.letrasErradas = "";
        this.letrasAcertadas = "";
        this.palavraDaJogada = "";
        this.palpitando = false;
        this.quantidadeDeLetras = 0;
        this.$elem = $(seletor);
        this.renderizarEstadoInicial();
    }
    registrarBindsEventos(self) {
        self.$btnReiniciar = $('#btn-reiniciar-jogo');
        self.$divUtilitaria = $('#div-utilitaria');
        self.$btnPalpitar = $('#btn-palpitar-palavra');
        self.$btnReiniciar.on('click', self.reiniciar.bind(self));
        self.$btnPalpitar.on('click', self.palpitar.bind(self));
        //registra o evento de pressionar uma tecla
        document.onkeypress = function (evento) {
            if (!self.palpitando) {
                let tecla = teclaPressionada(evento);
                let alfabeto = 'abcdefghijklmnopqrstuvwxyz';
                if (alfabeto.indexOf(tecla) != -1) {
                    if (self.letrasErradas.indexOf(tecla) == -1 && self.letrasAcertadas.indexOf(tecla) == -1) {
                        self.registrarJogada(tecla);
                    }
                }
            }
        }
        //recebe um evento de tecla pressionada e retorna o valor da tecla pressionada
        function teclaPressionada(evento) {
            evento = evento || window.event;
            let tecla = evento.keyCode || evento.which;
            return String.fromCharCode(tecla);
        }
    }
    palpitar() {
        this.palpitando = true;
        this.$btnPalpitar.prop('disabled', true);
        this.$divUtilitaria.append("<input type=\"text\" id=\"input-palpite\" class=\"form-control\">");
        this.$divUtilitaria.append("<button id=\"btn-inserir-palpite\" class=\"btn btn-primary\">Palpitar</\button>");
        $('#btn-inserir-palpite').on('click', this.compararPalpite.bind(this));
    }
    compararPalpite() {
        var palpite = $('#input-palpite').val();
        if (this.palavraDaJogada === palpite.toLowerCase()) {
            this.ganhou(2);
        } else {
            this.gameOver();
        }
    }
    gameOver() {
        var self = this;
        let pontuacao = window.localStorage.getItem('pontuacao');
        let idUsuario = window.localStorage.getItem('id-usuario');
        $.get('/api/jogo', { pontos: pontuacao, idUsuario: idUsuario, dificuldade: self.dificuldade })
            .done(function (res) {
                self.reiniciar(self);
            })
    }
    ganhou(pontuacaoDaRodada) {
        let pontuacao = window.localStorage.getItem('pontuacao');
        window.localStorage.setItem('pontuacao', JSON.parse(pontuacao) + pontuacaoDaRodada);
        forca.renderizarTela(this.dificuldade);
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
                self.dica = res.palavra.dica;
                window.localStorage.setItem('ids-palavras', JSON.stringify(res.ids));
                self.renderizarPalavra(self);
            },
            error: function (jqXHR, exception) {
                console.log("Falha ao resgatar palavra!");
            }
        });
    }
    renderizarPalavra(self, dificuldade) {
        let listaDeLetras = [];
        for (let i = 0; i < self.palavraDaJogada.length; i++) {
            let letraAtual = self.palavraDaJogada.substring(i, i + 1);
            let ehTraco = letraAtual === "-";
            let ehEspaco = letraAtual === " ";
            listaDeLetras.push({ letra: letraAtual, espaco: ehEspaco, traco: ehTraco, id: i });
        }
        forca.render('.tela', 'tela-jogo', {
            pontuacao: window.localStorage.getItem('pontuacao'),
            letras: listaDeLetras,
            dificuldade: dificuldade
        }).then(() => {
            self.registrarBindsEventos(self)
        });
    }
    reiniciar(self) {
        var dif = self.dificuldade;
        $.get('/api/jogo', { dificuldade: self.dificuldade })
            .done(function (res) {
                let idsPalavras = res.dados;
                window.localStorage.setItem('ids-palavras', JSON.stringify(idsPalavras));
                forca.renderizarTela(self.dificuldade);
            });
    }
    renderizarEstadoInicial() {
        this.pegarPalavra(this);
        this.$elem.show();
    }
}