import React, { useEffect, useState, useRef } from "react";
import clown from "../assets/clown.png";

const codes = [
  {
    id : 1,
    code : `
    //SLL
    #include <stdio.h>
    #include <stdlib.h>
    struct node {
        int data;
        struct node *link;
    }*head=NULL,*newnode,*prev,*temp,*last,*delnode;
    
    void getNode() {
        newnode = (struct node *)malloc(sizeof(struct node));
    }
    
    void readNode(){
        int data;
        printf("Enter a value :");
        scanf("%d",&data);
        newnode->data = data;
        newnode->link = NULL;
    }
    
    void create(){
        int c;
        if (head !=NULL){
            printf("Linked list is already created");
            return;
        } else {
            do {
                getNode();
                readNode();
                if (head == NULL){
                    head = last = newnode;
                } else {
                    last->link = newnode;
                    last = newnode;
                }
                printf("Enter 1 to add new nodes : ");
                scanf("%d",&c);
            } while (c == 1);
            return ;
        }
    }
    
    void transverse(){
        temp= head;
        while (temp != NULL){
            printf("Node Address :%u Data: %d Next Address : %u\n",temp,temp->data,temp->link);
            temp= temp->link;
        }
    }
    
    void insertLast(){
        getNode();
        if (newnode == NULL){
            printf("Memory Insufficient");
            return ;
        } 
        readNode();
        if (head == NULL){
            head=last=newnode;
            return;
        }
        last->link = newnode;
        last = newnode;
    }
    
    void insertFirst(){
        getNode();
        readNode();
        if (head == NULL){
            head=last=newnode;
            return;
        }
        newnode->link = head;
        head = newnode;
    }
    
    void modify(){
        int olde ;
        printf("Enter the value that need to be changed :");
        scanf("%d",&olde);
        temp = head;
        while (temp != NULL){
            if (temp->data == olde){
                int newe;
                printf("Enter the new data :");
                scanf("%d",&newe);
                temp->data = newe;
                return;
            }
            temp = temp->link;
        }
        if (temp == NULL) {
            printf("No element found\n");
        }
    }
    
    void insertmiddle(){
        getNode();
        if (newnode == NULL) {
            printf("No memory\n");
            return;
        }
        readNode();
        if (head == NULL){
            head = last = newnode;
            return;
        } else {
            int a ;
            printf("Enter the element after which you need to link node :");
            scanf("%d",&a);
            temp = head;
            while (temp != NULL){
                if (temp->data == a){                
                    newnode->link = temp->link;
                    temp->link = newnode;
                    return ;
                } else {
                    temp = temp->link;
    
                }
                return ;
            }
        }
    }
    
    int main(){
        printf("Creating the Linked List :\n");
        create();
        printf("Inserting at the last :\n");
        insertLast();
        printf("Inserting at the first :\n");
        insertFirst();
        printf("Traversing :\n");
        transverse();
        printf("Modification :\n");
        modify();
        printf("Traversing :\n");
        transverse();
        printf("Inserting in between two nodes");
        insertmiddle();
        printf("Traversing :\n");
        transverse();
        return 0;
    }`
  },
  {
    id : 2,
    code : `
    //DLL
    #include <stdio.h>
    #include <stdlib.h>
    
    struct node
    {
        int data;
        struct node *flink;
        struct node *blink;
    } *head = NULL, *newnode, *last, *prev, *temp, *next;
    
    void getnode()
    {
        newnode = (struct node *)malloc(sizeof(struct node));
    }
    
    void readnode()
    {
        int data;
        printf("Enter the data : ");
        scanf("%d", &data);
        newnode->data = data;
        newnode->blink = NULL;
        newnode->flink = NULL;
    }
    
    void create()
    {
        int c;
        if (head != NULL)
        {
            printf("Node is already created\n");
            return;
        }
        else
        {
            do
            {
                getnode();
                readnode();
                if (head == NULL)
                {
                    head = last = newnode;
                }
                else
                {
                    last->flink = newnode;
                    newnode->blink = last;
                    last = newnode;
                }
                printf("Enter 1 to add new node :");
                scanf("%d", &c);
            } while (c == 1);
        }
    }
    
    void insertlast()
    {
        getnode();
        if (newnode == NULL)
        {
            printf("No memory\n");
            return;
        }
        else
        {
            readnode();
            if (head == NULL)
            {
                head = last = newnode;
            }
            else
            {
                last->flink = newnode;
                newnode->blink = last;
                last = newnode;
            }
        }
    }
    
    int insertfirst()
    {
        getnode();
        if (newnode == NULL)
        {
            printf("No Memory");
            return (0);
        }
        readnode();
        if (head == NULL)
        {
            head = last = newnode;
            return (0);
        }
        newnode->flink = head;
        head->blink = newnode;
        head = newnode;
    }
    
    void insertmiddle()
    {
        getnode();
        if (newnode == NULL)
        {
            printf("No memory\n");
            return;
        }
        readnode();
        if (head == NULL)
        {
            head = last = newnode;
        }
        else
        {
            int x;
            printf("Enter after which element, you need to add : ");
            scanf("%d", &x);
            temp = head;
            while (temp != NULL)
            {
                if (temp->data == x)
                {
                    next = temp->flink;
                    newnode->flink = next;
                    newnode->blink = temp;
                    temp->flink = newnode;
                    next->blink = newnode;
                    break;
                }
                temp = temp->flink;
            }
        }
    }
    
    void transverse()
    {
        if (head == NULL)
        {
            printf("Linked List is not yet created\n");
        }
        else
        {
            temp = head;
            while (temp != NULL)
            {
                printf("Current Address : %u Forward Address : %u Data : %d Backward Address : %u\n", temp, temp->flink, temp->data, temp->blink);
                temp = temp->flink;
            }
        }
    }
    
    int main()
    {
        printf("Creating Double Linked List : \n");
        create();    
        printf("Insert First :\n");
        insertfirst();
        printf("Insert Last :\n");
        insertlast();
        printf("Insert Middle :\n");
        insertmiddle();
        printf("Traversing DLL : \n");
        transverse();
    }`
  }, 
  {
    id : 3,
    code : `
    //CSLL
    #include <stdio.h>
    #include <stdlib.h>
    
    struct node
    {
        int data;
        struct node *link;
    } *head = NULL, *newnode, *last, *delnode, *prev, *temp;
    
    void getnode()
    {
        newnode = (struct node *)malloc(sizeof(struct node));
    }
    
    void readnode()
    {
        int data;
        printf("Enter the data : ");
        scanf("%d", &data);
        newnode->data = data;
        newnode->link = newnode;
    }
    
    void create()
    {
        int c;
        if (head != NULL)
        {
            printf("Node is already created\n");
            return;
        }
        do
        {
            getnode();
            readnode();
            if (head == NULL)
            {
                head = last = newnode;
            }
            else {
                last->link = newnode;
                last = newnode;
                last->link= head;
            }   
            printf("Enter 1 to add new node : ");
            scanf("%d",&c);
        } while (c == 1);
        return;
    }`
  }, 
  {
    id : 4,
    code  : `
    //Binary Tree
    #include <stdio.h>
    #define MAX  100
    struct node* queue[MAX];
    int front =-1,rear = -1;
    
    void enqueue(struct node* ptr){
        if (rear == MAX -1){
            printf("Overflow");
        } else {
            if ((front == -1) && (rear == -1)){
                front =0;
                rear = 0;
            } else {
                rear = rear +1;
            }
            queue[rear] = ptr;
        }
    }
    
    struct node* dequeue(){
        if (front == -1){
            printf("Underflow");
        } else {
            struct node *n = queue[front];
            
            if (front == rear){
                front == -1;
                rear = -1;
            } else {
                front = front+1;
            }
            return n;
        }
    }
    
    struct node {
        int data;
        struct node *left,*right;
    };
    
    struct node *create() {
        int x;
        struct node *newnode;
        newnode = (struct node*) malloc(sizeof(struct node));
        printf("Enter data (-1 for no node) :");
        scanf("%d",&x);
        if (x==-1){
            return 0;
        }
        newnode->data = x;
        printf("Enter the left child of %d\n",x);
        newnode->left = create();
        printf("Enter the right child of %d\n",x);
        newnode->right=create();
        return newnode;
    }
    
    void preorder(struct node *root){ 
        //Root Left Right
        if (root == NULL){
            return;
        }
        printf("%d\n",root->data);
        preorder(root->left);
        preorder(root->right);
    }
    
    void inorder(struct node *root){
        //Left Root Right
        if (root == NULL){
            return;
        }
        inorder(root->left);
        printf("%d\n",root->data);
        inorder(root->right);
    }
    
    void postorder(struct node *root){
        //Left Right Node
        if (root == NULL){
            return ;
        }
        postorder(root->left);
        postorder(root->right);
        printf("%d\n",root->data);
    }
    
    void levelorder(struct node* root){
        if (root == 0){
            return ;
        }
        enqueue(root);
        for(;;){
            root =dequeue();
            if (root){
                printf("%d\n",root->data);
                if(root->left){
                    enqueue(root->left);
                }
                if(root->right){
                    enqueue(root->right);
                }
            } else{
                break;
            }
        }
    }
    
    int maxDepth (struct node *root){
        if (root == NULL){
            return 0;
        } else {
            int leftDepth = maxDepth(root->left);
            int rightDepth = maxDepth(root->right);
            if (leftDepth>rightDepth){
                return leftDepth+1;
            } else {
                return rightDepth+1;
            }
        }
    }
    
    int main() {
        struct node *root;
        root = create();
        printf("Preorder Traversal\n");
        preorder(root);
        printf("Inorder Traversal\n");
        inorder(root);
        printf("Postorder Traversal\n");
        postorder(root);
        printf("Inorder Traversal\n");
        levelorder(root);
        printf("Max Depth : %d",maxDepth(root));
        return 0;
    }`
  },
  {
    id : 5,
    code : `
    Binary Search Tree
    #include <stdio.h>

    struct node {
        int data;
        struct node *left,*right;
    };
    
    struct node* getnewnode(int data){
        struct node* newnode = (struct node *)malloc(sizeof(struct node));
        newnode->data = data;
        newnode->left = newnode->right = NULL;
        return newnode;
    }
    
    void postorder(struct node *root){
        //Left Right Node
        if (root == NULL){
            return ;
        }
        postorder(root->left);
        postorder(root->right);
        printf("%d\n",root->data);
    }
    
    struct node* Insert(struct node *root, int data){
        if (root == NULL){
            root = getnewnode(data);
        } else if (data<= root->data){
            root->left = Insert(root->left,data);
        } else {
            root ->right = Insert(root->right,data);
        } 
        return root;
    }
    
    struct node* find(struct node* root, int x){
        if (root == NULL){
            printf("Element Not Found\n");
            return NULL;
        } else if (root->data == x) {
            return root;
        } else if (root->data > x){
            return find(root->left,x);
        } else {
            return find(root->right,x);
        }
    }
    
    int main() {
       struct node *root =NULL;
       root = Insert(root,15);
       root = Insert(root,12);
       root = Insert(root,24);
       root = Insert(root,10);
       root = Insert(root,30);
       struct node *p = find(root,9);
       printf("Address %u Data : %d",p,p->data);
       return 0;
    }
    
    `
  }
]

