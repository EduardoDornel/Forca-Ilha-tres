namespace ForcaDaIlha3.Repositorio.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdicionarDivisaoDePontuacao : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Usuario", "PontuacaoNormal", c => c.Int(nullable: false));
            AddColumn("dbo.Usuario", "PontuacaoBH", c => c.Int(nullable: false));
            DropColumn("dbo.Usuario", "Pontuacao");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Usuario", "Pontuacao", c => c.Int(nullable: false));
            DropColumn("dbo.Usuario", "PontuacaoBH");
            DropColumn("dbo.Usuario", "PontuacaoNormal");
        }
    }
}
