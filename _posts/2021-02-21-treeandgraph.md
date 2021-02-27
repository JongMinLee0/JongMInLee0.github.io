---
layout: post
title: "[Algorithm] Tree(트리)와 Graph(그래프)"
subtitle: 'About Tree & graph'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - Tree
  - Graph
  - Java
  - Algorithm
  - DataStructure
---


알고리즘을 푸는 과정에서 트리와 그래프 부분이 상당히 까다롭게 느껴져 정리하게 되었습니다. 트리와 그래프는 최악의 수행시간과 평균 수행 시간이 매우 크게 바뀔 수 있어서, 알고리즘을 살펴볼 때에는 두가지 측면 모두를 반드시 따져봐야 합니다. 그럼 트리와 그래프에 대해 살펴 보겠습니다.

<br />

# 1. 트리(Tree)
## 1-1. 트리의 종류
트리는 노드(Node)로 이루어진 자료구조 입니다. 트리를 이해하기 위한 좋은 방법 중 하나는 재귀적 설명법을 사용하는 것 입니다.  

- 트리는 하나의 루트 노드를 갖는다.(그래프 이론에서 꼭 이래야할 필요는 없지만, 보통 일반적인 프로그래밍, 면접의 트리에선 맞는 말이라고 할 수 있습니다.)
- 루트 노드는 0개 이상의 자식 노드를 갖고 있다.
- 그 자식 노드 또한 0개 이상의 자식 노드를 갖고 있고, 이는 반복적으로 정의 된다.  

트리에는 사이클(cycle)이 존재할 수 없습니다. 노드들은 특정 순서로 나열될 수도 있고 없을 수도 있습니다. 각 노드는 부모 노드로의 연결이 있을 수도 있고 없을 수도 있습니다.  

**Node** 클래스를 아주 간단하게 정의하면 다음과 같습니다.

```java
class Node{
  public String name;
  public Node[] children;
}
```
위의 **Node** 클래스를 포함하는 **Tree**클래스를 정의할 수도 있을 것 입니다.  

<br />

### 이진 트리(Binary Tree)

이진 트리는 각 노드가 최대 두 개의 자식을 갖는 트리를 말합니다. 모든 트리가 이진 트리는 아닙니다.  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108617542-9c1da800-745a-11eb-8eec-35c82853c704.png">
</p>

위의 그림에서 최대 노드가 3개 이므로 이진 트리라고 할 수 없고 삼진 트리라고 합니다.  

<br />

### 이진 탐색 트리(Binary Search Tree)

이진 탐색 트리는 모든 노드가 다음과 같은 특정 순서를 따르는 속성이 있는 이진 트리를 일컫습니다.  
<p align="center">
  `모든 왼쪽 자식들 <= n < 모든 오른쪽 자식들`  
</p>
 이는 모든 노드 n에 대해서 반드시 참이어야 합니다. 부등식의 경우 바로 아래 자식 뿐만 아니라 모든 자식 노드들에 대해서 참이어야 합니다.  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108617568-df781680-745a-11eb-87d6-d748abc52e5f.png">
</p>
오른쪽 트리의 경우 12가 8의 왼쪽에 있기 때문에 이진 탐색 트리일 수 없습니다.

<br />

### 완전 이진 트리(complete binary tree)

완전 이진 트리는 트리의 모든 높이에서 노드가 꽉 차 있는 이진 트리를 말합니다. 마지막 단계(level)는 꽉 차 있지 않아도 되지만 노드가 왼쪽에서 오른쪽으로 채워져야 합니다.  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108618639-0b979580-7463-11eb-8c49-ae1d0c777ed2.png">
</p>

<br />

### 전 이진 트리(full binary tree)

전 이진 트리는 모든 노드의 자식이 없거나 정확히 두 개 있는 경우를 말합니다. 즉 자식이 하나만 있는 노드가 존재해서는 안됩니다.  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108618731-cfb10000-7463-11eb-88e0-26fff2087743.png">
</p>

