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
    public class Placar : ApiController
    {
        // GET: LeaderBoard
        public IHttpActionResult ListarPlacar(string filtro = null)
        {
            PontuacaoServico pontuacaoServico = ServicoDeDependencia.MontarPontuacaoServico();
            return Ok(pontuacaoServico.LeaderBoard(1, filtro));
        }
    }
}