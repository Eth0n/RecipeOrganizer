import { useState } from "react";
import { TextInput, InputType } from "../../common/textInput/TextInput";
import { AddUnitSection } from "./AddUnitSection";
import { UsedIngredient, UsedUnit } from "./UsedIngredient";

export interface AddIngredientProps {
    saveIngredient: (ingredient: UsedIngredient) => void;
}

export function AddIngredient(props: AddIngredientProps) {
    const [selectedUnit, setSelectedUnit] = useState<UsedUnit>();
    const [ingredient, setIngredient] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    function onUnitChanged(newUnit: UsedUnit) {
        setSelectedUnit(newUnit);
    }

    function onHandleInputIngredient(value: string) {
        setIngredient(value);
    }

    function onHandleInputAmount(value: string) {
        setAmount(Number.parseInt(value));
    }

    function onAddIngredient() {
        if (selectedUnit === undefined) {
            //TODO: error handling
            return;
        }

        const usedIngredient: UsedIngredient = {
            name: ingredient,
            quantity: amount,
            unit: selectedUnit,
        };
        props.saveIngredient(usedIngredient);
    }

    return (
        <div className="columns">
            <div className="column">
                <TextInput
                    placeholder="Zutat"
                    label="Zutat"
                    inputType={InputType.Text}
                    onChange={onHandleInputIngredient}
                    value={ingredient}
                />
            </div>

            <div className="column">
                <TextInput
                    placeholder="Menge"
                    label="Menge"
                    inputType={InputType.Number}
                    onChange={onHandleInputAmount}
                    value={amount}
                />
            </div>

            <AddUnitSection onUnitChanged={onUnitChanged} />

            <div className="column">
                <button onClick={onAddIngredient}>+</button>
            </div>
        </div>
    );
}
