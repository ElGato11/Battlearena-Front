import { Injectable } from "@angular/core";
import { Stomp } from "@stomp/stompjs";

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private apiUrl = 'ws://localhost:8080/ws';

  cliente() {
    return Stomp.over(() => new WebSocket(this.apiUrl));
  }
}
