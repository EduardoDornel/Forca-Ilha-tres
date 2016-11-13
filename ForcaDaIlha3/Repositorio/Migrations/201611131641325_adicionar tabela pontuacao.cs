namespace ForcaDaIlha3.Repositorio.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class adicionartabelapontuacao : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Pontuacao",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        QuantidadePontos = c.Int(nullable: false),
                        Dificuldade = c.String(),
                        UsuarioId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Usuario", t => t.UsuarioId, cascadeDelete: true)
                .Index(t => t.UsuarioId);
            
            DropColumn("dbo.Usuario", "PontuacaoNormal");
            DropColumn("dbo.Usuario", "PontuacaoBH");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Usuario", "PontuacaoBH", c => c.Int(nullable: false));
            AddColumn("dbo.Usuario", "PontuacaoNormal", c => c.Int(nullable: false));
            DropForeignKey("dbo.Pontuacao", "UsuarioId", "dbo.Usuario");
            DropIndex("dbo.Pontuacao", new[] { "UsuarioId" });
            DropTable("dbo.Pontuacao");
        }
    }
}