<br />

### 포화 이진 트리(perfect binary tree)

포화 이진 트리는 전 이진 트리이면서 완전 이진 트리인 경우를 말합니다. 모든 말단 노드는 같은 높이에 있어야 하며, 마지막 단계에서 노드의 개수가 최대가 되어야 합니다. 이진 트리와 포화 이진 트리를 착각 하면 안됩니다.  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108619179-536bec00-7466-11eb-820a-4d7331792702.png">
</p>

<br />

## 1-2. 이진 트리 순회

순회에는 3가지가 있으며 **중위(in-order), 후위(post-order), 전위(pre-order)** 가 있습니다. 그 중 가장 빈번하세 사용되는 것은 중위 순회 입니다.  
> 아래의 예제에서 숫자가 나타내는 것은 출력 순서 입니다.  

**예제 트리**
<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108619862-0b9b9380-746b-11eb-9266-33afc26cdd00.png">
</p>

**예제 클래스**
```java
// Node class
public class Node {
    String value;
    Node left;
    Node right;

    Node(String value){
        this.value = value;
        right = null;
        left = null;
    }
}

// main class
public class Main{   
   public static void main(String[] args) {
        Node tree = new Node("A");
        tree.left = new Node("B");
        tree.right = new Node("C");
        tree.left.left = new Node("D");
        tree.left.right = new Node("E");
        tree.right.left = new Node("F");
        tree.right.right = new Node("G");
   }
}
```

<br />

### 중위 순회(in-order traversal)

중위 순회는 왼쪽 가지(branch), 현재 노드, 오른쪽 가지 순서로 노드를 **방문** 하고 출력 합니다.  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108619562-00dfff00-7469-11eb-8509-0d7fc72b2b5f.png">
</p>

```java
// 결과 D B E A F C G
public static void inOrderTraversal(Node node){
    if(node != null){
        inOrderTraversal(node.left);
        System.out.print(node.value);
        inOrderTraversal(node.right);
    }
}
```

<br />

### 전위 순회(pre-order traversal)

전위 순회는 자식 노드보다 현재 노드를 먼저 방문하는 방법 입니다.

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108619604-4a304e80-7469-11eb-8492-8da90c1b9a9c.png">
</p>

```java
// 결과 A B D E C F G
public static void preOrderTraversal(Node node){
    if(node != null){
        System.out.print(node.value);
        preOrderTraversal(node.left);
        preOrderTraversal(node.right);
    }
}
```

<br />

### 후위 순회(post-order traversal)
후위 순회는 모든 자식 노드를 먼저 방문한 뒤 마지막에 노드를 방문하는 방법 입니다.

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108619640-8368be80-7469-11eb-8cc6-ce2c2530cba0.png">
</p>

```java
// 결과 D E B F G C A
public static void postOrderTraversal(Node node){
    if(node != null){
        postOrderTraversal(node.left);
        postOrderTraversal(node.right);
        System.out.print(node.value);
    }
}
```

<br />

## 1-3. 이진 힙(최소힙과 최대힙)

최소힙(min-heaps)과 최대힙(max-heaps)은 원소가 내림차순인지 오름차순인지의 차이점만 존재합니다. 따라서 최소힙에 대해서만 살펴 보겠습니다.

최소힙은 트리의 마지막 단계에서 오른쪽 부분을 뺀 나머지 부분이 가득 채워져 있다는 점에서 완전 이진 트리이며, 각 노드의 원소가 자식들의 원소보다 작다는 특성이 있습니다. 따라서 루트는 트리 전체에서 가장 작은 원소가 됩니다.  

최소힙에서 중요한 것이 두 가지 있는데 이는 **insert**와 **extract_min** 이다.  

<br />

### 삽입(insert)

