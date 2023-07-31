import CartManager from "../dao/dbManagers/CartManager.js";

const cartManager = new CartManager();

class TicketRepository {
  constructor(cartManager) {}
  createTicket = async (ticket) => {
    const ticketCreated = await cartManager.createTicket(ticket);
    return ticketCreated;
  };
}

export const ticketRepository = new TicketRepository();
