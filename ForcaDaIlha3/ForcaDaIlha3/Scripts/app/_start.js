$(function () {
    forca.iniciar();
    $.ajaxPrefilter((options, _, jqXHR) => {
        forca.toggleLoader();
        jqXHR.done(() => {
            forca.toggleLoader();
        });
    });
});