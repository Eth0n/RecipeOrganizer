import { ChangeEvent, useState } from "react";
import { InputType, TextInput } from "../../common/textInput/TextInput";
import { UsedUnit } from "../interfaces/interfaces";

export const PlaceholderCustomUnitName = "Name";
export const PlaceholderCustomUnitShort = "kurz";
export const LabelUnit = "Einheit";

export interface AddUnitSectionProps {
    selectedUnit: UsedUnit | undefined;
    listOfUnits: UsedUnit[];
    onUnitChanged: (newUnit: UsedUnit) => void;
}

export function AddUnitSection(props: AddUnitSectionProps) {
    const [selectedUnit, setSelectedUnit] = useState<string>();
    const [customUnitName, setCustomUnitName] = useState<string>("");
    const [customUnitShort, setCustomUnitShort] = useState<string>("");

    function onUnitChanged(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUnit(event.target.value);
        if (selectedUnit === "eigene") {
            const customUnit: UsedUnit = {
                name: customUnitName,
                shortDescription: customUnitShort,
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

    function onCustomUnitNameChange(name: string): void {
        setCustomUnitName(name);
        props.onUnitChanged({
            name,
            shortDescription: customUnitShort,
        });
    }

    function onCustomUnitShortChange(short: string): void {
        setCustomUnitShort(short);
        props.onUnitChanged({
            name: customUnitName,
            shortDescription: short,
        });
    }

    return (
        <>
            <div className="column">
                <div className="field">
                    <label className="label" htmlFor="unit">
                        {LabelUnit}
                    </label>
                    <div className="control">
                        <div className="select">
                            <select
                                id={"unit"}
                                onChange={onUnitChanged}
                                defaultValue={getDefaultSelectedValue(props)}
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
                    <TextInput
                        inputType={InputType.Text}
                        placeholder={PlaceholderCustomUnitName}
                        label="Name"
                        value={customUnitName}
                        onChange={onCustomUnitNameChange}
                    />
                    <TextInput
                        inputType={InputType.Text}
                        placeholder={PlaceholderCustomUnitShort}
                        label="Kurz"
                        max={3}
                        value={customUnitShort}
                        onChange={onCustomUnitShortChange}
                    />
                </div>
            )}
        </>
    );
}

function getDefaultSelectedValue(props: AddUnitSectionProps): string {
    if (props.selectedUnit) {
        return props.selectedUnit.name;
    }

    return props.listOfUnits[0] && props.listOfUnits[0].name;
}
