require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();

  await client.query("TRUNCATE messages, users RESTART IDENTITY CASCADE");

  const hashedPassword = await bcrypt.hash("123", 10);

  const usersResult = await client.query(
    `
    INSERT INTO users (username, password, is_member, is_admin)
    VALUES
      ('sarah_knight', $1, true, false),
      ('john_wanderer', $1, false, false),
      ('emma_guardian', $1, true, true),
      ('mike_seeker', $1, false, false),
      ('lisa_member', $1, true, false)
    RETURNING id
    `,
    [hashedPassword]
  );

  const [sarah, john, emma, mike, lisa] = usersResult.rows;

  await client.query(
    `
    INSERT INTO messages (title, content, user_id, created_at)
    VALUES
      ('Welcome to the Club!', 'So excited to be part of this exclusive community. Looking forward to great discussions!', $1, NOW() - INTERVAL '5 days'),
      ('Hidden Gem Found', 'Just discovered an amazing local coffee shop downtown. The atmosphere is perfect for reading. Any other members been there?', $2, NOW() - INTERVAL '4 days'),
      ('Community Guidelines', 'Remember to be respectful and keep all discussions civil. This is a safe space for everyone.', $3, NOW() - INTERVAL '3 days'),
      ('Book Recommendation', 'Just finished reading "The Midnight Library" and it was phenomenal! Anyone else read it? Would love to discuss.', $4, NOW() - INTERVAL '2 days'),
      ('Weekend Meetup?', 'Would anyone be interested in organizing a casual meetup this weekend? Maybe at the park or a cafe?', $1, NOW() - INTERVAL '1 day'),
      ('Interesting Article', 'Came across a fascinating article about mindfulness practices. Happy to share the link if anyone is interested.', $5, NOW() - INTERVAL '12 hours'),
      ('Thank You All', 'Just wanted to express my gratitude to this community. You have all been so welcoming and supportive!', $2, NOW() - INTERVAL '6 hours'),
      ('Question About Membership', 'How does one become a full member? I have been here for a while and absolutely love the community!', $4, NOW() - INTERVAL '3 hours'),
      ('New Event Announcement', 'Planning a special event for next month. More details coming soon. Stay tuned!', $3, NOW() - INTERVAL '1 hour')
    `,
    [sarah.id, john.id, emma.id, mike.id, lisa.id]
  );

  console.log("Seed data inserted ✅");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  client.end();
});
