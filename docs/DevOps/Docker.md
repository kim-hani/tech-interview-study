# Docker

---

## 1. Docker란?

**Docker**는 애플리케이션을 **컨테이너(Container)** 라는 격리된 환경에서 실행할 수 있도록 도와주는 플랫폼이다.

애플리케이션을 실행하려면 보통 다음과 같은 요소가 필요하다.

- 애플리케이션 코드
- 실행 환경
- 라이브러리
- 설정 파일
- 운영체제 환경
- 의존성 패키지

Docker는 이 요소들을 하나의 실행 단위로 묶어, 어떤 환경에서도 동일하게 실행할 수 있도록 만든다.

```text
애플리케이션 코드
+ 실행 환경
+ 라이브러리
+ 설정 파일
        ↓
Docker Image
        ↓
Docker Container로 실행
```

즉, Docker는 **애플리케이션과 실행 환경을 함께 패키징하여 일관된 실행 환경을 제공하는 기술**이다.

---

## 2. Docker를 사용하는 이유

Docker를 사용하는 가장 큰 이유는 **환경 차이로 인한 문제를 줄이기 위해서**이다.

개발자가 로컬 환경에서 애플리케이션을 정상적으로 실행했더라도, 서버 환경에서는 다음과 같은 문제가 발생할 수 있다.

```text
개발자 PC에서는 정상 실행
서버에서는 Java 버전이 달라서 오류 발생
DB 버전 차이로 오류 발생
환경 변수 설정 누락
라이브러리 버전 불일치
```

이런 문제를 흔히 다음과 같이 표현한다.

```text
"제 컴퓨터에서는 잘 되는데요?"
```

Docker는 애플리케이션 실행에 필요한 환경을 이미지로 고정하기 때문에, 개발 환경과 운영 환경의 차이를 줄일 수 있다.

---

## 3. Docker의 핵심 개념

Docker의 핵심 개념은 다음과 같다.

| 개념 | 설명 |
|------|------|
| Image | 컨테이너를 만들기 위한 실행 템플릿 |
| Container | 이미지를 실행한 실제 프로세스 |
| Dockerfile | 이미지를 만들기 위한 설정 파일 |
| Docker Engine | 이미지를 빌드하고 컨테이너를 실행하는 Docker의 핵심 엔진 |
| Docker Hub | Docker 이미지를 저장하고 공유하는 원격 저장소 |
| Volume | 컨테이너 데이터를 영구 저장하기 위한 저장 공간 |
| Network | 컨테이너 간 통신을 위한 네트워크 설정 |
| Docker Compose | 여러 컨테이너를 한 번에 정의하고 실행하는 도구 |

---

## 4. 컨테이너(Container)란?

**컨테이너**는 애플리케이션을 실행하기 위한 격리된 공간이다.

컨테이너 안에는 애플리케이션 실행에 필요한 파일, 라이브러리, 설정 등이 포함된다.  
컨테이너는 호스트 운영체제 위에서 하나의 격리된 프로세스처럼 실행된다.

```text
Host OS
 ├── Container A: Spring Boot App
 ├── Container B: MySQL
 └── Container C: Redis
```

각 컨테이너는 서로 분리되어 있으므로, 하나의 컨테이너에서 발생한 문제가 다른 컨테이너에 직접적인 영향을 주지 않는다.

---

## 5. Docker Image란?

**Docker Image**는 컨테이너를 생성하기 위한 읽기 전용 템플릿이다.

예를 들어 Java 애플리케이션을 실행하려면 다음과 같은 요소가 필요하다.

```text
Java 실행 환경
Spring Boot JAR 파일
실행 명령어
환경 설정
```

이 요소들을 하나로 묶은 것이 Docker Image이다.

이미지를 실행하면 컨테이너가 만들어진다.

```text
Docker Image
     ↓ 실행
Docker Container
```

이미지와 컨테이너의 관계는 클래스와 객체의 관계로 이해할 수 있다.

| Java 개념 | Docker 개념 |
|----------|-------------|
| Class | Image |
| Object | Container |

즉, Image는 실행 가능한 설계도이고, Container는 그 설계도를 기반으로 실제 실행된 인스턴스이다.

---

## 6. Image와 Container의 차이

| 구분 | Image | Container |
|------|-------|-----------|
| 의미 | 컨테이너 실행을 위한 템플릿 | 이미지를 실행한 실제 환경 |
| 상태 | 읽기 전용 | 실행 중 상태를 가질 수 있음 |
| 역할 | 애플리케이션 실행 환경 정의 | 애플리케이션 실제 실행 |
| 비유 | 클래스 | 객체 |
| 예시 | `spring-app:1.0` | 실행 중인 Spring Boot 서버 |

