export interface TextInputProps {
    placeholder: string;
    label: string;
}

export function TextInput(props: TextInputProps) {
    const labelFor = getLabelFor(props.label);
    return (
        <div className="section">
            <div className="field">
                <label className="label" htmlFor={labelFor}>
                    {props.label}
                </label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder={props.placeholder}
                        id={labelFor}
                    />
                </div>
            </div>
        </div>
    );
}

export function getLabelFor(label: string) {
    return `recipe-${label.toLowerCase()}-input`;
}
