# DNS (Domain Name System)

---

## 1. DNS란?

**DNS(Domain Name System)** 는 사람이 읽기 쉬운 **도메인 이름**을 컴퓨터가 이해할 수 있는 **IP 주소**로 변환해 주는 시스템이다.

사용자는 웹사이트에 접속할 때 보통 IP 주소를 직접 입력하지 않고 도메인 이름을 사용한다.

```text
www.google.com
www.naver.com
github.com
```

하지만 실제 네트워크 통신은 도메인 이름이 아니라 IP 주소를 기반으로 이루어진다.

```text
www.example.com → 93.184.216.34
```

즉, DNS는 다음과 같은 역할을 한다.

```text
도메인 이름 → IP 주소
```

쉽게 말하면 DNS는 인터넷에서 사용하는 **주소 변환 시스템**이라고 볼 수 있다.

---

## 2. DNS를 사용하는 이유

컴퓨터는 네트워크에서 서로 통신할 때 IP 주소를 사용한다.

예를 들어 어떤 서버의 IP 주소가 다음과 같다고 하자.

```text
142.250.206.14
```

사용자가 이 숫자 주소를 매번 외워서 접속하는 것은 어렵다.  
따라서 사람이 기억하기 쉬운 이름인 도메인을 사용한다.

```text
google.com
```

DNS는 이 도메인 이름을 실제 서버의 IP 주소로 변환해 준다.

```text
사용자 입력: google.com
        ↓
DNS 조회
        ↓
IP 주소 반환
        ↓
해당 IP 주소로 접속
```

---

## 3. DNS의 핵심 역할

DNS의 주요 역할은 다음과 같다.

| 역할 | 설명 |
|------|------|
| 도메인 이름 해석 | 도메인을 IP 주소로 변환 |
| 메일 서버 정보 제공 | 특정 도메인의 메일 서버 조회 |
| 서비스 위치 정보 제공 | 특정 서비스가 실행되는 서버 정보 제공 |
| 도메인 소유 검증 | TXT 레코드를 통해 인증 정보 제공 |
| 부하 분산 | 하나의 도메인에 여러 IP를 연결하여 트래픽 분산 가능 |
| 장애 대응 | 여러 서버 IP를 등록해 일부 서버 장애 시 대체 가능 |

---

## 4. DNS는 URL 전체를 해석하지 않는다

DNS는 URL 전체를 처리하는 것이 아니라, **호스트 이름 부분만 IP 주소로 변환**한다.

예를 들어 다음 URL이 있다고 하자.

```text
https://www.example.com:443/api/members?id=1
```

이 URL을 구성 요소별로 나누면 다음과 같다.

| 구성 요소 | 값 |
|----------|----|
| 프로토콜 | `https` |
| 호스트 이름 | `www.example.com` |
| 포트 | `443` |
| 경로 | `/api/members` |
| 쿼리 문자열 | `id=1` |

DNS가 처리하는 부분은 다음이다.

```text
www.example.com
```

즉, DNS는 `https`, `/api/members`, `id=1` 같은 정보는 해석하지 않는다.  
이 정보들은 웹 브라우저와 웹 서버가 HTTP/HTTPS 통신 과정에서 처리한다.

---

## 5. DNS의 계층 구조

DNS는 전 세계적으로 분산된 계층 구조를 가진다.

```text
Root DNS
   ↓
TLD DNS
   ↓
Authoritative DNS
   ↓
도메인에 대한 실제 IP 주소
```

예를 들어 `www.example.com`을 기준으로 보면 다음과 같은 계층이 존재한다.

```text
.                Root
└── com          TLD
    └── example  Domain
        └── www  Host
```

---

## 6. DNS 계층별 구성 요소

### 6.1 Root DNS Server

**Root DNS Server**는 DNS 계층의 최상위 서버이다.

Root DNS Server는 특정 도메인의 IP 주소를 직접 알려주기보다는, 다음 단계인 TLD DNS Server의 위치를 알려준다.