---

## 7. Dockerfile이란?

**Dockerfile**은 Docker Image를 만들기 위한 설정 파일이다.

이미지를 만들기 위해 어떤 기반 이미지를 사용할지, 어떤 파일을 복사할지, 어떤 명령어로 실행할지를 정의한다.

예를 들어 Spring Boot 애플리케이션을 Docker 이미지로 만들려면 다음과 같은 Dockerfile을 작성할 수 있다.

```dockerfile
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY build/libs/app.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
```

각 명령어의 의미는 다음과 같다.

| 명령어 | 설명 |
|--------|------|
| `FROM` | 기반이 되는 이미지를 지정 |
| `WORKDIR` | 컨테이너 내부 작업 디렉터리 지정 |
| `COPY` | 로컬 파일을 이미지 내부로 복사 |
| `ENTRYPOINT` | 컨테이너 실행 시 수행할 명령어 지정 |

---

## 8. Dockerfile 명령어 정리

| 명령어 | 설명 |
|--------|------|
| `FROM` | 베이스 이미지 지정 |
| `WORKDIR` | 작업 디렉터리 설정 |
| `COPY` | 파일 또는 디렉터리 복사 |
| `ADD` | 파일 복사 및 압축 해제 기능 포함 |
| `RUN` | 이미지 빌드 과정에서 명령어 실행 |
| `CMD` | 컨테이너 실행 시 기본 명령어 지정 |
| `ENTRYPOINT` | 컨테이너 실행 시 고정적으로 실행할 명령어 지정 |
| `EXPOSE` | 컨테이너가 사용할 포트 명시 |
| `ENV` | 환경 변수 설정 |

---

## 9. Docker Image 빌드

Dockerfile을 작성한 뒤 다음 명령어로 이미지를 생성할 수 있다.

```bash
docker build -t spring-app .
```

명령어의 의미는 다음과 같다.

| 부분 | 의미 |
|------|------|
| `docker build` | Docker 이미지를 빌드 |
| `-t spring-app` | 이미지 이름을 `spring-app`으로 지정 |
| `.` | 현재 디렉터리의 Dockerfile을 사용 |

빌드가 완료되면 `spring-app`이라는 Docker Image가 생성된다.

---

## 10. Docker Container 실행

이미지를 기반으로 컨테이너를 실행하려면 다음 명령어를 사용한다.

```bash
docker run -p 8080:8080 spring-app
```

이 명령어는 `spring-app` 이미지를 실행하고, 호스트의 `8080` 포트와 컨테이너의 `8080` 포트를 연결한다.

```text
Host PC 8080 포트
        ↓
Container 8080 포트
        ↓
Spring Boot 애플리케이션
```

---

## 11. 포트 매핑

컨테이너 내부에서 애플리케이션이 실행되더라도, 외부에서 접근하려면 포트 매핑이 필요하다.

```bash
docker run -p 8080:8080 spring-app
```

포트 매핑 형식은 다음과 같다.

```text
-p 호스트포트:컨테이너포트
```

예를 들어 다음 명령어는 호스트의 `9090` 포트로 들어온 요청을 컨테이너의 `8080` 포트로 전달한다.

```bash
docker run -p 9090:8080 spring-app
```

```text
localhost:9090
      ↓
Container 내부 8080 포트
```

---

## 12. Docker의 실행 흐름

Docker의 기본 실행 흐름은 다음과 같다.

```text
1. Dockerfile 작성
        ↓
2. docker build로 Image 생성
        ↓
3. docker run으로 Container 실행
        ↓
4. 애플리케이션 실행
```

Spring Boot 애플리케이션 기준으로 보면 다음과 같다.

```text
Spring Boot 프로젝트
        ↓
JAR 파일 생성
        ↓
Dockerfile 작성
        ↓
Docker Image 생성
        ↓
Docker Container 실행
```

---

## 13. Docker 기본 명령어

| 명령어 | 설명 |
|--------|------|
| `docker build -t 이미지명 .` | Docker 이미지 빌드 |
| `docker images` | 로컬 이미지 목록 확인 |
| `docker run 이미지명` | 컨테이너 실행 |
| `docker run -d 이미지명` | 백그라운드에서 컨테이너 실행 |
| `docker ps` | 실행 중인 컨테이너 목록 확인 |
| `docker ps -a` | 모든 컨테이너 목록 확인 |
| `docker stop 컨테이너ID` | 실행 중인 컨테이너 중지 |
| `docker start 컨테이너ID` | 중지된 컨테이너 시작 |
| `docker rm 컨테이너ID` | 컨테이너 삭제 |
| `docker rmi 이미지ID` | 이미지 삭제 |
| `docker logs 컨테이너ID` | 컨테이너 로그 확인 |
| `docker exec -it 컨테이너ID bash` | 실행 중인 컨테이너 내부 접속 |

