import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppstateService {
  private trigger = new Subject();
  private state;

  constructor() {
    this.state = this.trigger.pipe(
      scan(current => !current, true)
    );
  }

  public toggleDim() {
    this.trigger.next();
  }

  public getDim(): Observable<boolean> {
    return this.state.asObservable();
  }
}
