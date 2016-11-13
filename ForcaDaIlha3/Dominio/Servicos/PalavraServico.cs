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
            this.PalavraRepositorio = palavraRepositorio;
        }

        public IPalavraRepositorio PalavraRepositorio { get; set; }

        public int MaiorId()
        {
            return this.PalavraRepositorio.MaiorId(); ;
        }

        public Palavra PalavraPorId(int id)
        {
            return this.PalavraRepositorio.PalavraPorId(id);
        }

        public IList<int> PalavrasBH()
        {
            return this.PalavraRepositorio.PalavrasBH();
        }

        public IList<int> PalavrasNormal()
        {
            return this.PalavraRepositorio.PalavrasNormal();
        }
    }
}
