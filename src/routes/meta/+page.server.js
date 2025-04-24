// src/routes/meta/+page.server.js
import { GITHUB_TOKEN } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // fetch autenticado no servidor
  const res = await fetch('https://api.github.com/users/Vilasz/events', {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });

  if (!res.ok) {
    console.error('GitHub API error', res.status, await res.text());
    return { commits: [] };
  }

  const events = await res.json();

  const commits = events
    .filter(e => e.type === 'PushEvent')
    .flatMap(e =>
      e.payload.commits.map(c => ({
        id:       c.sha,
        message:  c.message,
        datetime: e.created_at
      }))
    );

  return { commits };
}
