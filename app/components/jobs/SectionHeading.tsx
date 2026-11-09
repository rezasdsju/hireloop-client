type SectionHeadingProps = {
    number: number;
    title: string;
};

export const SectionHeading = ({ number, title }: SectionHeadingProps) => {
    return (
        <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-md bg-orange-500 text-[11px] font-semibold text-white">
                {number}
            </span>
            <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        </div>
    );
};
