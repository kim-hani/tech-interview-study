# JVM (Java Virtual Machine)

---

## 1. JVM이란?

**JVM(Java Virtual Machine)** 은 자바 프로그램을 실행하기 위한 **가상 머신**이다.

자바 코드는 운영체제가 직접 실행하는 기계어로 바로 변환되지 않는다.  
먼저 컴파일러(`javac`)에 의해 **바이트코드(Bytecode)** 로 변환되고, 이 바이트코드를 JVM이 실행한다.

```text
Java 소스 코드(.java)
        ↓ 컴파일
바이트코드(.class)
        ↓ JVM 실행
운영체제에서 동작
```

즉, JVM은 **자바 코드와 운영체제 사이에서 실행 환경을 제공하는 계층**이라고 볼 수 있다.

---

## 2. JVM을 사용하는 이유

자바는 특정 운영체제에 직접 의존하지 않고, JVM 위에서 실행된다.

따라서 동일한 자바 바이트코드는 Windows, macOS, Linux 등 서로 다른 운영체제에서도 실행될 수 있다.

```text
동일한 .class 파일
    ↓
Windows JVM
macOS JVM
Linux JVM
```

이러한 특징을 **플랫폼 독립성**이라고 한다.

자바의 대표적인 특징인 **Write Once, Run Anywhere**는 JVM 덕분에 가능하다.

단, JVM 자체는 운영체제별로 다르다.  
즉, 자바 코드는 동일하게 작성할 수 있지만, 각 운영체제에는 해당 운영체제에 맞는 JVM이 설치되어 있어야 한다.

---

## 3. JVM의 주요 역할

JVM의 핵심 역할은 다음과 같다.

| 역할 | 설명 |
|------|------|
| 바이트코드 실행 | `.class` 파일에 포함된 바이트코드를 실행한다. |
| 플랫폼 독립성 제공 | 운영체제에 관계없이 자바 프로그램을 실행할 수 있게 한다. |
| 메모리 관리 | Heap, Stack 등 실행 중 필요한 메모리 영역을 관리한다. |
| Garbage Collection | 사용하지 않는 객체를 자동으로 제거한다. |
| 보안 관리 | 바이트코드 검증을 통해 잘못된 코드 실행을 방지한다. |
| 성능 최적화 | JIT 컴파일러를 통해 자주 실행되는 코드를 최적화한다. |

---

## 4. JVM의 구조

JVM은 크게 다음과 같은 구성 요소로 이루어진다.

```text
JVM
├── Class Loader
├── Runtime Data Area
├── Execution Engine
└── Garbage Collector
```

---

## 5. Class Loader

**Class Loader**는 자바 클래스 파일을 JVM 메모리로 로딩하는 역할을 한다.

자바 프로그램에서 어떤 클래스가 처음 사용될 때, JVM은 해당 `.class` 파일을 찾아 메모리에 올린다.

```text
.class 파일
   ↓
Class Loader
   ↓
JVM 메모리에 로딩
```

Class Loader는 단순히 클래스를 불러오는 것뿐만 아니라, 클래스가 JVM에서 안전하게 실행될 수 있는지도 검증한다.

---

## 6. Runtime Data Area

**Runtime Data Area**는 JVM이 프로그램을 실행하면서 사용하는 메모리 영역이다.

대표적인 메모리 영역은 다음과 같다.

| 영역 | 설명 |
|------|------|
| Method Area | 클래스 정보, 메서드 정보, static 변수 등을 저장 |
| Heap | 객체와 배열이 저장되는 영역 |
| Stack | 지역 변수, 매개변수, 메서드 호출 정보 저장 |
| PC Register | 현재 실행 중인 명령어의 위치 저장 |
| Native Method Stack | 네이티브 메서드 실행에 사용 |

---

## 7. Heap 영역

**Heap**은 객체가 저장되는 메모리 영역이다.

예를 들어 다음 코드에서 `new Member()`로 생성된 객체는 Heap 영역에 저장된다.