---

## 14. Docker Hub

**Docker Hub**는 Docker 이미지를 저장하고 공유할 수 있는 원격 저장소이다.

GitHub가 소스 코드를 저장하는 곳이라면, Docker Hub는 Docker 이미지를 저장하는 곳이라고 볼 수 있다.

```text
로컬 Docker Image
        ↓ push
Docker Hub
        ↓ pull
다른 서버에서 실행
```

예를 들어 MySQL 이미지를 사용할 때 직접 이미지를 만들지 않고 Docker Hub에서 제공하는 이미지를 받을 수 있다.

```bash
docker pull mysql
```

---

## 15. Volume이란?

**Volume**은 컨테이너의 데이터를 영구적으로 저장하기 위한 기능이다.

컨테이너는 삭제되면 내부 데이터도 함께 사라진다.  
예를 들어 MySQL 컨테이너를 삭제하면, 별도 설정이 없는 경우 데이터베이스 데이터도 사라질 수 있다.

이 문제를 해결하기 위해 Volume을 사용한다.

```bash
docker run -v mysql-data:/var/lib/mysql mysql
```

```text
Container 내부 데이터
        ↓
Docker Volume에 저장
        ↓
컨테이너가 삭제되어도 데이터 유지
```

Volume은 데이터베이스처럼 데이터 보존이 중요한 컨테이너에서 자주 사용된다.

---

## 16. Docker Network

**Docker Network**는 컨테이너끼리 통신할 수 있도록 해주는 기능이다.

예를 들어 Spring Boot 애플리케이션 컨테이너와 MySQL 컨테이너가 따로 실행되고 있다고 가정한다.

```text
Spring Boot Container
        ↓
MySQL Container
```

두 컨테이너가 서로 통신하려면 같은 Docker Network에 연결되어 있어야 한다.

Docker Compose를 사용하면 여러 컨테이너가 기본적으로 같은 네트워크에 묶이므로 서비스 이름으로 통신할 수 있다.

```text
Spring Boot App → mysql:3306
```

여기서 `mysql`은 MySQL 컨테이너의 서비스 이름이다.

---

## 17. Docker Compose란?

**Docker Compose**는 여러 개의 컨테이너를 하나의 설정 파일로 관리하는 도구이다.

실제 애플리케이션은 보통 하나의 컨테이너만으로 실행되지 않는다.

예를 들어 Spring Boot 서버를 실행하려면 다음과 같은 여러 서비스가 필요할 수 있다.

```text
Spring Boot App
MySQL
Redis
Nginx
```

이들을 각각 `docker run` 명령어로 실행하면 관리가 복잡해진다.  
Docker Compose는 이 여러 컨테이너의 실행 설정을 `docker-compose.yml` 파일 하나로 정의할 수 있게 해준다.

---

## 18. Docker Compose 예시

Spring Boot 애플리케이션과 MySQL을 함께 실행하는 예시는 다음과 같다.

```yaml
version: "3.8"

services:
  app:
    image: spring-app
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/testdb
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: password

  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: testdb
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

위 설정에서는 두 개의 컨테이너가 실행된다.

| 서비스 | 역할 |
|--------|------|
| `app` | Spring Boot 애플리케이션 |
| `mysql` | MySQL 데이터베이스 |

Spring Boot 애플리케이션은 `mysql`이라는 서비스 이름을 통해 MySQL 컨테이너에 접근할 수 있다.

```text
jdbc:mysql://mysql:3306/testdb
```

---

## 19. Docker Compose 명령어

| 명령어 | 설명 |
|--------|------|
| `docker compose up` | Compose 파일 기준으로 컨테이너 실행 |
| `docker compose up -d` | 백그라운드에서 실행 |
| `docker compose down` | 실행 중인 컨테이너 중지 및 삭제 |
| `docker compose ps` | Compose 컨테이너 목록 확인 |
| `docker compose logs` | 로그 확인 |
| `docker compose logs -f` | 실시간 로그 확인 |
| `docker compose build` | 이미지 빌드 |
| `docker compose restart` | 컨테이너 재시작 |

---

## 20. Docker와 가상 머신의 차이

Docker 컨테이너와 가상 머신은 모두 격리된 실행 환경을 제공하지만, 구조가 다르다.

### 가상 머신

가상 머신은 하이퍼바이저 위에 별도의 운영체제를 실행한다.

```text
Host OS
  ↓
