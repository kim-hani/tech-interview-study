# Heap 자료구조

---

## 1. Heap이란?

**Heap**은 데이터 중에서 **최댓값 또는 최솟값을 빠르게 찾기 위해 사용되는 완전 이진 트리 기반의 자료구조**이다.

Heap은 보통 다음과 같은 상황에서 사용된다.

- 가장 작은 값 빠르게 찾기
- 가장 큰 값 빠르게 찾기
- 우선순위가 높은 작업 먼저 처리하기
- 정렬 알고리즘 구현
- Top K 문제 해결

여기서 말하는 Heap은 **자료구조 Heap**이다.  
JVM 메모리 영역의 **Heap 메모리**와는 다른 개념이다.

```text
Heap 자료구조: 최댓값/최솟값을 빠르게 찾기 위한 자료구조
JVM Heap 메모리: 객체가 저장되는 메모리 영역
```

---

## 2. Heap의 핵심 특징

Heap은 다음 두 가지 조건을 만족한다.

### 2.1 완전 이진 트리

Heap은 **완전 이진 트리(Complete Binary Tree)** 형태를 가진다.

완전 이진 트리란 마지막 레벨을 제외한 모든 레벨이 채워져 있고, 마지막 레벨은 왼쪽부터 차례대로 채워진 트리이다.

```text
        10
      /    \
     7      5
    / \    /
   3   2  1
```

위 트리는 노드가 왼쪽부터 순서대로 채워져 있으므로 완전 이진 트리이다.

반면 다음 트리는 완전 이진 트리가 아니다.

```text
        10
      /    \
     7      5
      \      \
       2      1
```

중간에 비어 있는 위치가 있기 때문이다.

---

### 2.2 Heap 속성

Heap은 부모 노드와 자식 노드 사이에 특정한 대소 관계를 유지한다.

Heap은 크게 두 종류로 나뉜다.

| 종류 | 설명 |
|------|------|
| Max Heap | 부모 노드의 값이 자식 노드의 값보다 크거나 같다 |
| Min Heap | 부모 노드의 값이 자식 노드의 값보다 작거나 같다 |

---

## 3. Max Heap

**Max Heap**은 부모 노드가 자식 노드보다 크거나 같은 Heap이다.

즉, 루트 노드에는 항상 가장 큰 값이 위치한다.

```text
        10
      /    \
     7      8
    / \    /
   3   2  5
```

위 트리는 다음 조건을 만족한다.

```text
10 >= 7
10 >= 8
7 >= 3
7 >= 2
8 >= 5
```

따라서 Max Heap이다.

Max Heap에서는 최댓값을 `O(1)`에 확인할 수 있다.

---

## 4. Min Heap

**Min Heap**은 부모 노드가 자식 노드보다 작거나 같은 Heap이다.

즉, 루트 노드에는 항상 가장 작은 값이 위치한다.

```text
        1
      /   \
     3     2
    / \   /
   7   5 8
```

위 트리는 다음 조건을 만족한다.

```text
1 <= 3
1 <= 2
3 <= 7
3 <= 5
2 <= 8
```

따라서 Min Heap이다.

Min Heap에서는 최솟값을 `O(1)`에 확인할 수 있다.

---

## 5. Heap은 전체 정렬 상태가 아니다

Heap에서 주의할 점은 **Heap이 완전히 정렬된 자료구조는 아니라는 점**이다.

예를 들어 Min Heap에서는 루트 노드가 가장 작은 값이라는 것은 보장된다.

```text
        1
      /   \
     3     2
    / \   /
   7   5 8
```

하지만 전체 노드가 오름차순으로 정렬되어 있는 것은 아니다.

```text
배열 표현: [1, 3, 2, 7, 5, 8]
```

이 배열은 완전히 정렬된 배열이 아니다.

Heap은 전체 정렬이 아니라, **부모와 자식 사이의 대소 관계만 보장**한다.

---

## 6. Heap의 배열 표현

Heap은 트리 구조이지만, 실제 구현에서는 보통 배열을 사용한다.

완전 이진 트리이기 때문에 배열로 효율적으로 표현할 수 있다.

다음 Heap을 보자.

```text
        10
      /    \
     7      8
    / \    /
   3   2  5
```

이를 배열로 표현하면 다음과 같다.

```text
[10, 7, 8, 3, 2, 5]
```

각 인덱스는 다음처럼 대응된다.

```text
index 0 → 10
index 1 → 7
index 2 → 8
index 3 → 3
index 4 → 2
index 5 → 5
```

