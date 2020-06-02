import { Component } from '@angular/core';
import {from, merge, Observable, Subject} from 'rxjs';
import {Message, SendMessageEvent, User} from '@progress/kendo-angular-conversational-ui';
import {map, scan} from 'rxjs/operators';
import {ChatService} from './chat-page/chat-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
