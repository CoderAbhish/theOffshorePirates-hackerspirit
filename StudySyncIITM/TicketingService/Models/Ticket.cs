using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace TicketingService.Models
{
    public enum TicketType
    {
        CourseRelated,
        GeneralIncident
    }

    public enum TicketStatus
    {
        New,
        InProgress,
        Resolved,
        Closed
    }

    public enum SupportLevel
    {
        L1,
        L2,
        L3,
        L4
    }

    public class Ticket
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public TicketType Type { get; set; }
        public TicketStatus Status { get; set; }
        public SupportLevel CurrentLevel { get; set; }
        public string CreatedBy { get; set; }
        public string AssignedTo { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string CourseId { get; set; }  // Only for course-related tickets
        public List<TicketComment> Comments { get; set; } = new List<TicketComment>();
    }

    public class TicketComment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Content { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
