import { IUnit } from "../../interfaces/interfaces";
import { AddIngredient } from "../ingredients/AddIngredient";
import { IFormValues, Step, UsedIngredient } from "../interfaces/interfaces";
import { useForm } from "react-hook-form";
import { FormEvent } from "react";

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
    onCancel: () => void;
}

export function EditModeStepReactForm(props: EditModeStepProps) {
    const { register, handleSubmit } = useForm<IFormValues>();

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit((data) => {
            console.log(data);
        })(event);
    }

    function onAddIngredient(data2: UsedIngredient) {
        console.log(data2);
        console.log("Save ingredient");
    }

    return (
        <div className="box">
            <div className="columns">
                <div className="column">
                    <form onSubmit={onSubmit}>
                        <textarea
                            {...register("description")}
                            className="textarea"
                            placeholder={PlaceHolderDescription}
                            rows={2}
                        ></textarea>
                        <input
                            type="submit"
                            placeholder={UiTextSave}
                            value={UiTextSave}
                        />
                        <button onClick={props.onCancel}>Cancel</button>
                    </form>
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
