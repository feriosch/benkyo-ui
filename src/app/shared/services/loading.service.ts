import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests = signal(0);

  /** Whether any HTTP request is currently in progress */
  readonly isLoading = computed(() => this.activeRequests() > 0);

  /** Show loading spinner (increment active requests) */
  show(): void {
    this.activeRequests.update((count) => count + 1);
  }

  /** Hide loading spinner (decrement active requests) */
  hide(): void {
    this.activeRequests.update((count) => Math.max(0, count - 1));
  }

  /** Force reset loading state */
  reset(): void {
    this.activeRequests.set(0);
  }
}

