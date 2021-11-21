import { useState } from "react";
import { CreatedStep } from "./CreatedStep";
import { EditModeStep } from "./EditModeStep";

export type OnStepAdded = (newStep: CreatedStep) => void;
export interface AddSingleStepProps {
    onStepAdded: OnStepAdded;
}

export function AddSingleStep(props: AddSingleStepProps) {
    const [step, setStep] = useState<CreatedStep>();

    function clickOnAddStep() {
        const newStep = new CreatedStep();
        setStep(newStep);
    }

    function clickOnSaveStep(description: string) {
        if (step) {
            step.setDescription(description);
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
