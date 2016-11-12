class TelaMenu {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
    }

    mudarCorFundo(dificuldade) {
    }

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}