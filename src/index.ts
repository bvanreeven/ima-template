/**
 * Convenience function to render a template for code generation.
 *
 * Allows the template to be indented nicely in the source code of the code generator, while also providing control over the indentation of the generated code.
 *
 * * All lines not starting with whitespace followed by a pipe (`|`) are ignored. This makes the syntax more straightforward to use.
 * * When adding a multi-line expression, the indentation (whitespace) before the expression is repeated for every line of the expression.
 */
export function template(strings: TemplateStringsArray, ...args: any[]): string {
    // Start with the first string.
    let templateWithArgs = strings[0];

    // If there are arguments, ...
    for (let i = 1; i < strings.length; i++) {
        // Find the indentation before each argument, so that we can repeat it on every line.
        const indentationMatch = strings[i - 1].match(/(\n\s*\|\s*)$/);
        const indentationBeforeArg = indentationMatch ? indentationMatch[1] : "\n|";

        // Render the argument, repeating the found indentation on every line.
        const arg = args[i - 1];
        const argString: string = arg === null || arg === undefined ? "" : arg.toString();
        templateWithArgs += argString.split("\n").join(indentationBeforeArg);

        // Append the string.
        templateWithArgs += strings[i];
    }

    // Finally, remove all the lines that do not start with whitespace followed by a pipe,
    // and for each line remove the leading whitespace up to and including the pipe.
    return templateWithArgs
        .split("\n")
        .filter(line => /^\s*\|/.test(line))
        .map(line => line.replace(/^\s*\|/, ""))
        .join("\n");
}

export default template;
