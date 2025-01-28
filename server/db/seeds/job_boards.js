/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('job_boards').del()
  await knex('job_boards').insert([
    {
      id: 1,
      company: 'MYOB (Sharsies)',
      link: 'https://careers.myob.com/grad',
      board: 'MYOB Graduates Board',
      user_id: 'auth|example',
    },
  ])
}
