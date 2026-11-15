export const formatApplicationDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export const formatApplicantInitial = (email: string) => email.charAt(0).toUpperCase() || "?";