Hypervisor
  ↓
Guest OS
  ↓
Application
```

각 가상 머신은 독립적인 운영체제를 포함하므로 무겁고 실행 속도가 상대적으로 느릴 수 있다.

---

### Docker Container

Docker 컨테이너는 호스트 운영체제의 커널을 공유하면서 격리된 프로세스로 실행된다.

```text
Host OS
  ↓
Docker Engine
  ↓
Container
  ↓
Application
```

컨테이너는 별도의 운영체제를 통째로 실행하지 않으므로 가볍고 빠르게 실행할 수 있다.

---

## 21. Docker와 가상 머신 비교

| 구분 | Docker Container | Virtual Machine |
|------|------------------|-----------------|
| 실행 방식 | 호스트 OS 커널 공유 | 별도 Guest OS 실행 |
| 무게 | 가벼움 | 무거움 |
| 실행 속도 | 빠름 | 상대적으로 느림 |
| 격리 수준 | 프로세스 수준 격리 | OS 수준 격리 |
| 자원 사용량 | 적음 | 많음 |
| 대표 사용 목적 | 애플리케이션 배포, 개발 환경 통일 | 완전한 OS 환경 분리 |

---

## 22. Java / Spring Boot에서 Docker를 사용하는 이유

Java와 Spring Boot 애플리케이션은 실행 환경에 따라 문제가 발생할 수 있다.

예를 들어 다음과 같은 차이가 문제가 될 수 있다.

```text
Java 버전 차이
환경 변수 차이
DB 연결 설정 차이
서버 OS 차이
배포 경로 차이
```

Docker를 사용하면 Java 실행 환경과 애플리케이션을 하나의 이미지로 묶을 수 있다.

```text
Java Runtime
+ Spring Boot JAR
+ 실행 명령어
+ 환경 설정
        ↓
Docker Image
```

따라서 서버에 Java를 직접 설치하지 않아도, Docker만 있으면 애플리케이션을 실행할 수 있다.

---

## 23. Spring Boot Dockerfile 예시

Spring Boot 프로젝트를 빌드하면 일반적으로 JAR 파일이 생성된다.

```bash
./gradlew build
```

생성된 JAR 파일을 Docker 이미지에 포함하려면 다음과 같은 Dockerfile을 작성할 수 있다.

```dockerfile
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY build/libs/myapp.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

이 Dockerfile의 실행 흐름은 다음과 같다.

```text
1. Java 17 실행 환경 이미지 사용
2. /app 디렉터리 생성 및 이동
3. Spring Boot JAR 파일 복사
4. 8080 포트 사용 명시
5. java -jar app.jar 실행
```

---

## 24. Docker 사용 시 장점

Docker의 장점은 다음과 같다.

| 장점 | 설명 |
|------|------|
| 환경 일관성 | 개발, 테스트, 운영 환경을 동일하게 유지 가능 |
| 배포 편의성 | 애플리케이션과 실행 환경을 이미지로 묶어 배포 가능 |
| 빠른 실행 | 가상 머신보다 가볍고 실행 속도가 빠름 |
| 확장성 | 동일 이미지를 기반으로 여러 컨테이너 실행 가능 |
| 격리성 | 애플리케이션별로 독립된 실행 환경 제공 |
| 이식성 | Docker가 설치된 환경이면 어디서든 실행 가능 |
| 운영 자동화 | CI/CD와 쉽게 연동 가능 |

---

## 25. Docker 사용 시 단점 및 주의사항

Docker는 강력한 도구이지만, 모든 문제를 자동으로 해결해 주지는 않는다.

### 25.1 데이터 영속성 문제

컨테이너는 삭제될 수 있는 실행 단위이다.  
따라서 데이터베이스처럼 중요한 데이터를 컨테이너 내부에만 저장하면 위험하다.

해결 방법은 Volume을 사용하는 것이다.

```text
DB 데이터 → Docker Volume에 저장
```

---

### 25.2 이미지 크기 관리

Docker Image가 너무 커지면 빌드와 배포 시간이 길어진다.

이미지 크기를 줄이기 위해 다음과 같은 방법을 사용할 수 있다.

- 불필요한 파일 복사하지 않기
- 가벼운 베이스 이미지 사용
- 멀티 스테이지 빌드 사용
- `.dockerignore` 파일 사용

---

### 25.3 보안 문제

컨테이너는 격리되어 있지만 완전히 독립된 운영체제는 아니다.  
따라서 다음 사항에 주의해야 한다.

