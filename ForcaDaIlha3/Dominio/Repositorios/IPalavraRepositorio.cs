using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio.Repositorios
{
    public interface IPalavraRepositorio
    {
        IList<Palavra> PalavrasNormal(int pulo);
        IList<Palavra> PalavrasBH(int pulo);
        Palavra PalavraPorId(int id);
        int MaiorId();                
    }
}
