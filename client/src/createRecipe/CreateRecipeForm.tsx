import { useState } from "react";
import { InputType, TextInput } from "../common/textInput/TextInput";
import { CreatedRecipe, Step } from "./interfaces/interfaces";
import { ListOfSteps } from "./steps/ListOfSteps";

export const PlaceholderName = "Name des Rezepts";
export const PlaceholderDuration = "Dauer des Rezepts";

function CreateRecipeForm() {
    const [createdRecipe, setCreatedRecipe] = useState<CreatedRecipe>({
        name: "",
        duration: 0,
        steps: [],
    });

    function addStepToList(createdStep: Step) {
        setCreatedRecipe({
            ...createdRecipe,
            steps: [...createdRecipe.steps, createdStep],
        });
    }

    function deleteStepFromList(deletedStep: Step) {
        const updatedSteps = createdRecipe.steps.filter(
            (item) => item.id !== deletedStep.id
        );
        setCreatedRecipe({
            ...createdRecipe,
            steps: updatedSteps,
        });
    }

    function onNameChange(name: string) {
        setCreatedRecipe({
            ...createdRecipe,
            name,
        });
    }

    function onDurationChange(duration: number) {
        setCreatedRecipe({
            ...createdRecipe,
            duration,
        });
    }

    return (
        <>
            <div className="section">
                <TextInput
                    label="Name"
                    placeholder={PlaceholderName}
                    inputType={InputType.Text}
                    value={createdRecipe.name}
                    onChange={onNameChange}
                />
            </div>
            <div className="section">
                <TextInput
                    label="Dauer in min"
                    placeholder={PlaceholderDuration}
                    inputType={InputType.Number}
                    value={createdRecipe.duration}
                    onChangeNumber={onDurationChange}
                />
            </div>
            <ListOfSteps
                list={createdRecipe.steps}
                addStepToList={addStepToList}
                deleteStepFromList={deleteStepFromList}
            />
        </>
    );
}

export default CreateRecipeForm;
