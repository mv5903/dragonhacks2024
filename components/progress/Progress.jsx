import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import Loading from "../Loading";

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import Button from '../misc/Button';

export default function Progress({ subjectType, roadmap }) {

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

    const { user, isLoading } = useUser();
    
    const [activeProblem, setActiveProblem] = useState(null);
    const [curAnswer, setCurAnswer] = useState('');
    const [showCorrect, setShowCorrect] = useState(false);
    const [showIncorrect, setShowIncorrect] = useState(false);
    const [userRoadmap, setUserRoadmap] = useState(null);

    async function getProblem() {
        setActiveProblem(null);
        const response = await fetch('/api/problems?subject=' + subjectType);
        if (response.ok) {
            const data = await response.json();
            if (data.problem === undefined) {
                getProblem();
            }
            data.problem = decodeURIComponent(data.problem);
            data.solution = decodeURIComponent(data.solution);
            if (data.problem.includes("$")) {
                // Take the string and take the part only between the 2 $ signs
                let start = data.problem.indexOf("$");
                let end = data.problem.indexOf("$", start + 1);
                let latex = data.problem.substring(start + 1, end);
                data.problem = data.problem = `$${latex}$`;

            }
            data.problem = data.problem.replaceAll("Simplify", "");
            // Make all occurences of single backslash into double backslash, but only if it's not a double backslash already
            data.problem = data.problem.replaceAll("\\", "\\\\");
            console.log(data);
            setActiveProblem(data);
        } else {
            getProblem();
        }
    }

    async function getUserProgress() {
        const response = await fetch(`/api/users?id=${user.sub}`);
        if (response.ok) {
            const data = await response.json();
            setUserRoadmap(data.completedProbs);
        } else {
            alert("Failed to fetch user progress!");
        }
    }

    useEffect(() => {
        getProblem();
        getUserProgress();
    }, []);

    function submitAnswer() {
        if (curAnswer == activeProblem.solution) {
            setShowCorrect(true);
            fetch(`/api/problems`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.sub,
                    subject: subjectType
                })
            })
            setTimeout(() => {
                setShowCorrect(false);
                getProblem();
                getUserProgress();
                setCurAnswer('');
            }, 2000);
        } else {
            setShowIncorrect(true);
            setTimeout(() => {
                setShowIncorrect(false);
                getUserProgress();
            }, 2000);
        }
    }

    if (!activeProblem) {
        return (
            <div className="h-full overflow-hidden flex justify-center mt-[20%]">
                <div className='flex flex-col gap-10 justify-center place-items-center'>
                    <h2>Generating next problem...</h2>
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-hidden">
            {
                userRoadmap && userRoadmap[subjectType] >= 10 &&
                <div role="alert" className="alert shadow-lg w-1/2 mx-auto my-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <h3 className="font-bold">Great Job!</h3>
                        <div className="text-xs">{`You've answered 10 ${getFriendlyName(subjectType)} questions correctly. Head back to the Roadmap to continue to the next chapter or continue practicing!`}</div>
                    </div>
                </div>
            }
            {
                userRoadmap &&
                <div className='w-1/2 mx-auto flex justify-center place-items-center gap-3'>
                    <progress className="progress" value={parseInt(userRoadmap[subjectType])} max="10"></progress>
                    <p>{userRoadmap[subjectType]}/10</p>
                </div>
            }
            <h1 className="text-center text-3xl mb-4 mt-10">{getFriendlyName(subjectType)}</h1>
            <h3 className='text-center text-2xl'>
                <Latex displayMode={true}>{`$${activeProblem.problem}$`}</Latex>
            </h3>
            <div className='flex justify-center w-full mt-10'>
                <div className='flex flex-col justify-center place-items-center gap-3'>
                    <h4 className='text-center text-xl'>Your Answer:</h4>
                    <input className='input input-bordered' type='text' value={curAnswer} onChange={e => setCurAnswer(e.target.value)} />
                    <div onClick={() => submitAnswer()} className='flex gap-3'>
                        {
                            showCorrect && <Button label='Submit' className='bg-green-500 hover:bg-green-500 text-black' />
                        }
                        {
                            showIncorrect && <Button label='Submit' className='bg-red-500 hover:bg-red-500 text-black' />
                        }
                        {
                            !showCorrect && !showIncorrect && <Button label='Submit' className='btn-accent hover:bg-accent' />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}