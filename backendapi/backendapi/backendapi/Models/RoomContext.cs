using Microsoft.EntityFrameworkCore;

namespace backendapi.Models
{
    public class RoomContext : DbContext
    {
        public RoomContext(DbContextOptions<RoomContext> options) : base(options) { }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
