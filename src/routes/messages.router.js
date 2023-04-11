import { Router } from "express";
import MessagesManager from "../dao/dbManagers/MessagesManager.js";

const router = Router();

const messagesManager = new MessagesManager();
router.get('/', async(req,res)=>{
    const messages = await messagesManager.getMessages();
    return res.send({status:'success', payload:messages});
});

router.post('/', async (req, res)=>{
    let message = req.body;
    let createdMessage = await messagesManager.createMessages(message);
    res.status(201).send({status:'OK', payload: createdMessage});
})

export default router
