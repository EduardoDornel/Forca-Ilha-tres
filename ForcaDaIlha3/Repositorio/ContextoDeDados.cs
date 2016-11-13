using ForcaDaIlha3.Dominio;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForcaDaIlha3.Repositorio
{
    class ContextoDeDados : DbContext
    {
        public ContextoDeDados() :base("Forca") {}

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Palavra> Palavra { get; set; }
        public DbSet<Pontuacao> Pontuacao { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
