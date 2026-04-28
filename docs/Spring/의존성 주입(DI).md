# DI (Dependency Injection)

---

## 1. DI란?

**DI(Dependency Injection)** 는 **의존성 주입**을 의미한다.

어떤 객체가 다른 객체를 필요로 할 때, 필요한 객체를 직접 생성하지 않고 **외부에서 전달받는 방식**이다.

예를 들어 `MemberService`가 `MemberRepository`를 사용해야 한다면, `MemberService`는 `MemberRepository`에 의존한다고 표현한다.

```java
public class MemberService {

    private MemberRepository memberRepository;
}
```

이때 `MemberRepository`를 `MemberService` 내부에서 직접 생성하지 않고 외부에서 주입받는 것이 DI이다.

---

## 2. 의존성이란?

**의존성**이란 한 객체가 다른 객체를 사용하는 관계를 의미한다.

```java
public class MemberService {

    private final MemberRepository memberRepository;

    public void join(Member member) {
        memberRepository.save(member);
    }
}
```

위 코드에서 `MemberService`는 회원 저장을 위해 `MemberRepository`를 사용한다.  
따라서 `MemberService`는 `MemberRepository`에 의존한다.

```text
MemberService → MemberRepository
```

---

## 3. DI를 사용하지 않는 경우

DI를 사용하지 않으면 객체 내부에서 직접 의존 객체를 생성한다.

```java
public class MemberService {

    private MemberRepository memberRepository = new MemberRepository();

    public void join(Member member) {
        memberRepository.save(member);
    }
}
```

이 방식의 문제점은 다음과 같다.

- `MemberService`가 `MemberRepository`의 구체 클래스에 직접 의존한다.
- 구현체를 변경하기 어렵다.
- 테스트할 때 Mock 객체나 Fake 객체로 대체하기 어렵다.
- 객체 생성 책임과 비즈니스 로직 책임이 섞인다.

즉, 객체 간 결합도가 높아진다.

---

## 4. DI를 사용하는 경우

DI를 사용하면 필요한 의존 객체를 외부에서 전달받는다.

```java
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void join(Member member) {
        memberRepository.save(member);
    }
}
```

이 경우 `MemberService`는 `MemberRepository`를 직접 생성하지 않는다.  
대신 외부에서 생성된 객체를 생성자를 통해 주입받는다.

```text
외부 객체 또는 Spring 컨테이너
        ↓
MemberRepository 생성
        ↓
MemberService에 주입
```

---

## 5. Spring에서의 DI

Spring에서는 IoC 컨테이너가 Bean을 생성하고, Bean 사이의 의존 관계를 자동으로 주입한다.

```java
@Repository
public class MemberRepository {

    public void save(Member member) {
        System.out.println("회원 저장");
    }
}
```

```java
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void join(Member member) {
        memberRepository.save(member);
    }
}
```

위 코드에서 `MemberRepository`와 `MemberService`는 모두 Spring Bean으로 등록된다.

Spring은 `MemberService`를 생성할 때 필요한 `MemberRepository` Bean을 자동으로 주입한다.

---

## 6. DI와 IoC의 관계

**IoC(Inversion of Control)** 는 **제어의 역전**을 의미한다.

객체 생성과 의존 관계 설정의 제어권이 개발자 코드에서 Spring 컨테이너로 넘어가는 것을 말한다.

**DI는 IoC를 구현하는 대표적인 방법**이다.

| 개념 | 설명 |
|------|------|
| IoC | 객체 생성과 제어 흐름을 프레임워크가 담당하는 원칙 |
| DI | 필요한 의존 객체를 외부에서 주입받는 방식 |

```text
IoC: 제어권이 컨테이너로 이동
DI: 의존 객체를 외부에서 주입
```

즉, IoC가 더 큰 개념이고, DI는 IoC를 실현하는 방식 중 하나이다.

---

## 7. DI의 종류

Spring에서 DI 방식은 크게 세 가지로 나눌 수 있다.

| 방식 | 설명 |
|------|------|
| 생성자 주입 | 생성자를 통해 의존성 주입 |
| 수정자 주입 | setter 메서드를 통해 의존성 주입 |
| 필드 주입 | 필드에 직접 의존성 주입 |

---

## 8. 생성자 주입

**생성자 주입**은 생성자를 통해 의존성을 전달받는 방식이다.

```java
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
}
```

생성자 주입은 Spring에서 가장 권장되는 방식이다.

