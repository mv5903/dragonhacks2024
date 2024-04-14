import Progress from '../progress/Progress';
import Roadmap from '../roadmap/Roadmap';
import HomePage from '../home/HomePage';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Body({ tab, subject, setSubject }) {
    const { user, isLoading } = useUser();

    if (!user) {
        return (
            <div className='flex-1 overflow-auto'>
                <HomePage />
            </div>
        )
    }

    return (
        <div className='flex-1 overflow-auto'>
            { tab === 'roadmap' ? <Roadmap setSubject={setSubject} /> : <Progress subjectType={subject} tab={tab} /> }
        </div>
    )
}