class TelaPlacar {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.registrarBindsEventos();
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {

    }

    pegarPlacar(pagina, filtro) {
        return $.get('/api/placar', {
            pagina: pagina,
            filtro: filtro
        });
    }

    mudarPlacar() {
        $('input[name="tipo-placar"]').on('change', function () {
            $('.placar-normal').hide();
            $('.placar-bh').show;
        })
    }

    renderizarPlacar(placar) {
        return forca.render('.tela', 'tela-placar', {
            chars: placar.map(function (item) {
                return {
                    id: item.id,
                    nome: item.nome,
                    pontos: item.pontos
                }
            })
        });
    }    

    renderizarEstadoInicial() {
        this.$elem.show();
    }
}