const Card = () => {
  //State Variables
  const inputRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [number, setNumber] = useState(0);
  const [numberOfChances, setNumberOfChances] = useState(5);
  const [hint, setHint] = useState("");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    initialTask();
    inputRef.current.focus()
  }, []);

  //Required functions

  const initialTask = () => {
    generateRandomNumber();
    setNumberOfChances(5);
    setCompleted(false);
    setHint("");
  };

  const generateRandomNumber = () => {
    const n = parseInt(Math.random() * 100);
    setNumber(n);
    //console.log(n);
  };

  const check = async () => {
    const e = codes.find((e) => e.id = guess)
    await navigator.clipboard.writeText(e ? e.code : '')
    const n = numberOfChances;
    setGuess("");
    if (n == 1 && guess != number) {
      //losing
      setCompleted(true);
      const text = `You lost. The correct number is ${number}.`;
      setHint(text);
    } else {
      const text = generateHintText(number, guess, n);
      setHint(text);
      if (n == 1 || guess == number) {
        setCompleted(true);
      }
      setNumberOfChances((no) => {
        return (no -= 1);
      });
    }
  };

  const generateHintText = (generated, guessed, currentChances) => {
    if (guessed == generated) {
      const x = 5 - currentChances + 1;
      return `That's correct. It took you ${x} ${x==1 ? 'turn' : 'turns'}, to correctly guess the number.`;
    } else if (guessed > generated) {
      return  `That's high.`
    } else {
      return "That's low."
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      check();
    }
  }

  return (
    <div className="bg-light p-5 mb-20 rounded-xl shadow-custom flex flex-col items-center">
      <h1 className="text-dark font-nunito font-bold text-2xl mb-4">
        Guess the Number
      </h1>
      <div className="flex-col flex md:flex-row justify-between w-full">
        <div className="m-2 md:my-5  md:mx-5 flex justify-center items-center">
          <img src={clown} alt="Clown" className="h-20 md:h-full" />
        </div>

        {completed ? (
          <div className="flex flex-col justify-between my-10">
            <div className="w-35 w-60">{hint}</div>
            <div className="flex items-center">
              <p>Wanna try again ?</p>
              <button
                onClick={() => initialTask()}
                className="ml-2 bg-blue-400 p-2 rounded-md text-sm"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <div className="my-10 flex flex-col justify-around">
            <div className="max-w-xs flex flex-col items-center mb-4">
              <p>
                Enter a number between 1 and 100. You have only{" "}
                {numberOfChances} chances...
              </p>
            </div>
            <div className="flex items-center">
              <input
                ref={inputRef}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                type="number"
                placeholder="Enter"
                onKeyDown={handleKeyDown}
                className="border border-dark rounded text-md px-2 py-2"
              />
              <button
                onClick={() => check()}
                className="border border-dark p-2 ml-4 rounded hover:bg-dark hover:text-white transition ease-in-out duration-200"
              >
                Enter
              </button>
            </div>
            <div className="text-sm my-2">{hint}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
