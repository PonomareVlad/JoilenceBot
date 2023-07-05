import {Bot} from "grammy";

export const {

    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop()

} = process.env;

const instruction = [
    "This bot will automatically clear service messages about chat members joining or leaving",
    "",
    "No setup required, just add this bot to your group chat as admin and it will work immediately"
].join("\r\n");

// Default grammY bot instance
export const bot = new Bot(token);

const safe = bot.errorBoundary(console.error);
const privateChat = safe.chatType(["private"]);
const groupChat = safe.chatType(["group", "supergroup"]);

privateChat.on("message:text", ctx => ctx.reply(instruction));

groupChat.on([":new_chat_members", ":left_chat_member"], ctx => ctx.deleteMessage());
