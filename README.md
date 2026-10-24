# Plushie Merge

Fontes editáveis do jogo Godot e exportação Web preparada para o Worker `pelucia`: [jogar Plushie Merge](https://pelucia.scarpato.workers.dev/).

## Estrutura

- `godot/`: projeto e fontes editáveis do jogo.
- `web/`: arquivos originais da exportação web do Godot.
- `worker.js`: Worker público existente, configurado para importar o manifesto gerado em build.
- `scripts/prepare-web.mjs`: copia os arquivos para `.build/site` e divide arquivos maiores que 4 MiB em partes.

## Atualização do jogo

Edite as fontes em `godot/`. Para que as mudanças apareçam no site, exporte novamente o jogo para Web com Godot, substitua os arquivos correspondentes em `web/` (sem README da exportação) e execute `npm run build`. O build é reproduzível e gera `.build/parts-manifest.json` e `.build/site`; não edite esses arquivos gerados à mão.

## Conectar ao Cloudflare Workers Builds

No painel Cloudflare, abra **Workers & Pages → pelucia → Settings → Builds → Connect** e escolha este repositório. Conecte o Worker existente, em vez de criar outro, para preservar o endereço atual. A conexão não é feita apenas pela presença destes arquivos no GitHub.

Use estas configurações:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Branch de produção: `main`

Depois de conectar, commits em `main` podem publicar automaticamente no Worker. Autorize o app Cloudflare no GitHub apenas para este repositório, se essa autorização for solicitada.

Para desenvolvimento local: `npm ci`, `npm run build` e `npx wrangler dev`. O comando `npm run deploy` executa `wrangler deploy` e só deve ser usado quando você decidir publicar.
