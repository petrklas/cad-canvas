import Stage from "@/models/Stage";
import { IEventsHandler } from "./EventsHandler";

export default interface IMenuItem {
    name: string,
    label: string,
    
    getHandler: (stage: Stage) => IEventsHandler
}