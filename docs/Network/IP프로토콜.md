# IP / TCP-IP 프로토콜 정리

---

## 1. 개요

- IP는 **인터넷 프로토콜(Internet Protocol)** 로, 네트워크 계층에서 **패킷을 목적지까지 전달**하는 역할을 한다.  
- TCP/IP는 IP를 포함한 여러 통신 프로토콜을 묶은 **인터넷 프로토콜 스위트(Internet Protocol Suite)** 를 뜻한다.  
- 이 프로토콜 스택은 데이터의 **패킷화, 주소 지정, 전송, 라우팅, 재조합** 등의 기능을 계층별로 분리하여 수행한다.

---

## 2. 계층 구조 & 모델 비교

### 2.1 TCP-IP 모델 (인터넷 프로토콜 스택)

TCP/IP 모델은 보통 **4계층** 또는 **5계층**으로 설명된다. 대표 구성은 다음과 같다.

| 계층 | 기능 및 주요 프로토콜 |
|------|------------------------|
| **애플리케이션 계층** | HTTP, FTP, SMTP, DNS 등 애플리케이션 수준 통신 |
| **전송 계층** | TCP, UDP — 애플리케이션 간 데이터 전달, 흐름 제어, 신뢰성 확보 |
| **인터넷 계층 (네트워크 계층)** | IP, ICMP, IGMP — 패킷 경로 선택, 주소 지정, 오류 제어 |
| **링크 계층 (네트워크 액세스 계층)** | 이더넷, 무선 LAN, ARP 등 물리 매체 위의 프레임 전송 |

- TCP/IP 모델은 **OSI 7계층**과 유사하지만 계층 수와 명칭이 다르다.  
- 일부 설명에서는 **물리 계층**을 포함하여 5계층으로 표현하기도 한다.

### 2.2 OSI 모델과의 비교 포인트

- OSI는 7계층으로 더 세밀하게 분리되어 있지만, 실제 인터넷 구조는 TCP/IP 모델 중심이다.  
- OSI의 **표현 계층**과 **세션 계층**은 TCP/IP에서는 일반적으로 **애플리케이션 계층**에 통합된다.

---

## 3. 주요 프로토콜 및 기능

### 3.1 IP (Internet Protocol)

- IP는 **비연결형(connectionless) 패킷 전달 프로토콜**로, 신뢰성이나 순서 보장은 하지 않는다.  
- 주요 기능:
  - 출발지·목적지 주소 지정 (IP 주소)
  - 패킷 분할(Fragmentation) 및 재조합
  - 라우팅 (다중 네트워크 간 전달 경로 선택)
- IP 버전:
  - **IPv4**: 32비트 주소 체계, 현재 대부분의 인터넷 환경에서 사용  
  - **IPv6**: 128비트 주소 체계, 주소 고갈 문제 해결 목적

### 3.2 [TCP](./TCP.md) (Transmission Control Protocol)

- TCP는 전송 계층의 프로토콜로, **신뢰성 있는 데이터 전송**을 제공한다.  
- **연결 지향(Connection-Oriented)** 방식으로 동작하며, 연결 설정 → 데이터 전송 → 연결 종료 단계를 거친다.  
- 주요 기능:
  - ACK(확인 응답) 및 재전송
  - 혼잡 제어(Congestion Control)
  - 흐름 제어(Flow Control)
  - 데이터 순서 보장 및 재조합

### 3.3 UDP (User Datagram Protocol)

- UDP는 **비연결형(connectionless)** 전송 프로토콜이다.  
- 신뢰성, 순서 보장, 흐름 제어 기능은 없지만 속도가 빠르고 오버헤드가 적다.  
- 실시간 통신(VoIP), 영상 스트리밍, DNS 요청 등에 주로 사용된다.

### 3.4 보조 프로토콜

