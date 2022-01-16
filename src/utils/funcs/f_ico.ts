export const BAMBOO = "../../../assets/bamboo_logo.png";
export const CROWN = "../../../assets/crown.png";
//
export const ANATOMICALHEART = "../../../assets/anatomical.png";
export const BONSAI = "../../../assets/bonsai.png";
export const BUSINESSDEVIL = "../../../assets/business-devil.png";
export const CACTUS = "../../../assets/cactus.png";
export const CACTUS2 = "../../../assets/cactus2.png";
export const CARROT = "../../../assets/carrot.png";
export const CHECKLIST = "../../../assets/checklist.png";
export const CHRISTMASTREE = "../../../assets/christmas-tree.png";
export const CONSTELLATION = "../../../assets/constellation.png";
export const DEADLINE = "../../../assets/deadline.png";
export const EARTH = "../../../assets/earth.png";
export const EASTEREGG = "../../../assets/easteregg.png";
export const FIREWOMAN = "../../../assets/firewoman.png";
export const GOALS = "../../../assets/goals.png";
export const GOTH = "../../../assets/goth.png";
export const GROWPLANT = "../../../assets/grow-plant.png";
export const LOVEMESSAGE = "../../../assets/love-message.png";
export const MANAGER = "../../../assets/manager.png";
export const POISON = "../../../assets/poison.png";
export const PUMPKIN = "../../../assets/pumpkin.png";
export const SNOWGLOBE = "../../../assets/snow-globe.png";
export const TROPHY = "../../../assets/trophy.png";
export const TULIPS = "../../../assets/tulips.png";
export const TURTLE = "../../../assets/turtle.png";
export const VEGETARIAN = "../../../assets/vegetarian.png";
// All icons created by juicy_fish - Flaticon
export default function returnIco(reward: string) {
  return reward.includes("Grow-plant")
    ? GROWPLANT
    : reward === "Bonsai"
    ? BONSAI
    : reward === "Cactus"
    ? CACTUS
    : reward === "Tulips"
    ? TULIPS
    : reward === "Big Cactus"
    ? CACTUS2
    : reward.includes("Vegan for Veganuary")
    ? VEGETARIAN
    : reward.includes("Love Letter")
    ? LOVEMESSAGE
    : reward.includes("Anatomically Correct Heart")
    ? ANATOMICALHEART
    : reward.includes("Easter Egg")
    ? EASTEREGG
    : reward.includes("Earth Day")
    ? EARTH
    : reward.includes("International Firefighter's Day")
    ? FIREWOMAN
    : reward.includes("World Astronomy Day")
    ? CONSTELLATION
    : reward.includes("World Turtle Day")
    ? TURTLE
    : reward.includes("World Goth Day")
    ? GOTH
    : reward.includes("Halloween Poison Bottle")
    ? POISON
    : reward.includes("Halloween Business Devil")
    ? BUSINESSDEVIL
    : reward.includes("World Vegetarian Day")
    ? CARROT
    : reward.includes("Christmas Tree")
    ? CHRISTMASTREE
    : reward.includes("Christmas Snow Globe")
    ? SNOWGLOBE
    : "";
}
