# JP Creative — execução e lançamento

O briefing mestre de outubro de 2026 substitui a direção visual do checkpoint da sessão 1. A implementação usa Mineral Intelligence, Plus Jakarta Sans e DM Sans, com a headline “Construímos o próximo nível.”.

## Implementação

- Homepage com hero, manifesto, portfólio Feature / Editorial Duo / Split Story, soluções, seis etapas do processo, parceria e CTA.
- Rotas `/projetos`, quatro cases em `/projetos/[slug]`, `/solucoes`, `/sobre` e `/contato`.
- Cabeçalho e rodapé compartilhados; menu mobile com diálogo nativo, Escape, retorno de foco e fechamento ao mudar para desktop. Skip link, foco visível e movimento reduzido.
- Imagens reais e contatos reaproveitados do repositório. Sem datas de projetos, depoimentos, resultados ou identificação empresarial inventados.
- Metadata e canonical por página, Open Graph individual nos cases, imagem de compartilhamento, sitemap, robots e 404.
- Fontes locais servidas por `next/font`; imagens otimizadas por `next/image`; conteúdo em Server Components, com JavaScript de interface concentrado no cabeçalho e formulário.
- Precision Motion em CSS: sequência inicial, geometria leve, feedback de interação e revelação curta dos projetos. Sem bloqueio de scroll ou biblioteca de animação adicional.

## Estado real do contato

WhatsApp e e-mail são links funcionais para os canais já cadastrados. O formulário **não entrega mensagens** e informa essa limitação antes e depois de uma tentativa. Não há provedor de envio, banco de dados ou credencial configurada.

Cliente e servidor validam nome, contato, campos opcionais e mensagem. O endpoint restringe origem, tipo e tamanho de conteúdo, verifica campo antispam e tempo mínimo, e limita tentativas. Não registra o conteúdo em logs próprios. A resposta final é HTTP 503, nunca um sucesso simulado.

O limite de cinco tentativas por dez minutos é local a cada processo e usa identificadores derivados de IP com hash e salt temporário. Entradas expiradas são removidas na solicitação seguinte; um reinício elimina os contadores. Não substitui limitação distribuída na hospedagem. O proxy de produção deve sobrescrever cabeçalhos de IP e encaminhar a origem correta. Nenhuma entrega poderá ser ativada antes da seleção do fornecedor, configuração de credenciais no servidor, atualização da política e teste real de recebimento.

## Os 17 requisitos

| Item | Evidência e pendência |
| --- | --- |
| 1. Privacidade | `/privacidade` descreve o tratamento implementado e identifica lacunas. Revisão jurídica e dados do controlador pendentes. |
| 2. Termos | `/termos` distingue uso do site e contratação. Confirmar identificação e contratos. |
| 3. Cookies | `/cookies`; aplicação sem rastreadores, cookies ou armazenamento persistente no navegador. Sem banner artificial. Auditar infraestrutura antes de publicar. |
| 4. Reembolsos | `/reembolsos-e-cancelamentos` sinaliza condições ainda não fornecidas, sem inventar cláusulas. |
| 5. Formulários | Finalidade informada, link de privacidade, validação nos dois lados, sem aceite genérico de marketing. Entrega pendente. |
| 6. Minimização | Sem documentos pessoais, endereço ou campos sensíveis; conteúdo não persistido. Definir retenção das conversas dos canais externos. |
| 7. Rastreamento | Nenhuma ferramenta de analytics/pixel adicionada. Qualquer inclusão futura requer inventário e revisão. |
| 8. Acessibilidade | Semântica, labels, foco, diálogo nativo, movimento reduzido e verificação automatizada; não equivale a certificação WCAG. |
| 9. Alternativas | Imagens informativas descritas; elementos e duplicações decorativos com alternativas vazias. |
| 10. Contraste | Texto usa grafite/branco, tons legíveis de apoio; hover dos botões usa sage com grafite. Validar cenários finais. |
| 11. Teclado | Skip link, menu por teclado, Escape, retorno de foco, links e formulário acessíveis. |
| 12. Avaliações | Depoimentos do acervo anterior não são exibidos sem confirmação de autorização. |
| 13. Promessas | Sem números, garantias de resultado ou promessa universal de criação gratuita. |
| 14. Autoria | Somente materiais fornecidos no projeto. Confirmar licenças e autorizações de divulgação. |
| 15. Empresa | Nome e canais reaproveitados; nenhum CNPJ ou endereço inventado. Confirmar os dados oficiais. |
| 16. LGPD | Fluxo técnico descrito; bases legais, fornecedores, retenção externa e atendimento dos direitos dependem de formalização. |
| 17. Riscos | Páginas preliminares marcadas e em `noindex`. Revisão jurídica, contratual e operacional antes do lançamento. |

Referências consultadas: [direitos dos titulares, ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares) e [guia de cookies, ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais).

## Segurança e operação

