export default interface IPath {
    draw: (context: CanvasRenderingContext2D) => void
    handleEvent: (event: Event) => void
}