import { useState } from "react";
import { InputType, TextInput } from "../common/textInput/TextInput";
import { CreatedRecipe, Step } from "./interfaces/interfaces";
import { ListOfSteps } from "./steps/ListOfSteps";

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
                    placeholder="Name des Rezepts"
                    inputType={InputType.Text}
                    value={createdRecipe.name}
                    onChange={onNameChange}
                />
            </div>
            <div className="section">
                <TextInput
                    label="Dauer in min"
                    placeholder="Dauer des Rezepts"
                    inputType={InputType.Number}
                    value={createdRecipe.duration}
                    onChangeNumber={onDurationChange}
                />
            </div>
            <ListOfSteps
                list={createdRecipe.steps}
                addStepToList={addStepToList}
            />
        </>
    );
}

export default CreateRecipeForm;
