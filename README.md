# BigSoccer by iSCOUT — Pitch para Colégios Privados

Apresentação interativa (single-page deck) da oportunidade de parceria entre **BigSoccer + iSCOUT** e instituições de ensino privadas.

> **Tagline:** Seu colégio, na vanguarda do esporte. Democratizando jornadas de sucesso no futebol de base.
>
> **Go-to-market:** Agosto 2026

## Stack

HTML5 + CSS3 + JavaScript vanilla, single-file (`index.html`). Sem build, sem dependências externas. Ícones via SVG sprite inline (Lucide). Imagens otimizadas em WebP (~900 KB total).

## Estrutura dos slides (11)

| # | Seção | Conteúdo |
|---|-------|----------|
| 00 | Início | Capa + go-to-market |
| 01 | O problema | 0,5% dos atletas de base; falta de oportunidade |
| 02 | A solução | iSCOUT — plataforma com câmeras + IA proprietária |
| 03 | Por que seu colégio | Público 10–16 anos, mercado educacional competitivo |
| 04 | Credibilidade | Arena BigSoccer: 24+ anos, 10K alunos, 430+ engajados |
| 05 | Tecnologia | Captura → Visão 3D → IA → App + Dashboard |
| 06 | Para seu colégio | Colégio / Pais / Alunos / Professores + integração pedagógica |
| 07 | Piloto | Metas 6 meses · MVP em Atibaia + 50 km |
| 08 | Escola de vida | Desenvolvimento humano · Ambientes seguros · Famílias |
| 09 | O convite | 5 ofertas concretas (piloto, presença, app, dashboard, marketing) |
| 10 | Fechamento | CTA + contato |

## Rodar localmente

Qualquer servidor estático serve. O projeto já tem `.claude/launch.json` configurado para `npx serve`:

```bash
npx serve -l 5500 .
# abre http://localhost:5500
```

## Navegação

- `→` / `Espaço` / `Enter` — próximo slide
- `←` — slide anterior
- `Home` / `End` — primeiro/último
- `F` — fullscreen
- Touch swipe horizontal · scroll wheel · dots no rodapé

## Acessibilidade

- WCAG 2.1 AA: contraste, focus rings, aria-labels, keyboard nav, `prefers-reduced-motion`
- Touch targets ≥ 44 px nos dots de navegação
- Tipografia ≥ 12 px em body text; kickers/badges em uppercase tracking
- Imagens decorativas com `alt=""`, conteúdo com alt descritivo

## Estrutura

```
escolas-privadas/
├── index.html                    # Deck completo (single-file)
├── README.md
├── assets/
│   ├── big-soccer-logo.webp      # Logo
│   ├── 09-favicon.webp           # Favicon
│   └── 01-07-hero-*.webp         # Backgrounds dos slides
└── .claude/launch.json           # Config do dev server
```

## Briefing

O conteúdo é fiel ao documento de briefing `iscout_pitch_colégios_copy_only.docx` (não versionado — local apenas).
