export default interface ICommand {
    execute(): any;
    undo(): any;
}