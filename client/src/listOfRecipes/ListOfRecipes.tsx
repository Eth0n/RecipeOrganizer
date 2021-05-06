import { useEffect, useState } from "react";
import { Api } from "../api/Api";
import { IShortRecipe } from "../interfaces/interfaces";
import  RecipeCard from "./recipeCard/RecipeCard";

function ListOfRecipes() {

    const mockList: IShortRecipe[] = [
        {
            name: "First recipe",
            duration: 200,
            links: {
                ingredient: { href: "" },
                recipe: { href: "" },
                self: { href: "999" },
                step: { href: "" },
            },
        },
        {
            name: "Second recipe",
            duration: 300,
            links: {
                ingredient: { href: "" },
                recipe: { href: "" },
                self: { href: "998" },
                step: { href: "" },
            },
        },
    ];
    const [list, setList] = useState<IShortRecipe[]>([...mockList]);

    useEffect(() => {
        Api.getRecipes().then((recipes) => {
            setList(recipes);
            console.log(recipes)
        });
    }, []);

    return (
        <div className="section">
                <div className="tile">
                    {list.map((recipe: IShortRecipe) => {
                        return (
                            <RecipeCard key={recipe.links.self.href} {...recipe} />
                        );
                    })}
                </div>
        </div>
    );
}

export default ListOfRecipes;