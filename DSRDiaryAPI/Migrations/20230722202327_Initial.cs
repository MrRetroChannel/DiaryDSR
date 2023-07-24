using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DiaryDSR.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskTypes",
                columns: table => new
                {
                    Typeid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Typename = table.Column<string>(type: "text", nullable: false),
                    Color_Red = table.Column<int>(type: "integer", nullable: false),
                    Color_Green = table.Column<int>(type: "integer", nullable: false),
                    Color_Blue = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskTypes", x => x.Typeid);
                });

            migrationBuilder.CreateTable(
                name: "DiaryTask",
                columns: table => new
                {
                    Taskid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Starttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Endtime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Taskcomment = table.Column<string>(type: "text", nullable: true),
                    Typeid = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<byte>(type: "smallint", nullable: false),
                    Repeat = table.Column<byte>(type: "smallint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiaryTask", x => x.Taskid);
                    table.ForeignKey(
                        name: "FK_DiaryTask_TaskTypes_Typeid",
                        column: x => x.Typeid,
                        principalTable: "TaskTypes",
                        principalColumn: "Typeid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DiaryTask_Typeid",
                table: "DiaryTask",
                column: "Typeid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiaryTask");

            migrationBuilder.DropTable(
                name: "TaskTypes");
        }
    }
}