최소힙에 원소를 삽입할 때는 언제나 트리의 밑바닥에서부터 삽입을 시작합니다. 완전 트리의 속성에 위배되지 않게 새로운 원소는 밑바닥 가장 오른쪽 위치로 삽입 됩니다.  

그 다음 새로 삽입된 원소가 제대로 된 자리를 찾을 때까지 부모 노드와 교환해 나갑니다. 기본적으로 이와 같은 방식으로 최소 원소를 위쪽으로 올립니다.  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108621335-7e117100-7475-11eb-8ad4-f8655ffbdd12.png">
</p>

<br />

### 최소 원소 뽑아내기

최소 힙에서 최소 원소를 찾기란 쉬운 일입니다. 루트가 가장 최소 이기 때문입니다. 사실 이보다 최솟값을 힙에서 어떻게 제거하느냐가 좀 더 까다로운 부분 입니다.  

1. 최소 원소를 제거한 후에 힙에 있는 가장 마지막 원소(밑바닥 가장 왼쪽에 위치한 원소)와 교환 합니다.
2. 최소힙의 성질을 만족하도록, 해당 노드를 자식 노드와 교환해 나감으로써 밑으로 내보냅니다.  

2번에서 어떤 것과 교환해야 하는지는 원소 값에 따라 달라집니다.(최소힙에서는 더 작은 값과 바꿉니다.)  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/108621524-71d9e380-7476-11eb-9924-3bffd7ff0973.png">
</p>

<br />

```java
public class MinHeap {

    private int[] Heap;
    private int size;
    private int maxsize;

    private static final int FRONT = 1;

    public MinHeap(int maxsize){
        this.maxsize = maxsize;
        this.size = 0;
        this.Heap = new int[this.maxsize + 1];
        this.Heap[0] = Integer.MIN_VALUE;
    }

    private int parent(int pos){
        return pos / 2;
    }

    private int leftChild(int pos){
        return (2 * pos);
    }

    private int rightChild(int pos){
        return (2 * pos) + 1;
    }

    private boolean isLeaf(int pos){
        if(pos >= (size / 2) && pos <= size){
            return true;
        }
        return false;
    }

    private void swap(int fpos, int spos){
        int temp;
        temp = Heap[fpos];
        Heap[fpos] = Heap[spos];
        Heap[spos] =temp;
    }

    private void minHeapify(int pos){
        if(!isLeaf(pos)){
            if(Heap[pos] > Heap[leftChild(pos)] || Heap[pos] > Heap[rightChild(pos)]){

                if(Heap[leftChild(pos)] < Heap[rightChild(pos)]){
                    swap(pos, leftChild(pos));
                    minHeapify(leftChild(pos));
                }else{
                    swap(pos, rightChild(pos));
                    minHeapify(rightChild(pos));
                }
            }
        }
    }

    public void insert(int element) {

        if (size >= maxsize) {
            return;
        }
        Heap[++size] = element;
        int current = size;

        while (Heap[current] < Heap[parent(current)]) {
            swap(current, parent(current));
            current = parent(current);
        }
    }

    public void print(){
        for(int i = 1; i <= size / 2; i++){
            System.out.println(" PARENT : " + Heap[i]
                    + " LEFT CHILD : " + Heap[2 * i]
                    + " RIGHT CHILD :" + Heap[2 * i + 1]);
            System.out.println();
        }
    }

    public void minHeap(){
        for(int pos = (size / 2); pos >= 1; pos--){
            minHeapify(pos);
        }
    }

    public int remove(){
        int popped = Heap[FRONT];
        Heap[FRONT] = Heap[size--];
        minHeapify(FRONT);
        return popped;
    }

    public static void main(String[] args) {
        System.out.println("The Min Heap is ");
        MinHeap minHeap = new MinHeap(15);
        minHeap.insert(5);
        minHeap.insert(3);
        minHeap.insert(17);
        minHeap.insert(10);
        minHeap.insert(84);
        minHeap.insert(19);
        minHeap.insert(6);
        minHeap.insert(22);
        minHeap.insert(9);
        minHeap.minHeap();

        minHeap.print();
        System.out.println("The Min val is " + minHeap.remove());
    }

}

```

