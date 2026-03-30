interface SocialFactorsCardProps {
    title: string;
    count: number;
    totalHouses: number;
    label: string;
    showPercentage?: boolean;
}

export const SocialFactorsCard: React.FC<SocialFactorsCardProps> = ({title, count,  label, showPercentage = true, totalHouses}) => {
    return (
        <div className="border-l-4 border-indigo-500 text-lg flex flex-col justify-between gap-2 px-3 rounded-md text-black dark:text-white grow bg-white dark:bg-boxdark p-2">
            <div className="text-lg">
                {title}
            </div>
            <div>
                <span className="text-title-xxl pr-2 font-bold" title={''+ count}>{showPercentage && totalHouses > 0 ? (count / totalHouses * 100).toFixed(2) : 0}%</span>
                <span>{label}</span>
                <p className="pt-2">
                    <span className="font-semibold" >
                        </span>Total: <span className="font-bold">{totalHouses.toLocaleString()}
                    </span>
                </p>
            </div>
        </div>
    );
}