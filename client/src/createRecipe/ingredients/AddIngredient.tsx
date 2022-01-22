import { useEffect, useState } from "react";
import { Api } from "../../api/Api";
import { TextInput, InputType } from "../../common/textInput/TextInput";
import { IUnit } from "../../interfaces/interfaces";
import { UsedUnit } from "../interfaces/interfaces";
import { AddUnitSection } from "./AddUnitSection";

export interface AddIngredientProps {
    setAmount: (amount: number) => void;
    setIngredient: (ingredient: string) => void;
    setSelectedUnit: (unit: UsedUnit) => void;
    saveIngredient: () => void;
}

export function AddIngredient(props: AddIngredientProps) {
    const [selectedUnit, setSelectedUnit] = useState<UsedUnit>();
    const [ingredient, setIngredient] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [availableUnits, setAvailableUnits] = useState<IUnit[]>([]);
    useEffect(() => {
        Api.getAllUnits().then((units) => {
            setAvailableUnits(units);
            const initalUnit = units[0];
            setSelectedUnit({
                name: initalUnit.name,
                shortDescription: initalUnit.shortDescription,
            });
        });
    }, [availableUnits.length]);

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
                    onChangeNumber={onHandleInputAmount}
                    value={amount}
                />
            </div>

            <AddUnitSection
                selectedUnit={selectedUnit}
                listOfUnits={availableUnits}
                onUnitChanged={onUnitChanged}
            />

            <div className="column">
                <button onClick={onAddIngredient}>+</button>
            </div>
        </div>
    );
}