<br />

# 2. 그래프(Graph)

사실, 트리(tree)는 그래프(graph)의 한 종류 입니다. 하지만 그렇다고 모든 그래프가 트리는 아닙니다. 트리는 사이클(cycle)이 없는 하나의 연결 그래프 입니다. 그래프는 단순히 노드와 그 노드를 연결하는 간선(edge)을 하나로 모아 놓은 것과 같습니다.  

아래의 그림은 그래프의 예시 입니다.  
- 그래프는 방향성이 있을 수도 있고, 없을 수도 있습니다. 방향성이 있는 간선은 일방통행, 방향성이 없는 간선은 양방향 통행 도로라고 생각하면 됩니다.
- 그래프는 여러 개의 고립된 부분 그래프(isolated subgraphs)로 구성될 수 있습니다. 모든 정점 쌍(pair of vertices)간에 경로가 존재하는 그래프는 '연결 그래프'라고 부릅니다.
- 그래프에는 사이클이 존재할 수도 있고 존재하지 않을 수도 있습니다. 사이클이 없는 그래프는 '비순환 그래프(acyclic graph)라고 부릅니다.  


<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/109387847-00eb6d80-7947-11eb-9076-7eb08ae43698.png">
</p>

<br />

프로그래밍 관점에서 그래프를 표현할 때는 일반적으로 다음 두 가지 방법을 사용합니다.  

<br />

### 인접 리스트(adjacency list)

인접 리스트는 그래프를 표현할 때 사용되는 가장 일반적인 방법 입니다. 모든 정점(혹은 노드)을 인접 리시트에 저장 합니다. 무방향 그래프에서 (a, b) 간선은 두 번 저장됩니다. 한 번은 a 정점에서 인접한 간선을 저장하고, 다른 한 번은 b에 인접한 간선을 저장합니다.  
그래프에서 노드를 정의하는 간단한 클래스는 트리의 노드 클래스와 궁극적으로 같아 보입니다. 트리에서는 루트 노드에서 모든 노드로 접근이 가능해서 따로 클래스를 두지 않았지만 그래프에서는 가능하지 않아 **Graph** 클래스를 사용합니다.  
```java
class Graph{
    public Node[] nodes;
}

class Node{
    public String name;
    public Node[] children;
}
```
위의 그래프는 다음과 같이 표현됩니다.  
```text
0 : 1
1 : 2
2 : 0, 3
3 : 2
4 : 6
5 : 4
6 : 5
```

<br />

### 인접 행렬

인접 행렬은 **NxN** boolean Matrix 로써 **matrix[i][j]**가 true라면 연결되어 있다는 뜻 입니다.  

<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/109390678-701c8e00-7956-11eb-9e30-bdb1550ace2f.png">
</p>

위와 같은 그래프는 인접행렬에서 다음과 같이 표현 될 수 있습니다.  

|  |0| 1 | 2 | 3 | 
|--|--|--|--|--|
|0| 0 | 1 | 0 | 0 |
|1| 0 | 0 | 1 | 0 |
|2| 1 | 0 | 0 | 0 |
|3| 0 | 0 | 1 | 0 |

<br />

## 그래프 탐색

그래프를 탐색하는 일반적인 방법 두 가지로는 **깊이 우선 탐색(depth-first search)**과 **너비 우선 탐색(breadth-first search)**가 있습니다.  

- **DFS(깊이 우선 탐색)** : 루트 노드에서 시작해 다음 분기(branch)로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방법 입니다. 
- **BFS(너비 우선 탐색)** : 루트 노드에서 시작해서 인접한 노드를 먼저 탐색하는 방법 입니다. 인접한 노드가 여러 개일 때는 노드의 번호 순서대로 순회한다고 가정 합니다.  

