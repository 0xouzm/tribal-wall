interface Env {
  DB: D1Database
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const now = Date.now()

    const result = await env.DB
      .prepare('UPDATE profiles SET is_archived = 1 WHERE expires_at < ? AND is_archived = 0')
      .bind(now)
      .run()

    console.log(`Archived ${result.meta.changes} expired profiles`)
  },

  // Optional: HTTP endpoint to manually trigger archiving
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url)

    if (url.pathname === '/run') {
      const now = Date.now()
      const result = await env.DB
        .prepare('UPDATE profiles SET is_archived = 1 WHERE expires_at < ? AND is_archived = 0')
        .bind(now)
        .run()

      return new Response(JSON.stringify({
        success: true,
        archived: result.meta.changes,
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response('Tribal Wall Archive Cron Worker', { status: 200 })
  }
}
