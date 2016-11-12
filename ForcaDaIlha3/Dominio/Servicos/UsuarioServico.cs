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

        public IList<Usuario> LeaderBoard(int pulo = 1, string filtro = null)
        {
            return this.UsuarioRepositorio.LeaderBoard();
        }

        public void PontuarBH(int pontos, int idUsuario)
        {
            this.UsuarioRepositorio.PontuarBH(pontos, idUsuario);
        }

        public void PontuarNormal(int pontos, int idUsuario)
        {
            this.UsuarioRepositorio.PontuarNormal(pontos, idUsuario);
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
