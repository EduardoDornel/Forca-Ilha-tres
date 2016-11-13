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

        public IList<Usuario> LeaderBoard(int pulo = 1, string filtro = null)
        {
            using (var contexto = new ContextoDeDados())
            {
                if (filtro == "BH")
                {
                    return contexto.Usuario.OrderBy(p => p.PontuacaoBH).Skip((pulo-1)*5).Take(5).ToList();
                }
                else if(filtro == "Normal")
                {
                    return contexto.Usuario.OrderBy(p => p.PontuacaoNormal).Skip((pulo-1)*5).Take(5).ToList();
                }
                else
                {
                    List<Usuario> usuarios = new List<Usuario>();
                    usuarios.AddRange(contexto.Usuario.ToList());

                    List<object> listaComPontuacoesSeparadas = new List<object>();
                    foreach (var usuario in usuarios)
                    {
                        listaComPontuacoesSeparadas.Add(new { Nome = usuario.Nome, Pontuacao = usuario.PontuacaoNormal });
                        listaComPontuacoesSeparadas.Add(new { Nome = usuario.Nome, Pontuacao = usuario.PontuacaoBH });
                    }
                 //   return listaComPontuacoesSeparadas.OrderBy(p => p.Nome);
                }
            }
        }

        public void PontuarNormal(int pontos, int idUsuario)
        {
            using (var contexto = new ContextoDeDados())
            {
                Usuario usuario = contexto.Usuario.FirstOrDefault(u => u.Id == idUsuario);
                if (usuario.PontuacaoNormal < pontos)
                {
                    usuario.PontuacaoNormal = pontos;
                    contexto.Entry<Usuario>(usuario).State = EntityState.Modified;
                    contexto.SaveChanges();
                }
            }
        }

        public void PontuarBH(int pontos, int idUsuario)
        {
            using (var contexto = new ContextoDeDados())
            {
                Usuario usuario = contexto.Usuario.FirstOrDefault(u => u.Id == idUsuario);
                if (usuario.PontuacaoBH < pontos)
                {
                    usuario.PontuacaoBH = pontos;
                    contexto.Entry<Usuario>(usuario).State = EntityState.Modified;
                    contexto.SaveChanges();
                }
            }
        }
    }
}
