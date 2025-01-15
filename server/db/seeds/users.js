export async function seed(knex) {
  await knex('users').insert([
    {
      auth0_id: 'auth0|6747c8bd793f0b9a3e761250',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  ])
}