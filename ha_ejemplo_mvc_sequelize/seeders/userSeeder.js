const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const user = [];

  for (let i = 1; i <= 5; i++) {
    user.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("123456", 5)
    });
  }

  await User.bulkCreate(user);
  console.log("[Database] Se corrió el seeder de Users.");
};
