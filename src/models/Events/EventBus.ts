import { IEventBus, Registry, Subscriber } from "@/types/EventBus";
import { IKeyboardShortcut } from "@/types/KeyboardShortcuts";

// used for stop propagation current event. 
// E.g. if inside mousemove event handler we trigger another mouse move we do not to run the previous one till end
export interface IEventStopPropagationCallback {
  (): void;
}

interface IEventSubscriberCallback {
  (event?: Event, stopPropagationCallback?: IEventStopPropagationCallback): void
}

export default class EventBus implements IEventBus {
    private subscribers: Subscriber;
    private static nextId = 0;
    private static instance?: EventBus = undefined;
  
    private constructor() {
      this.subscribers = {};
    }
  
    public dispatch<T>(event: string | IKeyboardShortcut, arg?: T): void {
      const eventName = event.toString();
      const subscriber = this.subscribers[eventName];
  
      if (subscriber === undefined) {
        return;
      }
  
      let stopPropagationValue = false;
      const stopPropagationCallback: IEventStopPropagationCallback = (): void => {
        stopPropagationValue = true;
      }

      for (const key of Object.keys(subscriber)){
        subscriber[key](arg, stopPropagationCallback);
        if(stopPropagationValue) {
          break;
        }
      }
    }
  
    public register(event: string | IKeyboardShortcut, callback: IEventSubscriberCallback): Registry {
      const id = this.getNextId();
      const eventName = event.toString();
      if (!this.subscribers[eventName]) this.subscribers[eventName] = {};
  
      this.subscribers[eventName][id] = callback;
  
      return {
        unregister: () => {
          delete this.subscribers[eventName][id];
          if (Object.keys(this.subscribers[eventName]).length === 0)
            delete this.subscribers[eventName];
        },
      };
    }
  
    private getNextId(): number {
      return EventBus.nextId++;
    }

    public static getInstance(): EventBus {
      if (this.instance === undefined) {
        this.instance = new EventBus();
      }
  
      return this.instance;
    }
  }