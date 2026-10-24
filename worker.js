import files from './.build/parts-manifest.json';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const file = files[url.pathname];
    if (!file) return env.ASSETS.fetch(request);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    const headers = new Headers({
      'Content-Type': file.type,
      'Content-Length': String(file.size),
      'Cache-Control': 'public, max-age=3600, no-transform',
      'ETag': '"sha256-' + file.sha256 + '"',
      'X-Content-Type-Options': 'nosniff',
    });
    if (request.headers.get('If-None-Match') === headers.get('ETag')) {
      return new Response(null, { status: 304, headers });
    }
    if (request.method === 'HEAD') return new Response(null, { headers });
    let part = 0;
    let reader = null;
    const body = new ReadableStream({
      async pull(controller) {
        try {
          while (true) {
            if (!reader) {
              if (part === file.parts.length) {
                controller.close();
                return;
              }
              const assetUrl = new URL(file.parts[part++], url.origin);
              const response = await env.ASSETS.fetch(new Request(assetUrl, { method: 'GET' }));
              if (!response.ok || !response.body) throw new Error('Game asset unavailable');
              reader = response.body.getReader();
            }
            const { done, value } = await reader.read();
            if (done) {
              reader.releaseLock();
              reader = null;
              continue;
            }
            controller.enqueue(value);
            return;
          }
        } catch (error) {
          controller.error(error);
        }
      },
      async cancel(reason) {
        if (reader) await reader.cancel(reason);
      },
    });
    return new Response(body, { headers });
  },
};
