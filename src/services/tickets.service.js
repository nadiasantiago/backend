import createTicketDto from "../dao/dto/createTicket.dto.js";
import { ticketRepository } from "../repositories/tickets.repository.js";
import { cartService } from "./carts.service.js";

class TicketService{
    constructor(){}
    async createTicket(cid, user){
        const purchase = await cartService.purchase(cid);
        const ticket = {
            products: purchase.products,
            amount: purchase.amount,
            purchaser: user.email
        }
        
        const ticketDto = new createTicketDto(ticket)
        const ticketCreated = await ticketRepository.createTicket(ticketDto)
        return ticketCreated
    }
}

export const ticketService = new TicketService();