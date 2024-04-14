export const SubjectTree = {
    "addition": null,
    "subtraction": ["addition"],
    "multiplication": ["subtraction"],
    "division": ["multiplication"],
    "fractions": ["multiplication"],
    "exponents/roots": ["fractions","division"],
    "pemdas": ["exponents/roots"],
    "algebra": ["pemdas"],
    "inequalities": ["algebra"],
    "trig": ["inequalities"],
    "logarithms": ["trig"],
    "derivatives": ["logarithms"],
    "powerrule": ["logarithms"],
    "chainrule": ["powerrule", "derivatives"],
    "integration": ["chainrule"],
    "infiniteseries": ["integration"],
}

function buildTree(items) {
    const nodes = {};
    const levels = [];
    Object.keys(items).forEach(key => {
        nodes[key] = { name: key, children: [], level: 0 };
    });
    Object.keys(items).forEach(key => {
        if (items[key]) {
            items[key].forEach(parent => {
                nodes[key].level = nodes[parent].level + 1;
                nodes[parent].children.push(nodes[key]);
            });
        }
    });
    Object.values(nodes).forEach(node => {
        levels[node.level] = levels[node.level] || [];
        levels[node.level].push(node);
    });
    return levels;
}

export const treeData = buildTree(SubjectTree);