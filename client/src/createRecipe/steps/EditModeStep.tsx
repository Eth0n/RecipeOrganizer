import { useState } from "react";
import { IUnit } from "../../interfaces/interfaces";
import { AddIngredient } from "../ingredients/AddIngredient";
import { Step, UsedIngredient, UsedUnit } from "../interfaces/interfaces";

export const PlaceHolderDescription = "Beschreibe hier den Schritt kurz";
export const UiTextSave = "Save";
export interface EditModeStepProps {
    step: Step;
    availableUnits: IUnit[];
    onSave: (description: string) => void;
    onAddIngredient: (ingredient: UsedIngredient) => void;
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

    function onSavePress() {
        if (
            temporaryIngredient.name !== "" &&
            temporaryIngredient.quantity !== 0
        ) {
            props.onAddIngredient(temporaryIngredient);
        }
        props.onSave(description);
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
            props.onAddIngredient(temporaryIngredient);
            setTempIngredient({
                name: "",
                quantity: 0,
            });
        }
    }

    return (
        <div className="box">
            <div className="columns">
                <div className="column">
                    <textarea
                        className="textarea"
                        placeholder={PlaceHolderDescription}
                        rows={2}
                        value={description}
                        onChange={onHandleInput}
                    ></textarea>
                    {props.step.ingredients.map(
                        (usedIngredient: UsedIngredient) => {
                            return (
                                <div key={usedIngredient.name}>
                                    <span>{usedIngredient.name} </span>
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
                            availableUnits={props.availableUnits}
                            saveIngredient={saveIngredient}
                            setAmount={setAmount}
                            setIngredient={setName}
                            setSelectedUnit={setSelectedUnit}
                        />
                    }
                </div>
                <div className="column">
                    <button onClick={onSavePress}>{UiTextSave}</button>
                    <button onClick={props.onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
