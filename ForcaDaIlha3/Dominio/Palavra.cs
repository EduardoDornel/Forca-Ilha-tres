using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio
{
    public class Palavra
    {
        public Palavra() {}

        public int Id { get; set; }        
        public string Texto { get; set; }
        public string Dica { get; set; }
        public int TamanhoDaPalavra { get; set; }
    }
}
