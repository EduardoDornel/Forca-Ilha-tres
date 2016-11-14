class TelaMenu {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos(self) {
        self.$formLogin = $('#formLogin');
        self.$btnSubmit = $('#btn-comecar');
        self.$btnLeaderboard = $('#btn-leaderboard');
        self.$btnLeaderboard.on('click', self.renderizarLeaderboard);
        let validator = self.$formLogin.validate({
            submitHandler: function () {
                self.$btnSubmit.text('Carregando...');
                self.$btnSubmit.attr('disabled', true);
                self.verificarUsuario(self);
            }
        });
    }
    renderizarLeaderboard(){
        forca.renderizarTela('placar');
    }

    verificarUsuario(self) {
      var nome = $('#nome-player').val();
        $.get('/api/jogo', { nome: nome })
            .done(function (res) {
                window.localStorage.setItem('id-usuario', res.dados);
                window.localStorage.setItem('pontuacao', 0);
                self.carregarJogo(self);
            })
    }

    carregarJogo(self) {
        self.dificuldade = $('input[name="dificuldade"]:checked').val();
        self.idsPalavras;
        $.get('/api/jogo', { dificuldade: self.dificuldade })
            .done(function (res) {
                self.idsPalavras = res.dados;
                window.localStorage.setItem('ids-palavras', JSON.stringify(self.idsPalavras));
                forca.renderizarTela(self.dificuldade);
            });
    }

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}