<script setup lang="ts">
import G6, { type IG6GraphEvent, type IGroup, type Item, type ModelConfig } from '@antv/g6'
import { onMounted } from 'vue'

G6.registerNode('card-node', {
  draw: function drawShape(cfg: ModelConfig, group) {
    const r = 2
    const color = '#5B8FF9'
    const size = cfg.size as number[]
    const w = size[0]
    const h = size[1]
    const shape = group.addShape('rect', {
      attrs: {
        x: -w / 2,
        y: -h / 2,
        width: w, //200,
        height: h, // 60
        stroke: color,
        radius: r,
        fill: '#fff'
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'main-box',
      draggable: true
    })

    group.addShape('rect', {
      attrs: {
        x: -w / 2,
        y: -h / 2,
        width: w, //200,
        height: h / 2, // 60
        fill: color,
        radius: [r, r, 0, 0]
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'title-box',
      draggable: true
    })

    // title text
    group.addShape('text', {
      attrs: {
        textBaseline: 'top',
        x: -w / 2 + 8,
        y: -h / 2 + 2,
        lineHeight: 20,
        text: cfg.id,
        fill: '#fff'
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'title'
    })
    cfg.children &&
      group.addShape('marker', {
        attrs: {
          x: w / 2,
          y: 0,
          r: 6,
          cursor: 'pointer',
          symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
          stroke: '#666',
          lineWidth: 1,
          fill: '#fff'
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'collapse-icon'
      })
    group.addShape('text', {
      attrs: {
        textBaseline: 'top',
        x: -w / 2 + 8,
        y: -h / 2 + 24,
        lineHeight: 20,
        text: 'description',
        fill: 'rgba(0,0,0, 1)'
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: `description`
    })
    return shape
  },
  setState(name, value, item) {
    if (name === 'collapsed') {
      const marker = (item as Item)
        .get('group')
        .find((ele: IGroup) => ele && ele.get('name') === 'collapse-icon')
      const icon = value ? G6.Marker.expand : G6.Marker.collapse
      marker.attr('symbol', icon)
    }
  }
})

const data = {
  id: 'A',
  children: [
    {
      id: 'A1',
      children: [{ id: 'A11' }, { id: 'A12' }, { id: 'A13' }, { id: 'A14' }]
    },
    {
      id: 'A2',
      children: [
        {
          id: 'A21',
          children: [{ id: 'A211' }, { id: 'A212' }]
        },
        {
          id: 'A22'
        }
      ]
    }
  ]
}

onMounted(() => {
  const container = document.getElementById('container')
  const width = 1000
  const height = 500
  const toolbar = new G6.ToolBar({
    position: { x: 260, y: 150 }
  })
  const graph = new G6.TreeGraph({
    container: 'container',
    width,
    height,
    plugins: [toolbar],
    modes: {
      default: ['drag-canvas']
    },
    defaultNode: {
      type: 'card-node',
      size: [100, 40]
    },
    defaultEdge: {
      type: 'cubic-horizontal',
      style: {
        endArrow: true
      }
    },
    layout: {
      type: 'mindmap',
      direction: 'V',
      getHeight: () => {
        return 35
      },
      getWidth: () => {
        return 16
      },
      getVGap: () => {
        return 10
      },
      getHGap: () => {
        return 100
      },
      getSide: () => {
        return 'right'
      }
      // dropCap: false,
      // indent: 200,
      // getHeight: () => {
      //   return 60;
      // },
    }
  })

  graph.data(data)
  graph.render()
  graph.fitView()
  graph.on('node:click', (e: IG6GraphEvent) => {
    if (e.target.get('name') === 'collapse-icon') {
      const item = e.item as Item
      item.getModel().collapsed = !item.getModel().collapsed
      graph.setItemState(item, 'collapsed', item.getModel().collapsed as boolean)
      graph.layout()
    }
  })

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return
      if (!container || !container.scrollWidth || !container.scrollHeight) return
      graph.changeSize(container.scrollWidth, container.scrollHeight)
    }
})
</script>

<template>
  <el-card>
    <div id="container"></div>
  </el-card>
</template>

<style scoped></style>