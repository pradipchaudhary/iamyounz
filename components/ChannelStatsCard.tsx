export default function ChannelStatsCard({stats, title}: {stats: any, title: string}) {
    return(
        <div className="flex flex-col items-center px-10">
            <span className="font-kalam text-md sm:text-xl text-[#F5F2ED] font-light tracking-tight">{stats}</span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.08em] text-[#8E8A84] mt-0.5 font-sans font-medium">{title}</span>
        </div>
    )
}