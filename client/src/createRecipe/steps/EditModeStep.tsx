import { useState } from "react";
import { AddIngredient } from "../ingredients/AddIngredient";
import { Step, UsedIngredient, UsedUnit } from "../interfaces/interfaces";

export interface EditModeStepProps {
    step: Step;
    onSave: (description: string) => void;
    onCancel: () => void;
}

export function EditModeStep(props: EditModeStepProps) {
    const [description, setDescription] = useState<string>(
        props.step.description
    );
    const [temporaryIngredient, setTempIngredient] = useState<UsedIngredient>({
        name: "",
        quantity: 0,
    });

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
        saveIngredient();
    }

    function setAmount(amount: number) {
        setTempIngredient({
            ...temporaryIngredient,
            quantity: amount,
        });
    }

    function setName(name: string) {
        setTempIngredient({
            ...temporaryIngredient,
            name,
        });
    }

    function setSelectedUnit(unit: UsedUnit) {
        setTempIngredient({
            ...temporaryIngredient,
            unit: unit,
        });
    }

    function saveIngredient() {
        if (
            temporaryIngredient.name !== "" &&
            temporaryIngredient.quantity !== 0
        ) {
            props.step.ingredients.push(temporaryIngredient);
            console.log(props.step.ingredients);
        }
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
                            return (
                                <div key={usedIngredient.name}>
                                    <span>{usedIngredient.name}</span>
                                    <span>
                                        {usedIngredient.quantity}{" "}
                                        {usedIngredient.unit
                                            ? usedIngredient.unit
                                                  .shortDescription
                                            : ""}
                                    </span>
                                </div>
                            );
                        }
                    )}
                    {
                        <AddIngredient
                            saveIngredient={saveIngredient}
                            setAmount={setAmount}
                            setIngredient={setName}
                            setSelectedUnit={setSelectedUnit}
                        />
                    }
                </div>
                <div className="column">
                    <button onClick={onSavePress}>Save</button>
                    <button onClick={props.onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
