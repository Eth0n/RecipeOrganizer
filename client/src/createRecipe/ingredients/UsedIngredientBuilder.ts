import { UsedIngredient, UsedUnit } from "./UsedIngredient";

export class UsedIngredientBuilder {
    private ingredient: UsedIngredient;

    constructor() {
        this.ingredient = {
            name: "",
            quantity: 0,
            unit: {
                name: "",
                shortDescription: "",
            },
        };
    }

    public name(name: string): UsedIngredientBuilder {
        this.ingredient.name = name;
        return this;
    }

    public quantity(quantity: number): UsedIngredientBuilder {
        this.ingredient.quantity = quantity;
        return this;
    }

    public unit(unit: UsedUnit): UsedIngredientBuilder {
        this.ingredient.unit = unit;
        return this;
    }

    public build(): UsedIngredient {
        return this.ingredient;
    }
}
