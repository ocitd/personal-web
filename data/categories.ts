import { projects } from "./projects";

export const categories = ["All", ...new Set(projects.flatMap((p) => p.category))];