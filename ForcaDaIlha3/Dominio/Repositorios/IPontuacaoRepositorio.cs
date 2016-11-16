using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio.Repositorios
{
    public interface IPontuacaoRepositorio
    {
        List<Pontuacao> LeaderBoard(int pulo = 1, string filtro = null);
        int QuantidadePontuacoes(string filtro);
        void Pontuar(Pontuacao novaPontuacao); 
    }
}
