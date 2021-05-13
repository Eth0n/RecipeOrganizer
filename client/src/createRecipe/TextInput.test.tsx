import { render, screen } from "@testing-library/react";
import { TextInput, TextInputProps } from "./TextInput";

describe("TextInput", () => {
    it("renders label and input field", () => {
        const expectedLabel = "Name";
        const expectedPlaceholder = "Name vom Rezept";

        const props = getExtendedTextInputProps({
            label: expectedLabel,
            placeholder: expectedPlaceholder,
        });
        render(<TextInput {...props} />);

        const name = screen.getByLabelText(expectedLabel);
        expect(name).toBeInTheDocument();

        const input = screen.getByPlaceholderText(expectedPlaceholder);
        expect(input).toBeInTheDocument();
    });
});

function getExtendedTextInputProps(
    extension: Partial<TextInputProps>
): TextInputProps {
    return {
        placeholder: "mockPlaceHolder",
        label: "mockLabel",
        ...extension,
    };
}
