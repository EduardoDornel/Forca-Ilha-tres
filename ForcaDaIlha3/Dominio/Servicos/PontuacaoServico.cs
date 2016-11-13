using ForcaDaIlha3.Dominio.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio.Servicos
{
    public class PontuacaoServico : IPontuacaoRepositorio
    {
        public IPontuacaoRepositorio PontuacaoRepositorio { get; set; }
        public PontuacaoServico(IPontuacaoRepositorio pontuacaoRepositorio)
        {
            this.PontuacaoRepositorio = pontuacaoRepositorio;
        }

        public List<Pontuacao> LeaderBoard(int pulo = 1, string filtro = null)
        {
            return this.PontuacaoRepositorio.LeaderBoard(pulo, filtro);
        }

        public void Pontuar(Pontuacao novaPontuacao)
        {
            this.PontuacaoRepositorio.Pontuar(novaPontuacao);
        }
    }
}
