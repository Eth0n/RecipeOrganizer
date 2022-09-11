import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { InputType, TextInput } from "../common/textInput/TextInput";
import { dispatchUnitIfNecessary } from "./ingredients/UnitDispatcher";
import { CreatedRecipe, IFormValues, Step } from "./interfaces/interfaces";
import { ListOfSteps } from "./steps/ListOfSteps";

export const PlaceholderName = "Name des Rezepts";
export const PlaceholderDuration = "Dauer des Rezepts";

function CreateRecipeForm() {
    const { register, handleSubmit } = useForm<IFormValues>();

    const recipeNew: CreatedRecipe = {
        name: "",
        duration: 0,
        steps: [],
    };

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit((data) => {
            console.log(data);
        })(event);
    }

    function addStepToList(createdStep: Step) {
        dispatchUnitIfNecessary(createdStep.ingredients);
        recipeNew.steps.push(createdStep);
    }

    function deleteStepFromList(deletedStep: Step) {
        const updatedSteps = recipeNew.steps.filter(
            (item) => item.id !== deletedStep.id
        );
        recipeNew.steps = updatedSteps;
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
                list={recipeNew.steps}
                addStepToList={addStepToList}
                deleteStepFromList={deleteStepFromList}
            />
        </>
    );
}

export default CreateRecipeForm;
