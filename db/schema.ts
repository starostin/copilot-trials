import { pgTable, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core';

export const links = pgTable(
  'links',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    shortCode: varchar('short_code', { length: 20 }).notNull().unique(),
    originalUrl: text('original_url').notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('short_code_idx').on(table.shortCode),
    index('user_id_idx').on(table.userId),
  ]
);
