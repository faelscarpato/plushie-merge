# Plushie Merge

Fontes editáveis do jogo Godot e exportação Web preparada para o Worker `pelucia`: [jogar Plushie Merge](https://pelucia.scarpato.workers.dev/).

## Estrutura

- `godot/`: projeto e fontes editáveis do jogo.
- `web/`: arquivos originais da exportação web do Godot.
- `worker.js`: Worker público existente, configurado para importar o manifesto gerado em build.
- `scripts/prepare-web.mjs`: copia os arquivos para `.build/site` e divide arquivos maiores que 4 MiB em partes.

## Atualização do jogo

Edite as fontes em `godot/`. Para que as mudanças apareçam no site, exporte novamente o jogo para Web com Godot, substitua os arquivos correspondentes em `web/` (sem README da exportação) e execute `npm run build`. O build é reproduzível e gera `.build/parts-manifest.json` e `.build/site`; não edite esses arquivos gerados à mão.

## Deploy automático com Cloudflare Workers Builds

Este repositório está conectado ao Worker existente `pelucia`. Commits enviados à branch `main` acionam o build e o deploy pela Cloudflare, preservando o endereço do jogo. Builds de preview para outras branches estão desativados.

Configurações em **Workers & Pages → pelucia → Settings → Builds**:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Branch de produção: `main`

Se precisar reconectar no futuro, use **Connect** nessa seção e escolha `faelscarpato/plushie-merge`. Conecte o Worker existente, em vez de criar outro, para preservar o endereço atual.

Para desenvolvimento local: `npm ci`, `npm run build` e `npx wrangler dev`. O comando `npm run deploy` executa `wrangler deploy` e só deve ser usado quando você decidir publicar.
