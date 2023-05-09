const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const user = [];

  for (let i = 0; i < 5; i++) {
    user.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(firstname),
      password: "12345",
    });
  }

  await User.bulkCreate(user);
  console.log("[Database] Se corrió el seeder de Users.");
};
