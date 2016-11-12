class TelaMenu {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
    }

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}