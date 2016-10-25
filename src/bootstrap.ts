﻿import { JWPlayerComponent } from "./components";
import { LocalStorageService } from "./services";
import { environment } from "./environment";

declare var jwplayer;

export const bootstrap = (root: HTMLElement, key: string, localStorageKey, isDebug = false) => {         
    jwplayer.key = key;       
    LocalStorageService.key = localStorageKey;
    environment.isDebug = isDebug;
    const elements: NodeList = root.querySelectorAll('div[jw-player]');    
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i] as HTMLElement;
        let jwPlayerComponent = new JWPlayerComponent(element, jwplayer(element), LocalStorageService.Instance, element.getAttribute("[file]"), element.getAttribute("[height]"), element.getAttribute("[width]"),i);                
    }
}