---

## 7. 배열에서 부모와 자식 인덱스 계산

배열 인덱스를 `0`부터 시작한다고 할 때, 특정 노드의 인덱스를 `i`라고 하면 다음과 같이 계산한다.

| 관계 | 공식 |
|------|------|
| 부모 노드 | `(i - 1) / 2` |
| 왼쪽 자식 | `2 * i + 1` |
| 오른쪽 자식 | `2 * i + 2` |

예를 들어 배열이 다음과 같다고 하자.

```text
[10, 7, 8, 3, 2, 5]
```

인덱스 `1`의 값은 `7`이다.

```text
i = 1
왼쪽 자식 = 2 * 1 + 1 = 3 → 3
오른쪽 자식 = 2 * 1 + 2 = 4 → 2
부모 = (1 - 1) / 2 = 0 → 10
```

따라서 `7`의 부모는 `10`, 자식은 `3`과 `2`이다.

---

## 8. Heap의 주요 연산

Heap의 대표적인 연산은 다음과 같다.

| 연산 | 설명 | 시간 복잡도 |
|------|------|-------------|
| peek | 루트 값 확인 | `O(1)` |
| insert | 값 삽입 | `O(log N)` |
| delete | 루트 값 삭제 | `O(log N)` |
| heapify | Heap 속성 복구 | `O(log N)` |
| build heap | 배열을 Heap으로 변환 | `O(N)` |

---

## 9. 삽입 연산

Heap에 새로운 값을 삽입할 때는 다음 과정을 거친다.

```text
1. 새 값을 배열의 마지막에 추가한다.
2. 부모 노드와 비교한다.
3. Heap 속성이 깨졌다면 부모와 교환한다.
4. Heap 속성이 만족될 때까지 위로 올라간다.
```

이 과정을 **상향식 heapify**, 또는 **heapify-up**이라고 한다.

---

### 9.1 Max Heap 삽입 예시

기존 Max Heap이 다음과 같다고 하자.

```text
        10
      /    \
     7      8
    / \
   3   2
```

배열 표현은 다음과 같다.

```text
[10, 7, 8, 3, 2]
```

여기에 `9`를 삽입한다.

먼저 마지막 위치에 추가한다.

```text
        10
      /    \
     7      8
    / \    /
   3   2  9
```

배열 표현:

```text
[10, 7, 8, 3, 2, 9]
```

`9`는 부모 `8`보다 크므로 교환한다.

```text
        10
      /    \
     7      9
    / \    /
   3   2  8
```

배열 표현:

```text
[10, 7, 9, 3, 2, 8]
```

이제 `9`의 부모는 `10`이고, `10 >= 9`이므로 Max Heap 조건을 만족한다.

---

## 10. 삭제 연산

Heap에서 삭제는 일반적으로 **루트 노드 삭제**를 의미한다.

Max Heap에서는 최댓값 삭제, Min Heap에서는 최솟값 삭제이다.

삭제 과정은 다음과 같다.

```text
1. 루트 노드를 삭제한다.
2. 마지막 노드를 루트 위치로 옮긴다.
3. 자식 노드와 비교한다.
4. Heap 속성이 깨졌다면 자식과 교환한다.
5. Heap 속성이 만족될 때까지 아래로 내려간다.
```

이 과정을 **하향식 heapify**, 또는 **heapify-down**이라고 한다.

---

### 10.1 Max Heap 삭제 예시

기존 Max Heap이 다음과 같다고 하자.

```text
        10
      /    \
     7      9
    / \    /
   3   2  8
```

배열 표현:

```text
[10, 7, 9, 3, 2, 8]
```

루트 노드 `10`을 삭제한다.  
마지막 노드 `8`을 루트로 옮긴다.

```text
        8
      /   \
     7     9
    / \
   3   2
```

배열 표현:

```text
[8, 7, 9, 3, 2]
```

이제 `8`의 자식 중 더 큰 값은 `9`이다.  
Max Heap에서는 부모가 자식보다 커야 하므로 `8`과 `9`를 교환한다.

```text
        9
      /   \
     7     8
    / \
   3   2
```

배열 표현:

```text
[9, 7, 8, 3, 2]
```

이제 Max Heap 조건을 만족한다.

---

## 11. Heap의 시간 복잡도

Heap은 완전 이진 트리이므로 높이가 `log N`이다.

