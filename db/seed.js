require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();

  await client.query("TRUNCATE messages, users RESTART IDENTITY CASCADE");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const usersResult = await client.query(
    `
    INSERT INTO users (username, password, is_member, is_admin)
    VALUES
      ('alice', $1, true, false),
      ('bob', $1, false, false),
      ('admin', $1, true, true)
    RETURNING id
    `,
    [hashedPassword]
  );

  const [alice, bob, admin] = usersResult.rows;

  await client.query(
    `
    INSERT INTO messages (title, content, user_id)
    VALUES
      ('Welcome', 'Welcome to the members only board', $1),
      ('Private Post', 'Only members can see the author', $2),
      ('Admin Notice', 'Admin can delete messages', $3)
    `,
    [alice.id, bob.id, admin.id]
  );

  console.log("Seed data inserted ✅");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  client.end();
});
