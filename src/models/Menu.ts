import IMenuItem from "@/types/MenuItem";
import { Line } from "./MenuItems/Line";
import { Rectangle } from "./MenuItems/Recangle";

export default class Menu {
    items: Array<IMenuItem> = [
        new Line(),
        new Rectangle(),
    ];

    activeItem: IMenuItem;

    constructor() {
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

const menu = new Menu();

export function useMenu() {
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