예를 들어 `www.example.com`을 조회하면 Root DNS Server는 `.com`을 담당하는 TLD DNS Server 정보를 알려준다.

```text
www.example.com?
        ↓
Root DNS Server
        ↓
.com TLD DNS Server로 가세요
```

---

### 6.2 TLD DNS Server

**TLD(Top-Level Domain) DNS Server**는 최상위 도메인을 담당하는 서버이다.

대표적인 TLD는 다음과 같다.

```text
.com
.net
.org
.kr
.co.kr
```

예를 들어 `www.example.com`의 경우 `.com`을 담당하는 TLD DNS Server가 `example.com`을 관리하는 Authoritative DNS Server 정보를 알려준다.

```text
example.com?
        ↓
.com TLD DNS Server
        ↓
example.com의 Authoritative DNS Server로 가세요
```

---

### 6.3 Authoritative DNS Server

**Authoritative DNS Server**는 특정 도메인에 대한 실제 DNS 레코드를 가지고 있는 권한 있는 서버이다.

예를 들어 `example.com`의 Authoritative DNS Server는 다음과 같은 정보를 가지고 있을 수 있다.

```text
www.example.com → 93.184.216.34
```

최종적으로 사용자가 원하는 도메인에 대한 IP 주소는 Authoritative DNS Server에서 얻는다.

---

## 7. DNS 조회 과정

사용자가 브라우저에 다음 주소를 입력했다고 가정하자.

```text
www.example.com
```

DNS 조회 과정은 일반적으로 다음과 같다.

```text
1. 사용자가 브라우저에 www.example.com 입력
2. 브라우저 또는 운영체제의 DNS 캐시 확인
3. 캐시에 없으면 Recursive DNS Resolver에 질의
4. Resolver가 Root DNS Server에 질의
5. Root DNS Server가 .com TLD DNS Server 정보 반환
6. Resolver가 .com TLD DNS Server에 질의
7. TLD DNS Server가 example.com의 Authoritative DNS Server 정보 반환
8. Resolver가 Authoritative DNS Server에 질의
9. Authoritative DNS Server가 www.example.com의 IP 주소 반환
10. Resolver가 사용자에게 IP 주소 반환
11. 브라우저가 해당 IP 주소로 서버에 접속
```

전체 흐름은 다음과 같이 표현할 수 있다.

```text
Client
  ↓
Recursive DNS Resolver
  ↓
Root DNS Server
  ↓
TLD DNS Server
  ↓
Authoritative DNS Server
  ↓
IP 주소 반환
```

---

## 8. Recursive Resolver란?

**Recursive Resolver**는 사용자를 대신해서 DNS 조회를 수행하는 서버이다.

사용자 PC나 브라우저가 직접 Root DNS, TLD DNS, Authoritative DNS Server를 모두 순회하지 않는다.  
대부분의 경우 사용자는 Recursive Resolver에게 질의하고, Resolver가 대신 여러 DNS 서버에 질의한다.

```text
사용자 → Recursive Resolver → Root/TLD/Authoritative DNS Server
```

대표적으로 다음과 같은 DNS Resolver를 사용할 수 있다.

```text
ISP DNS Resolver
Google Public DNS
Cloudflare DNS
Quad9 DNS
```

사용자의 컴퓨터나 공유기에는 보통 ISP에서 제공하는 DNS Resolver가 기본으로 설정되어 있다.

---

## 9. Recursive Query와 Iterative Query

DNS 질의 방식은 크게 두 가지로 나눌 수 있다.

| 방식 | 설명 |
|------|------|
| Recursive Query | 최종 결과를 받을 때까지 DNS 서버가 대신 조회 |
| Iterative Query | 다음에 물어볼 DNS 서버 정보만 단계적으로 반환 |

---

### 9.1 Recursive Query

Recursive Query는 클라이언트가 DNS 서버에게 최종 결과를 요청하는 방식이다.

