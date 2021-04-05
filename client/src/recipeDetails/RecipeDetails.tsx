import { IRecipe } from "../interfaces/interfaces";

type RecipeDetailsProps = Omit<IRecipe, "steps">;

function RecipeDetails(props: RecipeDetailsProps) {
    
    return (
        <div>
            <span>Name: Schniposa {props.name}</span>
            <span>Duration: {props.durantion} min</span>
            <span>Zutaten: {props.ingredients}</span>
            <span>Portionen: ???</span>
        </div>
    );
}

export default RecipeDetails;
export type { RecipeDetailsProps };
