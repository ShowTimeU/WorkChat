import { Component } from '@angular/core';
import {from, merge, Observable, Subject} from 'rxjs';
import {Message, SendMessageEvent, User} from '@progress/kendo-angular-conversational-ui';
import {map, scan} from 'rxjs/operators';
import {ChatService} from './chat-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public feed: Observable<Message[]>;
  public readonly user: User = {
    id: 1
  };
  public readonly bot: User = {
    id: 0
  };
  private local: Subject<Message> = new Subject<Message>();

  constructor(private svc: ChatService) {
    const hello: Message = {
      author: this.bot,
      timestamp: new Date(),
      text: 'Hello, this is a demo bot. I don`t do much, but I can count symbols!'
    };
    this.feed = merge(
      from([ hello ]),
      this.local,
      this.svc.responses.pipe(
        map((response): Message => ({
            author: this.bot,
            text: response
          })
        ))
    ).pipe(
      // ... and emit an array of all messages
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );
  }

  public sendMessage(e: SendMessageEvent): void {
    this.local.next(e.message);

    this.local.next({
      author: this.bot,
      typing: true
    });

    this.svc.submit(e.message.text);
  }
}
