import { useState } from "react";
import { generateId } from "../../common/IdGenerator";
import { Step } from "../interfaces/interfaces";
import { EditModeStep } from "./EditModeStep";

export type OnStepAdded = (newStep: Step) => void;
export interface AddSingleStepProps {
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
            + Schritt hinzufügen
        </div>
    ) : (
        <EditModeStep
            step={step}
            onSave={clickOnSaveStep}
            onCancel={resetStep}
        />
    );
}
