import { IKeyboardShortcut } from "./KeyboardShortcuts";

export interface Registry {
    unregister: () => void;
  }
  
  export interface Callable {
    [key: string]: Function;
  }
  
  export interface Subscriber {
    [key: string]: Callable;
  }
  
  export interface IEventBus {
    dispatch<T>(event: string, arg?: T): void;
    register(event: string, callback: Function): Registry;
  }

  export interface IKeyboardEventBus {
    dispatch<T>(event: IKeyboardShortcut, arg?: T): void;
    register(event: IKeyboardShortcut, callback: Function): Registry;
  }