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
        public IHttpActionResult GetCadastrarUsuario(string nome)
        {
            UsuarioServico usuarioServico = ServicoDeDependencia.MontarUsuarioServico();
            var existe = usuarioServico.VerificarExistencia(nome);
            if (!existe)
            {
                Usuario novoUsuario = new Usuario();
                novoUsuario.Nome = nome;
                usuarioServico.Registrar(novoUsuario);
            }
            var idUsuario = usuarioServico.IdPorNome(nome);
            return Ok(new{ dados = idUsuario });
        }
        public IHttpActionResult GetCadastrarPontuacao(int pontos, int idUsuario, string dificuldade)
        {
            Pontuacao pontuacao = new Pontuacao();
            pontuacao.QuantidadePontos = pontos;
            pontuacao.UsuarioId = idUsuario;
            pontuacao.Dificuldade = dificuldade;
            PontuacaoServico pontuacaoServico = ServicoDeDependencia.MontarPontuacaoServico();
            pontuacaoServico.Pontuar(pontuacao);
            return Ok("funcionou");
        }
        [ResponseType(typeof(Palavra))]
        public IHttpActionResult PostPalavra(List<int> idsDoLocalStorage)
        {
            Palavra palavraDaRodada = EncontrarPalavra(idsDoLocalStorage);            
            return CreatedAtRoute("DefaultApi", new { id = palavraDaRodada.Id }, new { palavra = palavraDaRodada, ids = this.idsAtualizados });
        }
        private List<int> idsAtualizados;
        private Palavra EncontrarPalavra(List<int> idsDoLocalStorage)
        {
            PalavraServico palavraServico = ServicoDeDependencia.MontarPalavraServico();                                    
            
            Random random = new Random();
            idsDoLocalStorage = Embaralhar(idsDoLocalStorage);

            Palavra palavra = palavraServico.PalavraRepositorio.PalavraPorId(idsDoLocalStorage[0]);
            idsDoLocalStorage.RemoveAt(0);
            this.idsAtualizados = idsDoLocalStorage;

            return palavra;
        }

        private List<int> Embaralhar(List<int> idsDoLocalStorage)
        {
            Random rng = new Random();
            int numero = idsDoLocalStorage.Count;
            while(numero > 1)
            {
                numero--;
                int random = rng.Next(numero + 1);
                int valor = idsDoLocalStorage[random];
                idsDoLocalStorage[random] = idsDoLocalStorage[numero];
                idsDoLocalStorage[numero] = valor;
            }
            return idsDoLocalStorage;
        }

    }
}