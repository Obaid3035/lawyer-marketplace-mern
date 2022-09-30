import {IController} from "../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../middleware/auth";
import {ROLE} from "../model/user";
import Conversation from "../model/conversation";
import Message from "../model/message";

class ChatController implements IController {
    router = Router()
    path = '/chat'

    constructor() {
        this.router
            .post(`${this.path}/conversations/:id`, auth(ROLE.CARE_GIVER), this.createConversations)
            .get(`${this.path}/conversations`, auth('ALL'), this.getConversations)
            .post(`${this.path}/messages/:id`, auth('ALL'), this.createMessage)
            .put(`${this.path}/messages/:id`, auth('ALL'), this.updateMessage)
            .get(`${this.path}/messages/:id`, auth('ALL'), this.getMessage)
            .get(`${this.path}/notification`, auth('ALL'), this.getNotification)
    }

    private createConversations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const conversation = await Conversation.findOne({
                members: {
                    $all: [req.params.id, req.user._id]
                }
            }).populate('members')
            if (conversation) {
                res.status(200).json({
                    conversation,
                    alreadyCreated: true
                })
            } else {
                await Conversation.create({
                    members: [req.user._id, req.params.id]
                })
                res.status(200).json({
                    alreadyCreated: false,
                    message: "Conversation created successfully"
                })
            }
        } catch (e) {
            next(e);
        }
    }

    private getNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const conversations = await Conversation.find({
                members: {
                    $in: [req.user._id]
                }
            }).sort({updatedAt: -1}).populate('members');

            const conversationId = conversations.map((conversation) => {
                return conversation._id
            })

            const message = await Message.find({
                conversation: {
                    $in: conversationId
                },
                sender: {
                    $ne: req.user._id
                },
                seen: false
            }).count()
            const notification = {
                conversation: conversations,
                allUnseenMessages: message
            }

            res.status(200).json(notification)

        } catch (e) {
            next(e);
        }
    }

    private getConversations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const conversation = await Conversation.find({
                members: {
                    $in: [req.user._id]
                }
            }).populate('members')
            res.status(200).json(conversation)
        } catch (e) {
            next(e);
        }
    }

    private updateMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const message = await Message.findById(req.params.id);
            message.seen = !message.seen;
            await message.save();
            res.status(200).json({
                updated: true
            })
        } catch (e) {
            next(e);
        }
    }

    private createMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const message: any = await Message.create({
                conversation: req.params.id,
                text: req.body.text,
                sender: req.user._id
            })
            const conversation = await Conversation.findById(req.params.id, ).populate('members');
            conversation.last_message = req.body.text;
            await conversation.save();
            const newMessage = {
                ...message._doc,
                conversation
            }
            res.status(200).json(newMessage)
        } catch (e) {
            next(e);
        }
    }

    private getMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const message = await Message.find({
                conversation: req.params.id,
            }).populate('sender')
            await Message.updateMany({
                conversation: req.params.id,
            }, {
                seen: true
            })
            res.status(200).json(message)
        } catch (e) {
            next(e);
        }
    }

}

export default ChatController;
