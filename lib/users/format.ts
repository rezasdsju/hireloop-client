export const formatJoinDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export const formatUserCount = (value: number) => value.toLocaleString("en-US");

export const getUserInitials = (name: string) => {
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();

    return initials || "?";
};
