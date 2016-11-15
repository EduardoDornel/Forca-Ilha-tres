class TelaAviso {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.dificuldade = window.localStorage.getItem('dificuldade');
        this.aviso = seletor.substring(6, 15);
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
        this.$btnReiniciar = $('#btn-reiniciar');
        this.$btnVoltarMenu = $('#btn-voltar-menu');
        this.$btnLeaderboard = $('#btn-leaderboard');
        this.$btnReiniciar.on('click', this.reiniciar.bind(this));
        this.$btnVoltarMenu.on('click', this.renderizarMenu);
        this.$btnLeaderboard.on('click', this.renderizarLeaderboard);
    }
    montarMensagem() {
        let msg = '';
        if (this.aviso === 'game-over') {
            msg = this.aviso;
        }
        else if(this.dificuldade === 'normal')
        {
            msg = 'parabéns, você zerou o modo normal!';
        }
        else
        {
            msg = 'nossa, certeza que você estava de hack... parabéns, você zerou o modo mais extremely hard badass, vulgo BH!!!';
        }
        this.renderizarMensagem(msg.toUpperCase());
    }
    renderizarMensagem(msg) {
        let self = this;
        forca.render('.tela', 'tela-aviso', {
            mensagem: msg
        }).then(() => {
            self.registrarBindsEventos(self)
        });
    }

    renderizarMenu() {
        window.location.reload();
    }
    renderizarLeaderboard() {
        forca.renderizarTela('placar');
    }
    reiniciar() {
        let self = this;
        $.get('/api/jogo', { dificuldade: self.dificuldade })
            .done(function (res) {
                let idsPalavras = res.dados;
                window.localStorage.setItem('ids-palavras', JSON.stringify(idsPalavras));
                forca.renderizarTela(self.dificuldade);
            });
    }


    renderizarEstadoInicial() {
        this.$elem.show();
        this.montarMensagem();
    }
}