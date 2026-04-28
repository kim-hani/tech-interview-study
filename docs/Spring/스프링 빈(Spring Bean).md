# Spring Bean

---

## 1. Spring Bean이란?

**Spring Bean**은 **Spring IoC 컨테이너가 생성하고 관리하는 객체**를 의미한다.

일반적인 자바 프로그램에서는 개발자가 직접 `new` 키워드를 사용해 객체를 생성한다.

```java
MemberService memberService = new MemberService();
```

하지만 Spring에서는 객체 생성을 개발자가 직접 수행하지 않고, Spring 컨테이너에게 맡긴다.

```java
@Service
public class MemberService {
}
```

위 클래스는 Spring에 의해 객체로 생성되고 관리된다.  
이처럼 Spring 컨테이너가 관리하는 객체를 **Bean**이라고 한다.

---

## 2. Bean을 사용하는 이유

객체를 직접 생성하면 객체 간 의존 관계를 개발자가 직접 관리해야 한다.

```java
public class MemberService {

    private MemberRepository memberRepository = new MemberRepository();
}
```

위 코드에서는 `MemberService`가 `MemberRepository`를 직접 생성한다.  
이 경우 두 클래스의 결합도가 높아진다.

Spring Bean을 사용하면 객체 생성과 의존성 주입을 Spring 컨테이너가 담당한다.

```java
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
}
```

이를 통해 객체 간 결합도를 낮추고 유지보수성을 높일 수 있다.

---

## 3. Spring IoC 컨테이너

**Spring IoC 컨테이너**는 Bean을 생성하고 관리하는 Spring의 핵심 구성 요소이다.

IoC는 **Inversion of Control**, 즉 **제어의 역전**을 의미한다.

기존 방식에서는 객체 생성과 의존 관계 설정을 개발자가 직접 제어한다.  
반면 Spring에서는 객체 생성과 의존 관계 설정을 컨테이너가 담당한다.

```text
기존 방식:
개발자 코드 → 객체 생성 및 의존 관계 설정

Spring 방식:
Spring 컨테이너 → 객체 생성 및 의존 관계 설정
```

Spring IoC 컨테이너의 대표적인 구현체는 `ApplicationContext`이다.

---

## 4. Bean 등록 방법

Spring Bean을 등록하는 대표적인 방법은 다음과 같다.

| 방법 | 설명 |
|------|------|
| `@Component` | 클래스를 자동으로 Bean으로 등록 |
| `@Service` | 비즈니스 로직 계층의 Bean 등록 |
| `@Repository` | 데이터 접근 계층의 Bean 등록 |
| `@Controller` | MVC 컨트롤러 Bean 등록 |
| `@Bean` | 설정 클래스에서 직접 Bean 등록 |

---

## 5. 컴포넌트 스캔을 통한 Bean 등록

Spring은 `@Component`가 붙은 클래스를 자동으로 탐색하여 Bean으로 등록한다.

```java
@Component
public class MemberRepository {
}
```

`@Service`, `@Repository`, `@Controller`도 내부적으로 `@Component`를 포함한다.

```java
@Service
public class MemberService {
}
```

```java
@Repository
public class MemberRepository {
}
```

```java
@Controller
public class MemberController {
}
```

따라서 위 클래스들은 모두 Spring Bean으로 등록될 수 있다.

---

## 6. `@Bean`을 통한 Bean 등록

`@Bean`은 설정 클래스에서 메서드를 통해 Bean을 직접 등록할 때 사용한다.

```java
@Configuration
public class AppConfig {

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new MemberRepository();
    }
}
```

이 방식은 외부 라이브러리 객체처럼 직접 애노테이션을 붙일 수 없는 객체를 Bean으로 등록할 때 자주 사용된다.

---

## 7. `@Component`와 `@Bean`의 차이

| 구분 | `@Component` | `@Bean` |
|------|--------------|---------|
| 사용 위치 | 클래스 | 메서드 |
| 등록 방식 | 컴포넌트 스캔으로 자동 등록 | 설정 클래스에서 수동 등록 |
| 주 사용 대상 | 직접 작성한 클래스 | 외부 라이브러리 객체 또는 세밀한 설정이 필요한 객체 |
| 예시 | `MemberService` | `DataSource`, `ObjectMapper` |

---

## 8. Bean의 기본 스코프

Spring Bean의 기본 스코프는 **singleton**이다.

여기서 singleton은 Spring 컨테이너 안에서 하나의 인스턴스만 생성하고, 이를 여러 곳에서 공유한다는 의미이다.

```java
@Service
public class MemberService {
}
```

위 Bean은 기본적으로 애플리케이션 실행 중 하나의 인스턴스만 생성된다.

---

## 9. Bean Scope의 종류

Spring Bean은 여러 스코프를 가질 수 있다.

| Scope | 설명 |
|-------|------|
| singleton | 컨테이너당 하나의 인스턴스만 생성 |
| prototype | 요청할 때마다 새로운 인스턴스 생성 |
| request | HTTP 요청마다 새로운 인스턴스 생성 |
| session | HTTP 세션마다 새로운 인스턴스 생성 |
| application | 웹 애플리케이션 전체에서 하나의 인스턴스 사용 |

가장 일반적으로 사용되는 스코프는 `singleton`이다.

---

## 10. Bean 생명주기

Spring Bean은 다음과 같은 생명주기를 가진다.

```text
객체 생성
   ↓
의존성 주입
   ↓
초기화
   ↓
사용
   ↓
소멸
```

Spring은 Bean의 생성부터 소멸까지 전체 생명주기를 관리한다.

초기화와 소멸 시점에 특정 로직을 실행하고 싶다면 다음과 같은 방법을 사용할 수 있다.

```java
@PostConstruct
public void init() {
    System.out.println("초기화 로직 실행");
}

@PreDestroy
public void destroy() {
    System.out.println("소멸 로직 실행");
}
```

---

## 11. Bean 사용 시 주의사항

### 11.1 Singleton Bean의 상태 관리

Spring Bean은 기본적으로 singleton이므로 여러 요청에서 같은 인스턴스를 공유한다.

따라서 Bean 내부에 변경 가능한 상태를 필드로 저장하면 문제가 발생할 수 있다.

```java
@Service
public class MemberService {

    private String memberName; // 공유 상태가 될 수 있으므로 주의 필요
}
```

웹 애플리케이션에서는 여러 사용자가 동시에 같은 Bean을 사용할 수 있다.  
따라서 singleton Bean은 가능하면 상태를 가지지 않는 **무상태(stateless)** 방식으로 설계하는 것이 좋다.

---

## 12. 정리

- Spring Bean은 **Spring IoC 컨테이너가 생성하고 관리하는 객체**이다.
- Bean은 객체 생성, 의존성 주입, 생명주기 관리를 Spring에 맡긴다.
- Bean 등록 방식에는 `@Component`, `@Service`, `@Repository`, `@Controller`, `@Bean` 등이 있다.
- Spring Bean의 기본 스코프는 `singleton`이다.
- singleton Bean은 하나의 인스턴스를 공유하므로 상태 관리에 주의해야 한다.
- Bean을 사용하면 객체 간 결합도를 낮추고 유지보수성과 테스트 용이성을 높일 수 있다.

---

## 핵심 키워드

- Spring Bean
- IoC Container
- ApplicationContext
- Component Scan
- `@Component`
- `@Bean`
- Singleton Scope
- Bean Lifecycle
- Dependency Injection
