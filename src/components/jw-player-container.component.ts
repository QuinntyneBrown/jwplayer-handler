﻿import { JWPlayerComponent } from "./jw-player.component";
import { NotificationsComponent } from "./notifications.component";
import { EventEmitter } from "../utils";

export class JWPlayerContainerComponent {
    constructor(private _nativeElement: HTMLElement) { }
    public title: string;
    public file: string;
    public height: string;
    public width: string;

    public events: Array<string> = ['buffer','bufferChange', 'ready', 'play', 'pause', 'complete', 'seek', 'error', 'playlistItem', 'time', 'firstFrame'];

    public activate() {
        this._nativeElement.innerHTML = require("../templates/jw-player-container.html");        
        this._jwPlayerComponent = new JWPlayerComponent(this._jwPlayerNativeElement);
        this._jwPlayerComponent.file = this.file;
        this._jwPlayerComponent.height = this.height;
        this._jwPlayerComponent.width = this.width;        
        this._notificationsComponent = new NotificationsComponent(this._notificationsNativeElement);
        this._jwPlayerComponent.activate();
        this.handleEventsFor(this._jwPlayerComponent.playerInstance);
    }

    public playerEvent: EventEmitter = new EventEmitter();

    public handleEventsFor = (playerInstance: any) => {
        this.events.forEach((type) => {
            this._jwPlayerComponent.playerInstance
                .on(type, (event) => {
                    this.playerEvent.emit(
                        {
                            playerEvent: event,
                            playerEventType: type,
                            playerInstance: this._jwPlayerComponent.playerInstance
                        }
                    );

                    switch (type) {
                        case "bufferChange":
                            if (this._state == "buffer") {
                                this._notificationsComponent.message = event.bufferPercent;
                            } else {
                                this._notificationsComponent.message = "";
                            }                            
                            break;

                        case "buffer":
                            this._state = "buffer";                            
                            break;   

                        case "play":
                            this._state = "play";
                            break;                            
                    }
                });
        });
    }
    private _state: string;
    private _jwPlayerComponent: JWPlayerComponent;
    private _notificationsComponent: NotificationsComponent;
    private get _jwPlayerNativeElement(): HTMLElement {
        return this._nativeElement.querySelector(".jw-player") as HTMLElement;
    }
    private get _notificationsNativeElement(): HTMLElement {
        return this._nativeElement.querySelector(".jw-player-notifications") as HTMLElement;
    }
}