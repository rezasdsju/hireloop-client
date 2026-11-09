export const formatDeadline = (deadline: string) =>
    new Date(deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

export const isClosed = (deadline: string) => new Date(deadline).getTime() < Date.now();

export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
