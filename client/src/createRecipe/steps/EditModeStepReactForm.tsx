import { IUnit } from "../../interfaces/interfaces";
import { AddIngredient } from "../ingredients/AddIngredient";
import { IFormValues, Step, UsedIngredient } from "../interfaces/interfaces";
import { useForm } from "react-hook-form";
import { FormEvent, useState } from "react";

export const PlaceHolderDescription = "Beschreibe hier den Schritt kurz";
export const UiTextSave = "Save";
export const PlaceholderIngredientName = "Zutat";
export const PlaceholderIngredientAmount = "Menge";
export const UITextPlusSignAddIngredient = "+ Add";
export const PlaceholderCustomUnitName = "Name";
export const PlaceholderCustomUnitShort = "kurz";

export interface EditModeStepProps {
    step: Step;
    availableUnits: IUnit[];
    onSave: (editedStep: Step) => void;
    onCancel: () => void;
}

export function EditModeStepReactForm(props: EditModeStepProps) {
    const { register, handleSubmit } = useForm<IFormValues>();
    const [tempIngredients, setTempIngredients] = useState<UsedIngredient[]>(
        props.step.ingredients
    );

    let editedDescription: string;

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit((data: IFormValues) => {
            editedDescription = data.description;
        })(event);
    }

    function onSave() {
        props.onSave({
            description: editedDescription,
            id: props.step.id,
            ingredients: tempIngredients,
        });
    }

    function onAddIngredient(usedIngredient: UsedIngredient) {
        setTempIngredients([...tempIngredients, usedIngredient]);
    }

    return (
        <div className="box">
            <div className="columns">
                <div className="column">
                    <form onSubmit={onSubmit}>
                        {
                            // Description
                            <textarea
                                {...register("description")}
                                className="textarea"
                                placeholder={PlaceHolderDescription}
                                rows={2}
                            ></textarea>
                        }
                        {
                            // Save button
                            <input
                                type="submit"
                                placeholder={UiTextSave}
                                value={UiTextSave}
                                onClick={onSave}
                            />
                        }
                        {
                            // Cancel button
                            <button onClick={props.onCancel}>Cancel</button>
                        }
                    </form>
                    {tempIngredients.map((usedIngredient: UsedIngredient) => {
                        return (
                            <div key={usedIngredient.name}>
                                <span>{usedIngredient.name} </span>
                                <span>
                                    {usedIngredient.quantity}{" "}
                                    {usedIngredient.unit
                                        ? usedIngredient.unit.shortDescription
                                        : ""}
                                </span>
                            </div>
                        );
                    })}
                    {
                        // AddIngredient
                        <AddIngredient
                            availableUnits={props.availableUnits}
                            saveIngredient={onAddIngredient}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
