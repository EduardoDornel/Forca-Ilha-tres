using ForcaDaIlha3.Dominio.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio.Servicos
{
    public class UsuarioServico : IUsuarioRepositorio
    {
        public UsuarioServico(IUsuarioRepositorio usuarioRepositorio)
        {
            this.UsuarioRepositorio = usuarioRepositorio;
        }
        public IUsuarioRepositorio UsuarioRepositorio { get; set; }

        public int IdPorNome(string nome)
        {
            return this.UsuarioRepositorio.IdPorNome(nome);
        }

        public void Registrar(Usuario usuario)
        {
            this.UsuarioRepositorio.Registrar(usuario);
        }

        public IEnumerable<Usuario> Todos()
        {
            return this.UsuarioRepositorio.Todos();
        }

        public bool VerificarExistencia(string nomeUsuario)
        {
            return this.UsuarioRepositorio.VerificarExistencia(nomeUsuario);
        }
    }
}
