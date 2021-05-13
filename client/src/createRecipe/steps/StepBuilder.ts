import { UsedIngredient } from "../ingredients/UsedIngredient";
import { CreatedStep } from "./CreatedStep";

export class StepBuilder {
    private step: CreatedStep;

    constructor() {
        this.step = new CreatedStep();
    }

    public description(desc: string): StepBuilder {
        this.step.setDescription(desc);
        return this;
    }

    public addIngredient(ingredient: UsedIngredient): StepBuilder {
        this.step.addIngredient(ingredient);
        return this;
    }

    public build(): CreatedStep {
        return this.step;
    }
}
