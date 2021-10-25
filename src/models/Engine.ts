import IPath from "@/types/IPath";

export default class Engine {
    paths: Array<IPath> = [];
    context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public addPath(path: IPath): Array<IPath> {
        this.paths.push(path);

        return this.paths;
    }

    public removeObject(path: IPath) {
        this.paths = this.paths.filter(aPath => aPath !== path)
    }

    public render(): void {
        this.paths.forEach((path: IPath) => {
            path.draw(this.context);
        });
    }
}