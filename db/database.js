let connection = null;

module.exports = {
  connect: async (dbUrl) => {
    if (!dbUrl) {
      throw new Error("Database URL not provided!");
    }
    const databaseName = dbUrl.split("/").pop();

    if (!connection) {
      console.log(`=> Establishing DB connection with ${databaseName}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`=> DB connection established!`);
      connection = "database connection";
    }
  },
  query: async (query) => {
    if (!connection) {
      await this.connect();
    }
    console.log(`Executing query: ${query}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = [
      { name: "name1", surname: "surname1" },
      { name: "name2", surname: "surname2" },
    ];
    return users;
  },
  close: async () => {
    if (!connection) {
      return;
    }
    console.log("=> Closing database connection...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    connection = null;
    console.log("=> Database connection closed!");
  },
};
