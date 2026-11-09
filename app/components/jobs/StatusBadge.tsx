import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
    closed: boolean;
};

export const StatusBadge = ({ closed }: StatusBadgeProps) => {
    return (
        <Badge
            variant="outline"
            className={cn(
                closed
                    ? "text-muted-foreground"
                    : "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
            )}
        >
            <span className="size-1.5 rounded-full bg-current" />
            {closed ? "Closed" : "Active"}
        </Badge>
    );
};
