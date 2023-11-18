import React, { useEffect, useState } from "react";
import clown from "../assets/clown.png";

const data = [
  {
      id : 2,
      code : `
      //Client Server Connection 
      Client 1)
      #include <sys/socket.h>
      #include <sys/types.h>
      #include <netinet/in.h>
      #include <netdb.h>
      #include <stdio.h>
      #include <string.h>
      #include <stdlib.h>
      #include <unistd.h>
      #include <errno.h>
      #include <arpa/inet.h>
      int main()
      {
      int CreateSocket = 0,n = 0;
      char dataReceived[1024];
      struct sockaddr_in ipOfServer;
      memset(dataReceived, '0' ,sizeof(dataReceived));
      if((CreateSocket = socket(AF_INET, SOCK_STREAM, 0))< 0)
      {
      printf("Socket not created \n");
      return 1;
      }
      ipOfServer.sin_family = AF_INET;
      ipOfServer.sin_port = htons(2017);
      ipOfServer.sin_addr.s_addr = inet_addr("127.0.0.1");
      if(connect(CreateSocket, (struct sockaddr *)&ipOfServer, sizeof(ipOfServer))<0)
      {
      printf("Connection failed due to port and ip problems\n");
      return 1;
      }
      while((n = read(CreateSocket, dataReceived, sizeof(dataReceived)-1)) > 0)
      {
      dataReceived[n] = 0;
      if(fputs(dataReceived, stdout) == EOF)
      {
      printf("\nStandard output error");
      }
      printf("\n");
      }
      if( n< 0)
      {
      printf("Standard input error \n");
      }
      
      return 0;
      }
      Server C:
      #include <stdio.h> // standard input and output library
      #include <stdlib.h> // this includes functions regarding memory allocation
      #include <string.h> // contains string functions
      #include <errno.h> //It defines macros for reporting and retrieving error conditions through
      error codes
      #include <time.h> //contains various functions for manipulating date and time
      #include <unistd.h> //contains various constants
      #include <sys/types.h> //contains a number of basic derived types that should be used
      whenever appropriate
      #include <arpa/inet.h> // defines in_addr structure
      #include <sys/socket.h> // for socket creation
      #include <netinet/in.h> //contains constants and structures needed for internet domain
      addresses
      int main()
      {
      time_t clock;
      char dataSending[1025]; // Actually this is called packet in Network Communication, which
      contain data and send through.
      int clintListn = 0, clintConnt = 0;
      struct sockaddr_in ipOfServer;
      clintListn = socket(AF_INET, SOCK_STREAM, 0); // creating socket
      memset(&ipOfServer, '0', sizeof(ipOfServer));
      memset(dataSending, '0', sizeof(dataSending));
      ipOfServer.sin_family = AF_INET;
      ipOfServer.sin_addr.s_addr = htonl(INADDR_ANY);
      ipOfServer.sin_port = htons(2017); // this is the port number of running server
      bind(clintListn, (struct sockaddr*)&ipOfServer , sizeof(ipOfServer));
      listen(clintListn , 20);
      while(1)
      {
      printf("\n\nHi,Iam running server.Some Client hit me\n"); // whenever a request from client
      came. It will be processed here.
      clintConnt = accept(clintListn, (struct sockaddr*)NULL, NULL);
      clock = time(NULL);
      snprintf(dataSending, sizeof(dataSending), "%.24s\r\n", ctime(&clock)); // Printing
      successful message
      write(clintConnt, dataSending, strlen(dataSending));
      close(clintConnt);
      sleep(1);
      }
      
      return 0;
      }`
  },
  {
      id : 3,
      code : `
      Chat App
      Server
      #include <stdio.h>
      #include <netinet/in.h>
      #include <sys/types.h>
      #include <sys/socket.h>
      #include <netdb.h>
      #include <stdlib.h>
      #include <string.h>
      #include <fcntl.h> // for open
      #include <unistd.h> // for close
      #define MAX 80
      #define PORT 43458
      #define SA struct sockaddr
      void func(int sockfd)
      {
      char buff[MAX];
      int n;
      for (; ;)
      {
      bzero(buff, MAX);
      read(sockfd, buff, sizeof(buff));
      printf("From client: %s\t To client : ", buff);
      bzero(buff, MAX);
      n = 0;
      while ((buff[n++] = getchar()) != '\n')
      ;
      write(sockfd, buff, sizeof(buff));
      if (strncmp("exit", buff, 4) == 0)
      {
      printf("Server Exit...\n");
      break;
      }
      }
      }
      int main()
      {
      int sockfd, connfd, len;
      struct sockaddr_in servaddr, cli;
      sockfd = socket(AF_INET, SOCK_STREAM, 0);
      if (sockfd == -1)
      {
      printf("socket creation failed...\n");
      exit(0);
      }
      else
      printf("Socket successfully created..\n");
      bzero(&servaddr, sizeof(servaddr));
      
      servaddr.sin_family = AF_INET;
      servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
      servaddr.sin_port = htons(PORT);
      if ((bind(sockfd, (SA *)&servaddr, sizeof(servaddr))) != 0)
      {
      printf("socket bind failed...\n");
      exit(0);
      }
      else
      printf("Socket successfully binded..\n");
      if ((listen(sockfd, 5)) != 0)
      {
      printf("Listen failed...\n");
      exit(0);
      }
      else
      printf("Server listening..\n");
      len = sizeof(cli);
      connfd = accept(sockfd, (SA *)&cli, &len);
      if (connfd< 0)
      {
      printf("server acccept failed...\n");
      exit(0);
      }
      else
      printf("server acccept the client...\n");
      func(connfd);
      close(sockfd);
      }
      Client :
      #include <stdio.h>
      #include <netinet/in.h>
      #include <sys/types.h>
      #include <sys/socket.h>
      #include <netdb.h>
      #include <fcntl.h> // for open
      #include <unistd.h> // for close
      #include <string.h>
      #include <stdlib.h>
      #include <arpa/inet.h>
      #define MAX 80
      #define PORT 43458
      #define SA struct sockaddr
      void func(int sockfd)
      {
      char buff[MAX];
      int n;
      for (; ;)
      
      {
      bzero(buff, sizeof(buff));
      printf("Enter the string : ");
      n = 0;
      while ((buff[n++] = getchar()) != '\n')
      ;
      write(sockfd, buff, sizeof(buff));
      bzero(buff, sizeof(buff));
      read(sockfd, buff, sizeof(buff));
      printf("From Server : %s", buff);
      if ((strncmp(buff, "exit", 4)) == 0)
      {
      printf("Client Exit...\n");
      break;
      }
      }
      }
      int main()
      {
      int sockfd, connfd;
      struct sockaddr_in servaddr, cli;
      sockfd = socket(AF_INET, SOCK_STREAM, 0);
      if (sockfd == -1)
      {
      printf("socket creation failed...\n");
      exit(0);
      }
      else
      printf("Socket successfully created..\n");
      bzero(&servaddr, sizeof(servaddr));
      servaddr.sin_family = AF_INET;
      servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
      servaddr.sin_port = htons(PORT);
      if (connect(sockfd, (SA *)&servaddr, sizeof(servaddr)) != 0)
      {
      printf("connection with the server failed...\n");
      exit(0);
      }
      else
      printf("connected to the server..\n");
      func(sockfd);
      close(sockfd);
      }`
  },
  {
      id : 4,
      code : `
      Sum of Random numbers
      Server :
      #include <netinet/in.h>
      #include <stdio.h>
      #include <stdlib.h>
      #include <string.h>
      #include <sys/socket.h>
      #include <unistd.h>
      #include <time.h>
      #include <math.h>
      
      #define PORT 8080
      #define MIN_LIMIT 1
      #define MAX_LIMIT 100
      char *itoa(int num, char *buffer, int base)
      {
      int current = 0;
      if (num == 0)
      {
      buffer[current++] = '0';
      buffer[current] = '\0';
      return buffer;
      }
      int num_digits = 0;
      if (num< 0)
      {
      if (base == 10)
      {
      num_digits++;
      buffer[current] = '-';
      current++;
      num *= -1;
      }
      else
      return NULL;
      }
      num_digits += (int)floor(log(num) / log(base)) + 1;
      while (current <num_digits)
      {
      int base_val = (int)pow(base, num_digits - 1 - current);
      int num_val = num / base_val;
      char value = num_val + '0';
      buffer[current] = value;
      current++;
      num -= base_val * num_val;
      }
      buffer[current] = '\0';
      return buffer;
      }
      
      int main()
      {
      int server_fd, new_socket, valread;
      struct sockaddr_in address;
      int opt = 1;
      int addrlen = sizeof(address);
      char buffer[1024] = {0};
      char *hello = malloc(sizeof(char) * 200);
      // Creating socket file descriptor
      if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
      {
      perror("socket failed");
      exit(EXIT_FAILURE);
      }
      // Forcefully attaching socket to the port 8080
      if (setsockopt(server_fd, SOL_SOCKET,
      SO_REUSEADDR | SO_REUSEPORT, &opt,
      
      sizeof(opt)))
      {
      perror("setsockopt");
      exit(EXIT_FAILURE);
      }
      address.sin_family = AF_INET;
      address.sin_addr.s_addr = INADDR_ANY;
      address.sin_port = htons(PORT);
      // Forcefully attaching socket to the port 8080
      if (bind(server_fd, (struct sockaddr *)&address,
      sizeof(address)) < 0)
      {
      perror("bind failed");
      exit(EXIT_FAILURE);
      }
      if (listen(server_fd, 3) < 0)
      {
      perror("listen");
      exit(EXIT_FAILURE);
      }
      if ((new_socket = accept(server_fd, (struct sockaddr *)&address,
      
      (socklen_t*)&addrlen)) < 0)
      
      {
      perror("accept");
      exit(EXIT_FAILURE);
      }
      printf("Connection Establishment with client was Successful!\n");
      srand(time(0));
      
      int num1 = (rand() % (MAX_LIMIT - MIN_LIMIT + 1)) + MIN_LIMIT;
      int num2 = (rand() % (MAX_LIMIT - MIN_LIMIT + 1)) + MIN_LIMIT;
      
      itoa(num1, hello, 10);
      send(new_socket, hello, strlen(hello), 0);
      sleep(5);
      itoa(num2, hello, 10);
      send(new_socket, hello, strlen(hello), 0);
      // int sum_n1_n2 = num1 + num2;
      printf("%d - number 1 \n%d - number 2\n", num1, num2);
      // snprintf(hello, 200, "\nThe sum of random numbers is: %d", sum_n1_n2);
      send(new_socket, hello, strlen(hello), 0);
      printf("Connection closed!\n");
      // closing the connected socket
      close(new_socket);
      // closing the listening socket
      shutdown(server_fd, SHUT_RDWR);
      return 0;
      }
      Client :
      #include <arpa/inet.h>
      #include <stdio.h>
      #include <stdlib.h>
      #include <string.h>
      #include <sys/socket.h>
      #include <unistd.h>
      #define PORT 8080
      int main()
      {
      int sock = 0, valread, client_fd;
      struct sockaddr_in serv_addr;
      char* hello = malloc(sizeof(char) * 200);
      char buffer[1024] = { 0 };
      if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
      printf("\n Socket creation error \n");
      return -1;
      }
      serv_addr.sin_family = AF_INET;
      
      serv_addr.sin_port = htons(PORT);
      // Convert IPv4 and IPv6 addresses from text to binary
      // form
      if (inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr)
      <= 0) {
      printf(
      "\nInvalid address/ Address not supported \n");
      return -1;
      }
      if ((client_fd
      = connect(sock, (struct sockaddr*)&serv_addr,
      sizeof(serv_addr)))
      < 0) {
      printf("\nConnection Failed \n");
      return -1;
      }
      printf("Connection Establishment with server was Successful!\n");
      
      valread = read(sock, buffer, 1024);
      int n1 = atoi(buffer);
      printf("Server: %d\n", n1);
      sleep(5);
      valread = read(sock, buffer, 1024);
      int n2 = atoi(buffer);
      printf("Server: %d\n", n2);
      int sum = n1+n2;
      printf("Sum = %d\n", sum);
      printf("Connection closed!\n");
      // closing the connected socket
      close(client_fd);
      return 0;
      }`
  },
  {
      id : 5,
      code : `
      Error Detection
      #include<stdio.h>

      void main() {
          int data[11];
          int dataatrec[11],c,c1,c2,c3,c4,i;
      
      printf("Enter 7 bits of data one by one\n");
      scanf("%d",&data[2]);
      scanf("%d",&data[4]);
      scanf("%d",&data[5]);
      scanf("%d",&data[6]);
      scanf("%d",&data[8]);
      scanf("%d",&data[9]);
      scanf("%d",&data[10]);
      
          //Calculation of even parity
          data[0]=data[2]^data[4]^data[6]^data[8]^data[10];
      data[1]=data[2]^data[5]^data[6]^data[9]^data[10];
      data[3]=data[4]^data[5]^data[6];
      data[7]=data[8]^data[9]^data[10];
      
      printf("\nEncoded data is\n");
      for(i=0;i<11;i++)
      printf("%d\n",data[i]);
      
      printf("\n\nEnter received data bits one by one\n");
          for(i=0;i<11;i++)
      scanf("%d",&dataatrec[i]);
      
          c1=dataatrec[0]^dataatrec[2]^dataatrec[4]^dataatrec[6]^dataatrec[8]^dataatrec[10];
      c2=dataatrec[1]^dataatrec[2]^dataatrec[5]^dataatrec[6]^dataatrec[9]^dataatrec[10];
      c3=dataatrec[3]^dataatrec[4]^dataatrec[5]^dataatrec[6];
      c4=dataatrec[7]^dataatrec[8]^dataatrec[9]^dataatrec[10];
      c=c4*8+c3*4+c2*2+c1 ;
      
          if(c==0) {
      printf("\nNo error while transmission of data\n");
          }
      else {
      printf("\nError on position %d",c);
      
      printf("\nData sent : ");
              for(i=0;i<11;i++)
      printf("%d",data[i]);
      
      printf("\nData received : ");
              for(i=0;i<11;i++)
      printf("%d",dataatrec[i]);
      printf("\nCorrect message is\n");
      
      //if errorneous bit is 0 we complement it else vice versa
      if(dataatrec[10-c]==0)
      dataatrec[10-c]=1;
              else
      dataatrec[10-c]=0;
      for (i=0;i<11;i++) {
      printf("%d",dataatrec[i]);
      }
      }
      }
      `
  },
  {
      id: 7,
      code : `Distance Vector Routing :
      Code :
      #include<stdio.h>
      struct node
      {
      unsigned dist[20];
      unsigned from[20];
      }rt[10];
      int main()
      {
      int dmat[20][20];
      int n,i,j,k,count=0;
      printf("\nEnter the number of nodes : ");
      scanf("%d",&n);
      printf("\nEnter the cost matrix :\n");
      for(i=0;i<n;i++)
      for(j=0;j<n;j++)
      {
      scanf("%d",&dmat[i][j]);
      dmat[i][i]=0;
      rt[i].dist[j]=dmat[i][j];
      rt[i].from[j]=j;
      }
      do
      {
      count=0;
      for(i=0;i<n;i++)
      for(j=0;j<n;j++)
      for(k=0;k<n;k++)
      if(rt[i].dist[j]>dmat[i][k]+rt[k].dist[j])
      {
      rt[i].dist[j]=rt[i].dist[k]+rt[k].dist[j];
      rt[i].from[j]=k;
      count++;
      }
      }while(count!=0);
      for(i=0;i<n;i++)
      {
      printf("\n\nState value for router %d is \n",i+1);
      for(j=0;j<n;j++)
      {
      printf("\t\nnode %d via %d Distance%d",j+1,rt[i].from[j]+1,rt[i].dist[j]);
      }
      }
      printf("\n\n");
      }
      `
  },
  {
      id : 8,
      code : `  
      OSPF
      Code :
      #include <stdio.h>
      #include <string.h>
      int main()
      {
      int count,src_router,i,j,k,w,v,min;
      int cost_matrix[100][100],dist[100],last[100];
      int flag[100];
      printf("\n Enter the no of routers: ");
      scanf("%d",&count); 
      printf("\n Enter the cost matrix values: ");
      for(i=0;i<count;i++)
      {
      for(j=0;j<count;j++)
      {
      printf("\n%d->%d:",i,j);
      scanf("%d",&cost_matrix[i][j]);
      if(cost_matrix[i][j]<0)cost_matrix[i][j]=1000;
      }
      }
      printf("\n Enter the source router:");
      scanf("%d",&src_router);
      for(v=0;v<count;v++)
      {
      flag[v]=0;
      last[v]=src_router;
      dist[v]=cost_matrix[src_router][v];
      }
      flag[src_router]=1;
      for(i=0;i<count;i++)
      {
      min=1000;
      for(w=0;w<count;w++)
      {
      if(!flag[w])
      if(dist[w]<min)
      {
      v=w;
      min=dist[w];
      }
      }
      flag[v]=1;
      for(w=0;w<count;w++)
      {
      if(!flag[w])
      if(min+cost_matrix[v][w]<dist[w])
      {
      dist[w]=min+cost_matrix[v][w];
      last[w]=v;
      }
      }
      }
      for(i=0;i<count;i++)
      {
      printf("\n%d==>%d:Path taken:%d",src_router,i,i);
      w=i;
      while(w!=src_router)
      {
      printf("\n<--%d",last[w]);w=last[w];
      }
      printf("\n Shortest path cost:%d",dist[i]);
      }
      }
      
      `
  },
  {
      id : 11,
      code : `
      //Sliding   Window
      #include<stdio.h>
      int main()
      {
          int w,i,f,frames[50];
      printf("Enter window size: ");
      scanf("%d",&w);
      printf("\nEnter number of frames to transmit: ");
      scanf("%d",&f);
      printf("\nEnter %d frames: ",f);
          for(i=1;i<=f;i++)
      scanf("%d",&frames[i]);
      printf("\nWith sliding window protocol the frames will be sent in the following manner (assuming no corruption of frames)\n\n");
      printf("After sending %d frames at each stage sender waits for acknowledgement sent by the receiver\n\n",w);
      
          for(i=1;i<=f;i++)
          {
              if(i%w==0)
              {
      printf("%d\n",frames[i]);
      printf("Acknowledgement of above frames sent is received by sender\n\n");
              }
              else
      printf("%d ",frames[i]);
          }
          if(f%w!=0)
      printf("\nAcknowledgement of above frames sent is received by sender\n");
          return 0;
      }
      `
  },
  {
      id : 10,
      code : `
      Check sum
      #include<stdio.h>
      #include<string.h>
      int main()
      {
          char a[20],b[20];
          char sum[20],complement[20];
          int i,length;
      printf("Enter first binary string\n");
      scanf("%s",a);
      printf("Enter second binary string\n");
      scanf("%s",b);
          if(strlen(a)==strlen(b)){
      length = strlen(a);
      char carry='0';
      for(i=length-1;i>=0;i--)
              {if(a[i]=='0' && b[i]=='0' && carry=='0')
                  {
                      sum[i]='0';
                      carry='0';
                  }
                  else if(a[i]=='0' && b[i]=='0' && carry=='1')
                  {
                      sum[i]='1';
                      carry='0';
      
                  }
                  else if(a[i]=='0' && b[i]=='1' && carry=='0')
                  {
                      sum[i]='1';
                      carry='0';
                  }
                  else if(a[i]=='0' && b[i]=='1' && carry=='1')
                  {
                      sum[i]='0';
                      carry='1';
                  }
                  else if(a[i]=='1' && b[i]=='0' && carry=='0')
                  {
                      sum[i]='1';
                      carry='0';
                  }
                  else if(a[i]=='1' && b[i]=='0' && carry=='1')
                  {
                      sum[i]='0';
                      carry='1';
                  }
                  else if(a[i]=='1' && b[i]=='1' && carry=='0')
                  {
                      sum[i]='0';
                      carry='1';
                  }
                  else if(a[i]=='1' && b[i]=='1' && carry=='1')
                  {
                      sum[i]='1';
                      carry='1';
                  }
                  else
                      break;
              }
      printf("\nSum=%c%s",carry,sum);
      for(i=0;i<length;i++)
              {
                  if(sum[i]=='0')
                      complement[i]='1';
                  else
                      complement[i]='0';
              }
              if(carry=='1')
                  carry='0';
              else
                  carry='1';
      printf("\nChecksum=%c%s",carry,complement);
      }
      else {
      printf("\nWrong input strings");
      }
      }
      `
  }, 
  {
      id : 6,
      code  : `
      CSMA/CD
      #include&lt;stdio.h&gt;
      #include&lt;stdlib.h&gt;
      #include&lt;pthread.h&gt;
      #include&lt;string.h&gt;
      #include&lt;sys/time.h&gt;
      int x=0;
      void capture()
      {
      
      exit(0);
      }
      int get()
      {
      return x;
      }
      void put()
      {
      x++;
      }
      void node(char *p)
      {
      int name;
      int seq1,seq2,i=0;
      long int t;
      struct timeval tv;
      struct timezonetz;
      name=atoi(p);
      while(1)
      {
      seq1=get();
      seq2=get();
      if(seq1==seq2)
      {
      put();
      seq1=get();
      printf(&quot;station %d transmitting frame %d\n&quot;,name,++i);
      sleep(3);
      seq2=get();
      if(seq1!=seq2)
      {
      printf(&quot;station %d collision occured %d \n&quot;,name,i--);
      
      sleep(3);
      }
      else
      {
      printf(&quot;station %d complete\n&quot;,name,i);
      }
      }
      sleep(3);
      }
      }
      main()
      {
      pthread_t t1,t2,t3;
      pthread_create(&amp;t1,0,(void *)node,&quot;1&quot;);
      pthread_create(&amp;t2,0,(void *)node,&quot;2&quot;);
      pthread_create(&amp;t3,0,(void *)node,&quot;3&quot;);
      while(1);
      }`
  },
  {
      id : 9 ,
      code : `
      CRC
      #include&lt;stdio.h&gt;
      char data[20],div[20],temp[4],total[100];
      int i,j,datalen,divlen,len,flag=1;
      void check();
      int main()
      {
      printf(&quot;Enter the total bit of data:&quot;);
      scanf(&quot;%d&quot;,&amp;datalen);
      printf(&quot;\nEnter the total bit of divisor:&quot;);
      scanf(&quot;%d&quot;,&amp;divlen);
      len=datalen+divlen-1;
      printf(&quot;\nEnter the data:&quot;);
      scanf(&quot;%s&quot;,&amp;data);
      printf(&quot;\nEnter the divisor:&quot;);
      scanf(&quot;%s&quot;,div);
      
      for(i=0;i&lt;datalen;i++)
      
      {
      total[i]=data[i];
      temp[i]=data[i];
      }
      for(i=datalen;i&lt;len;i++) //padded with zeroes corresponding to
      divlen
      total[i]=&#39;0&#39;;
      check(); // check for crc
      for(i=0;i&lt;divlen;i++) // append crc output (remainder) at end
      of temp
      
      temp[i+datalen]=data[i];
      printf(&quot;\ntransmitted Code Word:%s&quot;,temp);
      printf(&quot;\n\nEnter the received code word:&quot;);
      scanf(&quot;%s&quot;,total);
      check();
      for(i=0;i&lt;divlen-1;i++)
      if(data[i]==&#39;1&#39;)
      {
      flag=0;
      break;
      }
      if(flag==1)
      printf(&quot;\nsuccessful!!&quot;);
      else
      printf(&quot;\nreceived code word contains errors...\n&quot;);
      }
      void check()
      {
      for(j=0;j&lt;divlen;j++)
      data[j]=total[j];
      while(j&lt;=len)
      {
      if(data[0]==&#39;1&#39;) // in XOR ans remains as it is except in case of 1
      
      for(i = 1;i &lt;divlen ; i++)
      
      data[i] = (( data[i] == div[i])?&#39;0&#39;:&#39;1&#39;);
      
      for(i=0;i&lt;divlen-1;i++) // left shift data word by 1 after div
      data[i]=data[i+1];
      data[i]=total[j++]; // replace empty right by total
      }
      }`
  },
  {
      id : 12,
      code : `
      CRC Socket
      SOURCE CODE:
      SERVER:
      #include&lt;stdio.h&gt;
      #include&lt;string.h&gt;
      #include&lt;sys/types.h&gt;
      #include&lt;sys/socket.h&gt;
      #include&lt;netinet/in.h&gt;
      #include&lt;netdb.h&gt;
      #define SERV_TCP_PORT 5035
      int main(int argc, char **argv)
      {
      int sockfd,newsockfd,clength;
      struct sockaddr_inserv_addr,cli_addr;
      char a[30],b[30],c[30]={0},q[30]={0},p[30]={0},np[30]={0},crc[10]={0},r[30]={0};
      int n,m,i=0,j=0,count=0,k=0,l=0,ir=0,ip=0,cou=0,u=0,w=0,nk=0;
      sockfd=socket(AF_INET,SOCK_STREAM,0);
      serv_addr.sin_family=AF_INET;
      serv_addr.sin_addr.s_addr=INADDR_ANY;
      serv_addr.sin_port=htons(SERV_TCP_PORT);
      printf(&quot;\n Binded...&quot;);
      bind(sockfd,(struct sockaddr*)&amp;serv_addr,sizeof(serv_addr));
      listen(sockfd,5);
      clength=sizeof(cli_addr);
      newsockfd=accept(sockfd,(struct sockaddr*)&amp;cli_addr,&amp;clength);
      read(newsockfd,a,30);
      read(newsockfd,b,30);
      m=strlen(b);
      printf(&quot;\n Dividend:%s&quot;,a);
      printf(&quot;\n Divisor:%s&quot;,b);
      strcpy(c,a);
      for(i=0;i&lt;m-1;i++)
      strcat(c,&quot;0&quot;);
      printf(&quot;\n Dividend with zero appended:%s&quot;,c);
      for(i=0;i&lt;m;i++)
      {
          p[k++]=c[i];
          if(strlen(p)==m)
          q[j++]=&#39;l&#39;;
      }
      for(i=0;i&lt;strlen(c);)
      {
          if(p[nk++]==b[l++])
             r[ir++]=&#39;0&#39;;
          else
             r[ir++]=&#39;l&#39;;
          count++; 
      if(count==strlen(b)&amp;&amp;i&lt;(strlen(c)-1))
       {
      
           ip=0;
           for(u=0;u&lt;strlen(b);u++)
           {
             if(r[u]==&#39;l&#39;)
              {
               for(n=u;n&lt;strlen(b);n++)
               {
                   np[ip++]=r[n];
                  r[n]=&#39;0&#39;;
                  cou++;
               }
             }
          }
         count=0;
         nk=0;
         l=0;
         ir=0;
         if(cou!=strlen(b))
         {
          if((strlen(b)-cou)==(strlen(c)-(i+1))||(strlen(b)-cou)&lt;(strlen(c)-(i+1)))
          {
          while(cou!=strlen(b))
           {
              i++;
              np[ip++]=c[i];
              cou++;
              w++;
           }
           strcpy(p,np);
           for(u=0;u&lt;w-1;u++)
           q[j++]=&#39;0&#39;;
           if(w!=0)
           {
              i-=strlen(np);
              w=0;
           }
          }
          else
         {
          for(;i+1&lt;strlen(c);)
          {
             i++;
             np[ip++]=c[i];
             w++;
          }
        
       if(ip&lt;strlen(b))
         {
         for(;ip&lt;strlen(b);)
         np[ip++]=&#39; &#39;;
      
         }
         strcpy(r,np);
         for(u=0;u&lt;w-1;u++)
         q[i++]=&#39;0&#39;;
         i=strlen(c);
         w=0;
      }
      }
         if(cou=strlen(b))
         {
            q[j++]=&#39;l&#39;;
            cou=0;
         }
         ip=0;
         cou=0;
      }
          i++;
      }
      printf(&quot;\n Quotient=%s&quot;,q);
      printf(&quot;\n Remainder=%s&quot;,r);
      for(i=strlen(r)-(m-1);i&lt;=strlen(r);i++)
      crc[w++]=r[i];
      printf(&quot;\n CRC values: %s\n&quot;,crc);
      write(newsockfd,q,30);
      write(newsockfd,r,30);
      write(newsockfd,crc,10);
      close(sockfd);
      return 0;
      }
      CLIENT:
      #include&lt;stdio.h&gt;
      #include&lt;string.h&gt;
      #include&lt;sys/types.h&gt;
      #include&lt;sys/socket.h&gt;
      #include&lt;netinet/in.h&gt;
      #include&lt;netdb.h&gt;
      #define SERV_TCP_PORT 5035
      int main(int argc,char * * argv)
      {
             int sockfd;
             struct sockaddr_inserv_addr;
             struct hostent *server;
             char a[30],b[30],q[30],r[30],crc[10];
             sockfd=socket(AF_INET,SOCK_STREAM,0);
             serv_addr.sin_family=AF_INET;
             serv_addr.sin_addr.s_addr=inet_addr(&quot;127.0.0.1&quot;);
             serv_addr.sin_port=htons(SERV_TCP_PORT);
             connect(sockfd,(struct sockaddr*)&amp;serv_addr,sizeof(serv_addr));
             printf(&quot;\nEnter the dividend:&quot;);
      
             scanf(&quot;%s&quot;,a);
             printf(&quot;\nEnter the divisor:&quot;);
             scanf(&quot;%s&quot;,b);
             write(sockfd,a,30);
             write(sockfd,b,30);
             printf(&quot;\n&quot;);
             printf(&quot;\nServer result:&quot;);
             read(sockfd,q,30);
             read(sockfd,r,30);
             read(sockfd,crc,10);
             printf(&quot;\n\nQuotient=%s&quot;,q);
             printf(&quot;\n\nRemainder=%s&quot;,r);
             printf(&quot;\n\nCRC values=%s\n&quot;,crc);
             close(sockfd);
             return 0;
      }`
  }
]

const Card = () => {
  //State Variables
  const [guess, setGuess] = useState("");
  const [number, setNumber] = useState(0);
  const [numberOfChances, setNumberOfChances] = useState(5);
  const [hint, setHint] = useState("");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    initialTask();
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
    const code = data.find((e) => e.id == guess);
    await navigator.clipboard.writeText(code.code)
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
