import { useState } from "react";
import { TextInput, InputType } from "../../common/textInput/TextInput";
import { IUnit } from "../../interfaces/interfaces";
import { UsedUnit } from "../interfaces/interfaces";
import { AddUnitSection } from "./AddUnitSection";

export const PlaceholderIngredientName = "Zutat";
export const PlaceholderIngredientAmount = "Menge";
export const UITextPlusSignAddIngredient = "+";

export interface AddIngredientProps {
    availableUnits: IUnit[];
    setAmount: (amount: number) => void;
    setIngredient: (ingredient: string) => void;
    setSelectedUnit: (unit: UsedUnit) => void;
    saveIngredient: () => void;
}

export function AddIngredient(props: AddIngredientProps) {
    const [selectedUnit, setSelectedUnit] = useState<UsedUnit>();
    const [ingredient, setIngredient] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    function onUnitChanged(newUnit: UsedUnit) {
        setSelectedUnit(newUnit);
        props.setSelectedUnit(newUnit);
    }

    function onHandleInputIngredient(value: string) {
        setIngredient(value);
        props.setIngredient(value);
    }

    function onHandleInputAmount(value: number) {
        setAmount(value);
        props.setAmount(value);
    }

    function onAddIngredient() {
        props.saveIngredient();
    }

    return (
        <div className="columns">
            <div className="column">
                <TextInput
                    placeholder={PlaceholderIngredientName}
                    label={PlaceholderIngredientName}
                    inputType={InputType.Text}
                    onChange={onHandleInputIngredient}
                    value={ingredient}
                />
            </div>

            <div className="column">
                <TextInput
                    placeholder={PlaceholderIngredientAmount}
                    label={PlaceholderIngredientAmount}
                    inputType={InputType.Number}
                    onChangeNumber={onHandleInputAmount}
                    value={amount}
                />
            </div>

            <AddUnitSection
                selectedUnit={selectedUnit}
                listOfUnits={props.availableUnits}
                onUnitChanged={onUnitChanged}
            />

            <div className="column">
                <button
                    title={UITextPlusSignAddIngredient}
                    onClick={onAddIngredient}
                >
                    {UITextPlusSignAddIngredient}
                </button>
            </div>
        </div>
    );
}
