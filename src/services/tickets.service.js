import { ticketRepository } from "../repositories/tickets.repository.js";
import { cartService } from "./carts.service.js";

class TicketService{
    constructor(){}
    async createTicket(cid){
        const purchase = await cartService.purchase(cid);
        const ticketCreated = await ticketRepository.createTicket(purchase)
        return ticketCreated
    }
}

export const ticketService = new TicketService();