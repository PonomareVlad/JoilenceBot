import {Bot} from "grammy";
import {I18n} from "litagrammy";
import locales from "./locales.mjs";

export const {
    TELEGRAM_BOT_TOKEN: token,
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop()
} = process.env;

export const bot = new Bot(token);

export const i18n = new I18n({locales});

bot.use(i18n);

const safe = bot.errorBoundary(console.error);
const privateChat = safe.chatType(["private"]);
const groupChat = safe.chatType(["group", "supergroup"]);

privateChat.on("message:text", ctx => ctx.reply(ctx.t("instruction")));

groupChat.on([":new_chat_members", ":left_chat_member"], ctx => ctx.deleteMessage());
