import Stage from "@/models/Stage";
import { IEventsHandler } from "./EventsHandler";

export default interface IMenuItem {
    name: string,
    getHandler: (stage: Stage) => IEventsHandler
}