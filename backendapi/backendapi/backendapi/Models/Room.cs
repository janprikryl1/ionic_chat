namespace backendapi.Models
{
    public class Room
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<Message> Messages { get; set; } // Reference na kolekci zpráv
        public Room()
        {
            Messages = new List<Message>(); // Inicializace kolekce zpráv v konstruktoru
        }
        public Room(string name, string description)
        {
            Name = name;
            Description = description;
            CreatedDate = DateTime.Now;
            Messages = new List<Message>();
        }
    }
}
