import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Autocomplete } from "../../common/autocomplete/Autocomplete";
import { TextInput, InputType } from "../../common/textInput/TextInput";
import { IUnit } from "../../interfaces/interfaces";
import { IFormValues } from "../interfaces/interfaces";

export const PlaceholderIngredientName = "Zutat";
export const PlaceholderIngredientAmount = "Menge";
export const UITextPlusSignAddIngredient = "+ Add";
export const LabelUnit = "Einheit";
export const PlaceholderCustomUnitName = "Name";
export const PlaceholderCustomUnitShort = "kurz";

export interface AddIngredientProps {
    availableUnits: IUnit[];
    saveIngredient: (data: any) => void;
}

export function AddIngredient(props: AddIngredientProps) {
    const { register, handleSubmit } = useForm<IFormValues>();

    const [selectedUnit, setSelectedUnit] = useState("");

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit((data) => {
            console.log(data);
            props.saveIngredient(data);
        })(event);
    }

    function onUnitChanged(unitChangedEvent: ChangeEvent) {
        console.log(unitChangedEvent);
        setSelectedUnit("eigene");
    }

    function onHandleInputIngredient(value: string) {
        console.log(value);
    }

    function getDefaultSelectedValue(props: AddIngredientProps): string {
        return props.availableUnits[0] && props.availableUnits[0].name;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="columns">
                <div className="column">
                    <Autocomplete
                        register={register}
                        formName={"ingredientName"}
                        placeholder={PlaceholderIngredientName}
                        label={PlaceholderIngredientName}
                        suggestions={[
                            "Zwiebeln",
                            "Ananas",
                            "Apples",
                            "Gurke",
                            "Kartoffeln",
                        ]}
                        onPickIngredient={onHandleInputIngredient}
                    />
                </div>

                <div className="column">
                    <TextInput
                        formName="amount"
                        register={register}
                        placeholder={PlaceholderIngredientAmount}
                        label={PlaceholderIngredientAmount}
                        inputType={InputType.Number}
                    />
                </div>

                {
                    // Add Unit section
                    <>
                        <div className="column">
                            <div className="field">
                                <label className="label" htmlFor="unit">
                                    {LabelUnit}
                                </label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            {...register("unit")}
                                            id={"unit"}
                                            onChange={onUnitChanged}
                                            defaultValue={getDefaultSelectedValue(
                                                props
                                            )}
                                        >
                                            {props.availableUnits.map(
                                                (unit) => {
                                                    return (
                                                        <option
                                                            key={unit.name}
                                                            value={unit.name}
                                                        >
                                                            {unit.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                            <option value="eigene">
                                                Eigene
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedUnit === "eigene" && (
                            <div className="column">
                                <TextInput
                                    register={register}
                                    formName={"customUnit"}
                                    inputType={InputType.Text}
                                    placeholder={PlaceholderCustomUnitName}
                                    label="Name"
                                />
                                <TextInput
                                    register={register}
                                    formName={"customShort"}
                                    inputType={InputType.Text}
                                    placeholder={PlaceholderCustomUnitShort}
                                    label="Kurz"
                                    max={3}
                                />
                            </div>
                        )}
                    </>
                }

                <div className="column">
                    <input
                        type="submit"
                        title={UITextPlusSignAddIngredient}
                        value={UITextPlusSignAddIngredient}
                    />
                </div>
            </div>
        </form>
    );
}
