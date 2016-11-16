class TelaPlacar {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos() {        
        this.$radiobtnNormal = $('#normal');
        this.$radiobtnBH = $('#bh');        
        this.$btnFiltrar = $('#btn-filtrar');        
        this.$btnFiltrar.on('click', this.filtrar);
        this.$btnProximo = $('#btn-proximo');
        this.$btnAnterior = $('#btn-anterior');
        this.$btnProximo.on('click', this.buscarProximaPagina.bind(this));
        this.$btnAnterior.on('click', this.buscarPaginaAnterior.bind(this));
    }

    buscarProximaPagina() {
        this.pegarPlacar(++this.paginaAtual, this.filtro);
    }

    buscarPaginaAnterior() {
        if (!this.paginaAtual <= 1) {
            this.pegarPlacar(--this.paginaAtual, this.filtro);
        }        
    }

    filtrar() {        
        this.paginaAtual = 1;
        this.filtro = '';        
        if ($('#normal').is(':checked')) {
            this.filtro = 'normal';
        } else if ($('#bh').is(':checked')) {
            this.filtro = 'bh';
        }        
        pegarPlacar(this.paginaAtual, this.filtro);
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
        if ($(this.$radiobtnNormal).is(':checked')) {
            $('#placar-normal').show();
            $('#placar-bh').hide();
        } else if ($(this.$radiobtnBH).is(':checked')) {
            $('#placar-normal').hide();
            $('#placar-bh').show();
        } else {
            $('#placar-normal').show();
            $('#placar-bh').show();
        }        
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
        this.paginaAtual = 1;
        this.filtro = 'normal';        
        this.pegarPlacar(this.paginaAtual, this.filtro);        
    }
}