삽입이나 삭제 시 최악의 경우 루트부터 리프까지, 또는 리프부터 루트까지 이동할 수 있다.  
따라서 삽입과 삭제의 시간 복잡도는 `O(log N)`이다.

| 연산 | 시간 복잡도 |
|------|-------------|
| 최댓값/최솟값 확인 | `O(1)` |
| 삽입 | `O(log N)` |
| 삭제 | `O(log N)` |
| Heap 생성 | `O(N)` |
| 정렬 | `O(N log N)` |

---

## 12. Priority Queue와 Heap

**Priority Queue(우선순위 큐)** 는 우선순위가 높은 데이터를 먼저 꺼내는 자료구조이다.

Heap은 Priority Queue를 구현하는 대표적인 방법이다.

```text
Priority Queue: 추상적인 자료구조 개념
Heap: Priority Queue를 구현하는 실제 자료구조 중 하나
```

즉, Heap과 Priority Queue는 완전히 같은 말은 아니다.

| 구분 | 설명 |
|------|------|
| Priority Queue | 우선순위에 따라 데이터를 처리하는 자료구조 |
| Heap | Priority Queue를 구현하는 데 자주 사용되는 자료구조 |

---

## 13. Java에서 Heap 사용하기

Java에서는 Heap 자료구조를 직접 구현하지 않아도 `PriorityQueue`를 사용할 수 있다.

Java의 `PriorityQueue`는 기본적으로 **Min Heap** 구조로 동작한다.

---

### 13.1 Min Heap 예시

```java
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        pq.offer(5);
        pq.offer(1);
        pq.offer(3);
        pq.offer(2);

        while (!pq.isEmpty()) {
            System.out.println(pq.poll());
        }
    }
}
```

출력 결과:

```text
1
2
3
5
```

`PriorityQueue`는 가장 작은 값을 먼저 꺼낸다.

---

### 13.2 주요 메서드

| 메서드 | 설명 |
|--------|------|
| `offer(value)` | 값 삽입 |
| `add(value)` | 값 삽입 |
| `peek()` | 루트 값 확인 |
| `poll()` | 루트 값 삭제 후 반환 |
| `isEmpty()` | 비어 있는지 확인 |
| `size()` | 원소 개수 반환 |

`offer()`와 `add()`는 둘 다 값을 삽입한다.  
일반적으로 Queue 계열에서는 `offer()`를 많이 사용한다.

---

## 14. Java에서 Max Heap 구현하기

Java의 `PriorityQueue`는 기본적으로 Min Heap이다.  
Max Heap으로 사용하려면 정렬 기준을 반대로 지정해야 한다.

```java
import java.util.Collections;
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());

        pq.offer(5);
        pq.offer(1);
        pq.offer(3);
        pq.offer(2);

        while (!pq.isEmpty()) {
            System.out.println(pq.poll());
        }
    }
}
```

출력 결과:

```text
5
3
2
1
```

`Collections.reverseOrder()`를 사용하면 큰 값이 우선순위를 가진다.

---

## 15. 객체를 PriorityQueue에 넣는 경우

객체를 Heap에 넣을 때는 어떤 기준으로 우선순위를 정할지 명확히 지정해야 한다.

예를 들어 학생 객체를 점수 기준으로 정렬한다고 하자.

```java
import java.util.PriorityQueue;

class Student {
    String name;
    int score;

    public Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
}

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Student> pq = new PriorityQueue<>(
            (s1, s2) -> s1.score - s2.score
        );

        pq.offer(new Student("A", 90));
        pq.offer(new Student("B", 70));
        pq.offer(new Student("C", 80));

        while (!pq.isEmpty()) {
            Student student = pq.poll();
            System.out.println(student.name + " " + student.score);
        }
    }
}
```

출력 결과:

```text
B 70
C 80
A 90
```

점수가 낮은 학생이 먼저 나온다.

---

## 16. Comparator 사용 시 주의사항

다음 코드는 간단하지만, 정수 범위가 큰 경우 오버플로우 위험이 있을 수 있다.

```java
(s1, s2) -> s1.score - s2.score
```

더 안전한 방식은 `Integer.compare()`를 사용하는 것이다.

```java
PriorityQueue<Student> pq = new PriorityQueue<>(
    (s1, s2) -> Integer.compare(s1.score, s2.score)
);
```

내림차순으로 정렬하려면 다음과 같이 작성한다.

```java
PriorityQueue<Student> pq = new PriorityQueue<>(
    (s1, s2) -> Integer.compare(s2.score, s1.score)
);
```

