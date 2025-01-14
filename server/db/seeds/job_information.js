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
      title: 'Job Title',
      description: 'Job Description',
      company: 'Company Name',
      requirements: 'Requirements for Role',
      applied: true,
      date: '01/01/2000',
      contacted: 'Have I contacted the company for follow up',
      notes: 'Relevant links',
    },
  ])
}
