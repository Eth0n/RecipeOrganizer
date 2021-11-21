import { useState } from "react";
import { UsedIngredient } from "../ingredients/UsedIngredient";
import { CreatedStep } from "./CreatedStep";

export interface EditModeStepProps {
    step: CreatedStep;
    initalDescription?: string;
    onSave: (description: string) => void;
    onCancel: () => void;
}

export function EditModeStep(props: EditModeStepProps) {
    const [description, setDescription] = useState<string>(
        props.initalDescription || ""
    );

    function onHandleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    function onEnterPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey) {
            props.onSave(description);
        }
    }

    function onSavePress() {
        props.onSave(description);
    }

    return (
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
                    {props.step
                        .getUsedIngredients()
                        .map((usedIngredient: UsedIngredient) => {
                            return <div>{usedIngredient.name}</div>;
                        })}
                    {<div>+ Zutat</div>}
                </div>
                <div className="column">
                    <button onClick={onSavePress}>Save</button>
                    <button onClick={props.onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
