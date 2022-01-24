import { useState } from "react";
import { generateId } from "../../common/IdGenerator";
import { IUnit } from "../../interfaces/interfaces";
import { Step } from "../interfaces/interfaces";
import { EditModeStep } from "./EditModeStep";

export const UiTextAddStep = "Schritt hinzufügen";

export type OnStepAdded = (newStep: Step) => void;
export interface AddSingleStepProps {
    availableUnits: IUnit[];
    onStepAdded: OnStepAdded;
}

export function AddSingleStep(props: AddSingleStepProps) {
    const [step, setStep] = useState<Step>();

    function clickOnAddStep() {
        const newStep: Step = {
            id: generateId(),
            description: "",
            ingredients: [],
        };
        setStep(newStep);
    }

    function clickOnSaveStep(description: string) {
        if (step) {
            step.description = description;
            props.onStepAdded(step);
            resetStep();
        }
    }

    function resetStep() {
        setStep(undefined);
    }

    return !step ? (
        <div onClick={clickOnAddStep} className="box">
            <span>+</span>
            <span> {UiTextAddStep}</span>
        </div>
    ) : (
        <EditModeStep
            availableUnits={props.availableUnits}
            step={step}
            onSave={clickOnSaveStep}
            onCancel={resetStep}
        />
    );
}
