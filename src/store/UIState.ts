// store.ts
import Point from '@/types/Point'
import { defineStore } from 'pinia'

export interface UI {
  mousePosition: Point,
  scale: number,
  layerPanelDisplayed: boolean
}



export const useUIStateStore = defineStore('UIState', {
  state: (): UI => {
    return {
      mousePosition: new Point(0, 0),
      scale: 1,
      layerPanelDisplayed: false,
    }
  },
})