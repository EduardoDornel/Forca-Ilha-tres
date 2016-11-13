using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio
{
    public class Pontuacao
    {
        public Pontuacao(){ }

        public int Id { get; set; }
        public int QuantidadePontos { get; set; }
        public string Dificuldade { get; set; }
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
