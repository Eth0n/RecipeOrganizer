import { InputType, TextInput } from "../common/textInput/TextInput";
import { ListOfSteps } from "./steps/ListOfSteps";

function CreateRecipeForm() {
    return (
        <>
            <div className="section">
                <TextInput
                    label="Name"
                    placeholder="Name des Rezepts"
                    inputType={InputType.Text}
                />
            </div>
            <div className="section">
                <TextInput
                    label="Dauer in min"
                    placeholder="Dauer des Rezepts"
                    inputType={InputType.Text}
                />
            </div>
            <ListOfSteps />
        </>
    );
}

export default CreateRecipeForm;
