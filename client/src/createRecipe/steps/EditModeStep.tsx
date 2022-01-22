import { useState } from "react";
import { AddIngredient } from "../ingredients/AddIngredient";
import { Step, UsedIngredient } from "../interfaces/interfaces";

export interface EditModeStepProps {
    step: Step;
    onSave: (description: string) => void;
    onCancel: () => void;
}

export function EditModeStep(props: EditModeStepProps) {
    const [description, setDescription] = useState<string>(
        props.step.description
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
        props.step.ingredients.push(ingredient);
        console.log(props.step.ingredients);
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
                    {props.step.ingredients.map(
                        (usedIngredient: UsedIngredient) => {
                            return <div>{usedIngredient.name}</div>;
                        }
                    )}
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
