using ForcaDaIlha3.Dominio;
using ForcaDaIlha3.Dominio.Servicos;
using ForcaDaIlha3.Web.Servicos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ForcaDaIlha3.Web.Controllers
{
    public class JogoController : Controller
    {
        // GET: Jogo
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetPalavra(List<int> idsDoLocalStorage)
        {
            Palavra palavra = EncontrarPalavra(idsDoLocalStorage);            
            return View();
        }
        
        private Palavra EncontrarPalavra(List<int> idsDoLocalStorage)
        {
            PalavraServico palavraServico = ServicoDeDependencia.MontarPalavraServico();                                    
            
            Random random = new Random();
            idsDoLocalStorage.OrderBy(_ => random.Next());

            Palavra palavra = palavraServico.PalavraRepositorio.PalavraPorId(idsDoLocalStorage[0]);
            idsDoLocalStorage.RemoveAt(0);

            return palavra;
        }
    }
}