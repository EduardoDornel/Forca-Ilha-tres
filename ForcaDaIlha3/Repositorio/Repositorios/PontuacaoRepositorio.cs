using ForcaDaIlha3.Dominio;
using ForcaDaIlha3.Dominio.Repositorios;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Repositorio.Repositorios
{
    public class PontuacaoRepositorio : IPontuacaoRepositorio
    {
        public List<Pontuacao> LeaderBoard(int pulo = 1, string filtro = null)
        {
            using (var contexto = new ContextoDeDados())
            {
                if (filtro != null)
                {
                    return contexto.Pontuacao
                        .Include(p => p.Usuario)
                        .Where(p => p.Dificuldade.Equals(filtro))
                        .OrderBy(p => p.QuantidadePontos)
                        .Skip((pulo - 1) * 5)
                        .Take(5)
                        .ToList();
                }
                else
                {
                    return contexto.Pontuacao.OrderBy(p => p.QuantidadePontos).ToList();
                }
            }
        }

        public void Pontuar(Pontuacao novaPontuacao)
        {
            using (var contexto = new ContextoDeDados())
            {
                Pontuacao pontuacao = contexto.Pontuacao
                    .Where(p => p.Dificuldade.Equals(novaPontuacao.Dificuldade))
                    .FirstOrDefault(p => p.UsuarioId == novaPontuacao.UsuarioId);
                if (pontuacao == null)
                {
                    contexto.Pontuacao.Add(novaPontuacao);
                    contexto.SaveChanges();
                }
                else if (pontuacao.QuantidadePontos < novaPontuacao.QuantidadePontos)
                {
                    pontuacao.QuantidadePontos = novaPontuacao.QuantidadePontos;
                    contexto.Entry<Pontuacao>(pontuacao).State = EntityState.Modified;
                    contexto.SaveChanges();
                }
            }
        }
    }
}
