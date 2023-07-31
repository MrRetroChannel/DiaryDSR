using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DSRDiaryAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DiaryTask",
                columns: table => new
                {
                    Taskid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Taskname = table.Column<string>(type: "text", nullable: false),
                    Starttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Endtime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Taskcomment = table.Column<string>(type: "text", nullable: true),
                    TypeId = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<byte>(type: "smallint", nullable: false),
                    Repeat = table.Column<byte>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiaryTask", x => x.Taskid);
                });

            migrationBuilder.CreateTable(
                name: "TaskTypes",
                columns: table => new
                {
                    Typeid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Typename = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskTypes", x => x.Typeid);
                });
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
