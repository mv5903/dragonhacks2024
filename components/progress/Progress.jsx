import { useUser } from '@auth0/nextjs-auth0/client';

export default function Progress({ subjectType }) {

    const { user, isLoading } = useUser();
    

    useEffect(() => {
        fetch('')
    }, [subjectType]);

    return (
        <div className="h-full overflow-hidden">
            <h2 className="text-center text-2xl">{subjectType}</h2>
        </div>
    )
}