DFS와 BFS는 서로 다른 상황에서 사용되는 경향이 있습니다. DFS는 그래프에서 모든 노드를 방문하고자 할 때 좀 더 선호되는 편이며, 둘 중 아무거나 사용해도 상관 없지만 깊이 우선 탐색이 좀 더 간단하기는 합니다.  

아래의 그래프를 토대로 한번 확인해 보겠습니다.  
<p align="center">
<img src="https://user-images.githubusercontent.com/48028667/109391070-99d6b480-7958-11eb-8b84-82e5d682215a.png">
</p>

```java
class Graph{
    public Node nodes[];

    public static void main(String[] args) {
        Node node = new Node("0");
        Node node1 = new Node("1");
        Node node2 = new Node("2");
        Node node3 = new Node("3");
        Node node4 = new Node("4");
        Node node5 = new Node("5");

        node.children = new Node[]{node1, node4, node5};
        node1.children = new Node[]{node3, node4};
        node2.children = new Node[]{node1};
        node3.children = new Node[]{node2, node4};

        Graph graph = new Graph();
        graph.nodes =new Node[]{node, node1, node2, node3, node4, node5};

        new DFS().search(graph.nodes[0]);
        // new BFS().search(graph.nodes[0]);
    }
}

class Node{
    public String name;
    public Node children[];
    public boolean visited;

    public Node(String name){
        this.name = name;
    }
}
```

<br />

### 깊이 우선 탬색(DFS)

DFS는 a 노드를 방문한 뒤 a와 인접한 노드들을 차례로 순회 합니다. a와 이웃한 노드 b를 방문했다면, a와 인접한 또 다른 노드를 방문하기 전에 b의 이웃 노드들을 전부 방문해야 합니다. 즉, b의 분기를 전부 완벽하게 탐색한 뒤에야 a의 다른 이웃 노드를 방문할 수 있다는 뜻 입니다.  

```java
public class DFS {

    public void search(Node root){
        if(root == null) return;

        System.out.println(root.name);
        root.visited = true;

        if(root.children == null) return;
        for (Node n:root.children) {
            if(n.visited == false){
                search(n);
            }
        }
    }
}
```
재귀 함수 **search**를 이용하여 탐색했으며, **visited**를 이용하여 방문 여부를 확인 합니다. 결과는
```text
0 1 3 2 4 5
```
가 나오게 됩니다.  

<br />

### 너비 우선 탐색(BFS)

BFS도 재귀적으로 동작할 것이라 생각하여 애를 먹는 경우가 많습니다. 그러나 BFS는 재귀적으로 동작하지 않고 큐(queue)를 사용하여 동작하게 됩니다. a 노드에서 시작한다고 했을 때, BFS는 a 노드의 이웃 노드를 모두 방문한 다음 이웃의 이웃들을 방문 합니다. 


```java
class BFS{

    public void search(Node root){
        Queue<Node> queue = new LinkedList<Node>();
        queue.add(root);

        while(!queue.isEmpty()){
            Node r = queue.poll();
            r.visited = true;
            System.out.println(r.name);
            if(r.children == null) continue;
            for (Node n : r.children){
                if(n.visited == false){
                    n.visited = true;
                    queue.add(n);
                }
            }
        }
    }

}
```
결과는
```text
0 1 4 5 3 2
```
가 나오게 됩니다.  

<br />

이외에도 양방향 탐색이 있습니다. 기본적으로 양쪽에서 너비 우선 탐색을 수행한 뒤, 충돌하는 경우에 경로를 찾는 방식 입니다.  


알고리즘을 공부하며 한번쯤은 만나게 되며, 그만큼 중요한 트리와 그래프(DFS, BFS)에 대해 알아보았습니다. 이에 대한 문제는 차츰 올리도록 하겠습니다. 감사합니다.


<br />

### Ref
- 코딩인터뷰 완전분석(게일 라크만 맥도웰)

