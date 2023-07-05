import {getURL} from "vercel-grammy";
import {bot, secretToken, i18n} from "../src/bot.mjs";

const {VERCEL_ENV} = process.env;

// List of allowed environments
const allowedEnvs = [
    "production",
    // "preview"
];

// Exit in case of unsuitable environments
if (!allowedEnvs.includes(VERCEL_ENV)) process.exit();

// Webhook URL generation
const url = getURL({path: "api/update"});

// Webhook setup options
const options = {secret_token: secretToken};

// Installing a webhook
if (await bot.api.setWebhook(url, options)) {

    // Checking the webhook installation
    const {url} = await bot.api.getWebhookInfo();

    console.info("Webhook set to URL:", url);
    console.info("Secret token:", secretToken);

}

const {
    locales,
    defaultLocale
} = i18n.options;

await Promise.all(Object.keys(locales).flatMap(locale => {

    const language_code = locale === defaultLocale ? undefined : locale;

    return [
        bot.api.setMyName(i18n.translate(locale, "name").trim(), {language_code}),
        bot.api.setMyShortDescription(i18n.translate(locale, "short").trim(), {language_code}),
        bot.api.setMyDescription(i18n.translate(locale, "description").trim(), {language_code}),
    ];

}));
