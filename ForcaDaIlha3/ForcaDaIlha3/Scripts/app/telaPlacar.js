class TelaPlacar {

    constructor(seletor) {
        this.$elem = $(seletor);
        this.paginaAtual = 1;
        this.dificuldade = 'normal';
        this.quantidadeRegistros = 0;
        this.renderizarEstadoInicial();
    }

    registrarBindsEventos(self) {        
        self.$radiobtnNormal = $('#rb-normal');
        self.$radiobtnBH = $('#rb-bh');
        self.$btnFiltrar = $('#btn-filtrar');
        self.$btnFiltrar.on('click', this.filtrar.bind(this));
        self.$btnProximo = $('#btn-proximo');
        self.$btnAnterior = $('#btn-anterior');
        self.$btnProximo.on('click', this.buscarProximaPagina.bind(self));
        self.$btnAnterior.on('click', this.buscarPaginaAnterior.bind(self));
        self.setarRadioButton();
        self.pegarQuantidadePontuacoes(self.dificuldade);
    }
    desativarBotoes() {
        if (self.paginaAtual <= 1) {
            self.$btnAnterior.attr('disabled', true);
        } else {
            self.$btnAnterior.removeAttr('disabled');
        }
        let ultimaPagina = self.paginaAtual * 5 >= self.quantidadeRegistros;
        if (ultimaPagina) {
            self.$btnProximo.attr('disabled', true);
        }
    }
    setarRadioButton() {
        if(this.dificuldade === 'normal'){
            this.$radiobtnNormal.prop('checked', true);
        }
        else
        {
            this.$radiobtnBH.prop('checked', true);
        }
    }

    buscarProximaPagina() {
        if(this.quantidadeRegistros !== this.paginaAtual){
            this.pegarPlacar(++this.paginaAtual, this.filtro);
        }
    }

    buscarPaginaAnterior() {
        if (this.paginaAtual > 1) {
            this.pegarPlacar(--this.paginaAtual, this.filtro);
        }        
    }

    filtrar() {        
        this.paginaAtual = 1;
        this.filtro = '';        
        if (this.$radiobtnNormal.is(':checked')) {
            this.filtro = 'normal';
        } else if (this.$radiobtnBH.is(':checked')) {
            this.filtro = 'bh';
        }        
        this.pegarPlacar(this.paginaAtual, this.filtro);
    }

    pegarPlacar(paginaAtual, filtroAtual) {
        $.get('/api/placar', {
            pagina: paginaAtual,
            filtro: filtroAtual
        }).then((res) => {
            this.dificuldade = filtroAtual;
            this.renderizarPlacar(res, this)
        });
    }

    pegarQuantidadePontuacoes(filtroAtual) {
        let self = this;
        $.get('/api/placar', {
            filtro: filtroAtual
        }).then((res) => {
            self.quantidadeRegistros = res;
            self.desativarBotoes();
        });
    }

    renderizarPlacar(placar, self) {
        let posicaoArray = 0;
        return forca.render('.tela', 'tela-placar', {
            pontuacoes: placar.map(function (pontuacao) {
                return {
                    id: pontuacao.id,
                    posicao: ((self.paginaAtual - 1) * 5) + 1 + posicaoArray++,
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
        this.filtro = 'normal';
        this.pegarPlacar(this.paginaAtual, this.filtro, this);
    }
}