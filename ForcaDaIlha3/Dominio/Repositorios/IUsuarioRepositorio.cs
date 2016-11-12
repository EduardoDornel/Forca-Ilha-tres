using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Dominio.Repositorios
{
    public interface IUsuarioRepositorio
    {
        IEnumerable<Usuario> Todos();

        bool VerificarExistencia(string nomeUsuario);
        void Registrar(Usuario usuario);
        void PontuarNormal(int pontos, int idUsuario);
        void PontuarBH(int pontos, int idUsuario);
        IList<Usuario> LeaderBoard(int pulo = 1, string filtro = null);
    }
}
