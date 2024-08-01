# Node Documentation Tool for Unreal Engine, DaVinci Resolve, Tech Stacks

![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/node-documentation/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:8.5ch;"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.youtube.com/@WayneTeachesCode/" rel="nofollow"><img src="https://img.shields.io/badge/Youtube-red?style=flat&logo=youtube&labelColor=red" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:10ch;"></a>

## :page_facing_up: Description:
By Weng. A new way to document modern software that have users performing visual scripting by connecting nodes: Unreal Engine, Da Vinci Resolve, Tech Stacks, etc. Their documentations are too linear and scattered. Use this interactive venn diagram to reference connections between nodes. Click the hand pointers for explanations of a previous/next connection or the current node. As a venn diagram further contains another diagram, it's connecting to the right.

Tech Stacks:
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)

## :open_file_folder: Table of Contents:
---
- [Description](#page_facing_up-description)
- [Screenshots](#camera-screenshots)
- [Usage](#runner-usage)
---

## :camera: Screenshots:
From a text file, easily describe different connections for different effects or uses in your software. You can describe left node connections, right node connections, and a general text description of the current node:

![image](docs/app.png)

You click an icon to expand the hidden text. The text descriptions are all optional.

Above was generated from this text:
```
Node: A
text: This node is about
textLeft: The left node connection is about...
textRight: The right node connection is about...

Node: B
text: This node is about
textLeft: The left node connection is about...
textRight: The right node connection is about...

Node: C
text: This node is about
textLeft: The left node connection is about...
textRight: The right node connection is about...

Node: D
text: This node is about
textLeft: The left node connection is about...
textRight: The right node connection is about...

Node: E
text: This node is about
textLeft: The left node connection is about...
textRight: The right node connection is about...

Node: F
text: This node is about
textLeft: The left node connection is about...
textRight: The right node connection is about...

A -> E -> F
B -> C -> D -> E
C -> F
```

Unreal Engine has poor documentation but expect you to learn nodes:
![image](docs/unreal.png)

DaVinci with nodes:
![image](docs/davinci.png)

With this tool, you'll have a better way to document the intricacies of nodes than the official documentations.

## :runner: Usage:
Run as index.php file on a PHP server. 

To render a new node documentation, edit test.txt and run test.js (`node test.js`).
