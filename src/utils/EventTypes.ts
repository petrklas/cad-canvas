import Point from "@/types/Point";

export const GlobalEvenTypes = {
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  MOUSE_MOVE: "mousemove",
  KEY_UP: "keyup",
  KEY_DOWN: "keydown",
};

export const CustomEvenTypes = {
  MOUSE_DOWN_LEFT: "mousedownleft",
  MOUSE_UP_LEFT: "mouseupleft",
  MOUSE_DOWN_MIDDLE: "mousedownmiddle",
  MOUSE_UP_MIDDLE: "mouseupmiddle",
  MOUSE_MOVE: "mousemove",
  KEY_ESC: "keyesc",
  MOUSE_POSITION_UPDATE: "mousepositionupdate",
  WHEEL_UP: "wheelup",
  WHEEL_DOWN: "wheeldown",
  CANVAS_COMMAND_PERFORMED: "commandAdded",
};

export const EventButtons = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
}

export const enum EventKeys {
  ESC = 'Escape',
  SHIFT = 'Shift',
  CTRL = 'Control',
  ALT = 'Alt'
}

export const CustomEvents = {
  LENGTH: 'length'
}

export class MouseMoveRelativeEvent {
    relativeOffset = new Point(0, 0);
}