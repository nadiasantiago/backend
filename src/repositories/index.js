import { persistance } from "../dao/factory.js";
import CartRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import SessionRepository from "./sessions.repository.js";
import MessageRepository from "./messages.repository.js"
import TicketsRepository from "./tickets.repository.js";

const { cartDAO, productDAO, sessionDAO, messageDAO, ticketDAO } = persistance;

export const cartRepository = new CartRepository(cartDAO);
export const productsRepository = new ProductsRepository(productDAO);
export const sessionRepository = new SessionRepository(sessionDAO);
export const messageRepository = new MessageRepository(messageDAO)
export const ticketRepository = new TicketsRepository(ticketDAO);