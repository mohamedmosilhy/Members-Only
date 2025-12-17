require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log("Connected to database...");

    // Read and execute schema file
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    console.log("Creating tables...");
    await client.query(schema);

    console.log("✅ Database schema created successfully!");
    console.log("\nCreated tables:");
    console.log("  - users (with foreign key constraints)");
    console.log("  - messages (with CASCADE delete on user deletion)");
    console.log("  - session (for persistent sessions)");
    console.log("\nRun 'node db/seed.js' to populate with sample data.");
  } catch (error) {
    console.error("❌ Error setting up database:", error);
  } finally {
    await client.end();
  }
}

setupDatabase();
