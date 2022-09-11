import { fireEvent, render, screen } from "@testing-library/react";
import { InputType, TextInput, TextInputProps } from "./TextInput";

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

    describe("only allows input based on type", () => {
        const sharedScenarios = [
            {
                name: "Numbers",
                value: "23",
                expectToBeAccepted: true,
            },
        ];
        describe("InputType.Text", () => {
            const testScenarios = [
                ...sharedScenarios,
                {
                    name: "Text",
                    value: "text",
                    expectToBeAccepted: true,
                },
            ];
            runScenariosBasedOnInputType(InputType.Text, testScenarios);
        });
        describe("InputType.Number", () => {
            const testScenarios = [
                ...sharedScenarios,
                {
                    name: "Text",
                    value: "text",
                    expectToBeAccepted: false,
                },
            ];
            runScenariosBasedOnInputType(InputType.Number, testScenarios);
        });

        function runScenariosBasedOnInputType(
            inputType: InputType,
            scenarios: any
        ): void {
            for (const scenario of scenarios) {
                it(`${scenario.name}`, () => {
                    const { input } = setUp(
                        getExtendedTextInputProps({
                            inputType: inputType,
                        })
                    );
                    fireEvent.change(input, {
                        target: { value: scenario.value },
                    });
                    expect(input.value).toBe(
                        scenario.expectToBeAccepted ? scenario.value : ""
                    );
                });
            }
        }
    });

    describe("initilize input", () => {
        it("with given value for Text", () => {
            const givenValue = "xyz";
            const { input } = setUp(
                getExtendedTextInputProps({
                    inputType: InputType.Text,
                    initalValue: givenValue,
                })
            );
            expect(input.value).toBe(givenValue);
        });

        it("with empty string if text is passed in to Number", () => {
            const givenValue = "xyz";
            const { input } = setUp(
                getExtendedTextInputProps({
                    inputType: InputType.Number,
                    initalValue: givenValue,
                })
            );
            expect(input.value).toBe("");
        });

        it("with number if number is passed in to Number", () => {
            const givenValue = 2;
            const { input } = setUp(
                getExtendedTextInputProps({
                    inputType: InputType.Number,
                    initalValue: givenValue,
                })
            );
            expect(input.value).toBe(`${givenValue}`);
        });
    });
});

function setUp(props?: TextInputProps) {
    const renderProps = props || getExtendedTextInputProps({});
    const utils = render(<TextInput {...renderProps} />);
    const input = utils.getByLabelText(renderProps.label) as HTMLInputElement;
    return {
        input,
        ...utils,
    };
}

function getExtendedTextInputProps(
    extension: Partial<TextInputProps>
): TextInputProps {
    return {
        formName: "duration",
        placeholder: "mockPlaceHolder",
        label: "mockLabel",
        inputType: InputType.Text,
        ...extension,
    };
}
