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
    }

    filtrar() {        
        this.paginaAtual = 1;
        let filtro = '';        
        if ($(this.$radiobtnNormal).is(':checked')) {
            this.filtro = 'normal';
        } else if ($(this.$radiobtnBH).is(':checked')) {
            this.filtro = 'bh';
        }
        console.log(this.paginaAtual);
        this.pegarPlacar(this.paginaAtual, this.filtro);
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
        var self = this;
        this.pegarPlacar(this.paginaAtual, this.filtro, self);        
    }
}