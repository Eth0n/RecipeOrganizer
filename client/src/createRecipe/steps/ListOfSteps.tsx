import { useState } from "react";
import { CreatedStep } from "./CreatedStep";
import { AddSingleStep } from "./AddSingleStep";
import { StepBuilder } from "./StepBuilder";
import { UsedIngredient } from "../ingredients/UsedIngredient";
import { UsedIngredientBuilder } from "../ingredients/UsedIngredientBuilder";
import { SingleStep } from "./SingleStep";

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
                    return <SingleStep key={index} id={index} step={step} />;
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
        .unit({ name: "Gramm", shortDescription: "gr" })
        .build();
}
