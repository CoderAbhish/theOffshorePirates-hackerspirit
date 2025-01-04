using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TicketingService.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }  // Student, Mentor, TeachingAssistant, Instructor, Admin
        public List<string> CourseIds { get; set; } = new List<string>();
    }
}
