using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio
{
    public class Usuario
    {
        public Usuario() {}

        public int Id { get; set; }
        public string Nome { get; set; }
        public int PontuacaoNormal { get; set; }
        public int PontuacaoBH{ get; set; }
    }
}
