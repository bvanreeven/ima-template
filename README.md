# ima-template

A simple template function for generating great-looking code from great-looking TypeScript code.

# Example

Let's say that you want to generate some Java code from a TypeScript tool.
You want _your_ source code to look great, but also the _generated_ source code.
This is where `ima-template` can help you!

Given the following example:

```typescript
import { template } from "ima-template";

function generateCode() {
    return template`
        |class HelloWorld {
        |    public static void main(string[] args) {
        |        System.out.println("Hello world!");
        |    }
        |}
        |`
}
```

The output of `generateCode` would look as follows:

```java
class HelloWorld {
    public static void main(string[] args) {
        System.out.println("Hello world!");
    }
}

```

# Features

* Lines that start with whitespace followed by a pipe (`|`) are included in the output. Other lines are ignored.
* The whitespace up to and including the pipe character are not present in the output. This allows you to use proper indentation in the TypeScript code of the code generator, while also having control over the indentation of the generated code.
* When using a nested `template`, the indentation is repeated for every line, so that the generated source code makes sense.
