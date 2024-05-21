const groupSchema = require("../model/groupSchema");

const handleNewChatMembers = async (ctx) => {
  const chat = ctx.chat;
  const botId = ctx.botInfo.id;

  const isAdmin = chat.type === "supergroup" || chat.type === "group";

  try {
    // Guruhni ma'lumotlar bazasiga saqlash yoki yangilash
    let group = await groupSchema.findOne({ groupId: chat.id });

    if (group) {
      group.isAdmin = isAdmin;
      await group.save();
    } else {
      group = new groupSchema({
        groupId: chat.id,
        groupName: chat.title,
        isAdmin: isAdmin,
      });
      await group.save();
    }

    console.log(`✅ Bot yangi guruhga qo'shildi: ${chat.title}`);
  } catch (error) {
    console.error("❌ Guruhni saqlashda xato:", error);
  }
};

const handleLeftChatMember = async (ctx) => {
  const chat = ctx.chat;
  const botId = ctx.botInfo.id;
  const leftChatMember = ctx.message.left_chat_member;

  if (leftChatMember.id === botId) {
    try {
      // Guruhni ma'lumotlar bazasidan o'chirish
      await groupSchema.deleteOne({ groupId: chat.id });
      console.log(`✅ Bot guruhdan chiqdi: ${chat.title}`);
    } catch (error) {
      console.error("❌ Guruhni o'chirishda xato:", error);
    }
  }
};

module.exports = { handleNewChatMembers, handleLeftChatMember };