```text
Client: www.example.com의 IP 주소를 알려주세요.
Resolver: 알겠습니다. 제가 찾아서 최종 IP를 알려드리겠습니다.
```

클라이언트는 중간 과정을 알 필요가 없고, 최종 IP 주소만 받는다.

---

### 9.2 Iterative Query

Iterative Query는 DNS 서버가 최종 답을 직접 알려주지 않고, 다음에 물어볼 서버 정보를 알려주는 방식이다.

```text
Resolver → Root DNS: www.example.com?
Root DNS → Resolver: .com DNS Server에 물어보세요.

Resolver → .com DNS: www.example.com?
.com DNS → Resolver: example.com DNS Server에 물어보세요.

Resolver → Authoritative DNS: www.example.com?
Authoritative DNS → Resolver: 93.184.216.34입니다.
```

Recursive Resolver가 Root, TLD, Authoritative DNS Server와 통신할 때는 주로 Iterative Query 흐름이 사용된다.

---

## 10. DNS 캐시

**DNS 캐시(Cache)** 는 DNS 조회 결과를 일정 시간 동안 저장하는 기능이다.

DNS 조회는 여러 단계를 거치기 때문에 매번 처음부터 조회하면 비효율적이다.  
따라서 브라우저, 운영체제, DNS Resolver 등은 조회 결과를 일정 시간 저장한다.

```text
첫 번째 요청:
www.example.com → DNS 전체 조회 필요

두 번째 요청:
캐시에 저장된 IP 주소 사용
```

DNS 캐시는 조회 속도를 높이고 DNS 서버의 부담을 줄인다.

---

## 11. TTL이란?

**TTL(Time To Live)** 은 DNS 레코드가 캐시에 유지될 수 있는 시간을 의미한다.

예를 들어 어떤 DNS 레코드의 TTL이 `300초`라면, 해당 조회 결과는 최대 300초 동안 캐시에 저장될 수 있다.

```text
www.example.com → 93.184.216.34
TTL = 300초
```

TTL이 지나면 캐시된 정보는 만료되고, 다시 DNS 조회를 수행한다.

---

## 12. TTL의 장단점

| TTL 설정 | 장점 | 단점 |
|----------|------|------|
| 짧은 TTL | IP 변경이 빠르게 반영됨 | DNS 조회가 자주 발생 |
| 긴 TTL | DNS 조회 부담 감소 | IP 변경 반영이 느림 |

서비스 이전이나 서버 IP 변경 작업을 할 때는 TTL을 미리 짧게 설정하는 경우가 많다.  
반면 안정적으로 운영되는 서비스는 TTL을 길게 설정하여 DNS 조회 부담을 줄일 수 있다.

---

## 13. DNS Record란?

**DNS Record**는 도메인에 대한 정보를 저장하는 데이터이다.

Authoritative DNS Server는 여러 종류의 DNS Record를 가지고 있다.

대표적인 DNS Record는 다음과 같다.

| Record | 설명 |
|--------|------|
| A | 도메인을 IPv4 주소에 매핑 |
| AAAA | 도메인을 IPv6 주소에 매핑 |
| CNAME | 도메인에 다른 도메인 이름을 별칭으로 연결 |
| MX | 메일 서버 정보 지정 |
| NS | 도메인을 담당하는 네임서버 지정 |
| TXT | 텍스트 정보 저장, 인증 용도로 자주 사용 |
| SOA | 도메인 영역의 기본 관리 정보 |
| PTR | IP 주소를 도메인 이름으로 역조회 |
| SRV | 특정 서비스의 위치 정보 제공 |
| CAA | 인증서를 발급할 수 있는 CA 제한 |

---

## 14. A Record

**A Record**는 도메인을 IPv4 주소에 매핑하는 레코드이다.

```text
example.com → 93.184.216.34
```

예시:

```text
example.com.    A    93.184.216.34
```

웹사이트 접속에서 가장 기본적으로 사용되는 DNS 레코드이다.

---

## 15. AAAA Record

**AAAA Record**는 도메인을 IPv6 주소에 매핑하는 레코드이다.

