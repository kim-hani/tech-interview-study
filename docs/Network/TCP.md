# TCP (Transmission Control Protocol)

---

## 1. TCP란?

![TCP 3-HandShake](https://blog.kakaocdn.net/dna/b1zE1m/btsHnq3Mtq0/AAAAAAAAAAAAAAAAAAAAAHPLr31WQY7fga0pStAi-2ZDeOBAu0Qwk2iHUwUovndf/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=wOxCJPUpoFIDdH%2FiVI7VGcLyK8w%3D)

- TCP는 **신뢰성 있는 데이터 전송을 지원하는 연결 지향형 프로토콜**이다.
- 일반적으로 IP와 함께 사용되며, IP가 패킷의 전달(배달)을 담당한다면 TCP는 **패킷의 추적 및 관리**를 담당한다.
- 송수신 전, **3-Way Handshake** 과정을 통해 연결을 설정하고, **4-Way Handshake** 과정을 통해 연결을 해제한다. (가상 회선 방식)
- 흐름 제어, 혼잡 제어, 오류 제어를 통해 **신뢰적 전송을 보장**하지만, 이 때문에 UDP보다 전송 속도가 느리다.
- **데이터의 전송 순서를 보장**하고, 수신 여부를 확인할 수 있다.
- TCP는 **가상 회선 방식**을 제공하는데, 이는 송신측과 수신측 간에 패킷 전송을 위한 논리적 경로를 설정한다는 의미이다.

### TCP의 활용 예시
- HTTP/HTTPS 웹 통신
- 이메일 (SMTP, IMAP, POP3)
- 파일 전송 (FTP 등)

---

## 2. 패킷(Packet)이란?

- 인터넷에서 데이터를 효율적으로 전송하기 위해 큰 데이터를 여러 조각으로 나누는데, 이 조각을 **패킷(Packet)** 이라고 한다.
- 각 패킷은 헤더에 **번호(sequence number)** 가 붙어 있으며, 수신측에서 이를 기반으로 **재조립(reassembly)** 한다.
- 이를 통해 손실 여부를 확인하고 올바른 순서대로 데이터를 복원할 수 있다.

---

## 3. 흐름 제어 (Flow Control)

송신측과 수신측 간의 **데이터 처리 속도 차이**를 해결하기 위한 기법이다.  
만약 송신측이 너무 빠른 속도로 데이터를 전송하면 수신측의 **수신 버퍼 오버플로우**가 발생하여 데이터 손실이 일어날 수 있다.  
따라서 송신측은 수신측의 **Receive Window** 크기에 맞추어 전송량을 제어한다.

### 기법

#### 1) Stop and Wait
- 매번 전송한 패킷에 대한 ACK(확인 응답)를 반드시 받은 뒤에야 다음 패킷을 전송한다.
- 구현이 단순하지만, 대역폭 활용도가 떨어지는 비효율적 방식이다.

#### 2) Sliding Window
- 수신측에서 설정한 윈도우 크기만큼 송신측이 여러 패킷을 연속적으로 전송할 수 있는 방식.
- ACK를 받으면 윈도우를 옆으로 옮겨 새로운 패킷을 전송할 수 있다.
- TCP의 기본 메커니즘으로, Stop and Wait의 비효율성을 개선하였다.

---

## 4. 오류 제어 (Error Control)

TCP는 **ARQ(Automatic Repeat reQuest)** 기법을 통해 오류 발생 시 데이터를 재전송하여 신뢰성을 보장한다.

### 주요 기법

#### 1) Stop and Wait ARQ
- 송신측은 1개의 프레임을 보내고, 수신측은 에러 여부를 판단해 ACK(정상 수신) 또는 NAK(재전송 요청)를 보낸다.
- 프레임 번호는 번갈아 0, 1로 지정된다.
- 데이터나 ACK가 분실될 경우, 타임아웃 후 송신측에서 재전송한다.

#### 2) Go-Back-N ARQ
- Sliding Window 기법을 이용.
- 오류나 패킷 손실이 발생하면, **확인된 마지막 프레임 이후 모든 프레임을 재전송**한다.
- 수신측은 잘못된 프레임 이후로 받은 데이터는 모두 폐기한다.
- 구현은 단순하지만, 불필요한 재전송이 많을 수 있다.

#### 3) Selective Repeat ARQ
- Go-Back-N의 단점을 개선한 방식.
- 오류나 손실이 발생한 **해당 프레임만 재전송**한다.
- 수신측에서 버퍼링 및 데이터 재정렬이 필요하다.

---

## 5. 혼잡 제어 (Congestion Control)

송신측의 데이터 전송 속도와 네트워크의 처리 능력 간의 불균형을 해결하기 위한 기법이다.  
네트워크 혼잡이 발생하면 패킷 손실, 지연 증가, 오버플로우가 발생할 수 있으므로 TCP는 송신자의 전송 속도를 **동적으로 조절**한다.  
흐름 제어가 송신자 ↔ 수신자 간의 조절이라면, 혼잡 제어는 **네트워크 전체**를 대상으로 한다.

### 혼잡 제어 기법

#### 1) AIMD (Additive Increase, Multiplicative Decrease)
- 패킷 전송이 성공하면 전송 윈도우를 1씩 증가.
- 손실이나 타임아웃 발생 시 전송 윈도우를 절반으로 줄임.
- 공평성을 보장하지만, 초기 대역폭 활용이 비효율적이다.

#### 2) Slow Start
- 초기에 작은 윈도우 크기에서 시작하여, ACK를 받을 때마다 **지수적 증가**.
- 네트워크 수용량을 빠르게 탐색 가능.
- 혼잡 발생 시 윈도우 크기를 크게 줄이고 다시 시작한다.

#### 3) Congestion Avoidance (혼잡 회피)
- 임계값(threshold)에 도달한 이후부터는 선형적으로 1씩 증가시킨다.
- 네트워크 혼잡 발생 확률을 줄인다.

#### 4) Fast Retransmit (빠른 재전송)
- 동일한 ACK 번호를 3번 연속 수신하면, 타임아웃을 기다리지 않고 해당 패킷을 즉시 재전송한다.

#### 5) Fast Recovery (빠른 회복)
- 혼잡 발생 시 윈도우 크기를 1이 아닌 절반으로 줄인 뒤, 선형 증가.
- Slow Start와 AIMD의 장점을 결합한 방식.

---

## 6. 흐름 제어 vs 혼잡 제어

| 구분 | 흐름 제어 (Flow Control) | 혼잡 제어 (Congestion Control) |
|------|--------------------------|--------------------------------|
| 대상 | 송신자 ↔ 수신자 | 송신자 ↔ 네트워크 전역 |
| 목적 | 수신 버퍼 오버플로우 방지 | 네트워크 혼잡 방지 |
| 기준 | Receive Window (rwnd) | Congestion Window (cwnd) |
| 관점 | End-to-End | Host ↔ Router 포함 네트워크 전체 |

---

## 7. 정리

- **TCP**는 신뢰적 데이터 전송을 위해 **흐름 제어 + 오류 제어 + 혼잡 제어**를 모두 수행한다.
- 흐름 제어는 송수신 속도의 차이를 해결하고,  
  오류 제어는 손상/손실 데이터를 재전송하며,  
  혼잡 제어는 네트워크의 상태에 맞추어 전송 속도를 동적으로 조절한다.
- 이러한 기법들이 결합되어 TCP는 IP 네트워크 위에서 안정적이고 신뢰성 있는 전송을 보장한다.

---

## 참고 자료

- Brian Storti, [TCP Flow Control](https://www.brianstorti.com/tcp-flow-control/)  
- [TCP(흐름제어혼잡제어)](https://github.com/gyoogle/tech-interview-for-developer/blob/master/Computer%20Science/Network/TCP%20(%ED%9D%90%EB%A6%84%EC%A0%9C%EC%96%B4%ED%98%BC%EC%9E%A1%EC%A0%9C%EC%96%B4).md)
- [TCP](https://github.com/WooVictory/Ready-For-Tech-Interview/blob/master/Network/3%20way%20handshake.md)
- Tanenbaum, *Computer Networks*  
