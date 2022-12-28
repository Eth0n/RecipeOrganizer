import {
    Autocomplete,
    AutocompleteProps,
    AutocompleteState,
} from "./Autocomplete";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AutoCompleter } from "./AutoCompleter";
import { Key } from "ts-key-enum";

describe("Autocomplete", () => {
    it("has input field", () => {
        const { input } = setUp();
        expect(input).toBeDefined();
    });
    it("once text is entered list of suggestions is filtered by character", async () => {
        const props = getExtendedAutocompleteProps({
            suggestions: ["Apples", "Peaches", "Annanas"],
        });
        const autoComplete = setUp(props);
        userEvent.type(autoComplete.input, "Ap");

        await screen.findByText("Apples");
    });
});

describe("Autocompleter", () => {
    const suggestions = ["Apples", "Bananas", "Ananas"];
    describe("getFilteredSuggestions", () => {
        it("return emtpy list if no entry matches the user entry", () => {
            expect(
                AutoCompleter.getFilteredSuggestions("C", suggestions)
            ).toEqual([]);
        });
        it("return empty list if no suggestions were provided", () => {
            expect(AutoCompleter.getFilteredSuggestions("A", [])).toEqual([]);
        });
        it("returns one entry if one entry matches", () => {
            expect(
                AutoCompleter.getFilteredSuggestions("B", suggestions)
            ).toEqual(["Bananas"]);
        });
        it("returns list of two if two entries match the user input", () => {
            expect(
                AutoCompleter.getFilteredSuggestions("A", suggestions)
            ).toEqual(["Apples", "Ananas"]);
        });
        it("returns Apples if user entered 'Ap'", () => {
            expect(
                AutoCompleter.getFilteredSuggestions("Ap", suggestions)
            ).toEqual(["Apples"]);
        });
    });

    describe("onKeyDown", () => {
        it("Enter key sets the user input to the active suggestion", () => {
            const prevState = getExtendedAutocompleteState({
                filteredSuggestions: ["Apples", "Ananas"],
                activeSuggestion: 1,
            });
            const result = AutoCompleter.onKeyDown(prevState, Key.Enter);
            expect(result?.activeSuggestion).toBe(0);
            expect(result?.filteredSuggestions).toBe(
                prevState.filteredSuggestions
            );
            expect(result?.showSuggestions).toBe(false);
            expect(result?.userInput).toBe("Ananas");
        });
        it("Shift key selects the previous suggestion", () => {
            const prevState = getExtendedAutocompleteState({
                filteredSuggestions: ["Apples", "Ananas"],
                activeSuggestion: 1,
            });
            const result = AutoCompleter.onKeyDown(prevState, Key.Shift);
            expect(result?.activeSuggestion).toBe(0);
            expect(result?.filteredSuggestions).toBe(
                prevState.filteredSuggestions
            );
            expect(result?.showSuggestions).toBe(prevState.showSuggestions);
            expect(result?.userInput).toBe(prevState.userInput);
        });
        it("Shift key does nothing if the first selection is already selected", () => {
            const prevState = getExtendedAutocompleteState({
                filteredSuggestions: ["Apples", "Ananas"],
                activeSuggestion: 0,
            });
            const result = AutoCompleter.onKeyDown(prevState, Key.Shift);
            expect(result).toBeNull();
        });
        it("Arrow down key increments the active suggestion", () => {
            const prevState = getExtendedAutocompleteState({
                filteredSuggestions: ["Apples", "Ananas"],
                activeSuggestion: 0,
            });
            const result = AutoCompleter.onKeyDown(prevState, Key.ArrowDown);
            expect(result?.activeSuggestion).toBe(1);
            expect(result?.filteredSuggestions).toBe(
                prevState.filteredSuggestions
            );
            expect(result?.showSuggestions).toBe(prevState.showSuggestions);
            expect(result?.userInput).toBe(prevState.userInput);
        });
        it("Arrow down key does nothing if the last item is already selected", () => {
            const prevState = getExtendedAutocompleteState({
                filteredSuggestions: ["Apples", "Ananas"],
                activeSuggestion: 3,
            });
            const result = AutoCompleter.onKeyDown(prevState, Key.ArrowDown);
            expect(result).toBeNull();
        });
        it("Other keys return null", () => {
            const prevState = getExtendedAutocompleteState({});
            const result = AutoCompleter.onKeyDown(prevState, Key.Control);
            expect(result).toBeNull();
        });
    });
});

function setUp(props?: AutocompleteProps) {
    const renderProps = props || getExtendedAutocompleteProps({});
    const utils = render(<Autocomplete {...renderProps} />);
    const input = utils.getByPlaceholderText(
        renderProps.placeholder
    ) as HTMLInputElement;
    return {
        input,
        ...utils,
    };
}

function getExtendedAutocompleteProps(
    extension: Partial<AutocompleteProps>
): AutocompleteProps {
    return {
        formName: "ingredientName",
        suggestions: [],
        placeholder: "Enter",
        label: "MockLabel",
        onPickIngredient: () => ({}),
        ...extension,
    };
}

function getExtendedAutocompleteState(
    extension?: Partial<AutocompleteState>
): AutocompleteState {
    return {
        filteredSuggestions: ["Apples", "Ananas"],
        activeSuggestion: 1,
        showSuggestions: true,
        userInput: "",
        ...extension,
    };
}
