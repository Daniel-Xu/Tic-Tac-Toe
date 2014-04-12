Tic-Tac-Toe
===========

simple game with AI

If both players are playing with an optimal strategy, every game will end in a tie.

Rule
----

First player is the first option, second player is the second option.

You can choose which one to be 'Real Person'

[The online link](http://daniel-xu.github.io/Tic-Tac-Toe/)


Strategy
--------

> The program work correctly without addtional knowledge, but the first step will make deep function call stack,

so it's better to make our AI knowledge based.

* if one player fills the center, the other should choose one of the corners 

* if one player fills one of the corners, the other should choose the center

* if one player fills one of the four edges, the other one should choose cell that are in the same row or column with the chosen one.  

Algorithm
---------

MinMax: here is a good [post](http://www.neverstopbuilding.com/minimax) about how the algorithm works

How to use 
-----------

You can clone to your `Desktop`:

    git clone git@github.com:Daniel-Xu/Tic-Tac-Toe.git 

Then, in the directory:

    cd Desktop 

Run node.js command:

    http-server .

Issue Driven
------------

If you want to know how the project grows, go to the repository issues, and don't forget to checkout the commit message
good luck!

Pic
---

![Tic-Tac-Toe](https://raw.githubusercontent.com/Daniel-Xu/Tic-Tac-Toe/master/tic_tac_toe.jpg)