### 생성자 주입의 장점

- 의존성을 반드시 주입받아야 객체를 생성할 수 있다.
- `final` 키워드를 사용할 수 있다.
- 객체의 불변성을 보장할 수 있다.
- 테스트 코드 작성이 쉽다.
- 순환 참조 문제를 조기에 발견할 수 있다.

---

## 9. 수정자 주입

**수정자 주입**은 setter 메서드를 통해 의존성을 주입하는 방식이다.

```java
@Service
public class MemberService {

    private MemberRepository memberRepository;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
}
```

수정자 주입은 의존성이 선택적으로 필요하거나, 객체 생성 후 의존성을 변경해야 하는 경우 사용할 수 있다.

하지만 필수 의존성에는 생성자 주입이 더 적합하다.

---

## 10. 필드 주입

**필드 주입**은 필드에 직접 `@Autowired`를 붙여 의존성을 주입하는 방식이다.

```java
@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;
}
```

필드 주입은 코드가 간결하지만 다음과 같은 단점이 있다.

- 테스트 코드에서 의존성을 직접 주입하기 어렵다.
- `final` 키워드를 사용할 수 없다.
- 의존 관계가 명시적으로 드러나지 않는다.
- Spring 컨테이너 없이 객체를 생성하기 어렵다.

따라서 실무에서는 일반적으로 생성자 주입을 권장한다.

---

## 11. DI의 장점

### 11.1 결합도 감소

객체가 구체 클래스를 직접 생성하지 않으므로 결합도가 낮아진다.

```java
public interface MemberRepository {
    void save(Member member);
}
```

```java
@Repository
public class JdbcMemberRepository implements MemberRepository {

    @Override
    public void save(Member member) {
        System.out.println("JDBC로 회원 저장");
    }
}
```

```java
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
}
```

`MemberService`는 구체 클래스가 아니라 인터페이스에 의존한다.  
따라서 구현체를 변경하더라도 `MemberService` 코드를 크게 수정하지 않아도 된다.

---

### 11.2 테스트 용이성 증가

DI를 사용하면 테스트할 때 실제 객체 대신 Mock 객체나 Fake 객체를 주입할 수 있다.

```java
MemberRepository fakeRepository = new FakeMemberRepository();
MemberService memberService = new MemberService(fakeRepository);
```

이를 통해 데이터베이스와 연결하지 않고도 Service 로직을 테스트할 수 있다.

---

### 11.3 책임 분리

DI를 사용하면 객체 생성 책임과 비즈니스 로직 책임을 분리할 수 있다.

```text
객체 생성 및 의존 관계 설정 → Spring 컨테이너
비즈니스 로직 수행 → 애플리케이션 객체
```

각 객체는 자신의 핵심 책임에 집중할 수 있다.

---

## 12. DI 사용 시 주의사항

### 12.1 순환 참조

두 객체가 서로를 의존하면 순환 참조가 발생할 수 있다.

```text
AService → BService
BService → AService
```

이러한 구조는 설계상 좋지 않은 경우가 많다.  
필요하다면 책임을 분리하거나 중간 객체를 도입해 의존 관계를 정리해야 한다.

---

### 12.2 과도한 의존성

하나의 클래스가 너무 많은 의존성을 가진다면 해당 클래스가 너무 많은 책임을 가지고 있을 가능성이 높다.

```java
public class OrderService {

    public OrderService(
        MemberRepository memberRepository,
        OrderRepository orderRepository,
        PaymentService paymentService,
        CouponService couponService,
        DeliveryService deliveryService
    ) {
    }
}
```

이 경우 클래스의 책임을 분리할 필요가 있는지 검토해야 한다.

---

## 13. 정리

- DI는 **객체가 필요한 의존 객체를 직접 생성하지 않고 외부에서 주입받는 방식**이다.
- Spring에서는 IoC 컨테이너가 Bean을 생성하고 의존 관계를 주입한다.
- DI는 IoC를 구현하는 대표적인 방법이다.
- DI를 사용하면 객체 간 결합도를 낮출 수 있다.
- 테스트 코드 작성이 쉬워지고 유지보수성이 높아진다.
- Spring에서는 일반적으로 생성자 주입을 권장한다.

---

## 핵심 키워드

- DI
- Dependency Injection
- 의존성 주입
- IoC
- Spring IoC Container
- 생성자 주입
- 수정자 주입
- 필드 주입
- 결합도 감소
- 테스트 용이성
