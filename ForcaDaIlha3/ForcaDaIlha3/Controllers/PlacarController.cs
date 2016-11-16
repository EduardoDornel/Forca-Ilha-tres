using ForcaDaIlha3.Dominio.Servicos;
using ForcaDaIlha3.Web.Servicos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ForcaDaIlha3.Web.Controllers
{
    public class PlacarController : ApiController
    {
        // GET: LeaderBoard
        public IHttpActionResult GetListarPlacar(int pagina, string filtro)
        {
            PontuacaoServico pontuacaoServico = ServicoDeDependencia.MontarPontuacaoServico();
            return Ok(pontuacaoServico.LeaderBoard(pagina, filtro));
        }
        public IHttpActionResult GetQuantidadePontuacoes(string filtro)
        {
            PontuacaoServico pontuacaoServico = ServicoDeDependencia.MontarPontuacaoServico();
            return Ok(pontuacaoServico.QuantidadePontuacoes(filtro));
        }
    }
}