# Silverbullet Chart

This library is a wrapper of [Chart.js](https://www.chartjs.org/) (version 4.5.1) and some of its plugins:

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

## Implementation

```space-lua

local chartjs = js.import("/.fs/Library/LelouchHe/silverbullet-chart.js")

function chart(config)
  local canvas = dom.canvas {
    id = "chart-" .. os.time() .. "-" .. math.random()
  }
  local rendered = false

  local function timeout()
    local target = js.window.document.getElementById(canvas.id)
    if not target then
      js.window.setTimeout(timeout, 100)
      return
    end

    if rendered then
      return
    end

    rendered = true
    js.new(chartjs.Chart, target, config)
  end

  js.window.setTimeout(timeout, 100)
  return widget.html(canvas)
end


```