import createTicketDto from "../dao/dto/createTicket.dto.js";
import {ticketRepository} from "../repositories/index.js";

class TicketService {
  constructor() {}
  async createTicket(ticketData) {
    const ticketDto = new createTicketDto(ticketData);
    const ticketCreated = await ticketRepository.createTicket(ticketDto);
    return ticketCreated;
  }
}

export const ticketService = new TicketService();