---

## 17. Heap 직접 구현 예시

Java에서 Min Heap을 직접 구현하면 다음과 같다.

```java
import java.util.ArrayList;
import java.util.List;

public class MinHeap {

    private final List<Integer> heap = new ArrayList<>();

    public void insert(int value) {
        heap.add(value);
        heapifyUp(heap.size() - 1);
    }

    public int peek() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }

        return heap.get(0);
    }

    public int delete() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }

        int root = heap.get(0);
        int last = heap.remove(heap.size() - 1);

        if (!heap.isEmpty()) {
            heap.set(0, last);
            heapifyDown(0);
        }

        return root;
    }

    private void heapifyUp(int index) {
        while (index > 0) {
            int parentIndex = (index - 1) / 2;

            if (heap.get(parentIndex) <= heap.get(index)) {
                break;
            }

            swap(parentIndex, index);
            index = parentIndex;
        }
    }

    private void heapifyDown(int index) {
        int size = heap.size();

        while (true) {
            int leftChild = index * 2 + 1;
            int rightChild = index * 2 + 2;
            int smallest = index;

            if (leftChild < size && heap.get(leftChild) < heap.get(smallest)) {
                smallest = leftChild;
            }

            if (rightChild < size && heap.get(rightChild) < heap.get(smallest)) {
                smallest = rightChild;
            }

            if (smallest == index) {
                break;
            }

            swap(index, smallest);
            index = smallest;
        }
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
}
```

사용 예시는 다음과 같다.

```java
public class Main {
    public static void main(String[] args) {
        MinHeap heap = new MinHeap();

        heap.insert(5);
        heap.insert(1);
        heap.insert(3);
        heap.insert(2);

        System.out.println(heap.delete()); // 1
        System.out.println(heap.delete()); // 2
        System.out.println(heap.delete()); // 3
        System.out.println(heap.delete()); // 5
    }
}
```

---

## 18. Heap Sort

**Heap Sort**는 Heap을 이용한 정렬 알고리즘이다.

Heap Sort의 기본 아이디어는 다음과 같다.

```text
1. 배열을 Heap으로 만든다.
2. 루트 값을 꺼내 정렬 결과에 추가한다.
3. Heap 속성을 복구한다.
4. 모든 원소가 제거될 때까지 반복한다.
```

Max Heap을 사용하면 큰 값부터 꺼낼 수 있고, Min Heap을 사용하면 작은 값부터 꺼낼 수 있다.

Heap Sort의 시간 복잡도는 다음과 같다.

| 구분 | 시간 복잡도 |
|------|-------------|
| 최선 | `O(N log N)` |
| 평균 | `O(N log N)` |
| 최악 | `O(N log N)` |

Heap Sort는 추가 메모리를 적게 사용할 수 있다는 장점이 있다.  
하지만 일반적으로 안정 정렬은 아니다.

---

## 19. Heap의 활용 예시

Heap은 다음과 같은 문제에서 자주 사용된다.

| 활용 분야 | 설명 |
|----------|------|
| 우선순위 큐 | 우선순위가 높은 작업 먼저 처리 |
| 작업 스케줄링 | CPU 작업, 서버 작업 처리 |
| 다익스트라 알고리즘 | 최단 거리 후보 중 가장 작은 거리 선택 |
| Top K 문제 | 상위 K개 또는 하위 K개 데이터 추출 |
| Heap Sort | Heap 기반 정렬 |
| 중앙값 유지 | Min Heap과 Max Heap을 함께 사용 |
| 이벤트 시뮬레이션 | 가장 빠른 이벤트 먼저 처리 |

---

## 20. Top K 문제 예시

Heap은 상위 K개 값을 구할 때 유용하다.

예를 들어 배열에서 가장 큰 3개 값을 구한다고 하자.

```java
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {7, 4, 10, 2, 8, 15, 3};
        int k = 3;

        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int number : numbers) {
            minHeap.offer(number);

            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        while (!minHeap.isEmpty()) {
            System.out.println(minHeap.poll());
        }
    }
}
```

출력 결과:

```text
8
10
15
```

이 방식은 크기 `K`의 Min Heap을 유지한다.  
현재까지 본 값 중 가장 큰 K개만 Heap에 남긴다.

시간 복잡도는 다음과 같다.

```text
O(N log K)
```

전체 정렬을 하면 `O(N log N)`이므로, K가 작을 때 Heap을 사용하는 방식이 더 효율적이다.

---

