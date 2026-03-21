import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-best-practices-angular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-practices-angular.component.html',
  styleUrl: './best-practices-angular.component.css',
})
export class BestPracticesAngularComponent {
  sections: Section[] = [
    {
      title: 'Components',
      icon: 'pi-box',
      color: 'section-red',
      expanded: true,
      practices: [
        {
          title: 'Keep components small and focused',
          explanation:
            'A component should do one thing only — display data or handle a specific piece of UI.',
          detail: `Components are the building blocks of Angular applications, but they can easily become bloated if you put too much logic inside them.
A component that fetches data, transforms it, manages state, and renders the UI is doing too much. It becomes hard to test, hard to reuse, and hard to understand.
The Single Responsibility Principle applies directly — a component should have one reason to change. If your component template exceeds 50–100 lines or your component class exceeds 100–200 lines, that is a strong signal to split it.
Extract business logic into services, data transformation into pipes, and reusable UI fragments into child components.
Small, focused components are easier to unit test, easier to reuse across the application, and easier to reason about in isolation.`,
          code: {
            bad: `// Bad: component doing too much
@Component({ selector: 'app-dashboard' })
export class DashboardComponent implements OnInit {
  users: User[] = [];
  orders: Order[] = [];
  filteredUsers: User[] = [];

  ngOnInit() {
    // fetching data
    this.http.get<User[]>('/api/users').subscribe(u => {
      this.users = u;
      // transforming data
      this.filteredUsers = u
        .filter(u => u.active)
        .sort((a, b) => a.name.localeCompare(b.name));
    });
    this.http.get<Order[]>('/api/orders').subscribe(o => this.orders = o);
  }

  // business logic
  calculateTotal(orders: Order[]): number { ... }
  formatUser(user: User): string { ... }
  exportToCsv(): void { ... }
}`,
            good: `// Good: component only handles the view
@Component({ selector: 'app-dashboard' })
export class DashboardComponent implements OnInit {
  users$ = this.userService.getActiveUsers();
  orders$ = this.orderService.getOrders();

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}
}

// Logic lives in services
@Injectable({ providedIn: 'root' })
export class UserService {
  getActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      map(users => users
        .filter(u => u.active)
        .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }
}`,
          },
        },
        {
          title: 'Use OnPush change detection',
          explanation:
            'OnPush reduces unnecessary change detection cycles and significantly improves performance.',
          detail: `Angular\'s default change detection strategy checks every component in the tree on every event, timer, or HTTP response. This is safe but wasteful for large applications.
With ChangeDetectionStrategy.OnPush, Angular only checks a component when its input references change, an event originates from the component or its children, an async pipe resolves, or change detection is manually triggered.
This means a component with OnPush and immutable inputs will be skipped during most change detection cycles — dramatically improving performance.
To use OnPush effectively, treat all inputs as immutable — never mutate objects or arrays directly. Instead, create new references (use spread operators or array methods that return new arrays).
Combine OnPush with the async pipe and Observables for the most efficient rendering — the async pipe automatically marks the component for checking when a new value arrives.`,
          code: {
            bad: `// Bad: default change detection — checks on every cycle
@Component({
  selector: 'app-user-list',
  template: \`<div *ngFor="let user of users">{{ user.name }}</div>\`
})
export class UserListComponent {
  @Input() users: User[] = [];
}`,
            good: `// Good: OnPush — only checks when inputs change
@Component({
  selector: 'app-user-list',
  template: \`<div *ngFor="let user of users">{{ user.name }}</div>\`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() users: User[] = [];
}

// Parent must create new array reference to trigger update
addUser(user: User) {
  this.users = [...this.users, user]; // new reference ✓
  // this.users.push(user);           // mutation — won't trigger ✗
}`,
          },
        },
        {
          title: 'Use signals for local state',
          explanation:
            'Angular signals provide fine-grained reactivity for component state without zone.js overhead.',
          detail: `Angular 17+ introduced signals as a new reactive primitive. Signals are a way to declare state that Angular can track precisely — when a signal changes, only the parts of the template that read that signal are re-evaluated.
Compared to traditional properties with default change detection, signals are more explicit about what is reactive state. Compared to RxJS, signals are simpler for local component state that doesn\'t involve streams of asynchronous events.
Use signal() for mutable state, computed() for derived state, and effect() for side effects that should run when signals change.
Signals work naturally with OnPush change detection — when a signal used in a template changes, Angular automatically marks the component for checking.
Prefer signals over BehaviorSubject for local component state. Keep RxJS for complex async operations, HTTP calls, and event streams.`,
          code: {
            bad: `// Bad: plain property — no fine-grained reactivity
@Component({ selector: 'app-counter' })
export class CounterComponent {
  count = 0;
  doubled = 0;

  increment() {
    this.count++;
    this.doubled = this.count * 2; // manually keeping in sync
  }
}`,
            good: `// Good: signals — reactive and auto-derived
@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2); // auto-derived

  increment() {
    this.count.update(c => c + 1); // all derived values update automatically
  }
}`,
          },
        },
      ],
    },
    {
      title: 'Services and Dependency Injection',
      icon: 'pi-server',
      color: 'section-blue',
      expanded: false,
      practices: [
        {
          title: "Use providedIn: 'root' for singleton services",
          explanation:
            'Tree-shakable singleton services should be provided at root level, not in NgModule providers arrays.',
          detail: `Before Angular 6, services had to be listed in the providers array of an NgModule. This approach has two problems: it is easy to forget, and the service is always included in the bundle even if it is never used.
With providedIn: \'root\', the service is registered with the root injector automatically and is tree-shakable — if nothing injects it, it is excluded from the bundle.
For feature-specific services that should not be singletons, use providedIn: \'any\' (gives each lazy module its own instance) or provide them in a component\'s providers array (creates an instance per component).
Never put services in NgModule providers unless you have a specific reason — like providing a different implementation in tests or needing a non-singleton instance.
Services should be stateless when possible. If state is needed, be deliberate about its scope — root-level services hold application state, feature-level services hold feature state.`,
          code: {
            bad: `// Bad: provided in NgModule — not tree-shakable
@NgModule({
  providers: [UserService] // always included in bundle
})
export class AppModule {}

@Injectable()
export class UserService { ... }`,
            good: `// Good: providedIn root — tree-shakable singleton
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}`,
          },
        },
        {
          title: 'Use inject() instead of constructor injection',
          explanation:
            'The inject() function is the modern Angular way to consume dependencies — more concise and composable.',
          detail: `Angular 14+ introduced the inject() function as an alternative to constructor-based dependency injection. It can be used in components, directives, pipes, services, and guards.
Constructor injection requires listing all dependencies as constructor parameters with their types — this becomes verbose for components with many dependencies and makes extending classes awkward.
The inject() function is more composable — you can extract groups of related dependencies into helper functions or base classes without needing to pass them through constructors.
inject() also works in factory functions and in the new functional router guards and interceptors introduced in Angular 15+.
One important rule: inject() can only be called during the construction phase of a class — it cannot be called inside methods or lifecycle hooks. Assign the result to a field.`,
          code: {
            bad: `// Bad: verbose constructor injection
@Component({ selector: 'app-users' })
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Users');
  }
}`,
            good: `// Good: inject() — concise and composable
@Component({ selector: 'app-users' })
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);

  ngOnInit() {
    this.titleService.setTitle('Users');
  }
}`,
          },
        },
      ],
    },
    {
      title: 'RxJS and Observables',
      icon: 'pi-sync',
      color: 'section-purple',
      expanded: false,
      practices: [
        {
          title: 'Always unsubscribe to prevent memory leaks',
          explanation:
            'Subscriptions that are not cleaned up keep running after a component is destroyed, causing memory leaks and unexpected behavior.',
          detail: `When you subscribe to an Observable in a component, the subscription stays active until either the Observable completes or you explicitly unsubscribe. If the component is destroyed without unsubscribing, the callback still fires — potentially accessing destroyed DOM or stale component state.
The simplest and most recommended approach is the async pipe in templates — it subscribes and unsubscribes automatically when the component is destroyed.
If you must subscribe imperatively (in ngOnInit or a method), use the takeUntilDestroyed() operator from @angular/core/rxjs-interop (Angular 16+). It automatically unsubscribes when the component's destroy signal fires.
For older code, the traditional pattern is a Subject<void> with takeUntil() — emit from the subject in ngOnDestroy to complete all subscriptions.
Never subscribe inside subscribe. If you need to chain async operations, use operators like switchMap, mergeMap, or concatMap.`,
          code: {
            bad: `// Bad: subscription never cleaned up
@Component({ selector: 'app-users' })
export class UsersComponent implements OnInit {
  users: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users; // still fires after component is destroyed!
    });
  }
}`,
            good: `// Good: async pipe handles subscription automatically
@Component({
  selector: 'app-users',
  template: \`
    <div *ngFor="let user of users$ | async">{{ user.name }}</div>
  \`
})
export class UsersComponent {
  users$ = this.userService.getUsers();
  private userService = inject(UserService);
}

// Good: takeUntilDestroyed for imperative subscriptions
@Component({ selector: 'app-users' })
export class UsersComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  users: User[] = [];

  ngOnInit() {
    this.userService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(users => this.users = users);
  }
}`,
          },
        },
        {
          title: 'Use higher-order mapping operators',
          explanation:
            'switchMap, mergeMap, and concatMap handle inner subscriptions automatically and prevent nested subscribe() calls.',
          detail: `Nesting subscribe() inside subscribe() is a common anti-pattern called "callback hell" for Observables. It leads to memory leaks (inner subscriptions not cleaned up), race conditions, and code that is hard to follow.
switchMap cancels the previous inner Observable when a new value arrives — perfect for search boxes or route params where only the latest request matters.
mergeMap runs all inner Observables concurrently — good for independent parallel operations.
concatMap queues inner Observables and runs them one at a time in order — good for operations that must execute sequentially.
exhaustMap ignores new values while the inner Observable is still active — good for form submissions where you want to ignore rapid clicks.
Always think about which cancellation strategy fits your use case before choosing an operator.`,
          code: {
            bad: `// Bad: nested subscriptions — memory leak and race condition
this.route.params.subscribe(params => {
  this.userService.getUser(params['id']).subscribe(user => {
    this.user = user; // previous request may arrive after newer one!
  });
});`,
            good: `// Good: switchMap cancels previous request automatically
this.route.params.pipe(
  switchMap(params => this.userService.getUser(params['id'])),
  takeUntilDestroyed(this.destroyRef)
).subscribe(user => this.user = user);

// Good: mergeMap for parallel independent requests
ids$.pipe(
  mergeMap(id => this.userService.getUser(id))
).subscribe(user => this.results.push(user));`,
          },
        },
      ],
    },
    {
      title: 'Templates',
      icon: 'pi-file-code',
      color: 'section-green',
      expanded: false,
      practices: [
        {
          title: 'Use the new control flow syntax (@if, @for)',
          explanation:
            'Angular 17+ control flow syntax is more readable, type-safe, and performs better than *ngIf and *ngFor.',
          detail: `Angular 17 introduced built-in control flow syntax as a replacement for structural directives like *ngIf and *ngFor. The new syntax (@if, @for, @switch) is part of the template syntax itself rather than being implemented as directives.
The new @for block requires a track expression, which was optional with trackBy in *ngFor. Tracking is important for performance — without it, Angular destroys and recreates all DOM elements when the array changes. With tracking, Angular can identify which items changed and only update those.
@if provides an @else block directly — with *ngIf you needed an ng-template with a reference, which was verbose.
The new syntax also provides better TypeScript type narrowing inside blocks — in an @if (user) block, TypeScript knows user is not null or undefined.
You can incrementally migrate — old and new syntax can coexist in the same application. Use the Angular migration schematic to automate conversion.`,
          code: {
            bad: `<!-- Bad: old structural directives -->
<div *ngIf="user; else loading">
  {{ user.name }}
</div>
<ng-template #loading>Loading...</ng-template>

<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>`,
            good: `<!-- Good: new control flow syntax -->
@if (user) {
  {{ user.name }}
} @else {
  Loading...
}

@for (item of items; track item.id) {
  {{ item.name }}
} @empty {
  No items found.
}`,
          },
        },
        {
          title: 'Avoid logic in templates',
          explanation:
            'Templates should be declarative. Move complex expressions into component methods or getters.',
          detail: `Template expressions are evaluated on every change detection cycle. If you put complex logic directly in templates — method calls with side effects, expensive computations, nested ternaries — it runs repeatedly and unnecessarily.
Method calls in templates are particularly dangerous because Angular cannot know if they are pure (always return the same output for the same input). It must call them on every change detection cycle to check for changes.
For simple derived values, use getters in the component class. For expensive computations, use computed signals (Angular 17+) or memoize the result.
Use pipes for pure transformations that can be cached — a pure pipe is only re-evaluated when its input changes.
Avoid ternary chains in templates. If you find yourself writing condition ? a : b ? c : d, move the logic to a component method and return the appropriate value.`,
          code: {
            bad: `<!-- Bad: logic in template — runs on every change detection -->
<span>{{ user.firstName + ' ' + user.lastName }}</span>
<div *ngIf="items.filter(i => i.active).length > 0">...</div>
<span>{{ getStatusLabel(user.status) }}</span>`,
            good: `<!-- Good: logic in component -->
<span>{{ user.fullName }}</span>
<div *ngIf="hasActiveItems">...</div>
<span>{{ statusLabel }}</span>

// component.ts
get fullName() { return \`\${this.user.firstName} \${this.user.lastName}\`; }
get hasActiveItems() { return this.items.some(i => i.active); }
get statusLabel() { return STATUS_LABELS[this.user.status]; }`,
          },
        },
      ],
    },
    {
      title: 'Routing',
      icon: 'pi-directions',
      color: 'section-teal',
      expanded: false,
      practices: [
        {
          title: 'Use lazy loading for feature modules',
          explanation:
            'Lazy loading splits the bundle and only loads feature code when the user navigates to that route.',
          detail: `Lazy loading is one of the most impactful performance optimizations in Angular. Instead of loading the entire application upfront, Angular only loads the code for the current route — and defers loading feature routes until the user navigates to them.
With standalone components (Angular 14+), lazy loading is even simpler — you can lazily load a single component directly without a feature module.
The loadComponent and loadChildren functions use dynamic imports — the browser downloads the chunk only when needed. This reduces the initial bundle size, improving time to first interactive.
Combine lazy loading with route-level preloading strategies: PreloadAllModules preloads all lazy modules after the app bootstraps, giving you the best of both worlds — fast initial load and instant subsequent navigation.
Always lazy-load feature routes. Only the core shell (app component, header, footer) should be eagerly loaded.`,
          code: {
            bad: `// Bad: eagerly loaded — all code in initial bundle
import { UserListComponent } from './users/user-list.component';
import { OrderListComponent } from './orders/order-list.component';

const routes: Routes = [
  { path: 'users',  component: UserListComponent },
  { path: 'orders', component: OrderListComponent },
];`,
            good: `// Good: lazy loaded — code split by route
const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./users/user-list.component')
        .then(m => m.UserListComponent)
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.routes')
        .then(m => m.ORDERS_ROUTES)
  },
];`,
          },
        },
        {
          title: 'Use functional route guards',
          explanation:
            'Functional guards (Angular 15+) are simpler than class-based guards and work naturally with inject().',
          detail: `Before Angular 15, route guards were classes implementing CanActivate, CanDeactivate, or similar interfaces. They required being added to providers and had verbose boilerplate.
Angular 15+ introduced functional guards — plain functions that return boolean, UrlTree, or an Observable/Promise of those. They are much simpler and can use inject() directly inside the function body.
Functional guards are easier to test (just call the function), easier to compose (combine with &&/||), and require no module registration.
For complex guard logic, extract it into a service and inject the service inside the guard function. The guard function itself should remain thin.
Use the Router to redirect from guards by returning a UrlTree — router.createUrlTree(['/login']) — instead of calling router.navigate() as a side effect.`,
          code: {
            bad: `// Bad: class-based guard — verbose boilerplate
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

// routes
{ path: 'dashboard', canActivate: [AuthGuard], ... }`,
            good: `// Good: functional guard — simple and composable
export const authGuard = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn()
    ? true
    : router.createUrlTree(['/login']);
};

// routes
{ path: 'dashboard', canActivate: [authGuard], ... }`,
          },
        },
      ],
    },
    {
      title: 'Performance',
      icon: 'pi-bolt',
      color: 'section-orange',
      expanded: false,
      practices: [
        {
          title: 'Use trackBy (or track) in loops',
          explanation:
            'Without tracking, Angular destroys and recreates all DOM elements when a list changes — even if only one item changed.',
          detail: `When Angular renders a list with *ngFor or @for and the array reference changes, it needs to figure out which items are new, removed, or moved. Without a tracking function, Angular uses object identity — if the array contains new object references (as is common after an HTTP response), every item is considered new and the entire DOM is recreated.
This is expensive — it destroys and recreates all DOM elements, loses focus state, causes layout thrashing, and triggers unnecessary animations.
With trackBy (legacy) or track (new syntax), Angular can identify items by their stable identity (usually an id field) and only update the DOM elements that actually changed.
This is especially important for long lists, lists with user interaction (expanded items, focus), and lists that animate.
Always track by a unique identifier from your data model — never track by index unless the list never reorders or items are never inserted/deleted.`,
          code: {
            bad: `<!-- Bad: no tracking — entire list re-rendered on any change -->
<div *ngFor="let user of users">{{ user.name }}</div>

@for (user of users) {
  {{ user.name }}
}`,
            good: `<!-- Good: track by stable id -->
<div *ngFor="let user of users; trackBy: trackById">
  {{ user.name }}
</div>

@for (user of users; track user.id) {
  {{ user.name }}
}

// component.ts (for legacy trackBy)
trackById(index: number, user: User): number {
  return user.id;
}`,
          },
        },
        {
          title: 'Use pure pipes for template transformations',
          explanation:
            'Pure pipes are only re-evaluated when their input changes — unlike methods called in templates which run on every change detection cycle.',
          detail: `Pipes are a powerful but often underused Angular feature. A pure pipe (the default) is only recalculated when its input reference changes. This makes them much more efficient than calling a method directly in the template.
When you call a method in a template expression — like {{ formatDate(user.createdAt) }} — Angular calls it on every single change detection cycle to check if the result has changed. For expensive operations, this adds up quickly.
A pure pipe with the same input returns the same output and is cached between change detection cycles.
Use pipes for: date formatting, currency formatting, string transformation, filtering lists, sorting lists, and any deterministic transformation that depends only on its inputs.
Be careful with pipes that take objects or arrays — if you mutate the object/array without changing the reference, the pipe will not re-execute. This is the correct behavior for pure pipes — it is a signal that you should treat your data as immutable.
For impure operations (like filtering a live search), mark the pipe as impure: @Pipe({ pure: false }) — but use this sparingly as impure pipes run on every change detection cycle.`,
          code: {
            bad: `<!-- Bad: method call runs on every change detection cycle -->
<span>{{ formatCurrency(product.price) }}</span>
<span>{{ getStatusLabel(order.status) }}</span>

// component.ts
formatCurrency(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
  }).format(price); // expensive — runs constantly!
}`,
            good: `<!-- Good: pure pipe — cached until input changes -->
<span>{{ product.price | currency:'USD' }}</span>
<span>{{ order.status | statusLabel }}</span>

// status-label.pipe.ts
@Pipe({ name: 'statusLabel', standalone: true })
export class StatusLabelPipe implements PipeTransform {
  transform(status: OrderStatus): string {
    return STATUS_LABELS[status];
  }
}`,
          },
        },
      ],
    },
    {
      title: 'State Management',
      icon: 'pi-database',
      color: 'section-indigo',
      expanded: false,
      practices: [
        {
          title: 'Use a state service before reaching for NgRx',
          explanation:
            'A simple BehaviorSubject or signal-based service handles most state needs without the complexity of a full state management library.',
          detail: `NgRx is a powerful state management library inspired by Redux, but it comes with significant boilerplate and complexity. For many applications — especially small to medium ones — it is overkill.
Before reaching for NgRx, consider a simple service with a BehaviorSubject (RxJS approach) or signals (Angular 17+ approach). This gives you centralized state, reactivity, and a single source of truth without actions, reducers, effects, and selectors.
A signal-based state service is especially clean — define your state as signals, expose computed() for derived state, and update state with update() or set(). Components inject the service and read directly from the signals.
Only reach for NgRx when you have genuinely complex state interactions — multiple features sharing state with complex update logic, time-travel debugging requirements, or a large team that benefits from enforced patterns.
NgRx Signals (the newer component store) bridges the gap — it provides structure without the full Redux overhead.`,
          code: {
            bad: `// Overkill for simple state: full NgRx for a counter
// actions.ts, reducer.ts, effects.ts, selectors.ts — 4 files!
export const increment = createAction('[Counter] Increment');
export const counterReducer = createReducer(
  0,
  on(increment, state => state + 1)
);`,
            good: `// Good: signal-based state service
@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  readonly count = computed(() => this.items().length);
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0)
  );

  addItem(item: CartItem) {
    this.items.update(items => [...items, item]);
  }

  removeItem(id: string) {
    this.items.update(items => items.filter(i => i.id !== id));
  }
}

// component.ts
export class CartComponent {
  cart = inject(CartService);
}`,
          },
        },
      ],
    },
    {
      title: 'Code Organization',
      icon: 'pi-folder',
      color: 'section-yellow',
      expanded: false,
      practices: [
        {
          title: 'Use a feature-based folder structure',
          explanation:
            'Group files by feature, not by type. This makes features self-contained and easier to navigate.',
          detail: `The traditional Angular folder structure groups files by type — all components in a components/ folder, all services in services/, all models in models/. This seems organized at first but quickly becomes unwieldy as the application grows.
When working on a feature, you have to navigate across multiple folders to find all the related files. When deleting a feature, you have to hunt through multiple folders to find everything.
A feature-based structure groups everything related to a feature together — its components, services, models, and routes are all in one folder. This makes features self-contained modules that are easy to understand, move, and delete.
The feature folder becomes a natural boundary for lazy loading. Each feature folder exports its routes and standalone components, and the app router lazily loads the feature.
Reserve shared/ for truly cross-cutting concerns — shared components, pipes, and utilities used by multiple features. Core/ (or app-level) is for application-wide singletons like auth, logging, and HTTP interceptors.`,
          code: {
            bad: `// Bad: organized by type — features are scattered
src/app/
  components/
    user-list.component.ts
    user-detail.component.ts
    order-list.component.ts
  services/
    user.service.ts
    order.service.ts
  models/
    user.model.ts
    order.model.ts`,
            good: `// Good: organized by feature — self-contained
src/app/
  features/
    users/
      components/
        user-list.component.ts
        user-detail.component.ts
      services/
        user.service.ts
      models/
        user.model.ts
      users.routes.ts
    orders/
      components/
        order-list.component.ts
      services/
        order.service.ts
      orders.routes.ts
  shared/
    components/
    pipes/
  core/
    interceptors/
    guards/`,
          },
        },
        {
          title: 'Use TypeScript strictly',
          explanation:
            'Strict TypeScript catches bugs at compile time and makes refactoring safer.',
          detail: `Angular projects default to strict TypeScript mode since Angular 12, and you should keep it enabled — or enable it if you are on an older project.
Strict mode enables several checks: strictNullChecks (variables cannot be null/undefined unless explicitly typed that way), strictPropertyInitialization (class properties must be initialized), noImplicitAny (all variables must have explicit or inferred types), and more.
These checks prevent the most common JavaScript bugs — null pointer exceptions, undefined properties, implicit any types that bypass type checking.
For Angular specifically, strict templates (strictTemplates: true in tsconfig) adds type checking to templates — property access on undefined inputs, wrong event types, and incorrect pipe usage are caught at build time instead of runtime.
Use type inference where possible — don\'t add redundant type annotations. Let TypeScript infer the type when it is obvious, and add annotations when they add clarity or catch errors.
Avoid the any type — if you must escape the type system, use unknown and narrow the type before using it.`,
          code: {
            bad: `// Bad: loose TypeScript — no type safety
let user: any = getUser();
user.nme; // typo — no error!

function processOrder(order) { // implicit any
  return order.itmes; // typo — no error!
}

@Component({})
class UserComponent {
  user: User; // strictPropertyInitialization error ignored
}`,
            good: `// Good: strict TypeScript
let user: User = getUser();
user.name; // typo caught at compile time

function processOrder(order: Order): OrderResult {
  return order.items; // typo caught at compile time
}

@Component({})
class UserComponent {
  user = input.required<User>(); // always initialized
  // or: user: User | null = null;
}`,
          },
        },
      ],
    },
  ];

