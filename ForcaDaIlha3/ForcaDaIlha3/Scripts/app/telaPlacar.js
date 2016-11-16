class TelaPlacar {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos(self) {        
        self.$radiobtnNormal = $('#normal');
        self.$radiobtnBH = $('#bh');
        self.$btnFiltrar = $('#btn-filtrar');
        self.$btnFiltrar.on('click', this.filtrar);
        self.$btnProximo = $('#btn-proximo');
        self.$btnAnterior = $('#btn-anterior');
        self.$btnProximo.on('click', this.buscarProximaPagina.bind(self));
        self.$btnAnterior.on('click', this.buscarPaginaAnterior.bind(self));
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

    pegarPlacar(pagina, filtro, self) {
        $.get('/api/placar', {
            pagina: self.pagina,
            filtro: self.filtro
        }).then((res) => {
            this.renderizarPlacar(res, self)
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

    renderizarPlacar(placar, self) {
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
            this.registrarBindsEventos(self);
        });
    }    

    renderizarEstadoInicial() {
        this.$elem.show();
        this.paginaAtual = 1;
        this.filtro = 'normal';
        var self = this;
        this.pegarPlacar(this.paginaAtual, this.filtro, self);        
    }
}