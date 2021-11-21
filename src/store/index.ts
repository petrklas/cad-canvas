// store.ts
import Point from '@/types/Point'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface UI {
  mousePosition: Point,
  scale: number,
  angle: number | undefined,
  length: number | undefined,
}

export const key: InjectionKey<Store<UI>> = Symbol()

export const store = createStore<UI>({
  state: {
    mousePosition: new Point(0, 0),
    scale: 1,
    angle: undefined,
    length: undefined,
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}