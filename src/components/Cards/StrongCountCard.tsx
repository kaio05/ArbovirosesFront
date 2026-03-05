interface CountCardProps {
    title: string;
    count: number;
}

export const StrongCountCard: React.FC<CountCardProps> = ({title, count}) => {
    return (
        <div className="border-l-4 border-indigo-500 text-lg flex flex-col justify-between gap-2 px-3 rounded-md text-black dark:text-white grow bg-white dark:bg-boxdark p-2">
            <div className="text-lg font-bold">
                {title}
            </div>
            <div className="text-title-xxl font-bold">
                {count}
            </div>
        </div>
    );
}