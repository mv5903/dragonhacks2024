export default function TreeNode({ node }) {
    return (
        <ul className="list-none">
          <li className="mb-2">
            <div className="font-bold text-lg">{node.name}</div>
            {node.children.length > 0 && (
              <div className="ml-4">
                {node.children.map(child => <TreeNode key={child.name} node={child} />)}
              </div>
            )}
          </li>
        </ul>
      );
  };