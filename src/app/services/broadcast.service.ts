import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private readonly BROADCAST_KEY = 'app_broadcast_channel';
  private broadcastChannel: BroadcastChannel;

  constructor() { 
    this.broadcastChannel = new BroadcastChannel(this.BROADCAST_KEY);
  }

  broadcastLogout(){
    this.broadcastChannel.postMessage({action: 'logout'});
  }

  subscribeToLogout(callback: ()=> void){
    this.broadcastChannel.onmessage = (event) =>{
      if(event.data.action === 'logout' ){
        callback();
      }
    };
  }
}
