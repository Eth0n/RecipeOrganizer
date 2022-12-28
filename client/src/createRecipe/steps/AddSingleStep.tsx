import { useState } from "react";
import { generateId } from "../../common/IdGenerator";
import { IUnit } from "../../interfaces/interfaces";
import { Step } from "../interfaces/interfaces";
import { EditModeStepReactForm } from "./EditModeStepReactForm";

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

    function onSave(addedStep: Step) {
        props.onStepAdded(addedStep);
        resetStep();
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
        <EditModeStepReactForm
            availableUnits={props.availableUnits}
            step={step}
            onSave={onSave}
            onCancel={resetStep}
        />
    );
}
