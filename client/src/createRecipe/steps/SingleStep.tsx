import { useState } from "react";
import { Color, ColoredBox } from "../../common/coloredBox/ColoredBox";
import { IUnit } from "../../interfaces/interfaces";
import { Step, UsedIngredient } from "../interfaces/interfaces";
import { EditModeStepReactForm } from "./EditModeStepReactForm";

export const UiTextEdit = "Edit";
export const UiTextDelete = "Delete";

export interface SingleStepProps {
    step: Step;
    availableUnits: IUnit[];
    deleteStep: (stepToDelete: Step) => void;
}

export function SingleStep(props: SingleStepProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [step] = useState<Step>(props.step);

    function onEdit() {
        setEditing(true);
    }

    function deleteStep() {
        props.deleteStep(step);
    }

    function onExitEdit() {
        setEditing(false);
    }

    return editing ? (
        <EditModeStepReactForm
            availableUnits={props.availableUnits}
            step={props.step}
            //  onAddIngredient={onAddIngredient}
            onCancel={onExitEdit}
        />
    ) : (
        <div className="columns">
            <div className="column is-1">
                {<ColoredBox color={Color.Blue} text={props.step.id + 1} />}
            </div>
            <div className="column">{step.description}</div>
            <div className="column is-3">
                {step.ingredients.map(
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
                <button onClick={onEdit}>{UiTextEdit}</button>
                <button onClick={deleteStep}>{UiTextDelete}</button>
            </div>
        </div>
    );
}