```text
example.com → 2606:2800:220:1:248:1893:25c8:1946
```

IPv4 주소는 A Record를 사용하고, IPv6 주소는 AAAA Record를 사용한다.

---

## 16. CNAME Record

**CNAME(Canonical Name) Record**는 하나의 도메인을 다른 도메인의 별칭으로 연결하는 레코드이다.

예를 들어 다음과 같이 설정할 수 있다.

```text
www.example.com → example.com
```

즉, `www.example.com`에 접속하면 실제로는 `example.com`의 DNS 정보를 따라간다.

예시:

```text
www.example.com.    CNAME    example.com.
```

CNAME은 IP 주소를 직접 지정하지 않고 다른 도메인을 가리킨다.

---

## 17. MX Record

**MX(Mail Exchange) Record**는 이메일을 처리할 메일 서버 정보를 지정하는 레코드이다.

예를 들어 `example.com` 도메인으로 이메일을 받을 때, 어떤 메일 서버가 처리할지를 알려준다.

```text
example.com.    MX    10 mail.example.com.
```

여기서 숫자 `10`은 우선순위를 의미한다.  
숫자가 낮을수록 우선순위가 높다.

---

## 18. NS Record

**NS(Name Server) Record**는 특정 도메인을 관리하는 네임서버를 지정하는 레코드이다.

```text
example.com.    NS    ns1.example.com.
example.com.    NS    ns2.example.com.
```

이 레코드는 해당 도메인의 DNS 정보를 어떤 서버가 관리하는지 알려준다.

---

## 19. TXT Record

**TXT Record**는 도메인에 텍스트 정보를 저장하는 레코드이다.

TXT Record는 주로 인증과 검증에 사용된다.

대표적인 사용 예시는 다음과 같다.

```text
이메일 발신자 검증
도메인 소유권 검증
보안 정책 설정
```

예를 들어 SPF, DKIM, DMARC 같은 이메일 보안 설정에 TXT Record가 자주 사용된다.

---

## 20. PTR Record와 Reverse DNS

**PTR Record**는 IP 주소를 도메인 이름으로 변환할 때 사용한다.

일반적인 DNS 조회는 다음 방향이다.

```text
도메인 이름 → IP 주소
```

반대로 IP 주소에서 도메인 이름을 찾는 것을 **Reverse DNS Lookup**이라고 한다.

```text
IP 주소 → 도메인 이름
```

이때 사용하는 레코드가 PTR Record이다.

---

## 21. DNS와 HTTP의 관계

DNS와 HTTP는 서로 다른 역할을 한다.

| 구분 | 역할 |
|------|------|
| DNS | 도메인 이름을 IP 주소로 변환 |
| HTTP/HTTPS | 클라이언트와 서버가 데이터를 주고받는 프로토콜 |

웹사이트 접속 과정은 대략 다음과 같다.

```text
1. 사용자가 브라우저에 도메인 입력
2. DNS를 통해 IP 주소 조회
3. 해당 IP 주소로 TCP 연결 생성
4. HTTPS 사용 시 TLS 연결 설정
5. HTTP 요청 전송
6. 서버가 HTTP 응답 반환
```

즉, DNS는 HTTP 요청이 전송되기 전에 서버의 IP 주소를 찾는 단계에서 사용된다.

---

## 22. DNS와 TCP/UDP

DNS는 일반적으로 **UDP 53번 포트**를 사용한다.

```text
DNS Query → UDP 53
```

UDP는 연결 설정 과정이 없기 때문에 빠르게 질의와 응답을 처리할 수 있다.

하지만 다음과 같은 경우에는 TCP 53번 포트를 사용할 수 있다.

- 응답 데이터가 큰 경우
- Zone Transfer를 수행하는 경우
- UDP 응답이 잘리는 경우

정리하면 다음과 같다.

| 프로토콜 | 사용 상황 |
|----------|----------|
| UDP 53 | 일반적인 DNS 질의 |
| TCP 53 | 큰 응답, Zone Transfer 등 |