```java
Member member = new Member();
```

```text
Stack 영역
member 참조 변수
   ↓
Heap 영역
Member 객체
```

Heap 영역은 Garbage Collector의 주요 관리 대상이다.  
더 이상 참조되지 않는 객체는 Garbage Collector에 의해 제거된다.

---

## 8. Stack 영역

**Stack**은 메서드 호출과 관련된 정보를 저장하는 영역이다.

메서드가 호출되면 Stack에 새로운 스택 프레임이 생성되고, 메서드 실행이 끝나면 해당 스택 프레임은 제거된다.

```java
public void method() {
    int number = 10;
}
```

위 코드에서 지역 변수 `number`는 Stack 영역에 저장된다.

Stack 영역에는 주로 다음 정보가 저장된다.

- 지역 변수
- 매개변수
- 메서드 호출 정보
- 참조 변수

---

## 9. Execution Engine

**Execution Engine**은 Class Loader에 의해 로딩된 바이트코드를 실제로 실행하는 역할을 한다.

Execution Engine은 크게 다음 방식으로 동작한다.

| 구성 요소 | 설명 |
|-----------|------|
| Interpreter | 바이트코드를 한 줄씩 해석하여 실행 |
| JIT Compiler | 자주 실행되는 코드를 네이티브 코드로 변환하여 성능 향상 |
| Garbage Collector | 사용하지 않는 객체를 메모리에서 제거 |

---

## 10. JIT Compiler

**JIT(Just-In-Time) Compiler**는 실행 중에 자주 사용되는 바이트코드를 네이티브 코드로 변환하는 기능이다.

인터프리터 방식은 바이트코드를 한 줄씩 해석하기 때문에 실행 속도가 느릴 수 있다.  
JIT 컴파일러는 반복적으로 실행되는 코드를 기계어에 가까운 코드로 변환하여 성능을 향상시킨다.

```text
바이트코드
   ↓
JIT Compiler
   ↓
네이티브 코드
```

---

## 11. Garbage Collection

**Garbage Collection**은 더 이상 사용되지 않는 객체를 자동으로 제거하는 메모리 관리 기능이다.

자바에서는 개발자가 직접 메모리를 해제하지 않는다.  
대신 JVM이 객체의 참조 상태를 확인하여 필요 없는 객체를 제거한다.

```java
Member member = new Member();
member = null;
```

위 코드에서 `member`가 더 이상 `Member` 객체를 참조하지 않으면, 해당 객체는 Garbage Collection의 대상이 될 수 있다.

---

## 12. JVM, JRE, JDK의 차이

| 구분 | 설명 |
|------|------|
| JVM | 자바 바이트코드를 실행하는 가상 머신 |
| JRE | JVM + 자바 실행에 필요한 라이브러리 |
| JDK | JRE + 개발 도구 |

```text
JDK
└── JRE
    └── JVM
```

- **JVM**: 자바 프로그램 실행 담당
- **JRE**: 자바 프로그램 실행 환경 제공
- **JDK**: 자바 개발에 필요한 도구까지 포함

예를 들어 자바 프로그램을 실행만 한다면 JRE가 필요하고, 자바 코드를 작성하고 컴파일하려면 JDK가 필요하다.

---

## 13. 정리

- JVM은 **자바 바이트코드를 실행하는 가상 머신**이다.
- 자바 코드는 `.java` 파일에서 `.class` 바이트코드로 컴파일된다.
- JVM은 바이트코드를 운영체제에 맞게 실행한다.
- JVM 덕분에 자바는 플랫폼 독립성을 가진다.
- JVM은 클래스 로딩, 메모리 관리, Garbage Collection, JIT 컴파일 등을 담당한다.
- JVM 자체는 운영체제별로 다르지만, 자바 코드는 동일하게 작성할 수 있다.

---

## 핵심 키워드

- JVM
- Bytecode
- Class Loader
- Runtime Data Area
- Heap
- Stack
- Garbage Collection
- JIT Compiler
- Platform Independent
