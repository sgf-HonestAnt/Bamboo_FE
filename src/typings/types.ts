export type themeType = "dark-mode" | "light-mode"
export type taskType = "solo" | "team"
export type statusType = "awaited" | "completed" | "in_progress"
export type monthType = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December"
export type taskUpdateType = {
    category?: string;
    title?: string;
    image?: string;
    desc?: string;
    type?: taskType | string;
    value?: number;
    sharedWith?: string[];
    status?: statusType | string;
    deadline?: string;
  };