/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('job_information', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.string('description')
    table.string('company')
    table.string('requirements')
    table.boolean('applied')
    table.string('date')
    table.string('contacted')
    table.string('notes')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('job_information')
}
