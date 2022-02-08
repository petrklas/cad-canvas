import Stage from "@/models/Stage";
import { IEventHandler } from "./EventHandler";

export default interface IMenuItem {
    name: string,
    label: string,
    
    getHandler: (stage: Stage) => IEventHandler
}