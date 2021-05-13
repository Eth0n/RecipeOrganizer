import { ListOfSteps } from "./steps/ListOfSteps";
import { TextInput } from "./TextInput";

function CreateRecipeForm() {
    return (
        <>
            <TextInput
                label="Name"
                placeholder="Name des Rezepts"
            />
            <TextInput 
                label="Dauer in min"
                placeholder="Dauer des Rezepts"
            />
            <ListOfSteps />
        </>
    );
}

export default CreateRecipeForm;
