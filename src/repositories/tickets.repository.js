export default class TicketRepository {
  constructor(dao) {
    this.dao = dao
  }
  createTicket = async (ticket) => {
    const ticketCreated = await this.dao.createTicket(ticket);
    return ticketCreated;
  };
}