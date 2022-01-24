import { AddSingleStep } from "./AddSingleStep";
import { SingleStep } from "./SingleStep";
import { Step } from "../interfaces/interfaces";
import { useEffect, useState } from "react";
import { Api } from "../../api/Api";
import { IUnit } from "../../interfaces/interfaces";

export interface ListOfStepsProps {
    list: Step[];
    addStepToList: (createdStep: Step) => void;
}

export function ListOfSteps(props: ListOfStepsProps) {
    const [availableUnits, setAvailableUnits] = useState<IUnit[]>([]);

    useEffect(() => {
        Api.getAllUnits().then((units) => {
            setAvailableUnits(units);
        });
    }, [availableUnits.length]);

    return (
        <>
            <AddSingleStep
                availableUnits={availableUnits}
                onStepAdded={props.addStepToList}
            />
            {props.list.length > 0 && (
                <div className="box">
                    {props.list.map((listItem) => {
                        return (
                            <SingleStep
                                availableUnits={availableUnits}
                                key={listItem.id}
                                step={listItem}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}

// export function getMockStep(desc: string): Step {
//     const ing1 = getMockIngredient("Zwiebeln");
//     const ing2 = getMockIngredient("Tomate");
//     const step = new StepBuilder()
//         .description(desc)
//         .addIngredient(ing1)
//         .addIngredient(ing2)
//         .build();
//     return step;
// }

// function getMockIngredient(name: string): UsedIngredient {
//     return new UsedIngredientBuilder()
//         .name(name)
//         .quantity(10)
//         .unit({ name: "Gramm", shortDescription: "gr" })
//         .build();
// }
