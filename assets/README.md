# Assets do site

## Arquivos oficiais já aplicados
- `logo-horizontal.svg` — logo usada no **header** (e no **rodapé** em branco, via filtro CSS).
- `logo.svg` — logo vertical (símbolo + wordmark) — reserva.
- `symbol.svg` — apenas o símbolo circular (usado como favicon SVG).
- `favicon.ico` — favicon oficial da aba do navegador.

## ⚠️ Falta adicionar: foto do Hero
O bloco de imagem do hero espera o arquivo **`hero.jpg`** nesta pasta.

1. Salve a foto da loja/viveiro (a que foi enviada no chat) como:
   `assets/hero.jpg`
2. Pronto — a foto aparece automaticamente no lugar do aviso.

**Recomendações da foto:** horizontal ou vertical, boa iluminação, ~1200px ou mais
no maior lado. O bloco usa recorte `object-fit: cover`, então a foto se ajusta
sozinha. Se preferir outro nome/formato (ex.: `.png` / `.webp`), me avise que
ajusto o `src` no `index.html`.

## Outras imagens (opcionais)
| Uso                     | Nome sugerido   | Recomendação                          |
|-------------------------|-----------------|---------------------------------------|
| Compartilhamento (OG)   | `og-image.jpg`  | 1200×630px — aparece ao enviar o link |
| Foto seção "Sobre"      | `sobre.jpg`     | Equipe ou ambiente da loja            |

Para ativar a imagem de compartilhamento, adicione no `<head>` do `index.html`:
`<meta property="og:image" content="assets/og-image.jpg" />`

> Dica: otimize as imagens (TinyPNG / Squoosh) antes de subir, para carregar rápido.
