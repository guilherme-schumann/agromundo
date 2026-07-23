# Assets do site

## Identidade visual (aplicada)
- `logo-horizontal.svg` — logo do **header** (e do **rodapé** em branco, via filtro CSS).
- `logo.svg` — logo vertical (símbolo + wordmark) — reserva.
- `symbol.svg` — símbolo circular (favicon SVG).
- `favicon.ico` — favicon oficial da aba do navegador.

## Fotos do carrossel (`photos/`)
O carrossel do hero usa as imagens **otimizadas** `photos/foto-1.jpg` … `foto-10.jpg`
(redimensionadas para no máx. 1500px e convertidas para JPEG — ~330 KB cada).

- Os **PNGs originais** (`photos/image *.png`) ficam só no seu computador; estão no
  `.gitignore` para não pesarem no repositório/deploy.
- Para trocar a ordem ou as fotos, basta substituir os arquivos `foto-N.jpg` (mesmo
  nome) ou me avisar que eu regenero a partir de novas imagens.

## Imagem de compartilhamento (opcional)
Para uma prévia bonita ao enviar o link no WhatsApp/redes, adicione uma imagem
`og-image.jpg` (1200×630px) e a linha abaixo no `<head>` do `index.html`:
`<meta property="og:image" content="assets/og-image.jpg" />`

> Dica: as fotos já foram otimizadas. Ao adicionar novas, use TinyPNG/Squoosh.