Cabeçalhos CSP, HSTS em produção, `nosniff`, proteção contra frames, Permissions Policy e Referrer Policy configurados em `next.config.ts`. HTTPS e certificados dependem da hospedagem. A CSP permite scripts inline para o HTML estático e a hidratação do Next.js; `unsafe-eval` é permitido apenas no desenvolvimento. Adotar nonces exigiria rever a estratégia de renderização. Não há segredos no cliente.

Antes de publicar: escolher a hospedagem, revisar logs e retenção, validar HTTPS e cabeçalhos nesse ambiente, configurar monitoramento e processo de atualização e formalizar a resposta a incidentes. Nenhum deploy foi autorizado pelo briefing.

## Conteúdo a confirmar

- Identificação empresarial aplicável e responsável pelo tratamento de dados.
- Confirmação dos canais atuais de contato.
- Autorização para divulgação e descrição dos quatro trabalhos; datas reais ainda omitidas.
- Brava Spa usa o endereço de prévia já cadastrado no acervo. Confirmar sua situação antes de apresentá-lo como trabalho finalizado.
- Logo vetorial e versão branca limpa: os arquivos brancos fornecidos apresentam artefatos; a aplicação usa a versão transparente escura aprovada. O favicon extrai o símbolo oficial sem redesenhá-lo.
- Provedor de envio, base legal, acessos e retenção; ferramenta de analytics somente se houver uma finalidade definida.
- Contratos, cancelamento, reembolso e condições da parceria.
- Revisão de todos os textos dos cases e documentos legais.

## Verificação

Resultados executados em 22/10/2026, com Next.js 16.4.2:

- ESLint: aprovado, incluindo aplicação, configuração e scripts.
- Build de produção e TypeScript: aprovados; 20 entradas estáticas geradas, incluindo rotas auxiliares.
- Navegador Chrome: 13 páginas com HTTP 200, canonical e imagens válidos; cases com Open Graph individual.
- Responsividade: 46 combinações aprovadas, incluindo todos os dez tamanhos do briefing na homepage e 320/768/1440px nas outras páginas. Sem transbordamento horizontal detectado.
- Interações: menu, Escape, foco, redimensionamento, skip link, validação, preservação dos campos e indisponibilidade de entrega aprovados.
- Endpoint: rejeição de origem e formato indevidos, campos inválidos, spam e tamanho excessivo; limitação de tentativas e HTTP 503 para solicitação válida aprovados.
- Axe: zero violações detectadas nas regras automatizadas selecionadas nas 13 páginas em desktop. Há verificações inconclusivas que exigem revisão humana, sobretudo conteúdo em imagens. Isso não certifica conformidade integral WCAG.
- Console: nenhum erro de execução ou CSP detectado. Respostas 404/503 intencionais foram verificadas separadamente.
- SEO e segurança: sitemap, robots, imagem Open Graph, páginas 404 e cabeçalhos aprovados. Nenhum cookie ou item em localStorage/sessionStorage observado.
- Auditoria de dependências de produção: zero vulnerabilidades reportadas. A auditoria completa mantém cinco alertas altos na cadeia `braces → micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next`, restrita às ferramentas de desenvolvimento. A sugestão automática restante faria downgrade incompatível do Next ESLint; não foi aplicada. Reavaliar quando houver correção compatível.
- Medição local de produção, Chrome sem limitação de CPU/rede: LCP 556ms em 1440px e 244ms em 390px; CLS 0 em ambos; 141KB de scripts transferidos. Uma medição por tamanho, em contextos novos. INP não foi medido.

O script `scripts/verify-site.mjs` verifica rotas, canonical, imagens, Open Graph dos cases, 46 combinações de rota/tamanho, menu, foco, Escape, resize, formulário, proteção do endpoint, 404, SEO, cabeçalhos, movimento reduzido e ausência de cookies/armazenamento. Usa Playwright e o Chrome/Edge instalado ou navegador do Playwright. Pode usar o runtime fornecido pelo Codex; fora dele, é necessário disponibilizar Playwright. O axe-core disponível com as ferramentas de desenvolvimento cobre regras WCAG 2 A/AA, 2.1 AA e 2.2 AA automatizáveis.

Capturas e resultados ficam em `.qa/`, fora do controle de versão. Metas LCP, INP e CLS precisam de medição representativa no ambiente publicado e em dispositivos reais; uma verificação local não garante métricas de campo. A revisão manual com leitor de tela e dispositivos físicos continua necessária.

Não remover o `noindex` dos documentos preliminares até sua aprovação. Atualizar o sitemap se eles forem liberados para indexação.

## Reversão

A atualização de dependências permanece na série Next.js 16. O estado anterior de `package.json` e `package-lock.json` está preservado no Git. Uma reversão técnica pode restaurar esses dois arquivos e executar `npm ci`, mas reintroduz os alertas da versão antiga e não deve ser publicada sem nova análise.
