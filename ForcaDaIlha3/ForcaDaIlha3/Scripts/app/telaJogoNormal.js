class TelaJogoNormal {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
        //registra o evento de pressionar uma tecla
        document.onkeypress = function (evento) {
            var tecla = teclaPressionada(evento);
            var alfabeto = 'abcdefghijklmnopqrstuvwxyz';
        };

        //recebe um evento de tecla pressionada e retorna o valor da tecla pressionada
        function teclaPressionada(evento) {
            evento = evento || window.event;
            var key = evento.keyCode || evt.which;
            return String.fromCharCode(key);
        }
        
    }

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}