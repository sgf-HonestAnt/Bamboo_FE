const userRole = (level: number | null) => {
  return !level || level === null || level < 5
    ? "Newbie!"
    : level > 5 && level < 15
    ? "Bamboo Seeker"
    : level > 15 && level < 30
    ? "Gentle Warrior"
    : level > 30 && level < 50
    ? "Proficient Panda"
    : "Adept";
};

export default userRole;
