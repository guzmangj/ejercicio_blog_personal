const { Role } = require("../models");

module.exports = async () => {
  const role = [];
  const roles = ["reader", "writer", "editor", "admin"];
  for (let roleType of roles) {
    role.push({
      role: roleType,
    });
  }

  await Role.bulkCreate(role);
  console.log("[Database] Se corrió el seeder de Role.");
};