---

## 23. DNS over TLS와 DNS over HTTPS

기본 DNS 질의는 암호화되지 않은 상태로 전송된다.  
따라서 중간에서 DNS 요청 내용을 볼 수 있다.

이를 보완하기 위해 다음 기술이 사용된다.

| 기술 | 설명 | 주 사용 포트 |
|------|------|--------------|
| DoT | DNS over TLS | 853 |
| DoH | DNS over HTTPS | 443 |

### 23.1 DoT

**DNS over TLS**는 DNS 질의를 TLS로 암호화하여 전송하는 방식이다.

```text
DNS Query + TLS
```

---

### 23.2 DoH

**DNS over HTTPS**는 DNS 질의를 HTTPS 프로토콜 위에서 전송하는 방식이다.

```text
DNS Query + HTTPS
```

DoH는 일반 HTTPS 트래픽과 같은 443 포트를 사용하기 때문에 네트워크상에서 일반 웹 트래픽과 구분하기 어렵다.

---

## 24. DNS 보안 문제

DNS는 인터넷의 핵심 인프라이지만, 여러 보안 문제가 발생할 수 있다.

| 보안 문제 | 설명 |
|-----------|------|
| DNS Spoofing | 잘못된 DNS 응답을 보내 사용자를 가짜 서버로 유도 |
| DNS Cache Poisoning | DNS 캐시에 조작된 정보를 저장시킴 |
| DNS Hijacking | DNS 설정을 탈취하거나 변경 |
| DDoS 공격 | DNS 서버에 대량 요청을 보내 장애 유발 |

---

## 25. DNSSEC

**DNSSEC(DNS Security Extensions)** 는 DNS 응답의 위조 여부를 검증하기 위한 보안 확장 기술이다.

기본 DNS는 응답이 신뢰할 수 있는지 검증하는 기능이 약하다.  
DNSSEC는 전자서명을 사용하여 DNS 응답이 변조되지 않았는지 확인한다.

```text
DNS 응답
   ↓
전자서명 검증
   ↓
위조 여부 확인
```

DNSSEC는 DNS 데이터의 무결성을 검증하는 데 도움을 주지만, DNS 질의 내용을 암호화하는 기술은 아니다.  
질의 내용 암호화는 DoH나 DoT가 담당한다.

---

## 26. hosts 파일과 DNS

운영체제에는 DNS 조회보다 먼저 확인할 수 있는 `hosts` 파일이 존재한다.

예를 들어 로컬 환경에서 다음과 같이 설정할 수 있다.

```text
127.0.0.1    myapp.local
```

이렇게 설정하면 `myapp.local`로 접속했을 때 DNS 서버에 질의하지 않고 `127.0.0.1`로 연결된다.

```text
myapp.local → 127.0.0.1
```

개발 환경에서 특정 도메인을 로컬 서버에 연결할 때 자주 사용된다.

---

## 27. Java / Spring에서 DNS가 사용되는 경우

Java나 Spring 애플리케이션도 외부 서버와 통신할 때 DNS를 사용한다.

예를 들어 다음 코드가 있다고 하자.

```java
URL url = new URL("https://api.example.com/members");
```

또는 Spring에서 외부 API를 호출한다고 하자.

```java
restTemplate.getForObject("https://api.example.com/members", String.class);
```

이 경우 애플리케이션은 실제 요청을 보내기 전에 `api.example.com`의 IP 주소를 알아야 한다.  
이때 DNS 조회가 발생한다.

```text
api.example.com
        ↓ DNS 조회
IP 주소
        ↓
HTTP 요청 전송
```

DNS 조회가 실패하면 Java에서는 다음과 같은 예외가 발생할 수 있다.

```text
java.net.UnknownHostException
```

이는 도메인 이름을 IP 주소로 해석하지 못했다는 의미이다.

---

## 28. Docker 환경에서의 DNS

Docker를 사용할 때도 DNS 개념이 중요하다.

