import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from "./socket.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    public messages: Array<any>;
    public calcTextBox: string;

    public constructor(private socket: SocketService) {
        this.messages = [];
        this.calcTextBox = "";
    }

    public ngOnInit() {
        this.socket.getEventListener().subscribe(event => {
            if(event.type == "message") {
                let data = event.data.content;

                this.messages.unshift(data);
            }

            if(this.messages.length > 10) {
                this.messages.pop();
            }
        });
    }


    public ngOnDestroy() {
        this.socket.close();
    }

    public send() {
        if(this.calcTextBox) {
            this.socket.send(this.calcTextBox);
            this.calcTextBox = "";
        }
    }

    public isSystemMessage(message: string) {
        return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
    }

}