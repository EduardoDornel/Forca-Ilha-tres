class TelaMenu {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
        var intervalo = window.setInterval(lerolero, 1000);
        function lerolero() {
            window.alert("Popup");
        }
        
        clearInterval(intervalo);
    }

    registrarBindsEventos() {
        this.$formLogin = $('#formLogin');
        this.$btnSubmit = $('#btn-comecar');
        var self = this;
        let validator = this.$formLogin.validate({
            submitHandler: function () {
                self.$btnSubmit.text('Carregando...');
                self.$btnSubmit.attr('disabled', true);
                self.verificarUsuario(self);
            }
        });
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