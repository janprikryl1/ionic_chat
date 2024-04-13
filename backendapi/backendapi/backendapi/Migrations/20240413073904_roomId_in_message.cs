using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendapi.Migrations
{
    /// <inheritdoc />
    public partial class roomId_in_message : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Rooms_RoomId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_RoomId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Rooms",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Rooms",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Rooms",
                newName: "createdDate");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Rooms",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Messages",
                newName: "text");

            migrationBuilder.RenameColumn(
                name: "RoomId",
                table: "Messages",
                newName: "roomId");

            migrationBuilder.RenameColumn(
                name: "Author",
                table: "Messages",
                newName: "author");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Messages",
                newName: "id");

            migrationBuilder.AlterColumn<long>(
                name: "roomId",
                table: "Messages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "INTEGER",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "Rooms",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Rooms",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "createdDate",
                table: "Rooms",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Rooms",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "text",
                table: "Messages",
                newName: "Text");

            migrationBuilder.RenameColumn(
                name: "roomId",
                table: "Messages",
                newName: "RoomId");

            migrationBuilder.RenameColumn(
                name: "author",
                table: "Messages",
                newName: "Author");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Messages",
                newName: "Id");

            migrationBuilder.AlterColumn<long>(
                name: "RoomId",
                table: "Messages",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_RoomId",
                table: "Messages",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Rooms_RoomId",
                table: "Messages",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }
    }
}
