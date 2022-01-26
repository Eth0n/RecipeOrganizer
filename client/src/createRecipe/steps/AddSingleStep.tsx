import { useState } from "react";
import { generateId } from "../../common/IdGenerator";
import { IUnit } from "../../interfaces/interfaces";
import { Step, UsedIngredient } from "../interfaces/interfaces";
import { EditModeStep } from "./EditModeStep";

export const UiTextAddStep = "Schritt hinzufügen";

export type OnStepAdded = (newStep: Step) => void;
export interface AddSingleStepProps {
    availableUnits: IUnit[];
    onStepAdded: OnStepAdded;
}

export function AddSingleStep(props: AddSingleStepProps) {
    const [step, setStep] = useState<Step>({
        id: "",
        description: "",
        ingredients: [],
    });

    function clickOnAddStep() {
        setStep({ ...step, id: generateId() });
    }

    function clickOnSaveStep(description: string) {
        if (step) {
            step.description = description;
            props.onStepAdded(step);
            resetStep();
        }
    }

    function onAddIngredient(ingredient: UsedIngredient) {
        const newIngredients = [...step.ingredients, ingredient];
        step.ingredients = newIngredients;
        setStep({
            ...step,
            ingredients: newIngredients,
        });
    }

    function resetStep() {
        setStep({
            id: "",
            description: "",
            ingredients: [],
        });
    }

    return !step.id ? (
        <div onClick={clickOnAddStep} className="box">
            <span>+</span>
            <span> {UiTextAddStep}</span>
        </div>
    ) : (
        <EditModeStep
            availableUnits={props.availableUnits}
            step={step}
            onAddIngredient={onAddIngredient}
            onSave={clickOnSaveStep}
            onCancel={resetStep}
        />
    );
}
