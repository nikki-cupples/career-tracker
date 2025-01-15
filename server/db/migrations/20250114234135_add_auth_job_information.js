/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.table('job_information', (table) => {
    table
      .string('user_id')
      .references('auth0_id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

export async function down(knex) {
  return knex.schema.table('job_information', (table) => {
    table.dropColumn('auth0_id')
  })
}
