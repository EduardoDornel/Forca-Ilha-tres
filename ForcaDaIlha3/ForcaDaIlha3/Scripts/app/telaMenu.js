class TelaMenu {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
        this.$formLogin = $('#formLogin');
        this.$btnSubmit = this.$formLogin.find('button[type=submit]');
        this.carregarJogo();
    }

    carregarJogo() {
        setTimeout(function () {
            forca.renderizarTela($('input[name="dificuldade"]:checked').val());
        }, 2000);
    }

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}