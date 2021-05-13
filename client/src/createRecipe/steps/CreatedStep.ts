import { UsedIngredient } from "../ingredients/UsedIngredient";

export class CreatedStep {
    private description: string = "";
    private usedIngredients: UsedIngredient[] = [];

    public setDescription(desc: string): void {
        this.description = desc;
    }

    public getDescription(): string {
        return this.description;
    }

    public getUsedIngredients(): UsedIngredient[] {
        return this.usedIngredients;
    }

    public addIngredient(ingredient: UsedIngredient): void {
        this.usedIngredients.push(ingredient);
    }
}
