const { bot } = require("../core/bot");

// Botni ishga tushirish
bot.start(async (ctx) => {
  ctx.reply(`Salom, ${ctx.message.from.first_name}!`);
});

// Guruhga yangi a'zo qo'shilganda o'chirish
bot.on("new_chat_members", async (ctx) => {
  const newMembers = ctx.message.new_chat_members;

  for (const member of newMembers) {
    try {
      await ctx.deleteMessage(member.message_id);
    } catch (error) {
      console.error("❌ Xabarni o'chirishda xato:", error);
    }
  }
});

// Guruhdan a'zo chiqib ketganda o'chirish
bot.on("left_chat_member", async (ctx) => {
  const leftMember = ctx.message.left_chat_member;

  try {
    await ctx.deleteMessage(leftMember.message_id);
  } catch (error) {
    console.error("❌ Xabarni o'chirishda xato:", error);
  }
});

// Errorlarni ushlab turish
bot.on("polling_error", (error) => {
  console.error(error);
});

bot.launch();
