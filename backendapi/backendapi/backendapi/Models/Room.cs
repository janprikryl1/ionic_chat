namespace backendapi.Models
{
    public class Room
    {
        public long id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public DateTime createdDate { get; set; }
        public Room(){}
        public Room(string name, string description)
        {
            this.name = name;
            this.description = description;
            this.createdDate = DateTime.Now;
        }
    }
}
