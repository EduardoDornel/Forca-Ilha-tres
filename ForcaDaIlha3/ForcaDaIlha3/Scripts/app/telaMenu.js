﻿class TelaMenu {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.renderizarEstadoInicial();
        this.registrarBindsEventos();
    }

    registrarBindsEventos() {
        this.$formLogin = $('#formLogin');
        this.$btnSubmit = $('#btn-comecar');
        this.$btnLeaderboard = $('#btn-placar');
        this.$btnLeaderboard.on('click', this.renderizarLeaderboard);
        var self = this;
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
        var nomeDigitado = $('#nome-player').val();
        $.get('/api/jogo', { nome: nomeDigitado })
            .done(function (res) {
                window.localStorage.setItem('id-usuario', res.dados);
                window.localStorage.setItem('pontuacao', 0);
                self.carregarJogo(self);
            }).catch((err) => {
                console.error('Erro ao cadastrar/selecionar usuário!');
            });
    }

    carregarJogo(self) {
        self.dificuldade = $('input[name="dificuldade"]:checked').val();
        self.idsPalavras;
        $.get('/api/jogo', { dificuldade: self.dificuldade })
            .done(function (res) {
                self.idsPalavras = res.dados;
                window.localStorage.setItem('ids-palavras', JSON.stringify(self.idsPalavras));
                forca.renderizarTela(self.dificuldade);
            }).catch((err) => {
                console.error('Erro ao carregar a tela de jogo!');
            });
    }

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}