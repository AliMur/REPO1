class Node{
	constructor(val,level){
		this.value = val;
		this.level = level;
		this.left = null;
		this.right = null;
	}
	
	addChild(val){
		if(val <= this.value){
			if(this.left == null){
				this.left = new Node(val,this.level+1);
			}else{
				this.left.addChild(val,this.level+1);
			}
		}else{
			if(this.right == null){
				this.right = new Node(val,this.level+1);
			}else{
				this.right.addChild(val,this.level+1);
			}
		}
	}
	
	search(val){
		if(this.value == val){
			return this;
		}
		if(val <= this.value){
			if(this.left!=null){
				return this.left.search(val)
			}	
		}else{
			if(this.right!=null){
				return this.right.search(val)
			}
		}
		return null;
	}
	
	print(){
		console.log(this.value);
	}
}


class BinaryTree {
  constructor() {
	this.root = null;
  }
  
  addNode(val){
	  if(this.root == null){
		  this.root = new Node(val,0);
	  }else{
		  this.root.addChild(val); 
	  }
  }
  
  // returns Node if found - else returns null
  search(val){
	  return this.root.search(val);
  }
  
  print(){
	console.log(this.root);  
  }
  
  // traverse breath first
  print_bf(){
	  var que = [];
	  que.push(this.root);
		while(que.length > 0){
			var currentNode = que.shift();
			if(currentNode == null){
				continue;
			}
			currentNode.print();
			que.push(currentNode.left);
			que.push(currentNode.right);
		}
  }
  
  // in-order traversal iterative approach
  printSorted(){
	  var stack = [];
	  var getLefts = function(node){
		  if(node==null){
			  return;
		  }	
		  stack.push(node);
		  getLefts(node.left);
	  }
	  getLefts(this.root);
		while(stack.length > 0){
			var currentNode = stack.pop();
			if(currentNode == null){
				continue;
			}
			currentNode.print();
			// add the right node and also all nodes left to it
			getLefts(currentNode.right);
		}
  }
  
  // draw
  draw(height, width,radius=20){
	  var buf = 5;
	  var que = [];
	  var current_level = -1;
	  var nodeCountAtLevel = 0;
	  var maxPossibleNodesAtLevel = -1;
	  var startX = 0;
	  var startY = 0;
	  const WITHPARENT = 1;
	  const WITHOUTPARENT = -1;
	  textAlign(CENTER);
	  que.push(this.root);
		while(que.length > 0){
			var currentNode = que.shift();
			nodeCountAtLevel+=1;
			if(nodeCountAtLevel > maxPossibleNodesAtLevel){
				current_level += 1;		// update level
				nodeCountAtLevel = 1;	// new level , therefore new node count, we consider the current node as part of the new level therefore start count from 1
				maxPossibleNodesAtLevel = Math.pow(2, current_level);
				startY+= radius+buf;
				startX= (width - ( (radius+buf) * maxPossibleNodesAtLevel))/2;
				pop();
				push();
				translate(startX, startY,0);		// change y , move to next level
			}
			if(currentNode == WITHPARENT || currentNode == WITHOUTPARENT){
				translate(radius+buf, 0,0);
				fill(0,0,0);
				circle(0, 0, radius);
				if(currentNode == WITHPARENT){
					que.push(WITHOUTPARENT);
					que.push(WITHOUTPARENT);
				}
				continue;
			}
			fill(255,255,255);
			translate(radius+buf, 0,0);
			circle(0, 0, radius);
			fill(0,0,0);
			text(currentNode.value, 0, 0);
			//text(currentNode.value, 0, 0);
			//sphere(radius);
			que.push(currentNode.left==null ? WITHPARENT : currentNode.left);
			que.push(currentNode.right==null ? WITHPARENT : currentNode.right);
		}
		pop();
  }
  
}

var tree;
var arr = [10,15,7,18,9,22,5,13,8,5,33,12,99,167,20,30,11]
var canvasSize = 900;
function setup() {
	createCanvas(canvasSize, canvasSize/*, WEBGL*/);
	tree = new BinaryTree();
	for(var i=0;i<arr.length;i++){
		tree.addNode(arr[i]);
	}
	//tree.print_bf();
	//tree.print();
	console.log(arr);
	tree.printSorted();
	//console.log(tree.search(18));
	noLoop();
}

function draw() {
	background('#efefef');
	tree.draw(canvasSize,canvasSize);
}

