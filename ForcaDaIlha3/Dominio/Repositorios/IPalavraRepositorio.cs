using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio.Repositorios
{
    public interface IPalavraRepositorio
    {
        IList<int> PalavrasNormal();
        IList<int> PalavrasBH();
        Palavra PalavraPorId(int id);
        int MaiorId();
    }
}
