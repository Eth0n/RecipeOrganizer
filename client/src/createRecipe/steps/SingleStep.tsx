import { useState } from "react";
import { Color, ColoredBox } from "../ColoredBox";
import { CreatedStep } from "./CreatedStep";
import { EditModeStep } from "./EditModeStep";

export interface SingleStepProps {
    id: number;
    step: CreatedStep;
}

export function SingleStep(props: SingleStepProps) {
    const [editing, setEditing] = useState<boolean>(false);

    function onEdit() {
        setEditing(true);
    }

    function onSave(description: string) {
        props.step.setDescription(description);
        onExitEdit();
    }

    function onExitEdit() {
        setEditing(false);
    }

    return editing ? (
        <EditModeStep
            step={props.step}
            initalDescription={props.step.getDescription()}
            onSave={onSave}
            onCancel={onExitEdit}
        />
    ) : (
        <div className="columns">
            <div className="column is-1">
                {<ColoredBox color={Color.Blue} text={props.id + 1} />}
            </div>
            <div className="column">{props.step.getDescription()}</div>
            <div className="column is-3">
                {props.step.getUsedIngredients().map((ingredient, i) => {
                    return (
                        <ColoredBox
                            key={i}
                            color={Color.Red}
                            text={ingredient.name.substring(0, 1)}
                            title={ingredient.name}
                        />
                    );
                })}
            </div>
            <div className="column is-1">
                <button onClick={onEdit}>Edit</button>
            </div>
        </div>
    );
}
