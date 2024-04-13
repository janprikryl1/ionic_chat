namespace backendapi.Models
{
    public class Message
    {
        public long id { get; set; }
        public long roomId { get; set; }
        public string author { get; set; }
        public string text { get; set; }

        public Message() { }
        public Message(string author, string text, long roomId)
        {
            this.author = author;
            this.text = text;
            this.roomId = roomId;
        }
    }
}
