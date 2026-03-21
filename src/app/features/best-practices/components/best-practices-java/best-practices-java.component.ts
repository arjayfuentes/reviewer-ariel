import { Component, computed, signal } from '@angular/core';
import { Chapter, CHAPTERS } from '../../models/effective-java.model';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-best-practices-java',
  imports: [CommonModule],
  templateUrl: './best-practices-java.component.html',
  styleUrl: './best-practices-java.component.css',
})
export class BestPracticesJavaComponent {
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

  sections: Section[] = [
    {
      title: 'Creating and Destroying Objects',
      icon: 'pi-box',
      color: 'section-blue',
      expanded: true,
      practices: [
        {
          title: 'Use static factory methods instead of constructors',
          explanation:
            'Static factory methods have names, can return cached instances, and can return subtypes — making APIs easier to use and more flexible.',
          detail: `Static factory methods offer several advantages over public constructors.
Unlike constructors, they have meaningful names — BigInteger.probablePrime() clearly communicates intent compared to new BigInteger(int, int, Random).
They are not required to create a new object each time they are invoked — they can return cached instances like Boolean.valueOf(true) always returns the same Boolean.TRUE object.
They can return any subtype of the return type, allowing APIs to return objects without making their classes public — this is the basis of interface-based frameworks like java.util.Collections.
The returned object's class can also vary from call to call based on input parameters — EnumSet uses RegularEnumSet or JumboEnumSet internally based on the enum size, completely transparently to the caller.
The main limitation is that classes providing only static factory methods and no public/protected constructors cannot be subclassed.`,
          code: {
            bad: `// Bad: constructor gives no context
BigInteger b = new BigInteger(int, int, Random);`,
            good: `// Good: factory method is self-documenting
BigInteger prime = BigInteger.probablePrime(bitLength, random);

// Can also cache instances
public static Boolean valueOf(boolean b) {
    return b ? Boolean.TRUE : Boolean.FALSE;
}`,
          },
        },
        {
          title: 'Use builders for many parameters',
          explanation:
            'When a constructor has many optional parameters, the Builder pattern is more readable and less error-prone than telescoping constructors.',
          detail: `The telescoping constructor pattern — where you provide a constructor with only required parameters, another with one optional parameter, another with two, and so on — does not scale well.
With many parameters, client code becomes hard to write and even harder to read. What does new Pizza(true, false, true, false, true) mean?
The JavaBeans pattern (using setters) allows inconsistency — an object may be in an inconsistent state partway through construction, and it precludes the possibility of making the class immutable.
The Builder pattern combines the safety of the telescoping constructor with the readability of the JavaBeans pattern. The client calls a constructor with the required parameters to get a builder object, then calls setter-like methods on it, and finally calls a parameter-less build() method to generate the object.
Builders are especially useful when designing classes whose constructors or static factories have more than a handful of parameters. The builder can fill in some fields with defaults, and the resulting code is much easier to read and write.`,
          code: {
            bad: `// Bad: telescoping constructors — hard to read
Person p = new Person("John", 30, "NYC", null, null, "Engineer");`,
            good: `// Good: Builder pattern
Person p = new Person.Builder("John", 30)
    .city("NYC")
    .occupation("Engineer")
    .build();

public static class Builder {
    private final String name;
    private final int age;
    private String city = "";
    private String occupation = "";

    public Builder(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public Builder city(String val)       { city = val; return this; }
    public Builder occupation(String val) { occupation = val; return this; }
    public Person build() { return new Person(this); }
}`,
          },
        },
        {
          title: 'Avoid unnecessary objects and autoboxing',
          explanation:
            'Reuse immutable objects and avoid autoboxing in tight loops — it silently creates unnecessary Long/Integer wrapper objects.',
          detail: `Creating unnecessary objects is wasteful and can significantly impact performance, especially in tight loops.
Autoboxing is particularly dangerous because it is invisible — the compiler silently converts between primitives and their boxed equivalents. When you declare Long sum = 0L and then add a long to it in a loop, Java creates a new Long object on every single iteration.
In a loop running Integer.MAX_VALUE times, that is over 2 billion unnecessary Long objects being created and immediately garbage collected.
The fix is simple: prefer primitives over boxed primitives, and watch out for unintentional autoboxing.
Beyond autoboxing, avoid creating new instances of immutable objects like String — use string literals instead of new String("..."), which always creates an unnecessary new object.
For mutable objects that are expensive to create, consider using the Flyweight pattern or object pooling. However, do not go overboard — maintaining your own object pool complicates code, increases memory footprint, and can actually harm performance in modern JVMs with fast garbage collectors.`,
          code: {
            bad: `// Bad: creates millions of unnecessary Long objects
Long sum = 0L;
for (long i = 0; i < Integer.MAX_VALUE; i++) {
    sum += i; // autoboxing every iteration!
}`,
            good: `// Good: use primitive long
long sum = 0L;
for (long i = 0; i < Integer.MAX_VALUE; i++) {
    sum += i;
}`,
          },
        },
      ],
    },
    {
      title: 'Methods Common to All Objects',
      icon: 'pi-objects-column',
      color: 'section-green',
      expanded: false,
      practices: [
        {
          title: 'Always override equals consistently',
          explanation:
            'equals() must be reflexive, symmetric, transitive, consistent, and return false for null.',
          detail: `The equals contract has five requirements that must all be satisfied: reflexivity (x.equals(x) must be true), symmetry (if x.equals(y) then y.equals(x)), transitivity (if x.equals(y) and y.equals(z) then x.equals(z)), consistency (repeated calls return the same result), and non-nullity (x.equals(null) must return false).
The most common violation is symmetry — especially when trying to make equals() work across different types. If CaseInsensitiveString.equals() accepts regular Strings but String.equals() does not accept CaseInsensitiveString, the relationship is asymmetric, which breaks any collection that relies on equals().
Transitivity is impossible to preserve if you add a value component to a class while using instanceof checks. The workaround is to favor composition over inheritance in such cases — add a field of the parent type instead of extending it.
A high-quality equals method should use == first to check for reference equality (a performance optimization), then instanceof to check the type, then cast and compare all significant fields.
Use Objects.equals(a, b) for fields that may be null to avoid NullPointerExceptions.`,
          code: {
            bad: `// Bad: breaks symmetry
class CaseInsensitiveString {
    public boolean equals(Object o) {
        if (o instanceof CaseInsensitiveString)
            return s.equalsIgnoreCase(((CaseInsensitiveString) o).s);
        if (o instanceof String) // breaks symmetry!
            return s.equalsIgnoreCase((String) o);
        return false;
    }
}`,
            good: `// Good: only compare same types
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof CaseInsensitiveString)) return false;
    CaseInsensitiveString cis = (CaseInsensitiveString) o;
    return s.equalsIgnoreCase(cis.s);
}`,
          },
        },
        {
          title: 'Always override hashCode when overriding equals',
          explanation:
            'Equal objects must have equal hash codes. Failing to override hashCode breaks HashMap, HashSet, and other hash-based collections.',
          detail: `The contract between equals() and hashCode() is fundamental to Java's collection framework: if two objects are equal according to equals(), they must have the same hashCode().
If you override equals() but not hashCode(), your class will violate this contract. The symptom is subtle and devastating — objects that you put into a HashMap or HashSet simply cannot be found, because the hash bucket lookup uses hashCode() first, and the wrong bucket is searched.
A good hash function should distribute unequal instances uniformly across all possible hash values. The simplest correct approach is to use Objects.hash(field1, field2, ...) which handles null safety and produces a reasonable distribution.
For performance-critical classes, you may want to cache the hash code if it is expensive to compute and the object is immutable. Initialize the cached field to 0 (the "uninitialized" sentinel) and compute lazily on first call.
Never exclude significant fields from the hash code computation just to improve performance — it degrades hash table performance and breaks the contract.`,
          code: {
            bad: `// Bad: forgot hashCode — breaks HashMap
class Point {
    int x, y;
    @Override public boolean equals(Object o) { ... }
    // missing hashCode!
}
Map<Point, String> map = new HashMap<>();
map.put(new Point(1,2), "hello");
map.get(new Point(1,2)); // returns null!`,
            good: `// Good: consistent hashCode
@Override
public int hashCode() {
    return Objects.hash(x, y);
}`,
          },
        },
      ],
    },
    {
      title: 'Classes and Interfaces',
      icon: 'pi-sitemap',
      color: 'section-purple',
      expanded: false,
      practices: [
        {
          title: 'Favor composition over inheritance',
          explanation:
            'Inheritance breaks encapsulation — a subclass depends on the implementation details of its superclass.',
          detail: `Inheritance is appropriate only when a genuine is-a relationship exists between the subclass and the superclass — and even then, only when the superclass is designed and documented for inheritance.
The fundamental problem with inheritance across package boundaries is that it violates encapsulation. A subclass depends on the implementation details of its superclass. If the superclass changes in a subsequent release, the subclass may break, even if its code has not been touched.
The classic example is extending HashSet to count how many elements have been added. The addAll() method in HashSet is implemented by calling add() repeatedly — so if you override both methods and count in each, addAll() double counts. This is an implementation detail that is not documented in the API.
Composition solves this elegantly: instead of extending, give the new class a private field that references an instance of the existing class. The new class's methods invoke methods on the contained instance — this is called forwarding.
The resulting class is called a wrapper class (or decorator). It is robust against changes in the inner class and does not depend on its implementation details.
Only use inheritance when every instance of the subclass is genuinely an instance of the superclass — ask yourself: is every B really an A?`,
          code: {
            bad: `// Bad: extends to add counting — breaks with addAll()
class CountingHashSet<E> extends HashSet<E> {
    private int addCount = 0;
    @Override public boolean add(E e) {
        addCount++;
        return super.add(e);
    }
    @Override public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return super.addAll(c); // calls add() internally — double counts!
    }
}`,
            good: `// Good: composition — wrap instead of extend
class CountingSet<E> {
    private final Set<E> set = new HashSet<>();
    private int addCount = 0;

    public boolean add(E e) {
        addCount++;
        return set.add(e);
    }
    public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return set.addAll(c);
    }
    public int getAddCount() { return addCount; }
}`,
          },
        },
        {
          title: 'Favor immutability',
          explanation: 'Immutable classes are simpler, thread-safe, and can be shared freely.',
          detail: `An immutable class is one whose instances cannot be modified. All of the information contained in each instance is fixed for the lifetime of the object — no method can produce an externally visible change in state.
Immutable objects are inherently thread-safe — they require no synchronization. They cannot be corrupted by multiple threads accessing them concurrently. This is by far the easiest approach to thread safety.
Immutable objects can be shared freely. Not only can you share immutable objects, but you can share their internals. For example, BigInteger uses sign-magnitude representation internally, and its negate() method reuses the same magnitude array in the returned object.
Immutable objects make great building blocks for other objects — it is much easier to maintain the invariants of a complex object if you know that its component objects will not change.
The only real disadvantage of immutable classes is that they require a separate object for each distinct value. If you need to perform a multistep operation that generates a new object at every step, this can be expensive. Use a mutable companion class (like StringBuilder for String) when this is a concern.
To make a class immutable: don't provide methods that modify state, ensure the class can't be extended (use final), make all fields final and private, ensure exclusive access to any mutable components.`,
          code: {
            good: `// Good: immutable class
public final class Money {
    private final BigDecimal amount;
    private final Currency currency;

    public Money(BigDecimal amount, Currency currency) {
        this.amount = Objects.requireNonNull(amount);
        this.currency = Objects.requireNonNull(currency);
    }

    public Money add(Money other) {
        return new Money(this.amount.add(other.amount), currency);
    }

    public BigDecimal getAmount()   { return amount; }
    public Currency getCurrency()   { return currency; }
}`,
          },
        },
      ],
    },
    {
      title: 'Generics',
      icon: 'pi-code',
      color: 'section-orange',
      expanded: false,
      practices: [
        {
          title: "Don't use raw types",
          explanation: 'Raw types lose all type safety. Always parameterize generic types.',
          detail: `A raw type is a generic type used without any type parameters — for example, List instead of List<String>. Raw types exist for compatibility with pre-generics code, but you should never use them in new code.
If you use raw types, you lose all the safety and expressiveness benefits of generics. The error caused by a raw type will surface at runtime — potentially far from the code that caused it — rather than at compile time where it is cheapest to fix.
Consider the difference: if you use List<Stamp>, the compiler will prevent you from adding a Coin at compile time. If you use the raw List, the compiler inserts a cast when you retrieve the element, and you get a ClassCastException at an unexpected point in the program.
If you want to use a generic type but you don't know or care what the type parameter is, use the unbounded wildcard type List<?> instead of the raw type List. You can't put any element (other than null) into a Collection<?>, which gives you type safety.
The exceptions are: class literals (List.class, not List<String>.class) and instanceof checks (use o instanceof List, not o instanceof List<String>).`,
          code: {
            bad: `// Bad: raw type — unsafe cast at runtime
List stamps = new ArrayList();
stamps.add(new Coin()); // compiles but wrong!
Stamp s = (Stamp) stamps.get(0); // ClassCastException at runtime`,
            good: `// Good: parameterized type catches errors at compile time
List<Stamp> stamps = new ArrayList<>();
stamps.add(new Coin()); // compile error — caught early!`,
          },
        },
        {
          title: 'Use bounded wildcards (PECS rule)',
          explanation:
            'Producer Extends, Consumer Super. Use <? extends T> when reading, <? super T> when writing.',
          detail: `The PECS mnemonic — Producer Extends, Consumer Super — helps you remember which wildcard to use.
If a parameterized type represents a T producer (you read T values from it), use <? extends T>. If it represents a T consumer (you write T values into it), use <? super T>. If it does both, use no wildcard at all — use the exact type T.
For pushAll(Iterable<E> src), the Iterable is producing E values for the stack. So the type should be Iterable<? extends E> — this allows passing an Iterable<Integer> to a Stack<Number> since Integer extends Number.
For popAll(Collection<E> dst), the collection is consuming E values from the stack. So the type should be Collection<? super E> — this allows passing a Collection<Object> to a Stack<Number> since Object is a supertype of Number.
Do not use bounded wildcards as return types — if the user of a class has to think about wildcard types, there is probably something wrong with its API. The wildcards should be invisible to the user.
Comparables and Comparators are always consumers — so use Comparable<? super T> and Comparator<? super T> for maximum flexibility.`,
          code: {
            good: `// PECS: Producer Extends
public void pushAll(Iterable<? extends E> src) {
    for (E e : src) push(e);
}

// PECS: Consumer Super
public void popAll(Collection<? super E> dst) {
    while (!isEmpty()) dst.add(pop());
}

Stack<Number> stack = new Stack<>();
stack.pushAll(List.of(1, 2, 3));     // Integer extends Number ✓
Collection<Object> objs = new ArrayList<>();
stack.popAll(objs);                   // Object super Number ✓`,
          },
        },
      ],
    },
    {
      title: 'Enums and Annotations',
      icon: 'pi-list',
      color: 'section-teal',
      expanded: false,
      practices: [
        {
          title: 'Use enums instead of int constants',
          explanation:
            'Enums are type-safe, readable, and can carry behavior. Int constants have no type safety.',
          detail: `The int enum pattern — using public static final int constants — has many shortcomings.
It provides nothing in the way of type safety. If a method expects a PLANET constant but you pass an APPLE constant (both ints), the compiler won't complain.
Programs that use int enums are brittle — because they are compiled into the clients that use them, if the int associated with an enum constant changes, its clients must be recompiled.
There is no easy way to iterate over all the int enum constants in a group, or even to print their names — you just get a number.
Java's enum type solves all of these problems. Enums are classes that export one instance per enumeration constant via public static final fields. They are a generalization of singletons, which are single-element enums.
Enums provide compile-time type safety — if you declare a parameter of type Planet, you are guaranteed that any non-null object passed will be one of the valid Planet values.
Enums can have fields and methods — this is powerful because behavior can be associated with each constant. You can even have abstract methods that each constant implements differently (the constant-specific method body pattern).`,
          code: {
            bad: `// Bad: int constants — no type safety
public static final int PLANET_MERCURY = 0;
public static final int PLANET_VENUS   = 1;
// Nothing stops: int planet = 42;`,
            good: `// Good: enum with behavior
public enum Planet {
    MERCURY(3.302e+23, 2.439e6),
    VENUS  (4.869e+24, 6.052e6),
    EARTH  (5.975e+24, 6.378e6);

    private final double mass;
    private final double radius;
    static final double G = 6.67300E-11;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    double surfaceGravity() {
        return G * mass / (radius * radius);
    }
}`,
          },
        },
      ],
    },
    {
      title: 'Lambdas and Streams',
      icon: 'pi-arrow-right-arrow-left',
      color: 'section-red',
      expanded: false,
      practices: [
        {
          title: 'Prefer lambdas to anonymous classes',
          explanation: 'Lambdas are more concise for functional interfaces.',
          detail: `Historically, anonymous classes were the way to create small function objects on the fly. In Java 8, functional interfaces (interfaces with a single abstract method) and lambdas were introduced, making it possible to create instances of functional interfaces concisely.
Lambdas are similar in function to anonymous classes, but far more concise. A Comparator that used to take 5 lines as an anonymous class takes 1 line as a lambda.
Omit the types of all lambda parameters unless their presence makes the program clearer — the compiler can usually infer them from context using a process called type inference.
Unlike methods and classes, lambdas lack names and documentation. If a computation is not self-explanatory or exceeds a few lines, don't use a lambda. Three lines is a reasonable maximum.
Lambdas cannot obtain a reference to themselves — the this keyword in a lambda refers to the enclosing instance. If you need to refer to the function object from within its body (for recursive implementations), use an anonymous class instead.
One important limitation: lambdas cannot reliably serialize and deserialize across implementations. Never make a lambda serializable unless it is absolutely necessary.`,
          code: {
            bad: `// Bad: verbose anonymous class
Collections.sort(words, new Comparator<String>() {
    public int compare(String s1, String s2) {
        return Integer.compare(s1.length(), s2.length());
    }
});`,
            good: `// Good: lambda
Collections.sort(words,
    (s1, s2) -> Integer.compare(s1.length(), s2.length()));

// Even better: method reference
words.sort(Comparator.comparingInt(String::length));`,
          },
        },
        {
          title: 'Use streams judiciously',
          explanation:
            'Streams are powerful but not always more readable. Iterative code is often clearer for complex logic.',
          detail: `The streams API was added in Java 8 to ease the task of performing bulk operations, sequentially or in parallel. It provides two key abstractions: the stream (a finite or infinite sequence of data elements) and the stream pipeline (a multi-stage computation on these elements).
Stream pipelines are evaluated lazily — evaluation doesn't start until the terminal operation is invoked, and data elements not required are never computed. This lazy evaluation is what makes infinite streams possible.
However, streams are not always the right tool. Code blocks in iterative loops can read or modify any local variable in scope. Lambdas can only read final or effectively-final variables and cannot modify local variables.
There are things you cannot do from lambdas: throw checked exceptions, or return from the enclosing method, or break/continue an enclosing loop.
Streams work best for: uniformly transforming sequences of elements, filtering sequences, combining sequences using operations like addition or concatenation, accumulating sequences into collections, and searching sequences for an element satisfying some criterion.
Streams are a poor fit for: processing elements from multiple stages of a pipeline simultaneously (you cannot access the intermediate values once they've been mapped), or when you need to use char values (Java's char streams are not true streams).
If you are unsure whether a task is better served by streams or iteration, try both and see which looks better.`,
          code: {
            bad: `// Bad: overly complex stream — hard to follow
Map<String, Long> freq = words.stream()
    .collect(groupingBy(String::toLowerCase, counting()))
    .entrySet().stream()
    .filter(e -> e.getValue() > 1)
    .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
    .limit(10)
    .collect(toMap(Map.Entry::getKey,
        Map.Entry::getValue, (e1,e2)->e1, LinkedHashMap::new));`,
            good: `// Good: clear iterative approach for complex logic
Map<String, Long> freq = new HashMap<>();
for (String word : words)
    freq.merge(word.toLowerCase(), 1L, Long::sum);

List<String> topTen = freq.entrySet().stream()
    .filter(e -> e.getValue() > 1)
    .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
    .limit(10)
    .map(Map.Entry::getKey)
    .collect(toList());`,
          },
        },
      ],
    },
    {
      title: 'Exceptions',
      icon: 'pi-exclamation-triangle',
      color: 'section-yellow',
      expanded: false,
      practices: [
        {
          title: "Don't use exceptions for flow control",
          explanation:
            'Exceptions are for exceptional conditions only. Using them for flow control is slow and obscures intent.',
          detail: `Exceptions are, as their name implies, designed for use in exceptional conditions. They should never be used for ordinary control flow.
Using exception-based loops is wrong for three reasons: they are non-standard and confuse programmers, they make code hard to debug (a bug in the loop body is disguised as a normal termination), and exception-based looping can be 70 times slower than the standard loop idiom because exceptions are designed for exceptional circumstances — JVMs often don't optimize them.
A well-designed API should not force clients to use exceptions for ordinary control flow. If a class has a state-dependent method that can only be invoked under certain circumstances, it should have a separate state-testing method. For example, Iterator has the hasNext() method so you don't need to catch NoSuchElementException.
An alternative to state-testing is to have the state-dependent method return an Optional or a special-case return value (like null) if it cannot perform the desired computation. Use Optional when there is no obvious special-case value, and a state-testing method otherwise.`,
          code: {
            bad: `// Bad: exception-based loop termination
try {
    int i = 0;
    while (true) range[i++].climb();
} catch (ArrayIndexOutOfBoundsException e) {
    // done
}`,
            good: `// Good: standard loop
for (Mountain m : range) m.climb();

// Good: state-testing method instead of exception
// Use hasNext() — don't catch NoSuchElementException
Iterator<Foo> i = collection.iterator();
while (i.hasNext()) {
    Foo foo = i.next();
}`,
          },
        },
        {
          title: "Don't swallow exceptions silently",
          explanation: 'An empty catch block hides failures and makes bugs impossible to diagnose.',
          detail: `An empty catch block defeats the purpose of exceptions. Exceptions exist so that you can be alerted when something goes wrong — an empty catch block discards that information entirely.
At the absolute minimum, the catch block should contain a comment explaining why it is appropriate to ignore the exception. If you choose to ignore it, the variable should be named ignored.
More commonly, you should either recover from the exception (checking preconditions and retrying), rethrow it (possibly wrapped in a more informative exception), or log it and continue if the failure is truly non-critical.
Rethrowing exceptions as a different type is especially useful for abstracting over implementation details. A higher-level method should not propagate implementation-specific low-level exceptions — it should catch them and rethrow as exceptions appropriate to the higher level of abstraction. This is called exception translation.
Exception chaining (passing the original exception as the cause of the new one) preserves the information from the lower-level exception for debugging, while presenting a clean API to callers.`,
          code: {
            bad: `// Bad: swallowed exception — silent failure
try {
    doSomething();
} catch (Exception e) {
    // do nothing — hides the bug!
}`,
            good: `// Good: at minimum, log it
try {
    doSomething();
} catch (Exception e) {
    log.error("Failed to do something", e);
    throw new RuntimeException("Operation failed", e);
}

// Good: exception translation
try {
    return store.get(key);
} catch (StorageException e) {
    throw new ServiceException("Could not retrieve " + key, e);
}`,
          },
        },
      ],
    },
    {
      title: 'Concurrency',
      icon: 'pi-sync',
      color: 'section-indigo',
      expanded: false,
      practices: [
        {
          title: 'Prefer executors and tasks over raw threads',
          explanation:
            'The java.util.concurrent executor framework handles thread lifecycle, pooling, and error handling far better than raw threads.',
          detail: `Managing raw threads directly is error-prone and verbose. You have to handle thread creation, lifecycle, exception handling, and resource cleanup manually.
The Executor Framework (java.util.concurrent) separates the unit of work (tasks — Runnable or Callable) from the mechanism that executes them (executors). This gives you enormous flexibility and power.
For a small program or lightly loaded server, Executors.newCachedThreadPool() is generally a good choice — it creates threads on demand and reuses idle ones. For a production server under heavy load, use Executors.newFixedThreadPool() to cap the number of threads, or use ThreadPoolExecutor directly for maximum control.
Not only should you refrain from writing your own work queues, but you should generally refrain from working directly with threads. The key abstraction is now the executor service — not the thread. Tasks submitted to an executor service decouple what work is done from when and how it gets done.
For scheduled tasks, use ScheduledThreadPoolExecutor instead of Timer. Timer uses only a single thread, so a long-running task can delay subsequent tasks. Also, if a timer thread throws an unchecked exception, the timer silently stops. ScheduledThreadPoolExecutor handles this gracefully.`,
          code: {
            bad: `// Bad: raw thread management
Thread t = new Thread(() -> processTask(task));
t.start();
// No pooling, no error handling, no lifecycle management`,
            good: `// Good: executor service
ExecutorService executor = Executors.newFixedThreadPool(4);

Future<?> future = executor.submit(() -> processTask(task));

try {
    future.get(30, TimeUnit.SECONDS);
} catch (TimeoutException e) {
    future.cancel(true);
} finally {
    executor.shutdown();
    executor.awaitTermination(60, TimeUnit.SECONDS);
}`,
          },
        },
        {
          title: 'Synchronize access to shared mutable data',
          explanation:
            'Without synchronization, one thread may not see changes made by another. Use volatile for simple flags.',
          detail: `The Java language specification guarantees that reading or writing a variable is atomic unless the variable is of type long or double. But atomicity of reads and writes does not mean that changes are immediately visible to other threads — that requires synchronization.
Without synchronization, the JVM is free to perform optimizations like hoisting (moving a read of a variable out of a loop and caching it in a register). This is why a background thread checking a boolean flag may never see it set to true by the main thread — the JVM has cached the original value.
The volatile modifier guarantees that reads and writes to the variable are always done from main memory rather than from a CPU register or cache. It solves the visibility problem but not atomicity — for compound actions like check-then-act or read-modify-write, you still need synchronized or AtomicXxx classes.
The safest approach is to confine mutable data to a single thread. If you need to share data between threads, the options in order of increasing complexity are: use immutable objects, use volatile for simple flags, use synchronized blocks for compound actions, or use java.util.concurrent.atomic classes like AtomicLong for high-performance thread-safe access to single variables.
When in doubt, share immutable data or don't share at all.`,
          code: {
            bad: `// Bad: no synchronization — thread may never stop
private static boolean stopRequested = false;

public static void main(String[] args) throws Exception {
    Thread t = new Thread(() -> {
        while (!stopRequested) i++; // may loop forever!
    });
    t.start();
    TimeUnit.SECONDS.sleep(1);
    stopRequested = true;
}`,
            good: `// Good: volatile ensures visibility
private static volatile boolean stopRequested = false;

// Or use AtomicBoolean for compound actions
private static final AtomicBoolean stopRequested =
    new AtomicBoolean(false);

// Or use synchronized for full mutual exclusion
private static synchronized void requestStop() {
    stopRequested = true;
}
private static synchronized boolean stopRequested() {
    return stopRequested;
}`,
          },
        },
      ],
    },
  ];

  highlight(code: string): string {
    return hljs.highlight(code, { language: 'java' }).value;
  }

  toggleSection(section: Section): void {
    section.expanded = !section.expanded;
  }
}
