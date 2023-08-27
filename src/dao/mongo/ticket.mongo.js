import {ticketModel} from "./models/ticket.model.js";
import Exception from "../../exceptions.js";

class Ticket {
    async createTicket(ticket) {
        try {
            const ticketCreated = ticketModel.create(ticket);
            return ticketCreated;
        } catch (error) {
            throw new Exception(502, {
                status: "error",
                message: "Error al crear el ticket",
            });
        }
    }

    async getTickets() {
        try {
            const tickets = await ticketModel.find();
            return tickets;
        } catch (error) {
            throw new Exception(404, {
                status: "error",
                message: "Error al obtener los tickets",
            });
        }
    }

    async getTicketByID(cid) {
        try {
            const ticketFromID = await ticketModel
                .findById(cid)
                .populate("products.product")
                .lean();
            return ticketFromID;
        } catch (error) {
            throw new Exception(404, {
                status: "error",
                message: `Error al obtener el ticket ${cid}`,
            });
        }
    }

    async deleteTicket(cid) {
        try {
            await ticketModel.deleteOne(
                { _id: cid },
            );
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: `Error al eliminar el ticket ${cid}`,
            });
        }
    }
}

export const ticketMongo = new Ticket();