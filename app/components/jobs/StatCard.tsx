import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export type StatCardProps = {
    label: string;
    value: string;
    note: string;
    noteClassName: string;
    icon: LucideIcon;
};

export const StatCard = ({ label, value, note, noteClassName, icon: Icon }: StatCardProps) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="size-3.5" />
                    <span>{label}</span>
                </div>
                <div className="text-2xl font-semibold tracking-tight">{value}</div>
                <div className={`text-xs ${noteClassName}`}>{note}</div>
            </CardContent>
        </Card>
    );
};
