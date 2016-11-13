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
    public class UsuarioRepositorio : IUsuarioRepositorio
    {
        public int IdPorNome(string nome)
        {
            using (var contexto = new ContextoDeDados())
            {
                Usuario usuario = contexto.Usuario.FirstOrDefault(u => u.Nome.Equals(nome));
                return usuario.Id;
            }
        }

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
                Usuario usuario = contexto.Usuario.FirstOrDefault(u => u.Nome.Equals(nomeUsuario));
                return usuario != null;
            }
        }
    }
}
