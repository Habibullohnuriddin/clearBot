const { bot } = require("../core/bot");
const userSchema = require("../model/userSchema");
const handleNewChatMembers = require("./groupInfos");

// Parol
const requiredPassword = "0";

// Avtorizatsiya qilingan foydalanuvchilarni saqlash uchun xotira
const authenticatedUsers = new Set();

// Botni ishga tushirish va Bot boshlanishida parol so'rash
bot.start((ctx) => {
  if (!authenticatedUsers.has(userSchema.findOne({ id: ctx.from.id }))) {
    ctx.reply(
      `Salom, ${ctx.message.from.first_name}! \n\nBotdan foydalanish uchun parolni kiriting:`
    );
  }
});

// Bot yangi guruhga qo'shilganda handleNewChatMembers funksiyasini chaqirish
bot.on("new_chat_members", handleNewChatMembers);

// Bot guruhdan chiqib ketganda handleLeftChatMember funksiyasini chaqirish
bot.on("left_chat_member", handleNewChatMembers.handleLeftChatMember);

// Har qanday matnli xabarni parolni tekshirish uchun tinglash
bot.on("text", async (ctx) => {
  const text = ctx.message.text;
  const username = ctx.message.from.username;
  const userId = ctx.from.id;
  const firstName = ctx.message.from.first_name;

  const customUsername = username
    ? `Username: [${username}](tg://user?id=${userId})`
    : `Username: [${firstName}](tg://user?id=${userId})`;

  if (!authenticatedUsers.has(ctx.from.id)) {
    if (text === requiredPassword) {
      authenticatedUsers.add(ctx.from.id);

      // Foydalanuvchi ma'lumotlarini saqlash
      try {
        const user = new userSchema({
          username: customUsername,
          name: ctx.message.from.first_name,
        });
        await user.save();
      } catch (error) {
        console.error(`❌ Foydalanuvchini saqlashda xato:`, error);
      }
      ctx.reply("✅ Parol to‘g‘ri! Endi botdan foydalanishingiz mumkin.");
    } else {
      ctx.reply("❌ Noto‘g‘ri parol. Iltimos, to‘g‘ri parolni kiriting.");
    }
  }
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
