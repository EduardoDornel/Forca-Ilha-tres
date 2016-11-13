using ForcaDaIlha3.Dominio;
using ForcaDaIlha3.Dominio.Servicos;
using ForcaDaIlha3.Web.Servicos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;

namespace ForcaDaIlha3.Web.Controllers
{
    public class JogoController : ApiController
    {
        //  api/jogo/?dificuldade=
        public IHttpActionResult GetIds(string dificuldade)
        {
            PalavraServico palavraServico = ServicoDeDependencia.MontarPalavraServico();
            List<int> ids = new List<int>();
            if (dificuldade.Equals("bh"))
            {
                ids = palavraServico.PalavrasBH().ToList();
            }
            else if (dificuldade.Equals("normal"))
            {
                ids = palavraServico.PalavrasNormal().ToList();
            }
            return Ok(new
            {
                dados = ids
            });
        }
        [ResponseType(typeof(Palavra))]
        public IHttpActionResult PostPalavra(List<int> idsDoLocalStorage)
        {
            Palavra palavra = EncontrarPalavra(idsDoLocalStorage);            
            return CreatedAtRoute("DefaultApi", new { id = palavra.Id},palavra);
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