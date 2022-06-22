import { IEventBus, Registry, Subscriber } from "@/types/EventBus";
import { IKeyboardShortcut } from "@/types/KeyboardShortcuts";

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
  
      Object.keys(subscriber).forEach((key) => subscriber[key](arg));
    }
  
    public register(event: string | IKeyboardShortcut, callback: (...args: any[]) => void): Registry {
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