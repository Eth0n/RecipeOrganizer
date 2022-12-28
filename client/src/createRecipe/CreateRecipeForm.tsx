import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { InputType, TextInput } from "../common/textInput/TextInput";
import { dispatchUnitIfNecessary } from "./ingredients/UnitDispatcher";
import { IFormValues, Step } from "./interfaces/interfaces";
import { ListOfSteps } from "./steps/ListOfSteps";

export const PlaceholderName = "Name des Rezepts";
export const PlaceholderDuration = "Dauer des Rezepts";

function CreateRecipeForm() {
    const { register, handleSubmit } = useForm<IFormValues>();
    const [steps, setSteps] = useState<Step[]>([]);

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit((data) => {
            console.log(data);
        })(event);
    }

    function addStepToList(createdStep: Step) {
        dispatchUnitIfNecessary(createdStep.ingredients);
        steps.push(createdStep);
        setSteps([...steps]);
    }

    function editStepOnList(editedStep: Step) {
        const indexOfStep = steps.findIndex(
            (item) => item.id === editedStep.id
        );
        if (indexOfStep !== -1) {
            steps[indexOfStep] = editedStep;
        }
        setSteps([...steps]);
    }

    function deleteStepFromList(deletedStep: Step) {
        const updatedSteps = steps.filter((item) => item.id !== deletedStep.id);
        setSteps([...updatedSteps]);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="section">
                    {
                        <TextInput
                            register={register}
                            formName="recipeName"
                            label="Name"
                            placeholder={PlaceholderName}
                            inputType={InputType.Text}
                        />
                    }
                </div>
                <div className="section">
                    {
                        <TextInput
                            register={register}
                            formName="duration"
                            label="Dauer in min"
                            placeholder={PlaceholderDuration}
                            inputType={InputType.Number}
                        />
                    }
                </div>
            </form>
            <ListOfSteps
                list={steps}
                addStepToList={addStepToList}
                editStepFromList={editStepOnList}
                deleteStepFromList={deleteStepFromList}
            />
        </>
    );
}

export default CreateRecipeForm;