- 불필요한 권한 부여 금지
- root 사용자 실행 최소화
- 신뢰할 수 있는 이미지 사용
- 민감한 정보는 이미지에 직접 포함하지 않기
- 환경 변수나 Secret 관리 도구 사용

---

### 25.4 컨테이너 관리 복잡성

컨테이너 수가 많아지면 단순 Docker Compose만으로 관리하기 어려울 수 있다.

이 경우 Kubernetes 같은 컨테이너 오케스트레이션 도구를 사용한다.

---

## 26. Docker와 Kubernetes의 차이

Docker는 컨테이너를 만들고 실행하는 도구이다.  
Kubernetes는 많은 컨테이너를 여러 서버에 걸쳐 관리하는 오케스트레이션 도구이다.

| 구분 | Docker | Kubernetes |
|------|--------|------------|
| 목적 | 컨테이너 생성 및 실행 | 컨테이너 오케스트레이션 |
| 관리 대상 | 개별 컨테이너 | 다수의 컨테이너와 서버 |
| 주요 기능 | 이미지 빌드, 컨테이너 실행 | 배포, 확장, 복구, 로드밸런싱 |
| 사용 예 | 로컬 개발, 단일 서버 배포 | 대규모 운영 환경 |

간단히 말하면 다음과 같다.

```text
Docker: 컨테이너를 실행하는 도구
Kubernetes: 컨테이너들을 운영 환경에서 관리하는 도구
```

---

## 27. Docker 사용 예시 흐름

Spring Boot 애플리케이션을 Docker로 배포하는 전체 흐름은 다음과 같다.

```text
1. Spring Boot 코드 작성
        ↓
2. Gradle 또는 Maven으로 JAR 빌드
        ↓
3. Dockerfile 작성
        ↓
4. Docker Image 생성
        ↓
5. Docker Container 실행
        ↓
6. 브라우저 또는 API 클라이언트로 접근
```

예시 명령어는 다음과 같다.

```bash
./gradlew build
docker build -t spring-app .
docker run -p 8080:8080 spring-app
```

---

## 28. Docker 사용 시 자주 헷갈리는 점

### 28.1 Image와 Container는 다르다

```text
Image: 실행 템플릿
Container: 이미지를 실행한 실제 프로세스
```

Image는 실행 가능한 설계도이고, Container는 실제 실행 중인 인스턴스이다.

---

### 28.2 컨테이너는 가상 머신이 아니다

컨테이너는 운영체제를 통째로 실행하지 않는다.  
호스트 OS의 커널을 공유하면서 격리된 프로세스로 실행된다.

---

### 28.3 컨테이너를 삭제하면 내부 데이터도 사라질 수 있다

컨테이너 내부에 저장된 데이터는 컨테이너 삭제 시 함께 사라질 수 있다.  
중요한 데이터는 Volume을 사용해 저장해야 한다.

---

### 28.4 Dockerfile의 `EXPOSE`는 실제 포트 오픈이 아니다

`EXPOSE 8080`은 컨테이너가 8080 포트를 사용한다는 문서적 의미에 가깝다.  
실제로 외부에서 접근하려면 `docker run -p` 옵션이 필요하다.

```bash
docker run -p 8080:8080 spring-app
```

---

## 29. 정리

- Docker는 애플리케이션을 컨테이너라는 격리된 환경에서 실행하게 해주는 플랫폼이다.
- Docker를 사용하면 개발 환경과 운영 환경의 차이를 줄일 수 있다.
- Docker Image는 컨테이너를 만들기 위한 실행 템플릿이다.
- Docker Container는 이미지를 실행한 실제 인스턴스이다.
- Dockerfile은 Docker Image를 만들기 위한 설정 파일이다.
- Volume은 컨테이너 데이터를 영구적으로 저장하기 위해 사용한다.
- Docker Compose는 여러 컨테이너를 하나의 설정 파일로 관리하는 도구이다.
- Java/Spring Boot 애플리케이션은 Docker를 통해 실행 환경과 애플리케이션을 함께 패키징할 수 있다.
- Docker는 배포 편의성, 환경 일관성, 확장성 측면에서 장점이 크다.
- 데이터 영속성, 보안, 이미지 크기, 컨테이너 관리 복잡성에는 주의해야 한다.

---

## 핵심 키워드

- Docker
- Container
- Image
- Dockerfile
- Docker Engine
- Docker Hub
- Volume
- Network
- Docker Compose
- Port Mapping
- Spring Boot Dockerfile
- Containerization
- Kubernetes
