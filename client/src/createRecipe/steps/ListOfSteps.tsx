import { useState } from "react";
import { CreatedStep } from "./CreatedStep";
import { AddSingleStep, OnStepAdded } from "./AddSingleStep";
import { StepBuilder } from "./StepBuilder";
import { UsedIngredient } from "../ingredients/UsedIngredient";
import { UsedIngredientBuilder } from "../ingredients/UsedIngredientBuilder";
import { Color, ColoredBox } from "../ColoredBox";

export function ListOfSteps() {
    const [list, setSteps] = useState<CreatedStep[]>([
        getMockStep("Zwiebeln schneiden"),
    ]);

    function addStepToList(newStep: CreatedStep): void {
        setSteps((list) => [...list, newStep]);
    }

    return (
        <>
            <AddSingleStep onStepAdded={addStepToList} />
            <div className="box">
                {list.map((step, index) => {
                    return (
                        <div className="columns" key={index}>
                            <div className="column is-1">
                                {
                                    <ColoredBox
                                        color={Color.Blue}
                                        text={index + 1}
                                    />
                                }
                            </div>
                            <div className="column">
                                {step.getDescription()}
                            </div>
                            <div className="column is-3">
                                {step
                                    .getUsedIngredients()
                                    .map((ingredient, i) => {
                                        return (
                                            <ColoredBox
                                                key={i}
                                                color={Color.Red}
                                                text={ingredient.name.substring(
                                                    0,
                                                    1
                                                )}
                                                title={ingredient.name}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function getMockStep(desc: string): CreatedStep {
    const ing1 = getMockIngredient("Zwiebeln");
    const ing2 = getMockIngredient("Tomate");
    const step = new StepBuilder()
        .description(desc)
        .addIngredient(ing1)
        .addIngredient(ing2)
        .build();
    return step;
}

function getMockIngredient(name: string): UsedIngredient {
    return new UsedIngredientBuilder()
        .name(name)
        .quantity(10)
        .unit("g")
        .build();
}
