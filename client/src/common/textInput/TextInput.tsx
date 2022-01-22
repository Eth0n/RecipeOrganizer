import { useState } from "react";

export enum InputType {
    Text = "text",
    Number = "number",
}

export interface TextInputProps {
    placeholder: string;
    label: string;
    inputType: InputType;
    value?: string | number;
    onChange?: (value: string) => void;
    onChangeNumber?: (value: number) => void;
}

export function TextInput(props: TextInputProps) {
    const [value, setValue] = useState<string>(initializeValue(props));

    const labelFor = getLabelFor(props.label);

    function onHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;
        setValue(newValue);
        if (props.inputType === InputType.Number) {
            if (Number.isNaN(newValue)) {
                return;
            }
            const asNumber = Number.parseInt(`${newValue}`);
            props.onChangeNumber && props.onChangeNumber(asNumber);
        } else {
            props.onChange && props.onChange(newValue);
        }
    }

    return (
        <div className="field">
            <label className="label" htmlFor={labelFor}>
                {props.label}
            </label>
            <div className="control">
                <input
                    className="input"
                    type={props.inputType}
                    placeholder={props.placeholder}
                    id={labelFor}
                    value={value}
                    onChange={onHandleChange}
                />
            </div>
        </div>
    );
}

export function getLabelFor(label: string) {
    return `recipe-${label.toLowerCase()}-input`;
}

function initializeValue(props: TextInputProps): string {
    if (props.inputType === InputType.Text) {
        return `${props.value !== undefined ? props.value : ""}`;
    } else {
        const asNumber = Number.parseInt(`${props.value}`);
        return `${asNumber}`;
    }
}
