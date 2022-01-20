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
}

export function TextInput(props: TextInputProps) {
    const [value, setValue] = useState<string>(initializeValue(props));

    const labelFor = getLabelFor(props.label);

    function onHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event.target.value);
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
