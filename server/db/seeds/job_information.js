/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('job_information').del()
  await knex('job_information').insert([
    {
      id: 1,
      title: 'test',
      description: 'test',
      company: 'test',
      requirements: 'test',
      applied: false,
      date: 'test',
      contacted: 'no',
      notes: 'looking for',
    },
  ])
}
