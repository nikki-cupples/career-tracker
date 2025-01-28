/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.table('job_boards', (table) => {
    table.string('user_id')
  })
}

export async function down(knex) {
  return knex.schema.table('job_boards', (table) => {
    table.dropColumn('user_id')
  })
}
