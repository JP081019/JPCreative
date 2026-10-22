# JP Creative

Website institucional em Next.js 16, React 19 e TypeScript, implementado a partir do briefing mestre de outubro de 2026.

## Visualização local

```sh
npm install
npm run dev
```

Abra [localhost:3000](http://localhost:3000). Para verificar a versão de produção:

```sh
npm run build
npm start
```

## Verificações

```sh
npm run lint
npm run build
npm run test:e2e
```

O build inclui TypeScript. O teste de navegador exige um servidor iniciado, Playwright e Chrome/Edge ou o navegador do Playwright. No Codex, o script pode reutilizar o runtime de navegador disponível. Fora dele, disponibilize Playwright no ambiente de desenvolvimento. `TEST_BASE_URL`, `PLAYWRIGHT_MODULE` e `BROWSER_EXECUTABLE` permitem configurar o teste. Os resultados e capturas são salvos em `.qa/`, ignorado pelo Git.

## Conteúdo e estrutura

- `app/data/site.ts`: canais de contato, navegação, serviços e processo.
- `app/data/projects.ts`: quatro cases tipados; capturas e links reutilizados de `app/data/home.ts`.
- `app/data/legal.ts`: documentos operacionais preliminares.
- `app/components/`: navegação, rodapé, composições editoriais e formulário.
- `app/projetos/[slug]/`: páginas estáticas dos projetos.
- `app/api/contato/`: validação e proteção do formulário.
- `app/globals.css`: Mineral Intelligence, layouts responsivos e Precision Motion.
- `scripts/verify-site.mjs`: verificação de navegador e do endpoint.
- `scripts/prepare-brand.mjs`: favicon extraído do símbolo oficial fornecido.

## Antes de publicar

O formulário ainda **não entrega mensagens** e informa isso explicitamente. WhatsApp e e-mail continuam disponíveis. Não há banco, rastreamento ou serviço de entrega configurado. Os documentos jurídicos estão marcados como preliminares e `noindex`.

Veja o [registro de implementação e pendências de lançamento](docs/LANCAMENTO.md), incluindo os 17 requisitos, limitações das proteções, autorizações de portfólio e definições jurídicas necessárias. A publicação em produção exige autorização.
