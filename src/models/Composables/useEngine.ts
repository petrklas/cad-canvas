
import Engine from "../Engine";
import { inject } from "vue";

export function useEngine(): Engine {

    const engine = inject<Engine>("engine");

    if(engine === undefined) {
      throw new Error("Engine instance is required");
    }

    return engine;
}