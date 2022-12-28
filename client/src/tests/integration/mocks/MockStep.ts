import { Step } from "../../../createRecipe/interfaces/interfaces";

export function getMockStep(extension?: Partial<Step>): Step {
    return {
        id: "",
        description: "",
        ingredients: [],
        ...extension,
    };
}
