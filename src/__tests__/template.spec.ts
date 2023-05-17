import template from "..";

describe("template function", () => {
    it("should return a template string without placeholders", () => {
        expect(template`
            |abc
        `).toBe("abc");
    });

    it("should ignore everything up to and including the first pipe", () => {
        expect(template`ignored
            |abc
        `).toBe("abc");
    });

    it("should ignore everything after the last newline", () => {
        expect(template`
            |abc
        ignored`).toBe("abc");
    });

    it("should ignore any line that doesn't have a pipe", () => {
        expect(template`
            |abc
            ignored
            |def
            ignored
            |ghi
        `).toBe("abc\ndef\nghi");
    });

    it("should replace placeholders in the string with their arguments", () => {
        expect(template`
            |abc${"d"}efg${"h"}ijk
        `).toBe("abcdefghijk");
    });

    it("should support different argument types than string", () => {
        expect(template`
            |Boolean: ${true} ${false}
            |Number:  ${-10} ${0} ${42} ${3.1415}
        `).toBe("Boolean: true false\nNumber:  -10 0 42 3.1415");
    });

    it("should render undefined and null arguments as empty string", () => {
        expect(template`
            |Undefined: [${undefined}]
            |Null:      [${null}]
        `).toBe("Undefined: []\nNull:      []");
    });

    it("should strip whitespace off the left of each line up to and including the pipe", () => {
        const rendered = template`
            |abc
            |def
            |ghi
            `;

        expect(rendered).toBe("abc\ndef\nghi");
    });

    it("should include a newline after the first pipe", () => {
        const rendered = template`
            |
            |abc
            |def
            `;

        expect(rendered).toBe("\nabc\ndef");
    });

    it("should include a newline after an intermediate pipe", () => {
        const rendered = template`
            |abc
            |
            |def
            `;

        expect(rendered).toBe("abc\n\ndef");
    });

    it("should include a newline after the last pipe", () => {
        const rendered = template`
            |abc
            |def
            |
            `;

        expect(rendered).toBe("abc\ndef\n");
    });

    it("should repeat indentation when inserting a multi-line string using a template expression", () => {
        const multiLineString = template`
            |block start
            |  indented block contents
            |block end
        `;

        const rendered = template`
            |template start
            |  ${multiLineString}
            |template end
        `;

        expect(rendered).toBe("template start\n  block start\n    indented block contents\n  block end\ntemplate end");
    });

    it("should include every line when inserting a multi-line string even if no indentation could be found", () => {
        const multiLineString = template`
            |block start
            |  indented block contents
            |block end
        `;

        const rendered = template`
            |template start
            |  no indent ${multiLineString}
            |template end
        `;

        expect(rendered).toBe("template start\n  no indent block start\n  indented block contents\nblock end\ntemplate end");
    });
});
