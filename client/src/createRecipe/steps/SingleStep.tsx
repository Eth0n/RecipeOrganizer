import { useState } from "react";
import { Color, ColoredBox } from "../../common/coloredBox/ColoredBox";
import { IUnit } from "../../interfaces/interfaces";
import { Step, UsedIngredient } from "../interfaces/interfaces";
import { EditModeStep } from "./EditModeStep";

export const UiTestEdit = "Edit";

export interface SingleStepProps {
    step: Step;
    availableUnits: IUnit[];
}

export function SingleStep(props: SingleStepProps) {
    const [editing, setEditing] = useState<boolean>(false);

    function onEdit() {
        setEditing(true);
    }

    function onSave(description: string) {
        props.step.description = description;
        onExitEdit();
    }

    function onExitEdit() {
        setEditing(false);
    }

    return editing ? (
        <EditModeStep
            availableUnits={props.availableUnits}
            step={props.step}
            onSave={onSave}
            onCancel={onExitEdit}
        />
    ) : (
        <div className="columns">
            <div className="column is-1">
                {<ColoredBox color={Color.Blue} text={props.step.id + 1} />}
            </div>
            <div className="column">{props.step.description}</div>
            <div className="column is-3">
                {props.step.ingredients.map(
                    (ingredient: UsedIngredient, i: number) => {
                        return (
                            <ColoredBox
                                key={i}
                                color={Color.Red}
                                text={ingredient.name.substring(0, 1)}
                                title={ingredient.name}
                            />
                        );
                    }
                )}
            </div>
            <div className="column is-1">
                <button onClick={onEdit}>{UiTestEdit}</button>
            </div>
        </div>
    );
}
