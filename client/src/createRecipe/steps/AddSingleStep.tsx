import { useState } from "react";
import { UsedIngredient } from "../ingredients/UsedIngredient";
import { CreatedStep } from "./CreatedStep";

export type OnStepAdded = (newStep: CreatedStep) => void;
export interface AddSingleStepProps {
    onStepAdded: OnStepAdded;
}

export function AddSingleStep(props: AddSingleStepProps) {
    const [step, setStep] = useState<CreatedStep>();
    const [description, setDescription] = useState<string>("");

    function clickOnAddStep() {
        const newStep = new CreatedStep();
        setStep(newStep);
    }

    function clickOnSaveStep() {
        if (step) {
            step.setDescription(description);
            props.onStepAdded(step);
            resetStep();
        }
    }

    function resetStep() {
        setStep(undefined);
        setDescription("");
    }

    function onHandleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    function onEnterPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey) {
            clickOnSaveStep();
        }
    }

    return !step ? (
        <div onClick={clickOnAddStep} className="box">
            + Schritt hinzufügen
        </div>
    ) : (
        <div className="box">
            <div className="columns">
                <div className="column">
                    <textarea
                        className="textarea"
                        placeholder="Beschreibe hier den Schritt kurz"
                        rows={2}
                        value={description}
                        onChange={onHandleInput}
                        onKeyDown={onEnterPress}
                    ></textarea>
                    {step
                        .getUsedIngredients()
                        .map((usedIngredient: UsedIngredient) => {
                            return <div>{usedIngredient.name}</div>;
                        })}
                    {<div>+ Zutat</div>}
                </div>
                <div className="column">
                    <button onClick={clickOnSaveStep}>Save</button>
                    <button onClick={resetStep}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
