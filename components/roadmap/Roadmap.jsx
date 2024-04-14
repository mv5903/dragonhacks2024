import { useEffect, useState } from "react";
import { treeData, SubjectTree } from "../../app/shared/SubjectTree";
import Button from "../misc/Button";
import { useUser } from '@auth0/nextjs-auth0/client';
import Loading from "../Loading";

function TreeLevel({ level, setSubject, roadmap }) {

    function getFriendlyName(name) {
        // Exceptions
        if (name === "pemdas") return "PEMDAS";
        if (name === "trig") return "Trigonometry";
        if (name === "infiniteseries") return "Infinite Series";
        if (name === "powerrule") return "Power Rule";
        if (name === "chainrule") return "Chain Rule";
        if (name === "exponents/roots") return "Exponents/Roots";
    
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    console.log(level);

    return (
        <div className="flex gap-2 justify-center mb-2">
            { level.map(node => {
                let parentNode = SubjectTree[node.name];

                let parentCompleted = true;
                if (parentNode) {
                    for (let pNode of parentNode) {
                        if (roadmap[pNode] < 10) {
                            parentCompleted = false;
                            break;
                        }
                    }
                }

                if (!parentCompleted) {
                    return (
                        <div>
                            <Button label={getFriendlyName(node.name)} className={`btn-disabled`} /> 
                        </div>
                    );
                }

                return (
                    <div onClick={() =>  setSubject(node.name)}>
                        <Button label={getFriendlyName(node.name)} className={`btn-accent`} /> 
                    </div>
                );
            }
            )}
        </div>
    )
}

export default function Roadmap({ setSubject }) {
    const [roadmap, setRoadmap] = useState([]);

    const { user, isLoading } = useUser();

    useEffect(() => {
        if (user) {
            async function getUserProgress() {
                const response = await fetch(`/api/users?id=${user.sub}`);
                if (response.ok) {
                    const data = await response.json();
                    setRoadmap(data.completedProbs);
                } else {
                    alert("Failed to fetch user progress!");
                }
            }

            getUserProgress();
        }
    }, [user]);

    if (roadmap.length === 0) {
        return (
            <div className="h-full overflow-hidden flex justify-center mt-[20%]">
                <Loading />
            </div>
        );
    }

    return (
        <div className="h-full overflow-hidden">
            <div className="p-4 rounded-lg shadow overflow-auto max-h-[85vh]">
                {treeData.map((level, index) => (
                    <TreeLevel key={index} level={level} setSubject={setSubject} roadmap={roadmap} />
                ))}
            </div>
        </div>
    )
}