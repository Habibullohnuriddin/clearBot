const bot = require("../core/bot");

bot.command("start", async (ctx) => {
  await ctx.reply(`Hello ${ctx.from.first_name}!`);
});



bot.launch();
