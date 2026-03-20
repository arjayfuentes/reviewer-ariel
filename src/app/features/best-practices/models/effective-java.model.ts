export interface Bullet {
  label: string;
  tag: 'good' | 'avoid';
  code: string;
  explain: string;
}

export interface Chapter {
  id: string;
  title: string;
  desc: string;
  bullets: Bullet[];
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'creation',
    title: 'Creating & Destroying Objects',
    desc: 'How to create objects effectively and avoid unnecessary ones.',
    bullets: [
      {
        label: 'Use static factory methods instead of constructors',
        tag: 'good',
        code: `// BAD: constructor only
public class Connection {
    public Connection(String host, int port) { ... }
}

// GOOD: static factory — named, can cache, can return subtype
public class Connection {
    private static final Map<String, Connection> CACHE = new HashMap<>();

    private Connection(String host, int port) { ... }

    public static Connection of(String host, int port) {
        String key = host + ":" + port;
        return CACHE.computeIfAbsent(key, k -> new Connection(host, port));
    }
}

Connection c = Connection.of("localhost", 5432);`,
        explain: 'Static factories have meaningful names (of, from, getInstance), can cache instances, and can return subtypes — none of which constructors can do.'
      },
      {
        label: 'Use builders for many parameters',
        tag: 'good',
        code: `// BAD: telescoping constructors
new Pizza("large", "thin", true, false, true, "mozzarella");

// GOOD: Builder pattern
Pizza pizza = new Pizza.Builder("large")
    .crust("thin")
    .extraCheese(true)
    .topping("mozzarella")
    .build();

class Pizza {
    public static class Builder {
        private final String size;
        private String crust = "regular";
        private boolean extraCheese = false;
        private String topping = "none";

        public Builder(String size) { this.size = size; }
        public Builder crust(String c) { crust = c; return this; }
        public Builder extraCheese(boolean e) { extraCheese = e; return this; }
        public Builder topping(String t) { topping = t; return this; }
        public Pizza build() { return new Pizza(this); }
    }
    private Pizza(Builder b) { ... }
}`,
        explain: 'Builders shine when a class has 4+ parameters, especially optional ones. They are readable, safe, and easy to extend.'
      },
      {
        label: 'Enforce singleton with enum',
        tag: 'good',
        code: `// BAD: class-based singleton (not serialization-safe)
public class Config {
    private static final Config INSTANCE = new Config();
    private Config() {}
    public static Config getInstance() { return INSTANCE; }
}

// GOOD: enum singleton — serialization-safe, concise
public enum Config {
    INSTANCE;
    private String dbUrl = "jdbc:postgres://localhost/app";
    public String getDbUrl() { return dbUrl; }
    public void setDbUrl(String url) { this.dbUrl = url; }
}

Config.INSTANCE.getDbUrl(); // usage`,
        explain: 'Enum singletons are automatically serialization-safe, thread-safe, and protected against reflection attacks — none of which the class-based approach guarantees.'
      },
      {
        label: 'Avoid unnecessary objects — beware autoboxing',
        tag: 'avoid',
        code: `// BAD: creates ~2 billion Long objects
Long sum = 0L;
for (long i = 0; i < Integer.MAX_VALUE; i++) {
    sum += i; // autoboxes i into Long every iteration!
}

// GOOD: use primitive long
long sum = 0L;
for (long i = 0; i < Integer.MAX_VALUE; i++) {
    sum += i; // no boxing, 10x faster
}

// BAD: creates new String object
String s = new String("hello");

// GOOD: reuses string pool entry
String s = "hello";`,
        explain: 'Autoboxing silently creates huge numbers of temporary objects. Prefer primitives (long, int, double) over boxed types (Long, Integer, Double) in performance-sensitive code.'
      },
      {
        label: 'Use try-with-resources, not finalizers',
        tag: 'good',
        code: `// BAD: relying on finalize()
public class DbConnection {
    @Override
    protected void finalize() throws Throwable {
        close(); // unpredictable — may never run!
    }
}

// GOOD: implement AutoCloseable + try-with-resources
public class DbConnection implements AutoCloseable {
    public DbConnection(String url) { /* open */ }
    public ResultSet query(String sql) { ... }

    @Override
    public void close() {
        // guaranteed to run, even if exception thrown
        System.out.println("Connection closed");
    }
}

try (DbConnection conn = new DbConnection("jdbc:...")) {
    ResultSet rs = conn.query("SELECT * FROM users");
} // close() called automatically here`,
        explain: 'Finalizers are unpredictable — the GC may never call them. try-with-resources guarantees cleanup even when exceptions occur.'
      }
    ]
  },
  {
    id: 'object_methods',
    title: 'Methods Common to All Objects',
    desc: 'Overriding equals, hashCode, toString, and Comparable correctly.',
    bullets: [
      {
        label: 'Override equals consistently',
        tag: 'good',
        code: `public class Point {
    private final int x, y;

    public Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;              // reflexive
        if (!(o instanceof Point)) return false; // type check
        Point p = (Point) o;
        return x == p.x && y == p.y;            // symmetric, transitive
    }

    // Rules: reflexive, symmetric, transitive, consistent, non-null
    // Point(1,2).equals(Point(1,2)) == true
    // Point(1,2).equals(null)        == false
    // a.equals(b) == b.equals(a)     (symmetric)
}`,
        explain: 'equals must satisfy: reflexive (x.equals(x)), symmetric, transitive, consistent, and x.equals(null) == false (never NullPointerException).'
      },
      {
        label: 'Always override hashCode when overriding equals',
        tag: 'good',
        code: `public class Point {
    private final int x, y;

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }

    // MUST override hashCode — equal objects need equal hash codes
    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}

// Why it matters:
Set<Point> set = new HashSet<>();
set.add(new Point(1, 2));
set.contains(new Point(1, 2)); // true only if hashCode is correct!`,
        explain: 'If two objects are equal via equals(), they MUST return the same hashCode(). Missing this breaks HashMap, HashSet, and any hash-based collection.'
      },
      {
        label: 'Override toString for readability',
        tag: 'good',
        code: `// BAD: default toString
Point p = new Point(3, 7);
System.out.println(p); // Point@1b6d3586  <-- useless!

// GOOD: meaningful toString
public class Point {
    private final int x, y;

    @Override
    public String toString() {
        return "Point{x=" + x + ", y=" + y + "}";
    }
}

System.out.println(p);              // Point{x=3, y=7}
System.out.println("Move to: " + p); // Move to: Point{x=3, y=7}`,
        explain: 'A good toString() makes logging and debugging dramatically easier. Include all significant fields in a readable format.'
      },
      {
        label: 'Implement Comparable consistently with equals',
        tag: 'good',
        code: `public class Version implements Comparable<Version> {
    private final int major, minor, patch;

    @Override
    public int compareTo(Version other) {
        int cmp = Integer.compare(this.major, other.major);
        if (cmp != 0) return cmp;
        cmp = Integer.compare(this.minor, other.minor);
        if (cmp != 0) return cmp;
        return Integer.compare(this.patch, other.patch);
    }
}

List<Version> versions = List.of(
    new Version(2,0,0), new Version(1,9,1), new Version(1,0,0));
Collections.sort(versions); // works correctly`,
        explain: 'compareTo should be consistent with equals. Use Integer.compare() instead of subtraction to avoid overflow. Comparable enables sorting and sorted collections.'
      }
    ]
  },
  {
    id: 'classes',
    title: 'Classes and Interfaces',
    desc: 'Encapsulation, immutability, composition, and interface design.',
    bullets: [
      {
        label: 'Minimize accessibility',
        tag: 'good',
        code: `// BAD: exposing internals
public class BankAccount {
    public double balance;
    public List<String> txHistory = new ArrayList<>();
}

// GOOD: private fields, controlled access
public class BankAccount {
    private double balance;
    private final List<String> txHistory = new ArrayList<>();

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Must be positive");
        balance += amount;
        txHistory.add("Deposit: " + amount);
    }

    public List<String> getHistory() {
        return Collections.unmodifiableList(txHistory);
    }
}`,
        explain: 'Make every field private. Expose only what is necessary via methods. This lets you change internals without breaking clients.'
      },
      {
        label: 'Favor immutability',
        tag: 'good',
        code: `public final class Money {
    private final long cents;
    private final String currency;

    public Money(long cents, String currency) {
        this.cents = cents;
        this.currency = Objects.requireNonNull(currency);
    }

    public long getCents() { return cents; }
    public String getCurrency() { return currency; }

    // Return NEW object instead of mutating
    public Money add(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("Currency mismatch");
        return new Money(cents + other.cents, currency);
    }
}

Money price = new Money(1999, "USD");
Money tax   = new Money(160,  "USD");
Money total = price.add(tax); // price unchanged`,
        explain: 'Immutable objects are inherently thread-safe, can be shared freely, and are simpler to reason about. Use final class, final fields, and no setters.'
      },
      {
        label: 'Favor composition over inheritance',
        tag: 'good',
        code: `// BAD: fragile inheritance
class InstrumentedHashSet<E> extends HashSet<E> {
    private int addCount = 0;
    @Override public boolean add(E e) { addCount++; return super.add(e); }
    @Override public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return super.addAll(c); // BUG: addAll calls add() internally!
    }                           // addCount gets doubled!
}

// GOOD: composition (wrapper pattern)
class InstrumentedSet<E> implements Set<E> {
    private final Set<E> delegate;
    private int addCount = 0;

    public InstrumentedSet(Set<E> s) { this.delegate = s; }

    @Override public boolean add(E e) { addCount++; return delegate.add(e); }
    @Override public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return delegate.addAll(c); // no double-counting!
    }
    public int getAddCount() { return addCount; }
}`,
        explain: 'Inheritance breaks encapsulation — subclasses depend on superclass implementation details. Composition wraps any implementation and is immune to internal changes.'
      },
      {
        label: 'Prefer interfaces to abstract classes',
        tag: 'good',
        code: `// Abstract class forces a single hierarchy
abstract class Shape {
    abstract double area();
    // A class can only extend ONE abstract class
}

// GOOD: interface — flexible, multiple implementations
interface Shape {
    double area();
    double perimeter();

    default String describe() {
        return String.format("Area=%.2f, Perimeter=%.2f", area(), perimeter());
    }
}

// A class can implement multiple interfaces
class Circle implements Shape, Drawable, Serializable {
    private final double radius;
    public Circle(double r) { this.radius = r; }
    public double area() { return Math.PI * radius * radius; }
    public double perimeter() { return 2 * Math.PI * radius; }
}`,
        explain: 'Interfaces allow classes to participate in multiple type hierarchies. Abstract classes lock you into a single hierarchy, which is inflexible.'
      }
    ]
  },
  {
    id: 'generics',
    title: 'Generics',
    desc: 'Type safety, wildcards, and avoiding raw types.',
    bullets: [
      {
        label: "Don't use raw types",
        tag: 'avoid',
        code: `// BAD: raw type — loses all type safety
List coins = new ArrayList();
coins.add("quarter");
coins.add(25);             // compiles! wrong type silently added
String s = (String) coins.get(1); // ClassCastException at runtime!

// GOOD: parameterized type
List<String> coins = new ArrayList<>();
coins.add("quarter");
// coins.add(25);           // compile error — caught immediately!
String s = coins.get(0);   // no cast needed`,
        explain: 'Raw types exist only for backward compatibility. Using them opts out of all generic type checking — errors appear at runtime instead of compile time.'
      },
      {
        label: 'Use bounded wildcards (PECS)',
        tag: 'good',
        code: `// PECS: Producer Extends, Consumer Super

// Producer: you READ from it — use <? extends T>
public static double sumList(List<? extends Number> numbers) {
    return numbers.stream().mapToDouble(Number::doubleValue).sum();
}
sumList(List.of(1, 2, 3));    // works with Integer
sumList(List.of(1.5, 2.5));   // works with Double
sumList(List.of(1L, 2L));     // works with Long

// Consumer: you WRITE into it — use <? super T>
public static void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}
List<Number> nums = new ArrayList<>();
addNumbers(nums); // works — Number is supertype of Integer`,
        explain: "PECS: use '? extends T' when you only read from a collection (producer), '? super T' when you only write into it (consumer). This maximizes API flexibility."
      }
    ]
  },
  {
    id: 'enums',
    title: 'Enums and Annotations',
    desc: 'Using enums, annotations, and @Override effectively.',
    bullets: [
      {
        label: 'Use enums instead of int constants',
        tag: 'good',
        code: `// BAD: int constants — no type safety
public static final int PLANET_MERCURY = 0;
public static final int PLANET_VENUS   = 1;
// nothing stops: int p = 42; // invalid planet!

// GOOD: enum with behavior
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS  (4.869e+24, 6.0518e6),
    EARTH  (5.976e+24, 6.37814e6);

    private final double mass;
    private final double radius;
    static final double G = 6.67300E-11;

    Planet(double mass, double radius) {
        this.mass = mass; this.radius = radius;
    }

    double surfaceGravity() { return G * mass / (radius * radius); }
    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}`,
        explain: 'Enums are type-safe, have built-in toString/name/ordinal, can carry data and methods, and prevent invalid values entirely.'
      },
      {
        label: 'Use @Override consistently',
        tag: 'good',
        code: `// BAD: missing @Override — silently creates overload, not override!
public class Bigram {
    private final char first, second;

    // BUG: equals(Bigram) is an OVERLOAD, not an override!
    // Object.equals(Object) is never called with this signature
    public boolean equals(Bigram b) {
        return b.first == first && b.second == second;
    }
}

// GOOD: @Override catches the mistake at compile time
public class Bigram {
    @Override
    public boolean equals(Object o) { // forced to use correct signature
        if (!(o instanceof Bigram)) return false;
        Bigram b = (Bigram) o;
        return b.first == first && b.second == second;
    }
}`,
        explain: '@Override makes the compiler verify you are actually overriding a superclass method. Without it, a wrong parameter type silently creates an overload instead.'
      }
    ]
  },
  {
    id: 'lambdas',
    title: 'Lambdas and Streams',
    desc: 'Modern Java: lambdas, method references, and streams.',
    bullets: [
      {
        label: 'Prefer lambdas to anonymous classes',
        tag: 'good',
        code: `// BAD: anonymous class — verbose
Collections.sort(words, new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return Integer.compare(s1.length(), s2.length());
    }
});

// GOOD: lambda — concise
Collections.sort(words, (s1, s2) -> Integer.compare(s1.length(), s2.length()));

// BETTER: method reference
Collections.sort(words, Comparator.comparingInt(String::length));

// Even better with List.sort
words.sort(Comparator.comparingInt(String::length));`,
        explain: 'Lambdas eliminate boilerplate for single-method interfaces. Method references are even cleaner when they directly name the operation being performed.'
      },
      {
        label: 'Use streams judiciously',
        tag: 'good',
        code: `// Streams shine for data transformation pipelines
List<String> topWords = wordList.stream()
    .filter(w -> w.length() > 4)
    .map(String::toLowerCase)
    .distinct()
    .sorted(Comparator.reverseOrder())
    .limit(10)
    .collect(Collectors.toList());

// But iterative is sometimes clearer for complex logic
// BAD: stream that's hard to follow
Optional<int[]> result = IntStream.range(0, matrix.length)
    .filter(i -> IntStream.range(0, matrix[i].length)
        .anyMatch(j -> matrix[i][j] > 100))
    .mapToObj(i -> matrix[i])
    .findFirst();

// GOOD: plain loop — obvious and debuggable
for (int[] row : matrix)
    for (int val : row)
        if (val > 100) return row;`,
        explain: 'Streams excel at filter/map/collect pipelines. For complex logic with multiple variables or when you need break/continue, plain iteration is often clearer.'
      },
      {
        label: 'Prefer Collection over Stream as return type',
        tag: 'good',
        code: `// BAD: returning Stream — caller can only iterate once!
public Stream<User> getActiveUsers() {
    return users.stream().filter(User::isActive);
}
Stream<User> s = getActiveUsers();
s.forEach(System.out::println); // ok
s.forEach(System.out::println); // IllegalStateException — stream consumed!

// GOOD: return Collection — iterate as many times as needed
public List<User> getActiveUsers() {
    return users.stream()
                .filter(User::isActive)
                .collect(Collectors.toList());
}
for (User u : getActiveUsers()) { // always safe
    System.out.println(u);
}`,
        explain: 'Streams can only be consumed once. Returning a Collection is usually safer — callers can iterate it, pass it around, or stream it themselves if they want.'
      }
    ]
  },
  {
    id: 'methods',
    title: 'Methods',
    desc: 'Parameter validation, defensive copies, and return values.',
    bullets: [
      {
        label: 'Validate parameters at method start',
        tag: 'good',
        code: `// BAD: validation missing — fails deep inside with cryptic error
public static long factorial(int n) {
    long result = 1;
    for (int i = 1; i <= n; i++) result *= i;
    return result; // wrong for n < 0 — silently returns 1
}

// GOOD: validate up front with clear error
public static long factorial(int n) {
    if (n < 0) throw new IllegalArgumentException("n must be >= 0, got: " + n);
    if (n > 20) throw new IllegalArgumentException("n > 20 overflows long");
    long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Use Objects.requireNonNull for null checks
public User(String name, String email) {
    this.name  = Objects.requireNonNull(name, "name");
    this.email = Objects.requireNonNull(email, "email");
}`,
        explain: 'Validate parameters at the start — fail fast with a clear message. This is far better than a cryptic NullPointerException deep inside the call stack.'
      },
      {
        label: 'Return empty collections, not null',
        tag: 'avoid',
        code: `// BAD: returning null — callers must always null-check
public List<Order> getOrders(User user) {
    if (user.getOrderIds().isEmpty()) return null; // forces null check!
}
List<Order> orders = getOrders(user);
if (orders != null) { // easily forgotten!
    for (Order o : orders) { ... }
}

// GOOD: return empty collection — callers iterate safely
public List<Order> getOrders(User user) {
    if (user.getOrderIds().isEmpty()) return Collections.emptyList();
    return fetchOrders(user.getOrderIds());
}
for (Order o : getOrders(user)) { // always safe, no null check needed
    System.out.println(o);
}

// For Optional — use when absence is meaningful
public Optional<User> findByEmail(String email) {
    return users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst();
}`,
        explain: 'Null return values force every caller to null-check — and callers often forget. Empty collections and Optional make the absence of a value explicit and safe.'
      }
    ]
  },
  {
    id: 'exceptions',
    title: 'Exceptions',
    desc: 'When to use checked vs unchecked, and how to write good exceptions.',
    bullets: [
      {
        label: 'Use exceptions for exceptional conditions only',
        tag: 'avoid',
        code: `// BAD: exception used for flow control (awful practice!)
try {
    int i = 0;
    while (true) {
        range[i++].process(); // relies on AIOOBE to stop!
    }
} catch (ArrayIndexOutOfBoundsException e) { /* done */ }

// GOOD: use the standard idiom
for (int i = 0; i < range.length; i++) {
    range[i].process();
}
// or even better:
for (Mountain m : range) {
    m.climb();
}`,
        explain: 'Exceptions are for exceptional conditions — not normal control flow. Using them for flow control is slower, harder to read, and masks real bugs.'
      },
      {
        label: 'Favor standard exceptions',
        tag: 'good',
        code: `// IllegalArgumentException — bad parameter value
public void setAge(int age) {
    if (age < 0 || age > 150)
        throw new IllegalArgumentException("Invalid age: " + age);
}

// IllegalStateException — wrong object state
public void start() {
    if (isRunning)
        throw new IllegalStateException("Server is already running");
}

// NullPointerException — null where not allowed
public void process(String data) {
    Objects.requireNonNull(data, "data must not be null");
}

// IndexOutOfBoundsException — index out of range
public T get(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
}

// UnsupportedOperationException — optional operation not supported
@Override public void remove() {
    throw new UnsupportedOperationException("Read-only iterator");
}`,
        explain: 'Standard exceptions are familiar to every Java developer. Reuse them instead of creating custom ones — unless you genuinely need to carry extra failure information.'
      },
      {
        label: "Don't swallow exceptions silently",
        tag: 'avoid',
        code: `// BAD: swallowing exceptions — bugs become invisible
try {
    loadConfig("app.properties");
} catch (IOException e) {
    // totally silent!
}

// BAD: bare printStackTrace — unstructured, easy to miss
try {
    loadConfig("app.properties");
} catch (IOException e) {
    e.printStackTrace();
}

// GOOD: log with context and rethrow
try {
    loadConfig("app.properties");
} catch (IOException e) {
    logger.error("Failed to load config from app.properties", e);
    throw new RuntimeException("Application startup failed", e);
}

// GOOD: if truly ignorable, document why
try {
    cache.invalidate(key);
} catch (CacheException e) {
    // Cache is best-effort; failure doesn't affect correctness
    logger.debug("Cache invalidation failed for key: {}", key, e);
}`,
        explain: 'A swallowed exception turns a bug into a mystery. Always log or rethrow. If you genuinely can ignore it, write a comment explaining exactly why.'
      }
    ]
  },
  {
    id: 'concurrency',
    title: 'Concurrency',
    desc: 'Thread safety, synchronization, and concurrent utilities.',
    bullets: [
      {
        label: 'Synchronize access to shared mutable data',
        tag: 'good',
        code: `// BAD: non-atomic increment — data race!
public class Counter {
    private long count = 0;
    public void increment() { count++; } // read-modify-write: NOT atomic!
}

// OPTION 1: synchronized — simple, correct
public class Counter {
    private long count = 0;
    public synchronized void increment() { count++; }
    public synchronized long get() { return count; }
}

// OPTION 2: AtomicLong — lock-free, high performance
public class Counter {
    private final AtomicLong count = new AtomicLong();
    public void increment() { count.incrementAndGet(); }
    public long get() { return count.get(); }
}

// OPTION 3: volatile — only for simple flags
private volatile boolean stopRequested = false;
public void requestStop() { stopRequested = true; }
public boolean isStopped() { return stopRequested; }`,
        explain: "count++ is not atomic — it's read, increment, write. Without synchronization, multiple threads can corrupt the value. Use AtomicLong or synchronized."
      },
      {
        label: 'Prefer executors and tasks over raw threads',
        tag: 'good',
        code: `// BAD: raw thread management — fragile, no pooling
Thread t = new Thread(() -> processTask(task));
t.start();

// GOOD: ExecutorService manages thread lifecycle
ExecutorService exec = Executors.newFixedThreadPool(4);
exec.submit(() -> processTask(task));
exec.submit(() -> anotherTask());
exec.shutdown();

// For scheduled tasks
ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(1);
scheduler.scheduleAtFixedRate(
    () -> checkHealth(),
    0, 30, TimeUnit.SECONDS
);`,
        explain: 'Raw threads are fragile — you manage lifecycle, exceptions, and pooling manually. ExecutorService decouples the unit of work from the thread it runs on.'
      },
      {
        label: 'Prefer concurrent utilities to wait/notify',
        tag: 'good',
        code: `// BAD: manual wait/notify — error-prone
synchronized (lock) {
    while (!condition) lock.wait();
    lock.notifyAll();
}

// GOOD: BlockingQueue for producer-consumer
BlockingQueue<Task> queue = new LinkedBlockingQueue<>(100);
queue.put(new Task("work"));  // blocks if full
Task task = queue.take();     // blocks if empty

// CountDownLatch for "wait until N things happen"
CountDownLatch ready = new CountDownLatch(workers.size());
for (Worker w : workers) {
    executor.submit(() -> { w.initialize(); ready.countDown(); });
}
ready.await();

// ConcurrentHashMap instead of synchronized HashMap
Map<String, Long> freq = new ConcurrentHashMap<>();
freq.merge(word, 1L, Long::sum); // thread-safe, lock-free`,
        explain: 'wait/notify is low-level and error-prone. BlockingQueue, CountDownLatch, and ConcurrentHashMap solve common patterns correctly and readably.'
      },
      {
        label: 'Document thread safety explicitly',
        tag: 'good',
        code: `/**
 * Thread-safe counter backed by AtomicLong.
 * All methods are safe for concurrent use without external synchronization.
 */
@ThreadSafe
public class SafeCounter { ... }

/**
 * NOT thread-safe. Instances must be confined to a single thread,
 * or access must be externally synchronized.
 */
@NotThreadSafe
public class UnsafeCounter { ... }

/**
 * Immutable and therefore inherently thread-safe.
 */
@Immutable
public final class Money { ... }`,
        explain: 'Thread safety is not obvious from the code. Document explicitly whether a class is: Immutable, ThreadSafe, ConditionallyThreadSafe, NotThreadSafe, or ThreadHostile.'
      }
    ]
  }
];
