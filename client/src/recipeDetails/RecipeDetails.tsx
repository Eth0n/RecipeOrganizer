import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../api/Api";
import { IShortRecipe } from "../interfaces/interfaces";

type ParamType = { id: string };

function RecipeDetails() {

    const params = useParams<ParamType>();

    const [recipe, setRecipe] = useState<IShortRecipe>(); 
    const [recipeName ] = useState("");

    useEffect(() => {
        Api.getRecipeById(params.id).then((fetchedRecipe) => {
            setRecipe(fetchedRecipe);
        });
    }, [params.id, recipeName]);
    
    return (
        recipe === undefined ? <></> :
        <div>
            <span>Name: {recipe.name}</span>
            <span>Duration: {recipe.duration} min</span>
        </div>
    );
}

export default RecipeDetails;
