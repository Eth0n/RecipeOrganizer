import { IRecipe, IShortRecipe } from "../interfaces/interfaces";

interface RecipeProps extends IShortRecipe {}

function RecipeCard (props: RecipeProps) {
    return (
        <div className="tile">
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img className="card-image" 
                                src="https://img.chefkoch-cdn.de/rezepte/2560921400839010/bilder/1033744/crop-600x400/wurstsalatroellchen.jpg" 
                                alt={`Bild von rezept ${props.name}`} 
                        />  
                    </figure>
                </div>

                <div className="card-content">
                    <div className="content">
                        Recipe {props.id} {props.name}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard;