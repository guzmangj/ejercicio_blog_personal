const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comment = [];

  for (let i = 1; i <= 4; i++) {
    comment.push({
      name: faker.name.findName(),
      content: faker.lorem.paragraphs(),
      articleId: i,
    });
  }

  await Comment.bulkCreate(comment);
  console.log("[Database] Se corrió el seeder de Comments.");
};
