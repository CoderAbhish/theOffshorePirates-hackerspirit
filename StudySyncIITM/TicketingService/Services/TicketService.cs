using MongoDB.Driver;
using TicketingService.Data;
using TicketingService.Models;

namespace TicketingService.Services
{
    public interface ITicketService
    {
        Task<List<Ticket>> GetAllTicketsAsync();
        Task<Ticket> GetTicketByIdAsync(string id);
        Task<List<Ticket>> GetTicketsByUserAsync(string userId);
        Task CreateTicketAsync(Ticket ticket);
        Task UpdateTicketAsync(string id, Ticket ticket);
        Task DeleteTicketAsync(string id);
    }

    public class TicketService : ITicketService
    {
        private readonly MongoDbContext _context;

        public TicketService(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<List<Ticket>> GetAllTicketsAsync()
        {
            return await _context.Tickets.Find(_ => true).ToListAsync();
        }

        public async Task<Ticket> GetTicketByIdAsync(string id)
        {
            return await _context.Tickets.Find(t => t.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Ticket>> GetTicketsByUserAsync(string userId)
        {
            return await _context.Tickets.Find(t => t.CreatedBy == userId || t.AssignedTo == userId).ToListAsync();
        }

        public async Task CreateTicketAsync(Ticket ticket)
        {
            ticket.CreatedAt = DateTime.UtcNow;
            ticket.UpdatedAt = DateTime.UtcNow;
            await _context.Tickets.InsertOneAsync(ticket);
        }

        public async Task UpdateTicketAsync(string id, Ticket ticket)
        {
            ticket.UpdatedAt = DateTime.UtcNow;
            await _context.Tickets.ReplaceOneAsync(t => t.Id == id, ticket);
        }

        public async Task DeleteTicketAsync(string id)
        {
            await _context.Tickets.DeleteOneAsync(t => t.Id == id);
        }
    }
}
