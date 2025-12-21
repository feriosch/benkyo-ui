import {
  trigger,
  transition,
  style,
  query,
  animate,
  group,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  // Fade + slide animation for route changes
  transition('* <=> *', [
    // Initial state of new route
    query(
      ':enter',
      [
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        }),
      ],
      { optional: true }
    ),

    // Animate old route out and new route in
    group([
      query(
        ':leave',
        [
          animate(
            '200ms ease-out',
            style({
              opacity: 0,
              transform: 'translateY(-20px)',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '300ms 100ms ease-out',
            style({
              opacity: 1,
              transform: 'translateY(0)',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

