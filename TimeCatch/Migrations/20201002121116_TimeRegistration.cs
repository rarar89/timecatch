using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeCatch.Migrations
{
    public partial class TimeRegistration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "TimeRegistration");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "TimeRegistration",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimeRegistration_ClientId",
                table: "TimeRegistration",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeRegistration_Client_ClientId",
                table: "TimeRegistration",
                column: "ClientId",
                principalTable: "Client",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeRegistration_Client_ClientId",
                table: "TimeRegistration");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropIndex(
                name: "IX_TimeRegistration_ClientId",
                table: "TimeRegistration");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "TimeRegistration");

            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "TimeRegistration",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
