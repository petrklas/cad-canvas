import { IShape } from "./Shape";

export default interface IShapeModifier {
    modify(shape: IShape): void;
}