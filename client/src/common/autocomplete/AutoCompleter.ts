import { Key } from "ts-key-enum";
import { AutocompleteState } from "./Autocomplete";

export class AutoCompleter {
    public static getFilteredSuggestions(
        userInput: string,
        suggestions: string[]
    ): string[] {
        const result = suggestions.filter((text: string) => {
            return text.startsWith(userInput);
        });
        return result;
    }

    public static onKeyDown(
        autoCompleteState: AutocompleteState,
        key: Key
    ): AutocompleteState | null {
        const { activeSuggestion, filteredSuggestions } = autoCompleteState;
        if (key === Key.Enter) {
            return {
                ...autoCompleteState,
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion],
            };
        } else if (key === Key.Shift) {
            if (activeSuggestion === 0) {
                return null;
            }
            return {
                ...autoCompleteState,
                activeSuggestion: activeSuggestion - 1,
            };
        }
        // User pressed the down arrow, increment the index
        else if (key === Key.ArrowDown) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return null;
            }
            return {
                ...autoCompleteState,
                activeSuggestion: activeSuggestion + 1,
            };
        }
        return null;
    }
}