Docker Compose에서는 같은 네트워크에 속한 컨테이너끼리 서비스 이름으로 통신할 수 있다.

예를 들어 다음과 같은 Compose 설정이 있다고 하자.

```yaml
services:
  app:
    image: spring-app
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
```

이 경우 `app` 컨테이너는 MySQL에 다음 주소로 접근할 수 있다.

```text
mysql:3306
```

여기서 `mysql`은 실제 IP 주소가 아니라 Docker 내부 DNS가 해석하는 서비스 이름이다.

Spring 설정에서는 다음과 같이 사용할 수 있다.

```properties
spring.datasource.url=jdbc:mysql://mysql:3306/testdb
```

즉, Docker 네트워크 내부에서는 컨테이너 이름이나 서비스 이름이 DNS 이름처럼 동작한다.

---

## 29. DNS 조회 확인 명령어

DNS 문제를 확인할 때는 다음 명령어를 사용할 수 있다.

| 명령어 | 설명 |
|--------|------|
| `nslookup` | 도메인의 DNS 정보 조회 |
| `dig` | DNS 레코드 상세 조회 |
| `host` | 도메인과 IP 매핑 조회 |
| `ping` | 도메인 해석 및 네트워크 응답 확인 |
| `traceroute` / `tracert` | 네트워크 경로 확인 |

---

### 29.1 nslookup 예시

```bash
nslookup example.com
```

특정 DNS 서버를 지정할 수도 있다.

```bash
nslookup example.com 8.8.8.8
```

---

### 29.2 dig 예시

```bash
dig example.com
```

A Record만 조회하려면 다음과 같이 사용할 수 있다.

```bash
dig example.com A
```

MX Record를 조회하려면 다음과 같이 사용한다.

```bash
dig example.com MX
```

DNS 조회 과정을 추적하려면 다음 명령어를 사용할 수 있다.

```bash
dig +trace example.com
```

---

## 30. DNS 장애가 발생하면 생기는 문제

DNS 장애가 발생하면 서버 자체는 정상이어도 사용자가 서비스에 접속하지 못할 수 있다.

예를 들어 웹 서버가 정상적으로 실행 중이어도 DNS가 올바른 IP 주소를 반환하지 못하면 접속이 실패한다.

```text
웹 서버 정상 실행
DNS 조회 실패
        ↓
사용자는 서비스 접속 불가
```

대표적인 증상은 다음과 같다.

```text
도메인 접속 불가
UnknownHostException 발생
메일 송수신 실패
특정 지역에서만 접속 장애
도메인 변경 사항 반영 지연
```

---

## 31. DNS 문제 해결 시 확인할 것

DNS 문제가 발생했을 때는 다음 항목을 점검한다.

| 확인 항목 | 설명 |
|----------|------|
| 도메인 오타 | 도메인 이름이 정확한지 확인 |
| DNS Record | A, CNAME, MX 등의 레코드가 올바른지 확인 |
| TTL | 변경 사항이 캐시 때문에 늦게 반영되는지 확인 |
| 네임서버 | 도메인의 NS Record가 올바른지 확인 |
| 로컬 캐시 | 브라우저 또는 OS DNS 캐시 문제 확인 |
| hosts 파일 | 잘못된 hosts 설정이 있는지 확인 |
| 방화벽 | DNS 53번 포트 통신이 차단되지 않았는지 확인 |
| Docker DNS | 컨테이너 네트워크와 서비스 이름 확인 |

---

## 32. DNS와 로드 밸런싱

DNS는 단순히 하나의 도메인을 하나의 IP에만 연결하지 않는다.  
하나의 도메인에 여러 IP 주소를 연결할 수도 있다.

```text
api.example.com → 10.0.0.1
api.example.com → 10.0.0.2
api.example.com → 10.0.0.3
```

이렇게 하면 여러 서버로 트래픽을 분산할 수 있다.

