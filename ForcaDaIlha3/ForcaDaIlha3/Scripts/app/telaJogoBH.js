class TelaJogoBH {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
        //registra o evento de pressionar uma tecla
        document.onkeypress = function (evento) {
            var tecla = teclaPressionada(evento);
        };

        //recebe um evento de tecla pressionada e retorna o valor da tecla pressionada
        function teclaPressionada(evento) {
            evento = evento || window.event;
            var tecla = evento.keyCode || evento.which;
            return String.fromCharCode(tecla);
        }

    }

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}