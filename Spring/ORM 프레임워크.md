# ORM 프레임워크

---

## 1. ORM(Object-Relational Mapping)이란?

**ORM(Object-Relational Mapping)** 은 객체 지향 프로그래밍(OOP)에서 사용하는 **객체(Object)** 와 **관계형 데이터베이스(RDB)** 에서</br> 
사용하는 **테이블(Relation)** 간의 불일치를 해소하기 위해 등장한 기술이다.  


즉, 자바의 **클래스/객체 ↔ 데이터베이스의 테이블/레코드**를 자동으로 매핑하여,  
개발자가 SQL 문장을 직접 작성하지 않고도 데이터베이스 조작이 가능하도록 지원한다.  

### 개념적 배경
- 객체 지향 세계는 **추상화, 상속, 다형성** 등 풍부한 모델링 개념을 제공한다.  
- 반면 관계형 데이터베이스는 **정규화된 테이블, 외래 키, 조인** 같은 관계적 개념을 중심으로 한다.  
- 이 둘의 구조적 불일치(Object-Relational Impedance Mismatch)를 해결하기 위해 ORM이 필요하다.  

---

## 2. Spring에서 ORM 프레임워크

- **JPA (Java Persistence API)** : 자바 진영에서 정의한 ORM의 표준 명세  
- **Hibernate** : JPA의 대표적인 구현체. 영속성 컨텍스트, 캐싱, 지연 로딩 등의 기능 제공  
- **Spring Data JPA** : JPA를 스프링 환경에서 추상화하여, 기본 CRUD와 쿼리 메서드 기능을 손쉽게 사용할 수 있도록 지원  

---

## 3. ORM을 사용하는 이유

### (1) 생산성 향상
- SQL과 JDBC API 코드 작성 부담을 줄여주며, 비즈니스 로직에 집중 가능  
- `save()`, `findAll()`, `deleteById()` 같은 공통 메서드를 제공  

### (2) 유지보수성 개선
- 비즈니스 로직과 SQL이 분리되어 코드 가독성 및 모듈화 용이  
- 데이터베이스 스키마가 변경되더라도 엔티티 클래스만 수정하면 됨  

### (3) 객체 지향적 개발 가능
- 개발자가 **객체 지향적 설계 원칙**에 따라 도메인 모델을 설계할 수 있음  
- 연관관계 매핑, 컬렉션, 상속 구조 등을 코드 차원에서 자연스럽게 표현 가능  

---

## 4. 단점 및 주의점

- 복잡한 SQL(특히 집계, 튜닝이 필요한 쿼리)은 ORM만으로는 표현이 어려움 → JPQL, 네이티브 SQL 필요  
- 추상화 계층이 추가되므로 내부 동작을 충분히 이해하지 못하면 성능 문제가 발생할 수 있음  
- 러닝 커브가 존재 → 영속성 컨텍스트, 엔티티 생명주기, 캐시 전략 등을 이해해야 안정적 활용 가능  

---

## 5. Spring Data JPA 예제

### 1) 엔티티 클래스
```java
import jakarta.persistence.*;

@Entity
public class Member {
    @Id @GeneratedValue
    private Long id;

    private String name;

    // getter, setter
}
```
### 2) 레포지토리 인터페이스
```java
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByName(String name); // 메서드 이름만으로 쿼리 자동 생성
}
```

### 3) 서비스 계층
```java
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void join(String name) {
        Member member = new Member();
        member.setName(name);
        memberRepository.save(member); // INSERT 실행
    }

    public List<Member> findMembers(String name) {
        return memberRepository.findByName(name); // SELECT 실행
    }
}
```
개발자는 `save()`, `findByName()` 같은 메서드만 호출하면 되고,  
내부적으로는 **Hibernate(JPA 구현체)** 가 SQL을 생성하고 실행한다.  

---

## 6. ORM vs 직접 SQL

| 구분       | 직접 SQL 작성             | ORM (Spring Data JPA)        |
|------------|---------------------------|------------------------------|
| 코드 양    | SQL + 매핑 코드 필요      | 메서드 호출만으로 CRUD       |
| 유지보수   | SQL이 흩어져 관리 어려움  | 엔티티/레포지토리만 관리     |
| 성능 제어  | 세밀한 튜닝 가능          | 추상화로 인해 일부 한계       |
| 학습 난이도 | 낮음 (SQL만 알면 됨)      | 비교적 높음 (JPA 개념 필요) |

---

## 7. 정리

- **ORM**: 객체와 DB를 매핑하는 기술  
- **Spring Data JPA**: JPA를 스프링 환경에서 더 쉽게 사용할 수 있도록 지원  
- **장점**: 생산성, 유지보수성, 객체지향적 코드 작성  
- **단점**: 러닝 커브, 성능 튜닝 어려움  
- **활용법**: 단순 CRUD → Spring Data JPA, 복잡한 쿼리 → JPQL/Native SQL 혼합 사용  

