interface SocialFactorsCardProps {
    title: string;
    count: number;
    totalHouses: number;
    label: string;
}

export const SocialFactorsCard: React.FC<SocialFactorsCardProps> = ({title, count, totalHouses, label}) => {
    return (
        <div className="border-l-4 border-indigo-500 text-lg flex flex-col justify-between gap-2 px-3 rounded-md text-black dark:text-white grow bg-white dark:bg-boxdark p-2">
            <div className="text-lg">
                {title}
            </div>
            <div>
                <span className="text-title-xxl pr-2 font-bold">{count.toLocaleString()}</span>
                <span>residências</span>
                {totalHouses > 0 && 
                <p className="text-xs pt-2">
                    <span className="font-semibold text-lg">{(count / totalHouses * 100).toFixed(2)}%</span> do total com <span className="font-bold">{label}</span></p>}
            </div>
        </div>
    );
}