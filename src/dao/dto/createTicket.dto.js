export default class createTicketDto{
    constructor(ticket){
        this.products = ticket.products;
        this.code = Date.now() + Math.floor(Math.random() + 1000 + 1);
        this.purchase_datetime = Date.now();
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
    }
}