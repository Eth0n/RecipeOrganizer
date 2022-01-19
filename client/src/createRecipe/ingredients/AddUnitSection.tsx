import { ChangeEvent, useEffect, useState } from "react";
import { Api } from "../../api/Api";
import { IUnit } from "../../interfaces/interfaces";
import { UsedUnit } from "./UsedIngredient";

export interface AddUnitSectionProps {
    onUnitChanged: (newUnit: UsedUnit) => void;
}

export function AddUnitSection(props: AddUnitSectionProps) {
    const [listOfUnits, setListOfUnits] = useState<IUnit[]>([]);
    const [selectedUnit, setSelectedUnit] = useState<string>();

    useEffect(() => {
        Api.getAllUnits().then((units) => {
            setListOfUnits(units);
        });
    }, [listOfUnits, props]);

    function onUnitChanged(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUnit(event.target.value);
        if (selectedUnit === "eigene") {
            const customUnit: UsedUnit = {
                name: "",
                shortDescription: "",
            };
            props.onUnitChanged(customUnit);
        } else {
            const unitFromList = getUnitFromList(event.target.value);
            props.onUnitChanged(unitFromList);
        }
    }

    function getUnitFromList(name: string): IUnit {
        return listOfUnits.filter((unit) => unit.name === name)[0];
    }

    return (
        <>
            <div className="column">
                <div className="field">
                    <label className="label">Einheit</label>
                    <div className="control">
                        <div className="select">
                            <select onChange={onUnitChanged}>
                                <option value="eigene">Eigene</option>
                                {listOfUnits.map((unit, index) => {
                                    return (
                                        <option
                                            selected={index === 0}
                                            key={unit.name}
                                            value={unit.name}
                                        >
                                            {unit.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {selectedUnit === "eigene" && (
                <div className="column">
                    <div className="field">
                        <label className="label">Name</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div className="field">
                        <label className="label">Kurz</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Kurz"
                            max="3"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
