class Solution:
    def rightSideView(self, root):
        if not root:
            return []
        queue = [root]
        res = []
        while queue:
            res.append(queue[-1].val)
            for _ in range(len(queue)):
                node = queue.pop(0)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        return res