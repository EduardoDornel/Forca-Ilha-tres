using ForcaDaIlha3.Dominio.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ForcaDaIlha3.Dominio;

namespace ForcaDaIlha3.Repositorio.Repositorios
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {
        public void Registrar(Usuario usuario)
        {
            using (var contexto = new ContextoDeDados())
            {
                contexto.Usuario.Add(usuario);
                contexto.SaveChanges();
            }
        }

        public IEnumerable<Usuario> Todos()
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Usuario.ToList();
            }
        }

        public bool VerificarExistencia(string nomeUsuario)
        {
            using (var contexto = new ContextoDeDados())
            {
                Usuario usuario = contexto.Usuario.FirstOrDefault(u => u.Nome.Contains(nomeUsuario));
                return usuario != null;
            }
        }

        public List<Usuario> LeaderBoard(string filtro)
        {
            using (var contexto = new ContextoDeDados())
            {
                if (filtro == "BH")
                    return contexto.Usuario.OrderBy(p => p.PontuacaoBH).ToList();
                else
                    return contexto.Usuario.OrderBy(p => p.PontuacaoNormal).ToList();
            }
        }
    }
}