다만 DNS 기반 로드 밸런싱은 클라이언트나 Resolver의 캐시 영향을 받기 때문에, 세밀한 트래픽 제어에는 한계가 있다.  
실무에서는 DNS와 함께 로드 밸런서, CDN, 프록시 등을 조합해서 사용한다.

---

## 33. DNS와 CDN

CDN(Content Delivery Network)은 사용자에게 가까운 서버에서 콘텐츠를 제공하는 기술이다.

DNS는 CDN에서도 중요한 역할을 한다.

사용자가 특정 도메인에 접속하면, DNS는 사용자의 위치나 네트워크 상태를 고려하여 가까운 CDN 서버의 IP 주소를 반환할 수 있다.

```text
사용자 A → 가까운 CDN 서버 A
사용자 B → 가까운 CDN 서버 B
```

이를 통해 응답 속도를 줄이고 서버 부하를 분산할 수 있다.

---

## 34. DNS와 관련된 자주 헷갈리는 개념

### 34.1 DNS는 서버 접속 자체가 아니다

DNS는 도메인을 IP 주소로 바꾸는 역할만 한다.  
실제 데이터 통신은 IP 주소를 얻은 뒤 TCP, TLS, HTTP 등을 통해 이루어진다.

```text
DNS: IP 주소 찾기
TCP: 연결 생성
TLS: 암호화 연결
HTTP: 데이터 요청/응답
```

---

### 34.2 도메인과 IP는 1:1 관계가 아니다

하나의 도메인이 여러 IP를 가질 수 있고, 하나의 IP에 여러 도메인이 연결될 수도 있다.

```text
하나의 도메인 → 여러 IP
여러 도메인 → 하나의 IP
```

---

### 34.3 CNAME은 IP 주소를 직접 가리키지 않는다

CNAME은 다른 도메인을 가리키는 레코드이다.

```text
www.example.com → example.com
```

IP 주소를 직접 연결하려면 A 또는 AAAA Record를 사용한다.

---

### 34.4 DNS 변경은 즉시 반영되지 않을 수 있다

DNS에는 캐시와 TTL이 존재하기 때문에, 레코드를 변경해도 전 세계에서 즉시 반영되지 않을 수 있다.

```text
DNS Record 변경
        ↓
기존 캐시 만료 대기
        ↓
새로운 정보 반영
```

---

## 35. 정리

- DNS는 **도메인 이름을 IP 주소로 변환하는 시스템**이다.
- 사용자는 사람이 기억하기 쉬운 도메인을 사용하고, 컴퓨터는 IP 주소로 통신한다.
- DNS는 계층적이고 분산된 구조를 가진다.
- DNS 조회는 Root DNS, TLD DNS, Authoritative DNS Server를 거쳐 이루어진다.
- Recursive Resolver는 사용자를 대신해 DNS 조회를 수행한다.
- DNS 캐시는 조회 속도를 높이지만, 변경 사항 반영을 지연시킬 수 있다.
- TTL은 DNS 정보가 캐시에 유지되는 시간을 의미한다.
- 주요 DNS Record에는 A, AAAA, CNAME, MX, NS, TXT, PTR 등이 있다.
- DNS는 일반적으로 UDP 53번 포트를 사용하지만, 경우에 따라 TCP 53번도 사용한다.
- Java/Spring 애플리케이션에서 도메인 기반 외부 API 호출 시 DNS 조회가 발생한다.
- Docker Compose 환경에서는 서비스 이름이 Docker 내부 DNS를 통해 해석된다.
- DNS 장애가 발생하면 서버가 정상이어도 도메인 접속이 실패할 수 있다.

---

## 핵심 키워드

- DNS
- Domain Name System
- Domain
- IP Address
- Recursive Resolver
- Root DNS Server
- TLD DNS Server
- Authoritative DNS Server
- DNS Record
- A Record
- AAAA Record
- CNAME
- MX
- NS
- TXT
- TTL
- DNS Cache
- UDP 53
- TCP 53
- DNSSEC
- DoH
- DoT
- Reverse DNS
- `UnknownHostException`
