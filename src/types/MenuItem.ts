import Engine from "@/models/Engine";
import Renderer from "@/models/Renderer";
import IEventsHandler from "./EventsHandler";

export default interface IMenuItem {
    name: string,
    getHandler: (engine: Engine) => IEventsHandler
}