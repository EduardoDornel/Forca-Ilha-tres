using ForcaDaIlha3.Dominio.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio.Servicos
{
    public class PalavraServico : IPalavraRepositorio
    {
        public PalavraServico(IPalavraRepositorio palavraRepositorio)
        {
            this.PalavraRepositorio = palavraRepositorio];
        }

        public IPalavraRepositorio PalavraRepositorio { get; set; }

        public Palavra PalavraPorId(int id)
        {
            return this.PalavraRepositorio.PalavraPorId(id);
        }

        public IList<Palavra> PalavrasBH(int pulo)
        {
            return this.PalavraRepositorio.PalavrasBH(pulo);
        }

        public IList<Palavra> PalavrasNormal(int pulo)
        {
            return this.PalavrasNormal(pulo);
        }
    }
}
