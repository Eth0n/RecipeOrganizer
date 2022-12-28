import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "../../createRecipe/interfaces/interfaces";

export enum InputType {
    Text = "text",
    Number = "number",
}

export interface TextInputProps {
    formName: Path<IFormValues>;
    placeholder: string;
    label: string;
    inputType: InputType;
    max?: number;
    initalValue?: string | number;
    register?: UseFormRegister<IFormValues>;
}

export function TextInput(props: TextInputProps) {
    const labelFor = getLabelFor(props.label);

    return (
        <div className="field">
            <label className="label" htmlFor={labelFor}>
                {props.label}
            </label>
            <div className="control">
                <input
                    {...props.register?.(props.formName)}
                    defaultValue={props.initalValue}
                    className="input"
                    type={props.inputType}
                    placeholder={props.placeholder}
                    id={labelFor}
                    max={props.max}
                />
            </div>
        </div>
    );
}

export function getLabelFor(label: string) {
    return `recipe-${label.toLowerCase()}-input`;
}
