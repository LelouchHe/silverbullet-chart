---
name: Library/LelouchHe/Silverbullet-Chart
tags: meta/library
files:
  - Silverbullet-Chart/chart.js
---
# Silverbullet Chart

## Implementation

```space-lua

local chartjs = js.import("/.fs/Library/LelouchHe/Silverbullet-Chart/chart.js")

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