const LEFT = 0;
const RIGHT = 1;

class TreeNode {
    constructor(value) {
        this.value = value;
        this.descendants = [];
        this.parent = null;
    }

    get left(){
        return this.descendants[LEFT];
    }
    
    set left(node){
        this.descendants[LEFT] = node;
        if (node) {
            node.parent = this;
        }
    }

    get right(){
        return this.descendants[RIGHT];
    }

    set right(node){
        this.descendants[RIGHT] = node;
        if (node) {
            node.parent = this;
        }
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    findNodeAndParent(value) {
        let node = this.root;
        let parent;
      
        while (node) {
          if (node.value === value) {
            break;
          }
          parent = node;
          node = ( value >= node.value) ? node.right : node.left;
        }
      
        return { found: node, parent };
    }

    add(value) {
        const newNode = new TreeNode(value);

        if (this.root) {
                const { found, parent } = this.findNodeAndParent(value);
                if (found) { // duplicated: value already exist on the tree
                found.meta.multiplicity = (found.meta.multiplicity || 1) + 1;
                } else if (value < parent.value) {
                parent.left = newNode;
                } else {
                parent.right = newNode;
                }
        } else {
            this.root = newNode;
        }

        this.size += 1;
        return newNode;
    }
}

// we can create a tree with 3 descendants as follows:
const abe = new TreeNode('Abe');
const homer = new TreeNode('Homer');
const bart = new TreeNode('Bart');
const lisa = new TreeNode('Lisa');
const maggie = new TreeNode('Maggie');

// associate root with its descendants
abe.descendants.push(homer);
homer.descendants.push(bart, lisa, maggie);

