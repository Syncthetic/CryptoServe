import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  public notifications = []

  constructor() { }
  
  flash(body, icon, title) {
    let options = {
      body: body,
      icon: icon
    }
    let n = new Notification(title, options);
  }

  add (title, body, image = undefined) {
    let id = this.notifications.length
    this.notifications.push({ id, title, body, image })
    this.flash(body, image, title);
  }

  remove (id) {
    delete this.notifications[id]
  }

}
