using ForcaDaIlha3.Dominio.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ForcaDaIlha3.Dominio;
using System.Data.Entity;

namespace ForcaDaIlha3.Repositorio.Repositorios
{
    public class PalavraRepositorio : IPalavraRepositorio
    {
        public int MaiorId()
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Palavra.Max(_ => _.Id);
            }
        }

        public Palavra PalavraPorId(int id)
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Palavra.FirstOrDefault(_ => _.Id == id);
            }
        }

        public IList<Palavra> PalavrasBH(int pulo = 1)
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Palavra.Where(_ => _.TamanhoDaPalavra >= 12)
                                                    .Skip(5*(pulo-1))
                                                    .Take(5)
                                                    .ToList();
            }
        }

        public IList<Palavra> PalavrasNormal(int pulo)
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Palavra.Skip(5*(pulo - 1)).Take(5).ToList();
            }
        }
    }
}
