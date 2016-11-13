class TelaMenu {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
        this.$formLogin = $('#formLogin');
        this.$btnSubmit = $('#btn-comecar');
        var self = this;
        let validator = this.$formLogin.validate({
            submitHandler: function () {
                self.$btnSubmit.text('Carregando...');
                self.$btnSubmit.attr('disabled', true);
                self.carregarJogo();
            }
        });
    }

    carregarJogo() {
        this.dificuldade = $('input[name="dificuldade"]:checked').val();
        console.log(this.dificuldade);
        this.idsPalavras;
        $.get('/api/jogo', { dificuldade: this.dificuldade })
            .done(function (res) {
                this.idsPalavras = res.dados;
                window.localStorage.setItem('ids-palavras', JSON.stringify(this.idsPalavras));
                forca.renderizarTela(this.dificuldade);
            });
    }

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}