## 21. Heap과 Binary Search Tree의 차이

Heap과 Binary Search Tree는 모두 트리 기반 자료구조이지만 목적이 다르다.

| 구분 | Heap | Binary Search Tree |
|------|------|--------------------|
| 목적 | 최댓값 또는 최솟값 빠르게 조회 | 탐색, 삽입, 삭제 |
| 구조 | 완전 이진 트리 | 왼쪽 < 부모 < 오른쪽 규칙 |
| 정렬 상태 | 전체 정렬 아님 | 중위 순회 시 정렬 |
| 루트 | 최댓값 또는 최솟값 | 트리 구성에 따라 다름 |
| 탐색 | 특정 값 탐색에 비효율적 | 평균적으로 효율적 |
| 대표 활용 | 우선순위 큐 | 검색 자료구조 |

Heap은 최댓값/최솟값을 빠르게 찾는 데 특화되어 있다.  
반면 Binary Search Tree는 특정 값을 탐색하는 데 더 적합하다.

---

## 22. Heap과 Stack의 차이

Heap 자료구조는 Stack과도 다르다.

| 구분 | Heap 자료구조 | Stack 자료구조 |
|------|--------------|----------------|
| 목적 | 우선순위 기반 데이터 처리 | 후입선출 구조 |
| 삭제 대상 | 최댓값 또는 최솟값 | 가장 마지막에 들어온 값 |
| 주요 연산 | `insert`, `delete`, `peek` | `push`, `pop`, `peek` |
| 처리 기준 | 우선순위 | 삽입 순서 |
| 예시 | 우선순위 큐 | 함수 호출, 괄호 검사 |

Stack은 가장 나중에 들어온 데이터가 먼저 나오는 **LIFO** 구조이다.  
Heap은 우선순위가 가장 높은 데이터가 먼저 나오는 구조이다.

---

## 23. Heap 사용 시 주의사항

### 23.1 Heap은 정렬된 배열이 아니다

Heap은 루트가 최댓값 또는 최솟값이라는 것만 보장한다.  
전체 원소가 정렬되어 있는 것은 아니다.

---

### 23.2 Java PriorityQueue를 순회하면 정렬 순서가 보장되지 않는다

Java의 `PriorityQueue`를 `for-each`로 순회하면 우선순위 순서대로 나오지 않을 수 있다.

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.offer(5);
pq.offer(1);
pq.offer(3);

for (int value : pq) {
    System.out.println(value);
}
```

정렬된 순서로 꺼내고 싶다면 반드시 `poll()`을 사용해야 한다.

```java
while (!pq.isEmpty()) {
    System.out.println(pq.poll());
}
```

---

### 23.3 특정 값 삭제는 비효율적이다

Heap은 루트 값을 빠르게 조회하고 삭제하는 데 최적화되어 있다.  
하지만 중간에 있는 특정 값을 찾거나 삭제하는 작업은 효율적이지 않다.

```text
루트 삭제: O(log N)
특정 값 탐색: O(N)
특정 값 삭제: O(N)
```

특정 값 검색이 중요하다면 HashMap, TreeSet, TreeMap 등을 고려해야 한다.

---

## 24. 정리

- Heap은 **최댓값 또는 최솟값을 빠르게 찾기 위한 완전 이진 트리 기반 자료구조**이다.
- Heap은 완전 이진 트리 구조를 가진다.
- Max Heap은 부모 노드가 자식 노드보다 크거나 같다.
- Min Heap은 부모 노드가 자식 노드보다 작거나 같다.
- Heap은 전체 정렬 상태를 보장하지 않는다.
- Heap은 일반적으로 배열로 구현한다.
- 삽입과 삭제의 시간 복잡도는 `O(log N)`이다.
- 최댓값 또는 최솟값 조회는 `O(1)`이다.
- Java에서는 `PriorityQueue`를 사용하여 Heap을 활용할 수 있다.
- Java의 `PriorityQueue`는 기본적으로 Min Heap이다.
- Max Heap을 사용하려면 `Collections.reverseOrder()` 또는 `Comparator`를 지정한다.
- Heap은 Priority Queue, Top K 문제, 다익스트라 알고리즘, Heap Sort 등에 자주 사용된다.

---

## 핵심 키워드

- Heap
- Complete Binary Tree
- Max Heap
- Min Heap
- Priority Queue
- Heapify
- Heapify Up
- Heapify Down
- `PriorityQueue`
- `O(log N)`
- Top K
- Heap Sort
