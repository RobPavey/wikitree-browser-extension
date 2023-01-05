import { registerFeature, OptionType } from "../../core/options/options_registry.js";

const randomProfileFeature = {
  name: "Random Profile",
  id: "randomProfile",
  description:
    "Adds a Random Profile link to the Find menu. Left-click to get any random profile. Right-click to choose a location. This location is then used for all Random Profile calls until it is changed.",
  category: "Global",
  defaultValue: true,
};

registerFeature(randomProfileFeature);
