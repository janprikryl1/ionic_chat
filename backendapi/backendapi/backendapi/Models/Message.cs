namespace backendapi.Models
{
    public class Message
    {
        public long Id { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }

        public Message() { }
        public Message(string author, string text)
        {
            this.Author = author;
            this.Text = text;
        }
    }
}
