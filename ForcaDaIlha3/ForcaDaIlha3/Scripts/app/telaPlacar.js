class TelaPlacar {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {
        this.$rbTipoPlacar = $('input[name="tipo-placar"]');
        this.$rbTipoPlacar.on('change', this.mudarPlacar);
        this.$divPlacarBH = ('#bh');
        this.$divPlacarNormal = ('#normal');
    }

    pegarPlacar(pagina, filtro) {
        $.get('/api/placar', {
            pagina: pagina,
            filtro: filtro
        }).then((res) => {
            this.renderizarPlacar(res)
        });
    }

    mudarPlacar() {
        this.$divPlacarBH.toggle();
        this.$divPlacarNormal.toggle();
    }

    renderizarPlacar(placar) {
        return forca.render('.tela', 'tela-placar', {
            pontuacoes: placar.map(function (pontuacao) {
                return {
                    id: pontuacao.id,
                    nome: pontuacao.usuario.nome,
                    pontos: pontuacao.quantidadePontos,
                    dificuldade: pontuacao.dificuldade
                }
            })
        }).then(() => {
            this.registrarBindsEventos();
        });
    }    

    renderizarEstadoInicial() {
        this.$elem.show();
        this.pegarPlacar(1, 'normal')
    }
}