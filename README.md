# EQUI Lavanderia — Apresentação Corporativa

Apresentação interativa (single-page deck) da EQUI Lavanderia — excelência, tecnologia e cuidado profissional para o enxoval de clientes corporativos e hoteleiros.

> **Tagline:** Excelência, Tecnologia e Cuidado Profissional para o seu Enxoval.

## Stack

HTML5 + CSS3 + JavaScript vanilla, single-file (`index.html`). Sem build, sem dependências externas. Ícones via SVG sprite inline (estilo Lucide). Imagens otimizadas em WebP.

## Estrutura dos slides (11)

| # | Seção | Conteúdo |
|---|-------|----------|
| 00 | Início | Capa + tagline |
| 01 | Quem somos | Propósito, higienização corporativa e hoteleira |
| 02 | Nossa missão | Revitalização de fibras, eliminação de patógenos, sustentabilidade |
| 03 | Infraestrutura | Marcas parceiras: Electrolux Professional, Aggile Technology, Speed Union |
| 04 | Electrolux myPRO | Inteligência e eficiência energética na lavagem |
| 05 | Biossegurança | Sistema Stack Speed Union — desinfecção UV de nível hospitalar |
| 06 | Secagem | Secagem de alta performance EC/33DS |
| 07 | Acabamento | Calandra térmica AG1600 — acabamento premium |
| 08 | Soluções e serviços | Hotelaria/pousadas e processamento individualizado de peças |
| 09 | Clientes e parceiros | ID_Lab, ECOS, Integra, Lar de Idosos |
| 10 | Contato | CTA + e-mail de contato |

## Rodar localmente

Qualquer servidor estático serve.

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
├── index.html                    # Deck completo (single-file)
├── README.md
├── conteudo_apresentacao.docx    # Briefing de conteúdo original
├── assets/
│   ├── equi-logo.webp            # Logo
│   ├── equi-01-hero.webp         # Loja / recepção
│   ├── equi-02-planta.webp       # Vista geral do parque industrial
│   ├── equi-03-recepcao.webp     # Calandra / acabamento
│   ├── equi-04-mypro.webp        # Lavadora Electrolux myPRO
│   └── equi-05-speedunion.webp   # Secadora Speed Union EC/33DS
├── screenshot-slides.js          # Script Playwright para capturas de tela
└── verify-slides.js              # Script Playwright para checagem de overflow/layout
```
