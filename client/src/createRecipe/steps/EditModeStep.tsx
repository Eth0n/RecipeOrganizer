import { useState } from "react";
import { AddIngredient } from "../ingredients/AddIngredient";
import { UsedIngredient } from "../ingredients/UsedIngredient";
import { CreatedStep } from "./CreatedStep";

export interface EditModeStepProps {
    step: CreatedStep;
    onSave: (description: string) => void;
    onCancel: () => void;
}

export function EditModeStep(props: EditModeStepProps) {
    const [description, setDescription] = useState<string>(
        props.step.getDescription()
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

    function saveIngredient(ingredient: UsedIngredient) {
        props.step.addIngredient(ingredient);
        console.log(props.step.getUsedIngredients());
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
                    {<AddIngredient saveIngredient={saveIngredient} />}
                </div>
                <div className="column">
                    <button onClick={onSavePress}>Save</button>
                    <button onClick={props.onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
