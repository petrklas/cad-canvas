import IMenuItem from "@/types/MenuItem";

export default class Menu {
    items: Array<IMenuItem> = [];

    activeItem: IMenuItem;

    constructor(items: Array<IMenuItem>) {
        this.items = items;
        this.activeItem = this.items[0];
    }

    setActive(item: IMenuItem) {
        if (this.items.indexOf(item) != -1) {
            this.activeItem = item;
        } else {
            throw Error('Invalid menu item');
        }
    }

    getActive(): IMenuItem {
        return this.activeItem;
    }
}



export function useMenu(itemsList: Array<IMenuItem>) {
    const menu = new Menu(itemsList);
    function setActiveMenu(item: IMenuItem) {
        menu.setActive(item);
    }

    const menuItems = menu.items;
    const activeMenuItem = menu.getActive();

    return {
        menuItems,
        activeMenuItem,
        setActiveMenu,
    };
}