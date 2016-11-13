let forca = {};

forca.toggleLoader = () => {
    ['.boxLoading', '.tela'].forEach(seletor => $(seletor).toggle());
};

forca.renderizarTela = function (nome) {
    let $subTelas = $('.sub-tela');
    $.each($subTelas, (indice, elem) => $(elem).hide());
    let seletor = '';

    switch (nome) {
        case 'menu':
            new TelaMenu('#tela-menu');
            break;
        case 'normal':
            new TelaJogoNormal('#tela-jogo');
            break;
        case 'bh':
            new TelaJogoBH('#tela-jogo');
            break;
        case 'placar':
            new TelaPlacar('#tela-placar');
    }

}

forca.loadTemplate = function (name) {
    return new Promise((resolve, reject) => {
        $.get(`/static/templates/${name}.tpl.html`).then(
          (template) => {
              resolve(Handlebars.compile(template));
          }
        )
    });
}

forca.render = function (viewElementSelector, templateName, data) {

    return new Promise((resolve, reject) => {
        this.loadTemplate(templateName).then(
         function (templateFn) {
             let rendered = templateFn(data);
             $(viewElementSelector).html(rendered);
             resolve();
         }
       );
    });
}

forca.iniciar = function () {
    return forca.renderizarTela('menu');
};