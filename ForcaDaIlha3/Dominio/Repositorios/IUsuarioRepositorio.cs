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
    }
}