| 프로토콜 | 설명 |
|-----------|------|
| **ICMP (Internet Control Message Protocol)** | 네트워크 상태 점검 및 오류 메시지 전달 (예: Ping) |
| **ARP (Address Resolution Protocol)** | IP 주소 ↔ MAC 주소 매핑 |
| **IGMP (Internet Group Management Protocol)** | 멀티캐스트 그룹 관리 |

---

## 4. 패킷 구조 & 전송 흐름

### 4.1 IP 패킷 구조 (헤더 주요 필드)
![IP 패킷 구조](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcotHqu%2FbtrajqbNLIq%2FAAAAAAAAAAAAAAAAAAAAAALR-iONdJZmXwpsjeGku-Gk4KiFRGzcCYr6X0_frkJF%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1761922799%26allow_ip%3D%26allow_referer%3D%26signature%3DbzbtjJKytPBmhUXdIE4fxvzjS1w%253D)

| 필드 | 설명 |
|-------|------|
| Version | IPv4(4) 또는 IPv6(6) |
| Header Length | 헤더의 전체 길이 |
| Type of Service | 서비스 품질(QoS) 관련 |
| Total Length | 패킷 전체 길이 |
| Identification / Flags / Fragment Offset | 패킷 분할 및 조각 재조합 정보 |
| TTL (Time to Live) | 패킷이 라우터를 통과할 수 있는 최대 횟수 |
| Protocol | 상위 계층 프로토콜 (TCP=6, UDP=17 등) |
| Header Checksum | 헤더 오류 검출용 체크섬 |
| Source IP / Destination IP | 출발지 및 목적지 IP 주소 |

### 4.2 전송 과정 요약

1. **애플리케이션 계층**: 사용자 데이터 생성  
2. **전송 계층 (TCP/UDP)**: 세그먼트(또는 데이터그램) 단위로 패킹  
3. **인터넷 계층 (IP)**: 패킷 생성 및 라우팅 수행  
4. **링크 계층**: 물리 매체를 통해 프레임 단위로 전송  
5. **수신 측**: 반대 순서로 계층을 거쳐 데이터 복원  

---

## 5. 특징, 장단점 및 고려사항

### 5.1 특징 요약

- 계층화 구조로 유연성과 확장성이 높음  
- IP는 **신뢰성을 보장하지 않음** (“best effort delivery”)  
- TCP/IP는 **인터넷의 표준 통신 모델**

### 5.2 장점

- 다양한 네트워크 간 상호 연결 가능  
- 확장성과 상호 운용성 높음  
- 계층 독립적 설계 → 유지보수 및 확장 용이

### 5.3 단점

- IP 자체는 오류 복구 불가 (상위 계층에서 복구 필요)  
- IPv4 주소 고갈 문제  
- NAT, 방화벽 등으로 인한 연결 제약  
- 패킷 단편화 및 재조합 시 성능 저하 가능

---

## 6. 최신 동향 & 보안 이슈

- **IPv6 채택 확대**: 주소 고갈 해결 및 효율적 라우팅 지원  
- **보안 강화**: IPsec, TLS 등 계층 간 암호화 기술 통합  
- **신규 프로토콜 등장**: QUIC, HTTP/3 등 TCP를 대체하거나 보완하는 프로토콜  
- **패킷 보안 연구 강화**: 오버레이 네트워크 및 라우팅 공격 방지 연구 진행 중

---

## 참고 자료

- [Internet Protocol Suite — Wikipedia](https://en.wikipedia.org/wiki/Internet_protocol_suite)  
- [Internet Protocol (IP) — Wikipedia](https://en.wikipedia.org/wiki/Internet_Protocol)  
- [Transmission Control Protocol (TCP) — Wikipedia](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)  
- [TCP/IP Model — GeeksforGeeks](https://www.geeksforgeeks.org/computer-networks/tcp-ip-model/)  
- [Splunk Blog: TCP/IP Explained](https://www.splunk.com/en_us/blog/learn/tcp-ip.html)