  highlight(code: string): string {
    return hljs.highlight(code, { language: 'typescript' }).value;
  }

  highlightHtml(code: string): string {
    return hljs.highlight(code, { language: 'html' }).value;
  }

  highlightAuto(code: string): string {
    return hljs.highlightAuto(code).value;
  }

  toggleSection(section: Section): void {
    section.expanded = !section.expanded;
  }

  getSectionGradient(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'linear-gradient(135deg, #1e3a5f, #0f2040)',
      'section-green': 'linear-gradient(135deg, #064e1e, #032e12)',
      'section-purple': 'linear-gradient(135deg, #3b0764, #1e0336)',
      'section-orange': 'linear-gradient(135deg, #7c2d12, #4a1a08)',
      'section-teal': 'linear-gradient(135deg, #134e4a, #062e2b)',
      'section-red': 'linear-gradient(135deg, #5c0a0a, #380606)',
      'section-yellow': 'linear-gradient(135deg, #713f12, #3d2006)',
      'section-indigo': 'linear-gradient(135deg, #1e1b4b, #0f0d2b)',
    };
    return map[color] ?? '#13161e';
  }

  getAccentColor(color: string): string {
    const map: Record<string, string> = {
      'section-blue': '#60a5fa',
      'section-green': '#4ade80',
      'section-purple': '#c084fc',
      'section-orange': '#fb923c',
      'section-teal': '#2dd4bf',
      'section-red': '#f87171',
      'section-yellow': '#fbbf24',
      'section-indigo': '#818cf8',
    };
    return map[color] ?? '#94a3b8';
  }

  getAccentBg(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'rgba(96,165,250,0.12)',
      'section-green': 'rgba(74,222,128,0.12)',
      'section-purple': 'rgba(192,132,252,0.12)',
      'section-orange': 'rgba(251,146,60,0.12)',
      'section-teal': 'rgba(45,212,191,0.12)',
      'section-red': 'rgba(248,113,113,0.12)',
      'section-yellow': 'rgba(251,191,36,0.12)',
      'section-indigo': 'rgba(129,140,248,0.12)',
    };
    return map[color] ?? 'rgba(148,163,184,0.12)';
  }
}
