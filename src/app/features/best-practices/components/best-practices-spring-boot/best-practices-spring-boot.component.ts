import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-best-practices-spring-boot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-practices-spring-boot.component.html',
  styleUrl: './best-practices-spring-boot.component.css',
})
export class BestPracticesSpringBootComponent {
  sections: Section[] = [
    {
      title: 'Project Structure',
      icon: 'pi-folder',
      color: 'section-green',
      expanded: true,
      practices: [
        {
          title: 'Use a layered package structure',
          explanation:
            'Organize packages by feature, then by layer — controller, service, repository, model.',
          detail: `A well-organized package structure communicates the architecture of your application at a glance.
The most common Spring Boot structure organizes by feature first, then by technical layer. This keeps all code related to a feature together — its REST controller, business logic service, data repository, and domain model are all in the same feature package.
Avoid the flat anti-pattern where all controllers are in one package, all services in another, all repositories in another. This forces you to navigate across the entire project when working on a single feature.
The root package should match your groupId and artifactId — com.company.appname. Spring Boot's component scanning starts from the main class package and scans all sub-packages automatically, so everything under the root package is found without explicit configuration.
A shared or common package holds cross-cutting concerns — exception handlers, base classes, utility classes, and configuration that multiple features use.`,
          code: {
            good: `// Good: feature-based package structure
com.example.reserba/
  ReserbaApplication.java

  features/
    user/
      UserController.java
      UserService.java
      UserRepository.java
      User.java          // entity
      UserDto.java       // DTO
      UserMapper.java

    order/
      OrderController.java
      OrderService.java
      OrderRepository.java
      Order.java
      OrderDto.java

  shared/
    exception/
      GlobalExceptionHandler.java
      ResourceNotFoundException.java
    config/
      SecurityConfig.java
      OpenApiConfig.java`,
          },
        },
        {
          title: 'Separate DTOs from entities',
          explanation:
            'Never expose JPA entities directly in REST responses — use DTOs to control what data is exposed and prevent lazy loading issues.',
          detail: `Exposing JPA entities directly in REST responses is one of the most common Spring Boot mistakes. It creates several serious problems.
First, you expose your database schema directly to API consumers — any change to your entity (adding a column, renaming a field) becomes a breaking API change.
Second, Jackson's serialization of entities with lazy-loaded relationships causes the infamous LazyInitializationException, or worse — triggers N+1 queries as Jackson walks the entire object graph.
Third, bidirectional relationships cause infinite recursion during serialization — User has Orders, Order has User, Jackson loops forever.
DTOs (Data Transfer Objects) decouple your API contract from your data model. The DTO defines exactly what is returned — no more, no less. You can rename entity fields without changing the API, add computed fields, and aggregate data from multiple entities.
Use a mapping library like MapStruct for efficient, compile-time-checked mapping between entities and DTOs. Avoid manual mapping — it is error-prone and does not refactor safely.`,
          code: {
            bad: `// Bad: returning entity directly
@GetMapping("/users/{id}")
public User getUser(@PathVariable UUID id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Not found"));
    // Exposes all fields, causes lazy loading issues,
    // bidirectional relationships cause infinite recursion!
}`,
            good: `// Good: return DTO
@GetMapping("/users/{id}")
public UserDto getUser(@PathVariable UUID id) {
    return userService.getUser(id);
}

// UserDto — controls exactly what is exposed
public record UserDto(
    UUID id,
    String name,
    String email,
    LocalDateTime createdAt
) {}

// UserMapper — MapStruct generates implementation
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto dto);
}`,
          },
        },
      ],
    },
    {
      title: 'REST API Design',
      icon: 'pi-server',
      color: 'section-blue',
      expanded: false,
      practices: [
        {
          title: 'Use proper HTTP methods and status codes',
          explanation:
            'Use GET, POST, PUT, PATCH, DELETE semantically and return appropriate HTTP status codes for each outcome.',
          detail: `HTTP methods have defined semantics that clients, proxies, and caches rely on. Using them correctly makes your API predictable and interoperable.
GET is safe (no side effects) and idempotent (multiple calls produce the same result). POST creates a resource and is neither safe nor idempotent. PUT replaces a resource entirely and is idempotent. PATCH partially updates a resource. DELETE removes a resource and is idempotent.
Status codes communicate the outcome — 200 OK for successful GET/PUT/PATCH, 201 Created for successful POST (include a Location header pointing to the new resource), 204 No Content for successful DELETE, 400 Bad Request for validation errors, 401 Unauthorized for missing authentication, 403 Forbidden for insufficient permissions, 404 Not Found when the resource does not exist, 409 Conflict for state conflicts, 422 Unprocessable Entity for semantic validation errors.
Use ResponseEntity to control the response status and headers explicitly, or use @ResponseStatus on controller methods.
Never return 200 with an error body — it defeats the purpose of HTTP status codes and breaks error handling in clients.`,
          code: {
            bad: `// Bad: wrong HTTP methods and status codes
@PostMapping("/users/get")        // GET semantics via POST
public User getUser(@RequestBody Map<String, UUID> body) {
    return userService.getUser(body.get("id"));
}

@GetMapping("/users/create")      // mutation via GET
public User createUser(@RequestParam String name) {
    return userService.createUser(name);
    // returns 200 for creation — should be 201
}

@DeleteMapping("/users/{id}")
public Map<String, String> deleteUser(@PathVariable UUID id) {
    userService.deleteUser(id);
    return Map.of("message", "deleted"); // should be 204 No Content
}`,
            good: `// Good: correct HTTP methods and status codes
@GetMapping("/users/{id}")
public ResponseEntity<UserDto> getUser(@PathVariable UUID id) {
    return ResponseEntity.ok(userService.getUser(id));
}

@PostMapping("/users")
public ResponseEntity<UserDto> createUser(@RequestBody @Valid CreateUserRequest req) {
    UserDto created = userService.createUser(req);
    URI location = URI.create("/api/users/" + created.id());
    return ResponseEntity.created(location).body(created);
}

@PatchMapping("/users/{id}")
public ResponseEntity<UserDto> updateUser(
    @PathVariable UUID id,
    @RequestBody @Valid UpdateUserRequest req) {
    return ResponseEntity.ok(userService.updateUser(id, req));
}

@DeleteMapping("/users/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void deleteUser(@PathVariable UUID id) {
    userService.deleteUser(id);
}`,
          },
        },
        {
          title: 'Use @ControllerAdvice for global exception handling',
          explanation:
            'Centralize exception handling in one place instead of duplicating try-catch blocks across controllers.',
          detail: `Every controller method could throw exceptions — resource not found, validation failures, database errors, business rule violations. Handling each exception in every controller method leads to massive code duplication and inconsistent error responses.
@ControllerAdvice (or @RestControllerAdvice which adds @ResponseBody) creates a global exception handler that applies to all controllers. A single class handles all exceptions consistently, returning a uniform error response format.
Define a standard error response structure — include a timestamp, HTTP status, error code, human-readable message, and optionally a list of field validation errors. Every error response from your API should follow this structure so clients can handle errors uniformly.
Map your custom exceptions to HTTP status codes in one place — ResourceNotFoundException to 404, ValidationException to 400, BusinessRuleException to 422. Adding a new exception type means adding one handler method.
Use @ExceptionHandler with specific exception types — more specific handlers take precedence over general ones. Always have a catch-all handler for Exception to prevent stack traces leaking to clients.`,
          code: {
            bad: `// Bad: exception handling scattered across controllers
@GetMapping("/users/{id}")
public UserDto getUser(@PathVariable UUID id) {
    try {
        return userService.getUser(id);
    } catch (UserNotFoundException e) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
    } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error");
    }
}`,
            good: `// Good: centralized exception handling
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse(404, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .toList();
        return new ErrorResponse(400, "Validation failed", errors);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGeneral(Exception ex) {
        log.error("Unhandled exception", ex);
        return new ErrorResponse(500, "Internal server error");
    }
}

public record ErrorResponse(int status, String message, List<String> errors) {
    public ErrorResponse(int status, String message) {
        this(status, message, List.of());
    }
}`,
          },
        },
      ],
    },
    {
      title: 'Service Layer',
      icon: 'pi-cog',
      color: 'section-purple',
      expanded: false,
      practices: [
        {
          title: 'Keep controllers thin',
          explanation:
            'Controllers should only handle HTTP concerns — routing, request parsing, and response formatting. Business logic belongs in services.',
          detail: `The controller's responsibility is to translate HTTP requests into service calls and service results into HTTP responses. Nothing more.
A fat controller — one that contains business logic, database queries, or complex conditionals — is hard to test, impossible to reuse, and violates the Single Responsibility Principle.
Business logic in a controller cannot be reused by other consumers — a scheduled job, a message listener, or a different controller endpoint that needs the same logic. Logic in a service can be called from anywhere.
Testing a controller with business logic requires an HTTP context. Testing a service is a simple unit test — call the method, verify the result. Controllers should be tested with integration tests (MockMvc), services with unit tests (Mockito).
A good rule of thumb: if your controller method is longer than 10 lines, you probably have business logic that belongs in a service.`,
          code: {
            bad: `// Bad: fat controller with business logic
@PostMapping("/orders")
public ResponseEntity<OrderDto> createOrder(@RequestBody CreateOrderRequest req) {
    // business logic in controller!
    User user = userRepository.findById(req.userId())
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!user.isActive()) throw new RuntimeException("User inactive");

    List<Product> products = productRepository.findAllById(req.productIds());
    if (products.size() != req.productIds().size())
        throw new RuntimeException("Product not found");

    BigDecimal total = products.stream()
        .map(Product::getPrice)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    Order order = new Order(user, products, total);
    order = orderRepository.save(order);
    return ResponseEntity.created(...).body(orderMapper.toDto(order));
}`,
            good: `// Good: thin controller — delegates to service
@PostMapping("/orders")
public ResponseEntity<OrderDto> createOrder(
    @RequestBody @Valid CreateOrderRequest req) {
    OrderDto created = orderService.createOrder(req);
    URI location = URI.create("/api/orders/" + created.id());
    return ResponseEntity.created(location).body(created);
}

// Business logic lives in the service
@Service
@Transactional
public class OrderService {
    public OrderDto createOrder(CreateOrderRequest req) {
        User user = userRepository.findById(req.userId())
            .orElseThrow(() -> new ResourceNotFoundException("User", req.userId()));

        if (!user.isActive())
            throw new BusinessRuleException("Cannot create order for inactive user");

        List<Product> products = validateAndFetchProducts(req.productIds());
        BigDecimal total = calculateTotal(products);
        Order order = orderRepository.save(new Order(user, products, total));
        return orderMapper.toDto(order);
    }
}`,
          },
        },
        {
          title: 'Use @Transactional correctly',
          explanation:
            '@Transactional should be on the service layer, not controllers or repositories. Understand propagation and read-only transactions.',
          detail: `@Transactional is one of the most misused Spring annotations. Understanding where to put it and how it works prevents subtle data integrity bugs.
Place @Transactional on service methods, not on controllers (too broad — includes HTTP overhead) or repositories (too narrow — cannot span multiple repository calls in one transaction).
The default propagation is REQUIRED — if a transaction already exists, join it; otherwise create a new one. This means a service method calling another @Transactional service method uses the same transaction, which is usually correct.
Mark read-only operations with @Transactional(readOnly = true). This is not just documentation — it tells the JPA provider to skip dirty checking (comparing all entities against their original state), which improves performance significantly for queries.
@Transactional only works on public methods called through the Spring proxy — calling a @Transactional method from within the same class bypasses the proxy and the transaction is not applied. Use self-injection or restructure the code.
Avoid catching and swallowing RuntimeExceptions inside @Transactional methods — by default, only RuntimeExceptions trigger rollback. If you catch and handle them, Spring does not roll back.`,
          code: {
            bad: `// Bad: @Transactional in wrong places
@RestController
@Transactional  // wrong — transaction spans HTTP layer
public class UserController {

    @GetMapping("/users/{id}")
    public UserDto getUser(@PathVariable UUID id) {
        return userService.getUser(id);
    }
}

@Service
public class UserService {
    // No @Transactional — multiple DB calls not in transaction
    public void transferCredits(UUID fromId, UUID toId, int amount) {
        User from = userRepository.findById(fromId).get();
        User to = userRepository.findById(toId).get();
        from.setCredits(from.getCredits() - amount);
        to.setCredits(to.getCredits() + amount);
        userRepository.save(from);
        userRepository.save(to); // if this fails, from is already saved!
    }
}`,
            good: `// Good: @Transactional on service methods
@Service
public class UserService {

    @Transactional(readOnly = true)  // optimization for reads
    public UserDto getUser(UUID id) {
        return userRepository.findById(id)
            .map(userMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    @Transactional  // wraps both saves in one transaction
    public void transferCredits(UUID fromId, UUID toId, int amount) {
        User from = userRepository.findById(fromId)
            .orElseThrow(() -> new ResourceNotFoundException("User", fromId));
        User to = userRepository.findById(toId)
            .orElseThrow(() -> new ResourceNotFoundException("User", toId));

        if (from.getCredits() < amount)
            throw new BusinessRuleException("Insufficient credits");

        from.setCredits(from.getCredits() - amount);
        to.setCredits(to.getCredits() + amount);
        // JPA dirty checking saves both automatically at commit
    }
}`,
          },
        },
      ],
    },
    {
      title: 'Data Access',
      icon: 'pi-database',
      color: 'section-teal',
      expanded: false,
      practices: [
        {
          title: 'Avoid N+1 queries',
          explanation:
            "N+1 occurs when fetching a list of entities and then making a separate query for each entity's relationship.",
          detail: `The N+1 problem is one of the most common and damaging performance issues in Spring Boot applications using JPA. It occurs when you load a list of N entities, and then JPA issues N additional queries to load a relationship on each entity.
For example: you fetch 100 orders, then access order.getUser() on each — JPA fires 100 separate SELECT queries for users. The page loads slowly, the database is hammered, and it gets worse as data grows.
The root cause is lazy loading — JPA's default behavior is to load relationships only when accessed, which triggers a query outside the original fetch.
The fix: use JOIN FETCH in JPQL queries, @EntityGraph to specify which relationships to load eagerly for a specific query, or native queries with projections.
Enable Hibernate's SQL logging (spring.jpa.show-sql=true and format-sql=true) during development to spot N+1 problems. Tools like Hypersistence Optimizer or datasource-proxy can detect N+1 automatically.
Do not set FetchType.EAGER on relationships globally — it just moves the problem by always loading relationships even when you do not need them.`,
          code: {
            bad: `// Bad: N+1 — 1 query for orders + N queries for users
@GetMapping("/orders")
public List<OrderDto> getOrders() {
    List<Order> orders = orderRepository.findAll();
    return orders.stream()
        .map(order -> new OrderDto(
            order.getId(),
            order.getUser().getName(), // triggers query for each order!
            order.getTotal()
        ))
        .toList();
}`,
            good: `// Good: JOIN FETCH — single query with join
public interface OrderRepository extends JpaRepository<Order, UUID> {

    @Query("SELECT o FROM Order o JOIN FETCH o.user")
    List<Order> findAllWithUser();

    // Or use @EntityGraph
    @EntityGraph(attributePaths = {"user", "items", "items.product"})
    List<Order> findAll();
}

// Or use a projection — only fetch what you need
public interface OrderSummary {
    UUID getId();
    String getUserName();  // Spring Data resolves user.name
    BigDecimal getTotal();
}

List<OrderSummary> findAllProjectedBy();`,
          },
        },
        {
          title: 'Use Spring Data projections for read queries',
          explanation:
            'Projections fetch only the columns you need instead of loading entire entities — more efficient for read operations.',
          detail: `When you call repository.findAll(), JPA loads every column of every row into entity objects, including columns you never use. For entities with many fields, large text columns, or LOBs, this is wasteful.
Spring Data supports three types of projections: interface projections (define an interface with getter methods — Spring generates the implementation), class projections (define a record or class with a constructor — Spring maps columns by name), and dynamic projections (the caller specifies the projection type).
Interface projections can include derived properties — if your projection has getUserName(), Spring Data generates the SQL to load user.name with a join automatically.
Projections translate to SQL projections (SELECT id, name, email instead of SELECT *), reducing the data transferred from the database significantly for wide tables.
Use projections for list endpoints and search results where you show a summary. Use full entities only when you need to modify the data — entities participate in JPA's dirty checking mechanism.`,
          code: {
            bad: `// Bad: loading full entity for a list view
@GetMapping("/users")
public List<UserSummaryDto> getUsers() {
    return userRepository.findAll() // loads ALL columns
        .stream()
        .map(u -> new UserSummaryDto(u.getId(), u.getName(), u.getEmail()))
        .toList();
}`,
            good: `// Good: interface projection — only fetch needed columns
public interface UserSummary {
    UUID getId();
    String getName();
    String getEmail();
}

public interface UserRepository extends JpaRepository<User, UUID> {
    List<UserSummary> findAllProjectedBy();

    // With filtering
    List<UserSummary> findByActiveTrue();
}

// Good: record projection
public record UserSummaryDto(UUID id, String name, String email) {}

@Query("SELECT new com.example.UserSummaryDto(u.id, u.name, u.email) FROM User u")
List<UserSummaryDto> findAllSummaries();`,
          },
        },
      ],
    },
    {
      title: 'Configuration',
      icon: 'pi-sliders-h',
      color: 'section-orange',
      expanded: false,
      practices: [
        {
          title: 'Use @ConfigurationProperties instead of @Value',
          explanation:
            '@ConfigurationProperties binds a group of related properties to a typed class — easier to manage than individual @Value annotations.',
          detail:
            `@Value("` +
            '$' +
            `{some.property}") works for a single property, but becomes messy when you have groups of related configuration properties — database settings, AWS credentials, email configuration, feature flags.
@ConfigurationProperties binds an entire prefix of properties to a Java class. All the properties under app.mail.* map to fields in a MailProperties class, with type conversion, validation, and IDE autocompletion.
Configuration classes can use @Validated with JSR-303 annotations to validate properties at startup — if a required property is missing or has an invalid value, the application fails to start with a clear error message rather than failing at runtime.
Records work perfectly as @ConfigurationProperties — they are immutable, self-documenting, and enforce that all properties are provided at construction time.
Use @EnableConfigurationProperties on your configuration class or @ConfigurationPropertiesScan on the main class to register your properties classes.`,
          code: {
            bad: `// Bad: scattered @Value annotations
@Service
public class MailService {
    @Value("\${mail.host}")        private String host;
    @Value("\${mail.port}")        private int port;
    @Value("\${mail.username}")    private String username;
    @Value("\${mail.password}")    private String password;
    @Value("\${mail.from}")        private String from;
    @Value("\${mail.ssl.enabled}") private boolean sslEnabled;
}`,
            good: `// Good: typed configuration class
@ConfigurationProperties(prefix = "mail")
@Validated
public record MailProperties(
    @NotBlank String host,
    @Min(1) @Max(65535) int port,
    @NotBlank String username,
    @NotBlank String password,
    @Email String from,
    boolean sslEnabled
) {}

// application.yml
// mail:
//   host: smtp.gmail.com
//   port: 587
//   username: user@gmail.com
//   password: secret
//   from: noreply@example.com
//   ssl-enabled: true

@Service
@RequiredArgsConstructor
public class MailService {
    private final MailProperties mailProperties;

    public void send(String to, String subject, String body) {
        // use mailProperties.host(), mailProperties.port(), etc.
    }
}`,
          },
        },
        {
          title: 'Use profiles for environment-specific configuration',
          explanation:
            'Spring profiles separate configuration for development, testing, and production environments.',
          detail:
            `Hardcoding environment-specific values — database URLs, API keys, feature flags — is a security risk and makes deployments fragile. Spring profiles solve this by activating different configuration sets based on the environment.
Create separate application.yml files for each environment: application-dev.yml, application-test.yml, application-prod.yml. The base application.yml contains defaults that apply to all profiles.
Activate a profile at runtime via the SPRING_PROFILES_ACTIVE environment variable or the --spring.profiles.active command-line argument. In CI/CD pipelines, the deployment environment sets this variable.
Use profile-specific beans with @Profile("dev") for beans that should only exist in certain environments — an email service that prints to console in dev and sends real emails in production.
Never commit production credentials to source control — use environment variables or a secrets manager (AWS Secrets Manager, HashiCorp Vault) and reference them in application-prod.yml with ` +
            '$' +
            `{ENV_VAR_NAME} syntax.`,
          code: {
            good: `# application.yml — shared defaults
spring:
  application:
    name: reserba-api
  jpa:
    open-in-view: false

---
# application-dev.yml — development overrides
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:postgresql://localhost:5432/reserba_dev
    username: postgres
    password: postgres
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
  mail:
    host: localhost
    port: 1025  # MailHog for local email testing

---
# application-prod.yml — production overrides
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate  # never auto-migrate in prod
  mail:
    host: \${SMTP_HOST}
    password: \${SMTP_PASSWORD}`,
          },
        },
      ],
    },
    {
      title: 'Security',
      icon: 'pi-lock',
      color: 'section-red',
      expanded: false,
      practices: [
        {
          title: 'Use Spring Security with JWT correctly',
          explanation:
            'Implement stateless JWT authentication with proper token validation, expiry, and refresh token rotation.',
          detail: `JWT (JSON Web Token) authentication is stateless — the server does not store session state. Every request includes a token that contains all the information needed to authenticate and authorize the request.
The token consists of three parts: header (algorithm), payload (claims — user ID, roles, expiry), and signature. The server validates the signature with a secret key to verify the token has not been tampered with.
Short-lived access tokens (15 minutes to 1 hour) limit the damage if a token is stolen — it expires quickly. Refresh tokens (days to weeks) are stored securely (httpOnly cookie, not localStorage) and used to obtain new access tokens.
Implement token rotation — when a refresh token is used, invalidate it and issue a new one. Store issued refresh tokens in the database so they can be revoked on logout or compromise.
Always validate the algorithm in the JWT header — accepting "none" as an algorithm is a critical security vulnerability. Use a library like jjwt or nimbus-jose-jwt that handles validation correctly.
Store JWT secrets in environment variables, not in application.yml. Use asymmetric keys (RS256) for tokens verified by multiple services.`,
          code: {
            bad: `// Bad: insecure JWT implementation
@GetMapping("/profile")
public UserDto getProfile(@RequestHeader("Authorization") String token) {
    // manually parsing — no validation!
    String[] parts = token.split("\\.");
    String payload = new String(Base64.decode(parts[1]));
    String userId = parseUserId(payload); // trusting unverified payload!
    return userService.getUser(UUID.fromString(userId));
}`,
            good: `// Good: Spring Security filter validates JWT
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
        HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        String username = jwtService.extractUsername(token); // validates signature

        if (username != null && SecurityContextHolder.getContext()
                .getAuthentication() == null) {
            UserDetails user = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(token, user)) {
                UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(request, response);
    }
}`,
          },
        },
        {
          title: 'Validate all inputs',
          explanation:
            'Use Bean Validation (@Valid, @NotNull, @Size) to validate request bodies, path variables, and query parameters at the controller layer.',
          detail: `Never trust user input. Every value that enters your system from outside — request bodies, path variables, query parameters, headers — must be validated before being processed.
Spring Boot integrates with Bean Validation (JSR-303/380) through the spring-boot-starter-validation dependency. Add @Valid to @RequestBody parameters and Spring automatically validates the incoming object before the method is called.
Define constraints directly on your request record/class — @NotBlank, @Email, @Size, @Min, @Max, @Pattern, @NotNull. These are self-documenting and automatically included in OpenAPI documentation.
For custom validation logic that cannot be expressed with standard annotations, implement a custom @Constraint annotation with a ConstraintValidator.
Combine Bean Validation with your global @ControllerAdvice exception handler — catch MethodArgumentNotValidException and return a structured error response listing all validation failures.
Do not rely solely on client-side validation — it can be bypassed. Always validate on the server.`,
          code: {
            bad: `// Bad: no validation — trusting user input
@PostMapping("/users")
public UserDto createUser(@RequestBody Map<String, String> body) {
    String email = body.get("email");   // could be null, invalid, or malicious
    String name = body.get("name");     // could be empty string
    int age = Integer.parseInt(body.get("age")); // could throw NumberFormatException
    return userService.createUser(email, name, age);
}`,
            good: `// Good: validated request object
public record CreateUserRequest(
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    String email,

    @NotNull
    @Min(value = 18, message = "Must be at least 18")
    @Max(value = 120)
    Integer age,

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    String password
) {}

@PostMapping("/users")
public ResponseEntity<UserDto> createUser(
    @RequestBody @Valid CreateUserRequest req) {
    // if validation fails, MethodArgumentNotValidException is thrown
    // and handled by GlobalExceptionHandler
    return ResponseEntity.created(...).body(userService.createUser(req));
}`,
          },
        },
      ],
    },
    {
      title: 'Performance',
      icon: 'pi-bolt',
      color: 'section-indigo',
      expanded: false,
      practices: [
        {
          title: 'Use caching for expensive operations',
          explanation:
            "Spring's @Cacheable reduces database and computation load for frequently-read, rarely-changed data.",
          detail: `Caching is one of the most impactful performance optimizations available. If a method produces the same output for the same input and the data rarely changes, caching the result eliminates redundant computation and database queries.
Spring's caching abstraction (@Cacheable, @CacheEvict, @CachePut) works with any cache provider — in-memory (Caffeine), distributed (Redis), or JCache-compatible implementations. Switching providers requires no code changes.
@Cacheable checks the cache before calling the method — if a cached value exists for the key, it returns immediately without executing the method. @CacheEvict removes entries from the cache, typically on mutations. @CachePut always executes the method and updates the cache.
Choose the right cache provider for your needs: Caffeine for single-instance in-memory caching (very fast, no network overhead), Redis for distributed caching across multiple instances or for persistence.
Set appropriate TTL (time to live) for cached data. Caching without expiry leads to stale data. Choose TTL based on how often the data changes and how stale it can be.`,
          code: {
            bad: `// Bad: no caching — hits database on every request
@GetMapping("/products/{id}")
public ProductDto getProduct(@PathVariable UUID id) {
    return productService.getProduct(id);
    // same query runs for every request, even for popular products
}`,
            good: `// Good: cache product lookups
@Service
public class ProductService {

    @Cacheable(value = "products", key = "#id")
    @Transactional(readOnly = true)
    public ProductDto getProduct(UUID id) {
        return productRepository.findById(id)
            .map(productMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }

    @CacheEvict(value = "products", key = "#id")
    @Transactional
    public ProductDto updateProduct(UUID id, UpdateProductRequest req) {
        // cache is cleared when product is updated
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product", id));
        productMapper.updateEntity(req, product);
        return productMapper.toDto(product);
    }
}

// application.yml — Caffeine cache configuration
// spring:
//   cache:
//     type: caffeine
//     caffeine:
//       spec: maximumSize=1000,expireAfterWrite=10m`,
          },
        },
        {
          title: 'Use pagination for list endpoints',
          explanation:
            'Never return unbounded lists — always paginate to protect the server from memory exhaustion and the client from large payloads.',
          detail: `Returning all records from a table without pagination is a serious scalability problem. A table with 10 rows is fine — a table with 10 million rows will crash your server when someone calls the list endpoint.
Spring Data's Pageable abstraction makes pagination straightforward — pass a Pageable parameter to repository methods and Spring Data generates the appropriate LIMIT/OFFSET SQL automatically.
Return Page<T> or Slice<T> from paginated endpoints. Page includes the total element count (requires an additional COUNT query), which is useful for building pagination UI. Slice is cheaper — it only checks if there is a next page.
Expose pagination parameters as query parameters — page, size, sort. Set reasonable defaults and maximums — limit size to a maximum of 100 even if the client requests more.
For cursor-based pagination (more efficient for large datasets and real-time data), use a stable, indexed field like createdAt or id as the cursor instead of OFFSET, which degrades with large offsets.`,
          code: {
            bad: `// Bad: unbounded list — will fail at scale
@GetMapping("/users")
public List<UserDto> getUsers() {
    return userRepository.findAll() // loads ALL users!
        .stream()
        .map(userMapper::toDto)
        .toList();
}`,
            good: `// Good: paginated endpoint
@GetMapping("/users")
public Page<UserDto> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "createdAt") String sortBy) {

    int safeSize = Math.min(size, 100); // cap at 100
    Pageable pageable = PageRequest.of(page, safeSize,
        Sort.by(Sort.Direction.DESC, sortBy));

    return userRepository.findAll(pageable)
        .map(userMapper::toDto);
}

// Response includes pagination metadata:
// {
//   "content": [...],
//   "page": { "size": 20, "number": 0,
//             "totalElements": 1500, "totalPages": 75 }
// }`,
          },
        },
      ],
    },
  ];

  highlight(code: string): string {
    return hljs.highlight(code, { language: 'java' }).value;
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
