import { ChangeEvent, useState } from "react";
import { UsedUnit } from "../interfaces/interfaces";

export interface AddUnitSectionProps {
    selectedUnit: UsedUnit | undefined;
    listOfUnits: UsedUnit[];
    onUnitChanged: (newUnit: UsedUnit) => void;
}

export function AddUnitSection(props: AddUnitSectionProps) {
    const [selectedUnit, setSelectedUnit] = useState<string>();

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

    function getUnitFromList(name: string): UsedUnit {
        return props.listOfUnits.filter((unit) => unit.name === name)[0];
    }

    return (
        <>
            <div className="column">
                <div className="field">
                    <label className="label">Einheit</label>
                    <div className="control">
                        <div className="select">
                            <select
                                onChange={onUnitChanged}
                                defaultValue={props.selectedUnit?.name}
                            >
                                {props.listOfUnits.map((unit) => {
                                    return (
                                        <option
                                            key={unit.name}
                                            value={unit.name}
                                        >
                                            {unit.name}
                                        </option>
                                    );
                                })}
                                <option value="eigene">Eigene</option>
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
