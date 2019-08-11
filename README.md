# WebAssembly Intrumentation Library (WAIL)

![Logo](/logo.png)

## Overview

WAIL is a Javascript library for instrumenting WebAssemby binaries from within the browser. WAIL is designed to handle large WASM binaries quickly and memory-efficiently.

Check out the slides for [Hacking WebAssembly Games with Binary Instrumentation](https://media.defcon.org/DEF%20CON%2027/DEF%20CON%2027%20presentations/DEFCON-27-Jack-Baker-Hacking-Web-Assembly-Games.pdf) at Defcon 27.

## Examples

See [examples/](/examples/)

For a more complex example, see [Cetus](https://github.com/Qwokka/cetus/blob/master/content/cetus.js)

## Basic Usage

### Adding Section Entries

WAIL can add elements to almost any [specification-defined section](https://webassembly.github.io/spec/core/binary/modules.html#sections). (Exceptions are TABLE, MEMORY, and START sections since each only contains one element in the MVP)

#### Adding TYPE Section Entry
```javascript
const parser = new WailParser(bufferSource);

const newTypeEntry = parser.addTypeEntry({
    form: "func",
    params: [ "i32", "f32" ],
    return: "i32"
});
```

#### Adding IMPORT Section Entry
Entries in some sections require references to other sections. In this example, we create a TYPE entry and use it as part of our newly-created IMPORT entry.
```javascript
const parser = new WailParser(bufferSource);

const newTypeEntry = parser.addTypeEntry({
    form: "func",
    params: [],
});

const newImportEntry = parser.addImportEntry({
    moduleStr: "moduleName",
    fieldStr: "fieldName",
    kind: "func",
    type: newTypeEntry
});
```

#### Adding FUNCTION and CODE Section Entries
```javascript
const parser = new WailParser(bufferSource);

const newTypeEntry = parser.addTypeEntry({
    form: "func",
    params: [],
});

const newFuncEntry = parser.addFunctionEntry({
    type: newTypeEntry,
});

parser.addCodeEntry({
    locals: [ "i32" ],
    code: [ OP_RETURN, OP_END ]
});
```

#### Adding GLOBAL Section Entry
```javascript
const parser = new WailParser(bufferSource);

const newGlobalEntry = parser.addGlobalEntry({
    globalType: {
    contentType: "i32",
    mutability: true,
    },
    initExpr: [ OP_I32_CONST, VarUint32(0x00), OP_END ]
});
```

#### Adding EXPORT Section Entry
```javascript
const parser = new WailParser(bufferSource);

const adjustedFunctionIndex = parser.getFunctionIndex(1000);

parser.addExportEntry({
    fieldStr: "fieldStr",
    kind: "func",
    index: adjustedFunctionIndex,
});
```

#### Adding ELEMENT Section Entry
```javascript
const parser = new WailParser(bufferSource);

const adjustedFunctionIndex = parser.getFunctionIndex(1000);

parser.addElementEntry({
    index: 0,
    offset: [ OP_I32_CONST, VarUint32(0), OP_END ],
    elems: [
        adjustedFunctionIndex
    ]
});
```

#### Adding DATA Section Entry
```javascript
const parser = new WailParser(bufferSource);

parser.addDataEntry({
    index: 0,
    offset: [ OP_I32_CONST, VarUint32(0), OP_END ],
    data: [ "hello world" ]
});
```

#### Referencing Function/Global Indexes

You may have noticed in the examples above we use **getFunctionIndex()** before any function indexes we plan on using. This is because some modifications will change the function or global tables, causing these indexes to change.

As such, it is highly recommended that you use these two functions rather than referencing any function indexes by directly their index.

```javascript
const adjustedGlobalIndex = parser.getGlobalIndex(10);

const adjustedFunctionIndex = parser.getFunctionIndex(1000);
```

