import { OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

export class StructureClass implements OnDestroy {
  protected cancelSubscription$ = new Subject();

  ngOnDestroy() {
    this.cancelSubscription$.next();
    this.cancelSubscription$.complete();
  }
}
