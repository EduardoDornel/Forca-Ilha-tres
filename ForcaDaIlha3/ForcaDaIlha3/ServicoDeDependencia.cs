using ForcaDaIlha3.Dominio.Servicos;
using ForcaDaIlha3.Repositorio.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ForcaDaIlha3.Web.Servicos
{
    public class ServicoDeDependencia
    {
        public static PalavraServico MontarPalavraServico()
        {
            return new PalavraServico(new PalavraRepositorio());
        }
    }
}