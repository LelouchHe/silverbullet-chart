# Silverbullet Chart

This library is a wrapper of [Chart.js](https://www.chartjs.org/) (version 4.5.1 of auto, with all builtin plugins registered) and some of external plugins:

* [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/latest/): version 3.1.0

It provides one widget `chart`, which can be used to render chart, of course.

## Install

1. Navigate to [[Library/Std/Pages/Library Manager]]
2. Install this library from URI: `ghr:LelouchHe/silverbullet-chart/PLUG.md`

## Usage

`chart` requires one param `config`, a lua table similar to its JS version. See more from [Chart.js](https://www.chartjs.org/)

## Example

Below is an example with [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/latest/)

${chart {
    type = "bar",
    data = {
      labels = {"A", "B", "C"},
      datasets = {{
        label = "label",
        data = {10, 20, 30}
      }}
    },
    options = {
      plugins = {
        annotation = {
          annotations = {
            line1 = {
              type = "line",
              yMin = 5,
              yMax = 20,
              borderColor = "green",
              borderWidth = 2,
            }
          }
        }
      }
    }
}}

## Note on `.mjs` Extension

The bundle uses `.mjs` instead of `.js` because mobile Safari enforces strict MIME type checking for ES modules loaded via `import()`. With a `.js` extension, the SilverBullet Service Worker may serve the file with incorrect headers, causing `import()` to silently return an empty module namespace on mobile Safari. Desktop browsers are more lenient and work with either extension. Using `.mjs` ensures correct ES module handling on all platforms.

## Implementation

```space-lua
local chartjs = js.import("/.fs/Library/LelouchHe/silverbullet-chart.mjs")

function chart(config)
  local canvas = dom.canvas {}
  js.new(chartjs.Chart, canvas, config)
  return widget.html(dom.div {
    style = "position:relative;display:block;width:100%;",
    canvas,
  })
end
```

## Why render synchronously

Earlier versions created the canvas, waited for it to show up in the document with a
`setTimeout` + `getElementById` poll, and only then constructed the chart. That works while a
widget is mounted exactly once, but SilverBullet 3.0 re-renders widgets and virtualizes long
pages, so the poll frequently missed (or found a stale node) and the chart disappeared —
it rendered, then vanished after scrolling away and back.

Chart.js does not need the canvas to be in the document for the first draw: it paints into the
canvas bitmap, and its hover/tooltip listeners live on the canvas element itself, so they work
once the element is inserted. Rendering synchronously into a detached canvas therefore survives
any number of re-mounts, since every mount builds and paints a fresh chart.

The wrapper `div` is required rather than cosmetic: SilverBullet renders widgets inline, an
inline container reports `clientWidth` 0, and Chart.js then sizes the chart to 0×0. A block
wrapper with `width: 100%` gives it a measurable width.

Known limitation, unchanged from earlier versions: the chart does not follow window resizing
(2.x did not either). Size comes from Chart.js's default `aspectRatio` of 2:1; set
`options.aspectRatio` per chart to change it.
