/**
Copyright 2019 Jack Baker

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const SECTION_CUSTOM         = 0;
const SECTION_TYPE           = 1;
const SECTION_IMPORT         = 2;
const SECTION_FUNCTION       = 3;
const SECTION_TABLE          = 4;
const SECTION_MEMORY         = 5;
const SECTION_GLOBAL         = 6;
const SECTION_EXPORT         = 7;
const SECTION_START          = 8;
const SECTION_ELEMENT        = 9;
const SECTION_CODE           = 10;
const SECTION_DATA           = 11;
const SECTION_DATACOUNT      = 12

const MAX_SECTION_ID         = 12;

const KIND_FUNC              = 0x00;
const KIND_TABLE             = 0x01;
const KIND_MEMORY            = 0x02;
const KIND_GLOBAL            = 0x03;

const kindStr = {
    "func": KIND_FUNC,
    "table": KIND_TABLE,
    "memory": KIND_MEMORY,
    "global": KIND_GLOBAL
};

const convertKind = function(string) {
    const kindVal = kindStr[string];

    if (typeof kindVal === "undefined") {
        throw new Error("Invalid kind "+string);
    }

    return kindVal;
};

const VALUE_TYPE_I32         = 0x7f;
const VALUE_TYPE_I64         = 0x7e;
const VALUE_TYPE_F32         = 0x7d;
const VALUE_TYPE_F64         = 0x7c;
const VALUE_TYPE_ANYFUNC     = 0x70;
const VALUE_TYPE_FUNC        = 0x60;
const VALUE_TYPE_BLOCK       = 0x40;

const valueTypeStr = {
    "i32": VALUE_TYPE_I32,
    "i64": VALUE_TYPE_I64,
    "f32": VALUE_TYPE_F32,
    "f64": VALUE_TYPE_F64,
    "anyfunc": VALUE_TYPE_ANYFUNC,
    "func": VALUE_TYPE_FUNC,
    "block": VALUE_TYPE_BLOCK
};

const convertValueType = function(string) {
    const typeVal = valueTypeStr[string];

    if (typeof typeVal === "undefined") {
        throw new Error("Invalid value type "+string);
    }

    return typeVal;
};

const OP_UNREACHABLE         = 0x00;
const OP_NOP                 = 0x01;
const OP_BLOCK               = 0x02;
const OP_LOOP                = 0x03;
const OP_IF                  = 0x04;
const OP_ELSE                = 0x05;
const OP_END                 = 0x0b;
const OP_BR                  = 0x0c;
const OP_BR_IF               = 0x0d;
const OP_BR_TABLE            = 0x0e;
const OP_RETURN              = 0x0f;
const OP_CALL                = 0x10;
const OP_CALL_INDIRECT       = 0x11;
const OP_DROP                = 0x1a;
const OP_SELECT              = 0x1b;
const OP_GET_LOCAL           = 0x20;
const OP_SET_LOCAL           = 0x21;
const OP_TEE_LOCAL           = 0x22;
const OP_GET_GLOBAL          = 0x23;
const OP_SET_GLOBAL          = 0x24;
const OP_I32_LOAD            = 0x28;
const OP_I64_LOAD            = 0x29;
const OP_F32_LOAD            = 0x2a;
const OP_F64_LOAD            = 0x2b;
const OP_I32_LOAD8_S         = 0x2c;
const OP_I32_LOAD8_U         = 0x2d;
const OP_I32_LOAD16_S        = 0x2e;
const OP_I32_LOAD16_U        = 0x2f;
const OP_I64_LOAD8_S         = 0x30;
const OP_I64_LOAD8_U         = 0x31;
const OP_I64_LOAD16_S        = 0x32;
const OP_I64_LOAD16_U        = 0x33;
const OP_I64_LOAD32_S        = 0x34;
const OP_I64_LOAD32_U        = 0x35;
const OP_I32_STORE           = 0x36;
const OP_I64_STORE           = 0x37;
const OP_F32_STORE           = 0x38;
const OP_F64_STORE           = 0x39;
const OP_I32_STORE8          = 0x3a;
const OP_I32_STORE16         = 0x3b;
const OP_I64_STORE8          = 0x3c;
const OP_I64_STORE16         = 0x3d;
const OP_I64_STORE32         = 0x3e;
const OP_MEMORY_SIZE         = 0x3f;
const OP_MEMORY_GROW         = 0x40;
const OP_I32_CONST           = 0x41;
const OP_I64_CONST           = 0x42;
const OP_F32_CONST           = 0x43;
const OP_F64_CONST           = 0x44;
const OP_I32_EQZ             = 0x45;
const OP_I32_EQ              = 0x46;
const OP_I32_NE              = 0x47;
const OP_I32_LT_S            = 0x48;
const OP_I32_LT_U            = 0x49;
const OP_I32_GT_S            = 0x4a;
const OP_I32_GT_U            = 0x4b;
const OP_I32_LE_S            = 0x4c;
const OP_I32_LE_U            = 0x4d;
const OP_I32_GE_S            = 0x4e;
const OP_I32_GE_U            = 0x4f;
const OP_I64_EQZ             = 0x50;
const OP_I64_EQ              = 0x51;
const OP_I64_NE              = 0x52;
const OP_I64_LT_S            = 0x53;
const OP_I64_LT_U            = 0x54;
const OP_I64_GT_S            = 0x55;
const OP_I64_GT_U            = 0x56;
const OP_I64_LE_S            = 0x57;
const OP_I64_LE_U            = 0x58;
const OP_I64_GE_S            = 0x59;
const OP_I64_GE_U            = 0x5a;
const OP_F32_EQ              = 0x5b;
const OP_F32_NE              = 0x5c;
const OP_F32_LT              = 0x5d;
const OP_F32_GT              = 0x5e;
const OP_F32_LE              = 0x5f;
const OP_F32_GE              = 0x60;
const OP_F64_EQ              = 0x61;
const OP_F64_NE              = 0x62;
const OP_F64_LT              = 0x63;
const OP_F64_GT              = 0x64;
const OP_F64_LE              = 0x65;
const OP_F64_GE              = 0x66;
const OP_I32_CLZ             = 0x67;
const OP_I32_CTZ             = 0x68;
const OP_I32_POPCNT          = 0x69;
const OP_I32_ADD             = 0x6a;
const OP_I32_SUB             = 0x6b;
const OP_I32_MUL             = 0x6c;
const OP_I32_DIV_S           = 0x6d;
const OP_I32_DIV_U           = 0x6e;
const OP_I32_REM_S           = 0x6f;
const OP_I32_REM_U           = 0x70;
const OP_I32_AND             = 0x71;
const OP_I32_OR              = 0x72;
const OP_I32_XOR             = 0x73;
const OP_I32_SHL             = 0x74;
const OP_I32_SHR_S           = 0x75;
const OP_I32_SHR_U           = 0x76;
const OP_I32_ROTL            = 0x77;
const OP_I32_ROTR            = 0x78;
const OP_I64_CLZ             = 0x79;
const OP_I64_CTZ             = 0x7a;
const OP_I64_POPCNT          = 0x7b;
const OP_I64_ADD             = 0x7c;
const OP_I64_SUB             = 0x7d;
const OP_I64_MUL             = 0x7e;
const OP_I64_DIV_S           = 0x7f;
const OP_I64_DIV_U           = 0x80;
const OP_I64_REM_S           = 0x81;
const OP_I64_REM_U           = 0x82;
const OP_I64_AND             = 0x83;
const OP_I64_OR              = 0x84;
const OP_I64_XOR             = 0x85;
const OP_I64_SHL             = 0x86;
const OP_I64_SHR_S           = 0x87;
const OP_I64_SHR_U           = 0x88;
const OP_I64_ROTL            = 0x89;
const OP_I64_ROTR            = 0x8a;
const OP_F32_ABS             = 0x8b;
const OP_F32_NEG             = 0x8c;
const OP_F32_CEIL            = 0x8d;
const OP_F32_FLOOR           = 0x8e;
const OP_F32_TRUNC           = 0x8f;
const OP_F32_NEAREST         = 0x90;
const OP_F32_SQRT            = 0x91;
const OP_F32_ADD             = 0x92;
const OP_F32_SUB             = 0x93;
const OP_F32_MUL             = 0x94;
const OP_F32_DIV             = 0x95;
const OP_F32_MIN             = 0x96;
const OP_F32_MAX             = 0x97;
const OP_F32_COPYSIGN        = 0x98;
const OP_F64_ABS             = 0x99;
const OP_F64_NEG             = 0x9a;
const OP_F64_CEIL            = 0x9b;
const OP_F64_FLOOR           = 0x9c;
const OP_F64_TRUNC           = 0x9d;
const OP_F64_NEAREST         = 0x9e;
const OP_F64_SQRT            = 0x9f;
const OP_F64_ADD             = 0xa0;
const OP_F64_SUB             = 0xa1;
const OP_F64_MUL             = 0xa2;
const OP_F64_DIV             = 0xa3;
const OP_F64_MIN             = 0xa4;
const OP_F64_MAX             = 0xa5;
const OP_F64_COPYSIGN        = 0xa6;
const OP_I32_WRAP_I64        = 0xa7;
const OP_I32_TRUNC_S_F32     = 0xa8;
const OP_I32_TRUNC_U_F32     = 0xa9;
const OP_I32_TRUNC_S_F64     = 0xaa;
const OP_I32_TRUNC_U_F64     = 0xab;
const OP_I64_EXTEND_S_I32    = 0xac;
const OP_I64_EXTEND_U_I32    = 0xad;
const OP_I64_TRUNC_S_F32     = 0xae;
const OP_I64_TRUNC_U_F32     = 0xaf;
const OP_I64_TRUNC_S_F64     = 0xb0;
const OP_I64_TRUNC_U_F64     = 0xb1;
const OP_F32_CONVERT_S_I32   = 0xb2;
const OP_F32_CONVERT_U_I32   = 0xb3;
const OP_F32_CONVERT_S_I64   = 0xb4;
const OP_F32_CONVERT_U_I64   = 0xb5;
const OP_F32_DEMOTE_F64      = 0xb6;
const OP_F64_CONVERT_S_I32   = 0xb7;
const OP_F64_CONVERT_U_I32   = 0xb8;
const OP_F64_CONVERT_S_I64   = 0xb9;
const OP_F64_CONVERT_U_I64   = 0xba;
const OP_F64_PROMOTE_F32     = 0xbb;
const OP_I32_REINTERPRET_F32 = 0xbc;
const OP_I64_REINTERPRET_F64 = 0xbd;
const OP_F32_REINTERPRET_I32 = 0xbe;
const OP_F64_REINTERPRET_I64 = 0xbf;
const OP_I32_EXTEND8_S       = 0xc0;
const OP_I32_EXTEND16_S      = 0xc1;
const OP_I64_EXTEND8_S       = 0xc2;
const OP_I64_EXTEND16_S      = 0xc3;
const OP_I64_EXTEND32_S      = 0xc4;
const OP_BULK_MEMORY         = 0xfc;
const OP_ATOMIC              = 0xfe;

const ARG_MEMORY_INIT        = 0x08;
const ARG_DATA_DROP          = 0x09;
const ARG_MEMORY_COPY        = 0x0a;
const ARG_MEMORY_FILL        = 0x0b;
const ARG_TABLE_INIT         = 0x0c;
const ARG_ELEM_DROP          = 0x0d;
const ARG_TABLE_COPY         = 0x0e;

const ARG_ATOMIC_WAKE             = 0x00;
const ARG_I32_ATOMIC_WAIT         = 0x01;
const ARG_I64_ATOMIC_WAIT         = 0x02;
const ARG_I32_ATOMIC_LOAD         = 0x10;
const ARG_I64_ATOMIC_LOAD         = 0x11;
const ARG_I32_ATOMIC_LOAD_8U      = 0x12;
const ARG_I32_ATOMIC_LOAD_16U     = 0x13;
const ARG_I64_ATOMIC_LOAD_8U      = 0x14;
const ARG_I64_ATOMIC_LOAD_16U     = 0x15;
const ARG_I64_ATOMIC_LOAD_32U     = 0x16;
const ARG_I32_ATOMIC_STORE        = 0x17;
const ARG_I64_ATOMIC_STORE        = 0x18;
const ARG_I32_ATOMIC_STORE_8      = 0x19;
const ARG_I32_ATOMIC_STORE_16     = 0x1A;
const ARG_I64_ATOMIC_STORE_8      = 0x1B;
const ARG_I64_ATOMIC_STORE_16     = 0x1C;
const ARG_I64_ATOMIC_STORE_32     = 0x1D;
const ARG_I32_ATOMIC_RMW_ADD      = 0x1E;
const ARG_I64_ATOMIC_RMW_ADD      = 0x1F;
const ARG_I32_ATOMIC_RMW_ADD_8U   = 0x20;
const ARG_I32_ATOMIC_RMW_ADD_16U  = 0x21;
const ARG_I64_ATOMIC_RMW_ADD_8U   = 0x22;
const ARG_I64_ATOMIC_RMW_ADD_16U  = 0x23;
const ARG_I64_ATOMIC_RMW_ADD_32U  = 0x24;
const ARG_I32_ATOMIC_RMW_SUB      = 0x25;
const ARG_I64_ATOMIC_RMW_SUB      = 0x26;
const ARG_I32_ATOMIC_RMW_SUB_8U   = 0x27;
const ARG_I32_ATOMIC_RMW_SUB_16U  = 0x28;
const ARG_I64_ATOMIC_RMW_SUB_8U   = 0x29;
const ARG_I64_ATOMIC_RMW_SUB_16U  = 0x2A;
const ARG_I64_ATOMIC_RMW_SUB_32U  = 0x2B;
const ARG_I32_ATOMIC_RMW_AND      = 0x2C;
const ARG_I64_ATOMIC_RMW_AND      = 0x2D;
const ARG_I32_ATOMIC_RMW_AND_8U   = 0x2E;
const ARG_I32_ATOMIC_RMW_AND_16U  = 0x2F;
const ARG_I64_ATOMIC_RMW_AND_8U   = 0x30;
const ARG_I64_ATOMIC_RMW_AND_16U  = 0x31;
const ARG_I64_ATOMIC_RMW_AND_32U  = 0x32;
const ARG_I32_ATOMIC_RMW_OR       = 0x33;
const ARG_I64_ATOMIC_RMW_OR       = 0x34;
const ARG_I32_ATOMIC_RMW_OR_8U    = 0x35;
const ARG_I32_ATOMIC_RMW_OR_16U   = 0x36;
const ARG_I64_ATOMIC_RMW_OR_8U    = 0x37;
const ARG_I64_ATOMIC_RMW_OR_16U   = 0x38;
const ARG_I64_ATOMIC_RMW_OR_32U   = 0x39;
const ARG_I32_ATOMIC_RMW_XOR      = 0x3A;
const ARG_I64_ATOMIC_RMW_XOR      = 0x3B;
const ARG_I32_ATOMIC_RMW_XOR_8U   = 0x3C;
const ARG_I32_ATOMIC_RMW_XOR_16U  = 0x3D;
const ARG_I64_ATOMIC_RMW_XOR_8U   = 0x3E;
const ARG_I64_ATOMIC_RMW_XOR_16U  = 0x3F;
const ARG_I64_ATOMIC_RMW_XOR_32U  = 0x40;
const ARG_I32_ATOMIC_RMW_XCHG     = 0x41;
const ARG_I64_ATOMIC_RMW_XCHG     = 0x42;
const ARG_I32_ATOMIC_RMW_XCHG_8U  = 0x43;
const ARG_I32_ATOMIC_RMW_XCHG_16U = 0x44;
const ARG_I64_ATOMIC_RMW_XCHG_8U  = 0x45;
const ARG_I64_ATOMIC_RMW_XCHG_16U = 0x46;
const ARG_I64_ATOMIC_RMW_XCHG_32U = 0x47;
const ARG_I32_ATOMIC_RMW_CMPXCHG     = 0x48;
const ARG_I64_ATOMIC_RMW_CMPXCHG     = 0x49;
const ARG_I32_ATOMIC_RMW_CMPXCHG_8U  = 0x4A;
const ARG_I32_ATOMIC_RMW_CMPXCHG_16U = 0x4B;
const ARG_I64_ATOMIC_RMW_CMPXCHG_8U  = 0x4C;
const ARG_I64_ATOMIC_RMW_CMPXCHG_16U = 0x4D;
const ARG_I64_ATOMIC_RMW_CMPXCHG_32U = 0x4E;

const convertOpcode = function(string) {
    const opcodeVal = opcodeStr[string];

    if (typeof opcodeVal === "undefined") {
        throw new Error("Invalid opcode "+string);
    }

    return opcodeVal;
};

const convertOpcodeArray = function(opcodeArray) {
    const result = [];

    for (let i = 0; i < opcodeArray.length; i++) {
        const thisElement = opcodeArray[i];

        let convertedElement = thisElement;

        if (typeof thisElement === "string") {
            convertedElement = convertOpcode(thisElement);
        }

        result.push(convertedElement);
    }

    return result;
};

const Uint8ToArray = function(x) {
    return [(x & 0xff)];
};

const Uint32ToArray = function(x) {
    return ([
        (x & 0x000000ff),
        (x & 0x0000ff00) >> 8,
        (x & 0x00ff0000) >> 16,
        (x & 0xff000000) >> 24,
    ]);
};

const Uint64ToArray = function(x) {
    return ([
        (x & 0x00000000000000ff),
        (x & 0x000000000000ff00) >> 8,
        (x & 0x0000000000ff0000) >> 16,
        (x & 0x00000000ff000000) >> 24,
        (x & 0x000000ff00000000) >> 32,
        (x & 0x0000ff0000000000) >> 40,
        (x & 0x00ff000000000000) >> 48,
        (x & 0xff00000000000000) >> 56,
    ]);
};

const VarUint32ToArray = function(x) {
    const result = [];
    let current = x;

    if (x == 0) {
        return [0];
    }

    while (current > 0) {
        let thisByte = current & 0x7F;

        current >>= 7;

        if (current) {
            thisByte |= 0x80;
        }

        result.push(thisByte);
    }

    return result;
};

const VarSint32ToArray = function(x) {
    const result = [];
    let current = x;

    while (1) {
        thisByte = current & 0x7f;
        current >>= 7;

        if (current == -1 && (thisByte & 0x40)) {
            result.push(thisByte);
            
            break;
        }
        else if (current == 0 && !(thisByte & 0x40)) {
            result.push(thisByte);
            
            break;
        }
        else {
            thisByte |= 0x80;

            result.push(thisByte);
        }
    }

    return result;
}

// From https://stackoverflow.com/questions/16893817/javascript-ascii-string-to-hex-byte-array
const stringToByteArray = function(str) {
    return str.split("").map(function(c) {
        return c.charCodeAt(0);
    });
};

const VarUint32 = function(value) {
    if (typeof value == "number") {
        return VarUint32ToArray(value);
    }
    else if (value instanceof WailVariable) {
        return value.varUint32();
    }
    else {
        // TODO Handle error
    }
};

// WailVariable is the base class representing values that will be resolved while parsing.
// Users can dictate the particular binary representation of a WailVariable by using
// the type methods (i32(), f32(), etc)
// If a representation is not explicitly selected, Wail will select a representation
// contextually if possible, or throw an exception if not
class WailVariable {
    constructor() {
        this._value = null;
    }

    get value() {
        if (this._value === null) {
            throw new Error("Attempted to resolve WailVariable before set");
        }

        return this._value;
    }

    set value(newValue) {
        this._value = newValue;
    }

    i32() {
        if (this._value !== null) {
            return this.value;
        }

        return new WailI32(this);
    }

    f32() {
        if (this._value !== null) {
            const f32Array = new Float32Array([this._value]);

            return new Uint8Array(f32Array.buffer);
        }

        return new WailF32(this);
    }

    i64() {
        if (this._value !== null) {
            return this.value;
        }

        return new WailI64(this);
    }

    f64() {
        if (this._value !== null) {
            const f64Array = new Float64Array([this._value]);

            return new Uint8Array(f64Array.buffer);
        }

        return new WailF64(this);
    }

    varUint32() {
        if (this._value !== null) {
            return VarUint32(this.value);
        }

        return new WailVarUint32(this);
    }
}

class TypedWailVariable {
    constructor(parentVariable) {
        this._parent = parentVariable;
    }
}

class WailI32 extends TypedWailVariable {
    get value() {
        return Uint32ToArray(this._parent.value);
    }
}

class WailF32 extends TypedWailVariable {
    get value() {
        // TODO Fix
        return Uint32ToArray(this._parent.value);
    }
}

class WailI64 extends TypedWailVariable {
    get value() {
        return Uint64ToArray(this._parent.value);
    }
}

class WailF64 extends TypedWailVariable {
    get value() {
        // TODO Fix
        return Uint64ToArray(this._parent.value);
    }
}

class WailVarUint32 extends TypedWailVariable {
    get value() {
        return VarUint32ToArray(this._parent.value);
    }
}

const BufferReader = class {
    constructor(buffer) {
        this.inBuffer = null;
        this.outBuffer = null;

        if (typeof buffer !== "undefined") {
            this.inBuffer  = new Uint8Array(buffer);

            // Allocate an ArrayBuffer larger than original ArrayBuffer
            // We'll create a larger array later if necessary
            this.outBuffer = new Uint8Array(buffer.length * 2);
        }
        else {
            this.outBuffer = new Uint8Array(1);
        }

        this.inPos      = 0;
        this._copyPos    = 0;
        this.outPos     = 0;

        this._anchor = null;
    }

    load(buffer) {
        this.inBuffer = new Uint8Array(buffer);

        this.outBuffer = new Uint8Array(this.inBuffer.length * 2);
    }

    resize() {
        if (this.outBuffer.length == 0) {
            throw new Error("Attempted to resize 0-length buffer");
        }

        const newBuffer = new Uint8Array(Math.ceil(this.outBuffer.length * 1.25));

        for (let i = 0; i < this.outPos; i++) {
            newBuffer[i] = this.outBuffer[i];
        }

        this.outBuffer = newBuffer;
    }

    readUint8() {
        return this.inBuffer[this.inPos++];
    }

    readUint32() {
        const b1 = this.inBuffer[this.inPos++];
        const b2 = this.inBuffer[this.inPos++];
        const b3 = this.inBuffer[this.inPos++];
        const b4 = this.inBuffer[this.inPos++];

        return (b1 | (b2 << 8) | (b3 << 16) | (b4 << 24));
    }

    readVarUint32() {
        let result  = 0;
        let shift   = 0;

        let currentByte;

        do {
            currentByte = this.readUint8();
            result |= (currentByte & 0x7F) << shift;
            shift += 7;
        } while (currentByte & 0x80);

        return result;
    }

    readUint64() {
        const b1 = this.inBuffer[this.inPos++];
        const b2 = this.inBuffer[this.inPos++];
        const b3 = this.inBuffer[this.inPos++];
        const b4 = this.inBuffer[this.inPos++];
        const b5 = this.inBuffer[this.inPos++];
        const b6 = this.inBuffer[this.inPos++];
        const b7 = this.inBuffer[this.inPos++];
        const b8 = this.inBuffer[this.inPos++];

        return (b1          |
                (b2 << 8)   |
                (b3 << 16)  |
                (b4 << 24)  |
                (b5 << 32)  |
                (b6 << 40)  |
                (b7 << 48)  |
                (b8 << 56)
        );
    }

    readBytes(length) {
        const result = new Uint8Array(length);

        for (let i = 0; i < length; i++) {
            result[i] = this.inBuffer[this.inPos++];
        }

        return result;
    }

    copyBuffer(buffer) {
        while (buffer.length + this.outPos > this.outBuffer.length) {
            this.resize();
        }

        for (let i = 0; i < buffer.length; i++, this.outPos++) {
            this.outBuffer[this.outPos] = buffer[i];
        }

        this.updateCopyPosition();
    }

    commitBytes() {
        while ((this.inPos - this._copyPos) + this.outPos > this.outBuffer.length) {
            this.resize();
        }

        for ( ; this._copyPos < this.inPos; this._copyPos++, this.outPos++) {
            this.outBuffer[this.outPos] = this.inBuffer[this._copyPos];
        }
    }

    updateCopyPosition() {
        this._copyPos = this.inPos;
    }

    setAnchor() {
        this._anchor = this.outPos;
    }

    readFromAnchor() {
        return this.outBuffer.slice(this._anchor, this.outPos);
    }

    writeAtAnchor(buffer) {
        while (buffer.length + this.outPos > this.outBuffer.length) {
            this.resize();
        }

        for (let i = 0; i < buffer.length; i++) {
            this.outBuffer[this._anchor + i] = buffer[i];
        }

        this.outPos = this._anchor + buffer.length;
    }

    write() {
        return this.outBuffer.slice(0, this.outPos);
    }
};

class WailParser extends BufferReader {
    constructor(bufferSource) {
        super(bufferSource);

        this._finished = false;

        this._newSections = [];

        this._removeSectionIds = [];

        this._resolvedTables = false;

        // We need to keep track of how many imported functions there are to
        // properly rebuild function table
        this._importFuncCount = 0;
        this._importFuncNewCount  = 0;

        // Same logic as with imported functions
        this._importGlobalCount = 0;
        this._importGlobalNewCount = 0;

        this._globalFunctionCallback = null;
        this._functionCallbacks = [];

        this._globalInstructionCallback = null;
        this._instructionCallbacks = {};

        this._sectionOptions = {};

        // Each section has three sets of parameters that can be set before parsing begins
        //      "newEntries" includes newly created section entries
        //      "existingExtries" includes parameters used to modify existing entries
        //      "pending" includes variables that require info from this section to resolve
        for (let i = 0; i <= MAX_SECTION_ID; i++) {
            this._sectionOptions[i] = {
                newEntries: [],
                existingEntries: [],
                pending: [],
            };
        }

        // To keep parsing as minimal as possible, we keep two masks of sections the user
        // has requested we parse
        //
        // The first defines sections that the binary must have. If the binary does not already
        // have this section, we will add it
        //
        // The second defines sections that should be parsed if they exist. There is no reason
        // to add these new sections if they do not exist
        this._requiredSectionFlags = 0;
        this._optionalSectionFlags = 0;

        this._parsedSections = 0;

        this.__variables = [];
    }

    parse() {
        const magic   = this.readUint32();
        const version = this.readUint32();

        if (magic != 0x6d736100) {
            throw new Error("Invalid magic. Probably not a WebAssembly binary");
        }

        // TODO How do we make this less stupid?
        while (this.inPos < this.inBuffer.length) {
            this._readSection();
        }

        this.commitBytes();

        this._finished = true;
    }

    // TODO Support removing sections by name
    removeSection(id) {
        if (typeof id === "number") {
            this._removeSectionIds.push(id);
        }
        else {
            throw new Error("Invalid argument to removeSection()");
        }
    }

    addTypeEntry(options) {
        const newEntry = {};

        const form = options.form;

        if (typeof form === "number") {
            newEntry.form = form;
        }
        else {
            newEntry.form = convertValueType(form);
        }

        const params = options.params;

        if (params instanceof Array) {
            const convertedParams = [];

            for (let i = 0; i < params.length; i++) {
                const thisParam = params[i];

                if (typeof thisParam === "number") {
                    convertedParams.push(thisParam);
                }
                else {
                    convertedParams.push(convertValueType(thisParam));
                }
            }

            newEntry.params = convertedParams;
        }
        else {
            newEntry.params = [];
        }

        const returnType = options.returnType;

        if (typeof returnType === "number") {
            newEntry.returnType = returnType;
        }
        else if (typeof returnType === "string") {
            newEntry.returnType = convertValueType(returnType);
        }

        const newVariable = this._createVariable();

        newEntry.variable = newVariable;

        this._sectionOptions[SECTION_TYPE].newEntries.push(newEntry);

        this._requiredSectionFlags |= 1 << SECTION_TYPE;

        return newVariable;
    }

    editTypeEntry(index, options) {
        const savedEntry = {};

        // As is, editTypeEntry() has no purpose to receive WailVariables
        // So unlike some other edit functions, it only accepts numeric indices
        if (typeof index !== "number") {
            throw new Error("Invalid index in editTypeEntry()");
        }

        savedEntry.index = index;

        const params = options.params;

        if (params instanceof Array) {
            savedEntry.params = params;
        }
        else {
            savedEntry.params = [];
        }

        const returnType = options.returnType;

        if (returnType) {
            savedEntry.returnType = returnType;
        }

        this._sectionOptions[SECTION_TYPE].existingEntries.push(savedEntry);

        this._optionalSectionFlags |= 1 << SECTION_TYPE;
    }

    addImportEntry(options) {
        const newEntry = {};

        const moduleStr = options.moduleStr;

        if (typeof moduleStr == "string" || moduleStr instanceof String) {
            newEntry.moduleStr = moduleStr;
        }
        else {
            throw new Error("Invalid moduleStr");
        }

        const fieldStr = options.fieldStr;

        if (typeof fieldStr == "string" || fieldStr instanceof String) {
            newEntry.fieldStr = fieldStr;
        }
        else {
            throw new Error("Invalid fieldStr");
        }

        const kind = options.kind;

        let convertedKind;

        if (typeof kind === "number") {
            convertedKind = kind;
        }
        else {
            convertedKind = convertKind(kind);
        }

        let type = options.type;

        newEntry.kind = convertedKind;

        switch (convertedKind) {
            case KIND_FUNC:
                this._importFuncNewCount++;

                if (typeof type === "number") {
                    newEntry.type = type;
                }
                else if (type instanceof WailVarUint32) {
                    newEntry.type = type;
                }
                else if (type instanceof WailVariable) {
                    newEntry.type = type.varUint32();
                }
                else {
                    throw new Error("Invalid type");
                }

                break;
            case KIND_GLOBAL:
                this._importGlobalNewCount++;

                if (typeof type === "number") {
                    newEntry.type = type;
                }
                else {
                    throw new Error("Invalid type");
                }

                // Mutable imported globals is not supported by all browsers, but
                // we allow it regardless.
                if (options.mutability === 0 || options.mutability === 1 ||
                    options.mutability === true || options.mutability === false) {
                    newEntry.mutability = options.mutability;
                }
                else {
                    throw new Error("Invalid mutability");
                }

                break;
            case KIND_MEMORY:
                throw new Error("Adding new memory object not currently supported");
            case KIND_TABLE:
                throw new Error("Adding new table object not currently supported");
            default:
                throw new Error("Invalid kind");
        }

        const newVariable = this._createVariable();

        newEntry.variable = newVariable;

        this._sectionOptions[SECTION_IMPORT].newEntries.push(newEntry);

        this._requiredSectionFlags |= 1 << SECTION_IMPORT;

        // Adding functions to the import section changes the function table.
        // This means we need to patch up any other section that contains function indexes
        if (this._importFuncNewCount > 0) {
            this._optionalSectionFlags |= 1 << SECTION_EXPORT;
            this._optionalSectionFlags |= 1 << SECTION_ELEMENT;
            this._optionalSectionFlags |= 1 << SECTION_CODE;
            this._optionalSectionFlags |= 1 << SECTION_START;
        }

        // Same logic as above. If we add an imported global, we need to parse
        // any potentially affected sections.
        if (this._importGlobalNewCount > 0) {
            this._optionalSectionFlags |= 1 << SECTION_EXPORT;
            this._optionalSectionFlags |= 1 << SECTION_CODE;
        }

        return newVariable;
    }

    // TODO WAIL does not currently support modifying the "kind" of an existing import
    // Is there any realistic reason to do so?
    editImportEntry(index, options) {
        const savedEntry = {};

        savedEntry.index = index;

        if (typeof index !== "number" && !(index instanceof WailVariable)) {
            throw new Error("Invalid index in editImportEntry()");
        }

        const moduleStr = options.moduleStr;

        if (typeof moduleStr == "string" || moduleStr instanceof String) {
            savedEntry.moduleStr = stringToByteArray(moduleStr);
        }

        const fieldStr = options.fieldStr;

        if (typeof fieldStr == "string" || fieldStr instanceof String) {
            savedEntry.fieldStr = stringToByteArray(fieldStr);
        }

        this._sectionOptions[SECTION_IMPORT].existingEntries.push(savedEntry);

        this._optionalSectionFlags |= 1 << SECTION_IMPORT;
    }

    addFunctionEntry(options) {
        const newEntry = {};

        const type = options.type;

        if (typeof type === "number") {
            newEntry.type = type;
        }
        else if (type instanceof WailVarUint32) {
            newEntry.type = type;
        }
        else if (type instanceof WailVariable) {
            newEntry.type = type.varUint32();
        }
        else {
            throw new Error("Invalid type");
        }

        const newVariable = this._createVariable();

        newEntry.variable = newVariable;

        this._sectionOptions[SECTION_FUNCTION].newEntries.push(newEntry); 
        this._requiredSectionFlags |= 1 << SECTION_FUNCTION;

        return newVariable;
    }

    editFunctionEntry(index, options) {
        const savedEntry = {};

        savedEntry.index = index;

        if (typeof index !== "number" && !(index instanceof WailVariable)) {
            throw new Error("Invalid index in editFunctionEntry()");
        }

        const givenType = options.type;

        if (typeof givenType !== "number") {
            throw new Error("Invalid type in editFunctionEntry()");
        }

        savedEntry.type = givenType;

        this._sectionOptions[SECTION_FUNCTION].existingEntries.push(savedEntry);

        this._optionalSectionFlags |= 1 << SECTION_FUNCTION;
    }

    getFunctionIndex(oldIndex) {
        if (this._finished) {
            if (oldIndex instanceof WailVariable) {
                return oldIndex;
            }
            else {
                const newVariable = this._createVariable;

                newVariable.value = this._getAdjustedFunctionIndex(oldIndex);

                return newVariable;
            }
        }

        const newVariable = this._createVariable();

        if (typeof oldIndex !== "number") {
            throw new Error("Invalid index in getFunctionIndex()");
        }

        const pendingOptions = {
            oldIndex: oldIndex,
            variable: newVariable
        };

        this._sectionOptions[SECTION_FUNCTION].pending.push(pendingOptions);

        // Resolving function indexes can be done by only parsing the IMPORT section
        // since newly added FUNCTION entries will be added to the end of the list
        this._optionalSectionFlags |= 1 << SECTION_IMPORT;

        return newVariable;
    }

    addGlobalEntry(options) {
        const newEntry = {};

        newEntry.globalType = {};

        if (typeof options.globalType === "undefined") {
            throw new Error("Invalid globalType");
        }

        if (typeof options.globalType.contentType === "number") {
            newEntry.globalType.contentType = options.globalType.contentType;
        }
        else {
            newEntry.globalType.contentType = convertValueType(options.globalType.contentType);
        }

        const mutability = options.globalType.mutability;

        if (mutability == true) {
            newEntry.globalType.mutability = 1;
        }
        else if (mutability == false) {
            newEntry.globalType.mutability = 0;
        }
        else {
            throw new Error("Invalid mutability");
        }

        if (options.initExpr instanceof Array) {
            newEntry.initExpr = convertOpcodeArray(options.initExpr);
        }
        else {
            // Default to initExpr value of "i32.const 0" if not specified
            newEntry.initExpr = [ OP_I32_CONST, VarUint32(0x00), OP_END ];
        }

        const newVariable = this._createVariable();

        newEntry.variable = newVariable;

        this._sectionOptions[SECTION_GLOBAL].newEntries.push(newEntry);

        this._requiredSectionFlags |= 1 << SECTION_GLOBAL;

        return newVariable;
    }

    // TODO Handle editing initExpr
    editGlobalEntry(globalIndex, options) {
        const savedEntry = {};

        if (typeof globalIndex === "number") {
            console.warn("Using raw indexes in editGlobalEntry() can have unpredictable "+
                         "results. Consider using getGlobalIndex() instead");
        }
        else if (!(globalIndex instanceof WailVariable)) {
            throw new Error("Invalid globalIndex in addCodeEntry()");
        }

        savedEntry.index = globalIndex;

        savedEntry.globalType = {};

        if (typeof options.globalType === "undefined") {
            throw new Error("Invalid globalType");
        }

        if (typeof options.globalType.contentType === "number") {
            savedEntry.globalType.contentType = options.globalType.contentType;
        }
        else {
            savedEntry.globalType.contentType = convertValueType(options.globalType.contentType);
        }

        const mutability = options.globalType.mutability;

        if (mutability == true) {
            savedEntry.globalType.mutability = 1;
        }
        else if (mutability == false) {
            savedEntry.globalType.mutability = 0;
        }
        else {
            throw new Error("Invalid mutability");
        }

        this._sectionOptions[SECTION_GLOBAL].existingEntries.push(savedEntry);

        this._requiredSectionFlags |= 1 << SECTION_GLOBAL;
    }

    getGlobalIndex(oldIndex) {
        if (this._finished) {
            if (oldIndex instanceof WailVariable) {
                return oldIndex.value;
            }
            else {
                return this._getAdjustedGlobalIndex(oldIndex);
            }
        }

        const newVariable = this._createVariable();

        if (typeof oldIndex !== "number") {
            throw new Error("Invalid index in getGlobalIndex()");
        }

        const pendingOptions = {
            oldIndex: oldIndex,
            variable: newVariable
        };

        this._sectionOptions[SECTION_GLOBAL].pending.push(pendingOptions);

        // Resolving function indexes can be done by only parsing the IMPORT section
        // since newly added GLOBAL entries will be added to the end of the list
        this._optionalSectionFlags |= 1 << SECTION_IMPORT;

        return newVariable;
    }

    addExportEntry(index, options) {
        const newEntry = {};

        if (typeof options.fieldStr == "string" || options.fieldStr instanceof String) {
            newEntry.fieldStr = options.fieldStr;
        }
        else {
            throw new Error("Invalid fieldStr");
        }

        if (typeof options.kind == "number") {
            newEntry.kind = options.kind;
        }
        else {
            newEntry.kind = convertKind(options.kind);
        }

        if (typeof index === "number") {
            newEntry.index = index;
        }
        else if (index instanceof WailVarUint32) {
            newEntry.index = index;
        }
        else if (index instanceof WailVariable) {
            newEntry.index = index.varUint32();
        }
        else {
            throw new Error("Invalid type");
        }

        const newVariable = this._createVariable();

        newEntry.variable = newVariable;

        this._sectionOptions[SECTION_EXPORT].newEntries.push(newEntry);

        this._requiredSectionFlags |= 1 << SECTION_EXPORT;

        return newVariable;
    }

    editExportEntry(index, options) {
        const savedEntry = {};

        savedEntry.index = index;

        if (typeof index !== "number" && !(index instanceof WailVariable)) {
            throw new Error("Invalid index in editExportEntry()");
        }

        const fieldStr = options.fieldStr;

        if (typeof fieldStr == "string" || fieldStr instanceof String) {
            savedEntry.fieldStr = stringToByteArray(fieldStr);
        }

        // TODO Validate
        savedEntry.kind = options.kind;
        savedEntry.funcIndex = options.index;

        this._sectionOptions[SECTION_EXPORT].existingEntries.push(savedEntry);

        this._optionalSectionFlags |= 1 << SECTION_EXPORT;
    }

    // There is no addStartEntry since the start section can only have one element
    editStartEntry(newIndex) {
        if (typeof newIndex !== "number" && !(newIndex instanceof WailVariable)) {
            throw new Error("Invalid index in editStartEntry()");
        }

        this._sectionOptions[SECTION_START].existingEntries.push(newIndex);

        // Unlike other edit functions, editing the START entry should add the
        // section if it doesn't exist
        this._requiredSectionFlags |= 1 << SECTION_START;
    }

    // TODO Validate
    addElementEntry(options) {
        const newVariable = this._createVariable();

        options.variable = newVariable;

        this._sectionOptions[SECTION_ELEMENT].newEntries.push(options);

        this._requiredSectionFlags |= 1 << SECTION_ELEMENT;

        return newVariable;
    }

    editElementEntry(index, options) {
        const savedEntry = {};

        savedEntry.index = index;

        if (typeof index !== "number" && !(index instanceof WailVariable)) {
            throw new Error("Invalid index in editElementEntry()");
        }

        savedEntry.elems = [];

        this._sectionOptions[SECTION_ELEMENT].existingEntries.push(savedEntry);

        this._optionalSectionFlags |= 1 << SECTION_ELEMENT;
    }

    addCodeEntry(funcIndex, options) {
        const newEntry = {};

        if (typeof funcIndex === "number") {
            console.warn("Using raw indexes in addCodeEntry() can have unpredictable "+
                         "results. Consider using getFunctionIndex() instead");
        }
        else if (!(funcIndex instanceof WailVariable)) {
            throw new Error("Invalid funcIndex in addCodeEntry()");
        }

        newEntry.index = funcIndex;

        const locals = options.locals;

        if (locals instanceof Array) {
            const fixedLocals = [];

            for (let i = 0; i < locals.length; i++) {
                const thisLocal = locals[i];

                if (typeof thisLocal === "number") {
                    fixedLocals.push(thisLocal);
                }
                else if (typeof thisLocal === "string") {
                    fixedLocals.push(convertValueType(thisLocal));
                }
                else {
                    throw new Error("Invalid local entry in addCodeEntry()");
                }
            }

            newEntry.locals = fixedLocals;
        }
        else {
            newEntry.locals = [];
        }

        const code = options.code;

        if (code instanceof Array) {
            newEntry.code = convertOpcodeArray(code);
        }
        else {
            throw new Error("Invalid code");
        }

        const newVariable = this._createVariable();

        newEntry.variable = newVariable;

        this._sectionOptions[SECTION_CODE].newEntries.push(newEntry);

        this._requiredSectionFlags |= 1 << SECTION_CODE;

        return newVariable;
    }

    editCodeEntry(funcIndex, options) {
        const savedEntry = {};

        if (typeof funcIndex === "number") {
            console.warn("Using raw indexes in editCodeEntry() can have unpredictable "+
                         "results. Consider using getFunctionIndex() instead");
        }
        else if (!(funcIndex instanceof WailVariable)) {
            throw new Error("Invalid funcIndex in addCodeEntry()");
        }

        savedEntry.index = funcIndex;

        const locals = options.locals;

        if (locals instanceof Array) {
            const fixedLocals = [];

            for (let i = 0; i < locals.length; i++) {
                const thisLocal = locals[i];

                if (typeof thisLocal === "number") {
                    fixedLocals.push(thisLocal);
                }
                else if (typeof thisLocal === "string") {
                    fixedLocals.push(convertValueType(thisLocal));
                }
                else {
                    throw new Error("Invalid local entry in addCodeEntry()");
                }
            }

            savedEntry.locals = fixedLocals;
        }
        else {
            savedEntry.locals = [];
        }

        const code = options.code;

        if (code instanceof Array) {
            savedEntry.code = convertOpcodeArray(code);
        }
        else {
            throw new Error("Invalid code");
        }

        this._sectionOptions[SECTION_CODE].existingEntries.push(savedEntry);

        this._optionalSectionFlags |= 1 << SECTION_IMPORT;
        this._optionalSectionFlags |= 1 << SECTION_CODE;
    }

    // TODO Validate
    addDataEntry(options) {
        const newVariable = this._createVariable();

        options.variable = newVariable;

        this._sectionOptions[SECTION_DATA].newEntries.push(options);

        this._requiredSectionFlags |= 1 << SECTION_DATA;

        return newVariable;
    }

    // TODO Validate
    editDataEntry(index, options) {
        const savedEntry = {};

        if (typeof index !== "number") {
            throw new Error("Invalid index in editTypeEntry()");
        }

        savedEntry.index = index;

        if (typeof options.data === "string") {
            savedEntry.data = stringToByteArray(options.data);
        }
        else {
            savedEntry.data = options.data;
        }

        this._sectionOptions[SECTION_DATA].existingEntries.push(savedEntry);

        this._optionalSectionFlags |= 1 << SECTION_DATA;
    }

    addCodeElementParser(index, callback) {
        if (typeof callback !== "function") {
            throw new Error("Bad callback in addCodeElementParser()");
        }

        if (index === null) {
            this._globalFunctionCallback = callback;
        }
        else if (typeof index !== "number" && !(index instanceof WailVariable)) {
            throw new Error("Bad id "+index+" in addCodeElementParser()");
        }
        else {
            const callbackObj = {};
            callbackObj.index = index;
            callbackObj.callback = callback;

            this._functionCallbacks.push(callbackObj);
        }

        this._optionalSectionFlags |= 1 << SECTION_IMPORT;
        this._optionalSectionFlags |= 1 << SECTION_CODE;
    }

    // TODO Global callbacks
    addInstructionParser(opcode, callback) {
        if (typeof callback !== "function") {
            throw new Error("Bad callback in addInstructionParser()");
        }

        if (opcode === null) {
            this._globalInstructionCallback = callback;
        }
        else if (isNaN(opcode) && !(opcode instanceof WailVariable)) {
            throw new Error("Bad opcode "+opcode+" in addCodeElementParser()");
        }
        else {
            this._instructionCallbacks[opcode] = callback;
        }

        this._optionalSectionFlags |= 1 << SECTION_CODE;
    }

    addRawSection(id, sectionBytes) {
        const sectionEntry = {};

        if (typeof id !== "number") {
            throw new Error("Bad section index "+index+" in addRawSection()");
        }

        sectionEntry.id = id;
        sectionEntry.bytes = sectionBytes;

        this._newSections.push(sectionEntry);
    }

    _createVariable() {
        const variableId = this.__variables.length;

        const newVariable = new WailVariable(this, variableId);

        this.__variables.push(newVariable);

        return newVariable;
    }

    _getVariable(id) {
        return this.__variables[id];
    }

    _setVariable(id, value) {
        this.__variables[id] = value;
    }

    // Parses an array in order to expand any variables to their proper representation.
    // Throws an exception if the user has not specified a binary representation
    // (Such as passing a WailVariable instead of a TypedWailVariable
    _expandArrayVariables(array) {
        for (let i = 0; i < array.length; i++) {
            const currentValue = array[i];

            // TODO Remove spread operator since it's so slow
            if (currentValue instanceof Array) {
                array.splice(i, 1);

                array.splice(i, 0, ...currentValue);
            }
            else if (currentValue instanceof TypedWailVariable) {
                const thisVariable = currentValue;

                array.splice(i, 1);

                array.splice(i, 0, ...thisVariable.value);
            }
            // TODO Improve
            else if (currentValue instanceof WailVariable) {
                throw new Error("Untyped WailVariable in " +
                                "_expandArrayVariables()");
            }
        }

        return array;
    }

    _readSection() {
        this.commitBytes();

        const id = this.readUint8();

        if (id > MAX_SECTION_ID) {
            throw new Error("Illegal section ID "+id+". Probably parsing incorrectly");
        }

        let payloadLen;

        // Skip over removed sections
        if (this._removeSectionIds.includes(id)) {
            payloadLen = this.readVarUint32();
            this.readBytes(payloadLen);

            this.updateCopyPosition();

            return;
        }

        let parseSection = false;

        if ((this._requiredSectionFlags & (1 << id)) ||
            (this._optionalSectionFlags & (1 << id))) {
            parseSection = true;
        }

        // The DataCount section violates the usual rule that non-custom sections must occur in
        // numeric order. As a result, we must not assume a section is missing just because we have
        // encountered the DataCount section
        if (id != SECTION_DATACOUNT) {
            // At this point we want to check if a required section does not exist
            // If so, we want to add an empty version of that section and add any new
            // elements to it
            for (let missingId = 0; missingId < id; missingId++) {
                const thisFlag = 1 << missingId;

                const thisSectionRequired = this._requiredSectionFlags & thisFlag;

                if (thisSectionRequired && !(thisSectionRequired & this._parsedSections)) {
                    switch (missingId) {
                        case SECTION_TYPE:
                            this._addTypeSection();
                            break;
                        case SECTION_IMPORT:
                            this._addImportSection();
                            break;
                        case SECTION_FUNCTION:
                            this._addFunctionSection();
                            break;
                        case SECTION_GLOBAL:
                            this._addGlobalSection();
                            break;
                        case SECTION_EXPORT:
                            this._addExportSection();
                            break;
                        case SECTION_START:
                            this._addStartSection();
                            break;
                        case SECTION_ELEMENT:
                            this._addElementSection();
                            break;
                        case SECTION_CODE:
                            this._addCodeSection();
                            break;
                        case SECTION_DATA:
                            this._addDataSection();
                            break;
                        default:
                            throw new Error("Attempted to add unhandled section");
                    }

                    this._parsedSections |= thisFlag;

                    this.copyBuffer([id]);
                }
            }
        }

        for (let i = 0; i < this._newSections.length; i++) {
            const thisNewSection = this._newSections[i];

            if (id > thisNewSection.id) {
                const newPayload = thisNewSection.bytes;

                const newPayloadLen = VarUint32ToArray(newPayload.length);

                this.copyBuffer([thisNewSection.id]);
                this.copyBuffer(newPayloadLen);
                this.copyBuffer(newPayload);
            }
        }

        // Skip over the section if the user has not requested we parse it
        if (!parseSection) {
                payloadLen = this.readVarUint32();
                this.readBytes(payloadLen);

                return;
        }

        // If we have passed the IMPORT section (Regardless of whether or not it exists)
        // it is safe to resolve any pending function indices
        if (id > SECTION_IMPORT && this._resolvedTables == false) {
            this._resolveTableIndices();
        }

        // Now we can handle the new section
        switch(id) {
            case SECTION_TYPE:
                this._parseTypeSection();
                break;
            case SECTION_IMPORT:
                this._parseImportSection();
                break;
            case SECTION_FUNCTION:
                this._parseFunctionSection();
                break;
            case SECTION_GLOBAL:
                this._parseGlobalSection();
                break;
            case SECTION_EXPORT:
                this._parseExportSection();
                break;
            case SECTION_START:
                this._parseStartSection();
                break;
            case SECTION_ELEMENT:
                this._parseElementSection();
                break;
            case SECTION_CODE:
                this._parseCodeSection();
                break;
            case SECTION_DATA:
                this._parseDataSection();
                break;
            default:
                throw new Error("Attempted to parse unhandled section");
        }

        this._parsedSections |= 1 << id;
    }

    // This function will resolve any WailVariables referring to indices into the function
    // or global tables. We need to wait until after the IMPORT section has been parsed
    // to do this because we need to know the count of imported functions/globals in
    // order to properly build the associated tables
    _resolveTableIndices() {
        const pendingFuncs = this._sectionOptions[SECTION_FUNCTION].pending;

        for (let i = 0; i < pendingFuncs.length; i++) {
            const oldIndex = pendingFuncs[i].oldIndex;
            const variable = pendingFuncs[i].variable;

            variable.value = this._getAdjustedFunctionIndex(oldIndex);
        }

        // Same logic as above, but with global indexes
        const pendingGlobals = this._sectionOptions[SECTION_GLOBAL].pending;

        for (let i = 0; i < pendingGlobals.length; i++) {
            const oldIndex = pendingGlobals[i].oldIndex;
            const variable = pendingGlobals[i].variable;

            variable.value = this._getAdjustedGlobalIndex(oldIndex);
        }

        this._resolvedTables = true;
    }

    _addTypeSection() {
        const reader = new BufferReader();

        const newEntries = this._sectionOptions[SECTION_TYPE].newEntries;

        const entryCountArray = VarUint32ToArray(newEntries.length);

        reader.copyBuffer(entryCountArray);

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            const form = optionsEntry.form;
            const params = optionsEntry.params;

            let returnType = null;

            if (typeof optionsEntry.returnType !== "undefined") {
                returnType = optionsEntry.returnType;
            }

            if (optionsEntry.variable instanceof WailVariable) {
                optionsEntry.variable.value = oldCount + i;
            }

            reader.copyBuffer(Uint8ToArray(form));
            reader.copyBuffer(VarUint32ToArray(params.length));
            reader.copyBuffer(params);

            if (returnType !== null) {
                reader.copyBuffer(Uint8ToArray(1));
                reader.copyBuffer(Uint8ToArray(returnType));
            }
            else {
                reader.copyBuffer(Uint8ToArray(0));
            }
        }

        const newPayload = reader.write();
        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([SECTION_TYPE]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _parseTypeSection() {
        this.commitBytes();

        const oldPayloadLen = this.readVarUint32();

        const start = this.inPos;
        const oldCount = this.readVarUint32();
        const end = this.inPos;
        const oldCountLength = end - start;

        const oldPayload = this.readBytes(oldPayloadLen - oldCountLength);

        const reader = new BufferReader(oldPayload);

        const newEntries = this._sectionOptions[SECTION_TYPE].newEntries;
        const existingEntries = this._sectionOptions[SECTION_TYPE].existingEntries;

        const newCount = oldCount + newEntries.length;

        reader.copyBuffer(VarUint32ToArray(newCount));

        for (let typeIndex = 0; typeIndex < oldCount; typeIndex++) {
            // TODO Is there any purpose to modifying form?
            const form = reader.readUint8();

            let paramCount = reader.readVarUint32();

            let params = [];

            for (let j = 0; j < paramCount; j++) {
                params.push(reader.readUint8());
            }

            let returnCount = reader.readUint8();

            let returnType = null;

            if (returnCount == 1) {
                returnType = reader.readUint8();
            }
            // Return count can only be 1 or 0
            else if (returnCount != 0) {
                throw new Error("Invalid returnCount");
            }

            for (let i = 0; i < existingEntries.length; i++) {
                const thisEntry = existingEntries[i];

                const thisIndex = thisEntry.index;

                if (typeIndex == thisIndex) {
                    if (typeof thisEntry.params !== "undefined") {
                        params = mod.params;
                    }

                    // TODO This doesn't allow for the possibility of removing return
                    if (typeof thisEntry.returnType !== "undefined") {
                        returnCount = 1;
                        returnType = mod.returnType;
                    }
                }
            }

            reader.copyBuffer(Uint8ToArray(form));
            reader.copyBuffer(VarUint32ToArray(params.length));
            reader.copyBuffer(params);

            if (returnCount) {
                reader.copyBuffer(Uint8ToArray(1));
                reader.copyBuffer(Uint8ToArray(returnType));
            }
            else {
                reader.copyBuffer(Uint8ToArray(0));
            }
        }

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            const form = optionsEntry.form;
            const params = optionsEntry.params;

            let returnType = null;

            if (typeof optionsEntry.returnType !== "undefined") {
                returnType = optionsEntry.returnType;
            }

            if (optionsEntry.variable instanceof WailVariable) {
                optionsEntry.variable.value = oldCount + i;
            }

            reader.copyBuffer(Uint8ToArray(form));
            reader.copyBuffer(VarUint32ToArray(params.length));
            reader.copyBuffer(params);

            if (returnType !== null) {
                reader.copyBuffer(Uint8ToArray(1));
                reader.copyBuffer(Uint8ToArray(returnType));
            }
            else {
                reader.copyBuffer(Uint8ToArray(0));
            }
        }

        const newPayload = reader.write();

        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _addImportSection() {
        const reader = new BufferReader();

        const newEntries = this._sectionOptions[SECTION_IMPORT].newEntries;

        const entryCountArray = VarUint32ToArray(newEntries.length);

        reader.copyBuffer(entryCountArray);

        let importFuncIndex = 0;
        let importGlobalIndex = 0;

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            const moduleStr = stringToByteArray(optionsEntry.moduleStr);
            const moduleLen = VarUint32ToArray(moduleStr.length);

            const fieldStr = stringToByteArray(optionsEntry.fieldStr);
            const fieldLen = VarUint32ToArray(fieldStr.length);

            const kind = [ optionsEntry.kind ];

            let type;

            // TODO addImportEntry() should have validated that "kind" is sane, but we
            // should still do some error checking here.
            if (optionsEntry.kind == KIND_FUNC) {
                if (optionsEntry.type instanceof TypedWailVariable) {
                    type = optionsEntry.type.value;
                }
                else if (optionsEntry.type instanceof WailVariable) {
                    throw new Error("Untyped WailVariable in _addImportSection()");
                }
                else {
                    type = VarUint32ToArray(optionsEntry.type);
                }

                if (optionsEntry.variable instanceof WailVariable) {
                    optionsEntry.variable.value = this._importFuncCount + importFuncIndex++;
                }
            }
            else if (optionsEntry.kind == KIND_GLOBAL) {
                type = [ optionsEntry.type, optionsEntry.mutability ];

                if (optionsEntry.variable instanceof WailVariable) {
                    optionsEntry.variable.value = this._importGlobalCount + importGlobalIndex++;
                }
            }

            reader.copyBuffer(moduleLen);
            reader.copyBuffer(moduleStr);
            reader.copyBuffer(fieldLen);
            reader.copyBuffer(fieldStr);
            reader.copyBuffer(kind);
            reader.copyBuffer(type);
        }

        const newPayload = reader.write();
        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([SECTION_IMPORT]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);

        // If the user is requesting we resolve a function index (using getFunctionIndex())
        // we resolve it here
        const pendingFuncs = this._sectionOptions[SECTION_FUNCTION].pending;

        for (let i = 0; i < pendingFuncs.length; i++) {
            const oldIndex = pendingFuncs[i].oldIndex;
            const variable = pendingFuncs[i].variable;

            variable.value = this._getAdjustedFunctionIndex(oldIndex);
        }

        // Same logic as above, but with global indexes
        const pendingGlobals = this._sectionOptions[SECTION_GLOBAL].pending;

        for (let i = 0; i < pendingGlobals.length; i++) {
            const oldIndex = pendingGlobals[i].oldIndex;
            const variable = pendingGlobals[i].variable;

            variable.value = this._getAdjustedGlobalIndex(oldIndex);
        }
    }

    _parseImportSection() {
        this.commitBytes();

        const oldPayloadLen = this.readVarUint32();

        const start = this.inPos;
        const oldCount = this.readVarUint32();
        const end = this.inPos;
        const oldCountLength = end - start;

        const oldPayload = this.readBytes(oldPayloadLen - oldCountLength);

        const reader = new BufferReader(oldPayload);

        const newEntries = this._sectionOptions[SECTION_IMPORT].newEntries;
        const existingEntries = this._sectionOptions[SECTION_IMPORT].existingEntries;

        // We need to count imported function signatures to accurately
        // get function indexes. Same with imported global variables
        for (let importIndex = 0; importIndex < oldCount; importIndex++) {
            reader.commitBytes();

            let moduleLen = reader.readVarUint32();
            let moduleStr = reader.readBytes(moduleLen);
            let fieldLen = reader.readVarUint32();
            let fieldStr = reader.readBytes(fieldLen);

            for (let i = 0; i < existingEntries.length; i++) {
                const thisEntry = existingEntries[i];

                const thisIndex = thisEntry.index;

                if (importIndex == thisIndex) {
                    if (typeof thisEntry.moduleStr !== "undefined") {
                        moduleStr = thisEntry.moduleStr;
                        moduleLen = thisEntry.moduleStr.length;
                    }

                    if (typeof thisEntry.fieldStr !== "undefined") {
                        fieldStr = thisEntry.fieldStr;
                        fieldLen = thisEntry.fieldStr.length;
                    }
                }
            }

            reader.copyBuffer(VarUint32ToArray(moduleLen));
            reader.copyBuffer(moduleStr);
            reader.copyBuffer(VarUint32ToArray(fieldLen));
            reader.copyBuffer(fieldStr);

            const kind = reader.readUint8();

            if (kind == KIND_FUNC) {
                this._importFuncCount++;
                reader.readVarUint32();
            }
            else if (kind == KIND_TABLE) {
                reader.readUint8();
                const flags = reader.readUint8();
                reader.readVarUint32();
                if (flags) {
                    reader.readVarUint32();
                }
            }
            else if (kind == KIND_MEMORY) {
                const flags = reader.readUint8();
                reader.readVarUint32();
                if (flags) {
                    reader.readVarUint32();
                }
            }
            else if (kind == KIND_GLOBAL) {
                this._importGlobalCount++;
                reader.readUint8();
                reader.readUint8();
            }
            else {
                throw "Invalid type kind: " + kind;
            }
        }

        let newCount = oldCount;

        let importFuncIndex = 0;
        let importGlobalIndex = 0;

        for (let i = 0; i < newEntries.length; i++, newCount++) {
            reader.commitBytes();

            const optionsEntry = newEntries[i];

            const moduleStr = stringToByteArray(optionsEntry.moduleStr);
            const moduleLen = VarUint32ToArray(moduleStr.length);

            const fieldStr = stringToByteArray(optionsEntry.fieldStr);
            const fieldLen = VarUint32ToArray(fieldStr.length);

            const kind = [ optionsEntry.kind ];

            let type;

            // TODO addImportEntry() should have validated that "kind" is sane, but we
            // should still do some error checking here.
            // TODO addImportEntry() should have validated that "kind" is sane, but we
            // should still do some error checking here.
            if (optionsEntry.kind == KIND_FUNC) {
                if (optionsEntry.type instanceof TypedWailVariable) {
                    type = optionsEntry.type.value;
                }
                else if (optionsEntry.type instanceof WailVariable) {
                    throw new Error("Untyped WailVariable in _addImportSection()");
                }
                else {
                    type = VarUint32ToArray(optionsEntry.type);
                }

                if (optionsEntry.variable instanceof WailVariable) {
                    optionsEntry.variable.value = this._importFuncCount + importFuncIndex;
                }

                importFuncIndex++;
            }
            else if (optionsEntry.kind == KIND_GLOBAL) {
                type = [ optionsEntry.type, optionsEntry.mutability ];

                if (optionsEntry.variable instanceof WailVariable) {
                    optionsEntry.variable.value = this._importGlobalCount + importGlobalIndex;
                }

                importGlobalIndex++;
            }

            reader.copyBuffer(moduleLen);
            reader.copyBuffer(moduleStr);
            reader.copyBuffer(fieldLen);
            reader.copyBuffer(fieldStr);
            reader.copyBuffer(kind);
            reader.copyBuffer(type);
        }

        const newCountArray = VarUint32ToArray(newCount);

        const newPayload = reader.write();

        const newPayloadLen = VarUint32ToArray(newCountArray.length + newPayload.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newCountArray);
        this.copyBuffer(newPayload);

        // If we have passed the IMPORT section (Regardless of whether or not it exists)
        // it is safe to resolve any pending function indices
        if (this._resolvedTables == false) {
            this._resolveTableIndices();
        }
    }

    _addFunctionSection() {
        const reader = new BufferReader();

        const newEntries = this._sectionOptions[SECTION_FUNCTION].newEntries;

        const entryCountArray = VarUint32ToArray(newEntries.length);

        reader.copyBuffer(entryCountArray);

        for (let i = 0; i < newEntries.length; i++) {
            let optionsEntry = newEntries[i];

            let type;

            if (optionsEntry.type instanceof TypedWailVariable) {
                type = optionsEntry.type.value;
            }
            else if (optionsEntry.type instanceof WailVariable) {
                throw new Error("Untyped WailVariable in _parseFunctionSection()");
            }
            else {
                type = VarUint32ToArray(optionsEntry.type);
            }

            reader.copyBuffer(type);

            if (optionsEntry.variable instanceof WailVariable) {
                const functionIndex = newCount + this._importFuncCount;

                optionsEntry.variable.value = this._getAdjustedFunctionIndex(functionIndex);
            }
        }

        const newPayload = reader.write();
        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([SECTION_FUNCTION]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _parseFunctionSection() {
        this.commitBytes();

        const newEntries = this._sectionOptions[SECTION_FUNCTION].newEntries;
        const existingEntries = this._sectionOptions[SECTION_FUNCTION].existingEntries;

        const oldPayloadLen = this.readVarUint32();

        const start = this.inPos;
        const oldCount = this.readVarUint32();
        const end = this.inPos;
        const oldCountLength = end - start;

        const oldPayload = this.readBytes(oldPayloadLen - oldCountLength);

        const reader = new BufferReader(oldPayload);

        for (let funcIndex = 0; funcIndex < oldCount; funcIndex++) {
            reader.commitBytes();

            let funcType = reader.readVarUint32();

            for (let i = 0; i < existingEntries.length; i++) {
                const thisEntry = existingEntries[i];

                const thisIndex = thisEntry.index;

                if (funcIndex == thisIndex) {
                    funcType = thisEntry.type;
                }
            }

            reader.copyBuffer(VarUint32ToArray(funcType));
        }

        let newCount = oldCount;

        for (let i = 0; i < newEntries.length; i++, newCount++) {
            let optionsEntry = newEntries[i];

            let type;

            if (optionsEntry.type instanceof TypedWailVariable) {
                type = optionsEntry.type.value;
            }
            else if (optionsEntry.type instanceof WailVariable) {
                throw new Error("Untyped WailVariable in _parseFunctionSection()");
            }
            else {
                type = VarUint32ToArray(optionsEntry.type);
            }

            reader.copyBuffer(type);

            if (optionsEntry.variable instanceof WailVariable) {
                const functionIndex = newCount + this._importFuncCount;

                optionsEntry.variable.value = this._getAdjustedFunctionIndex(functionIndex);
            }
        }

        const newCountArray = VarUint32ToArray(newCount);

        const newPayload = reader.write();

        const newPayloadLen = VarUint32ToArray(newCountArray.length + newPayload.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newCountArray);
        this.copyBuffer(newPayload);
    }

    _addGlobalSection() {
        const reader = new BufferReader();

        const newEntries = this._sectionOptions[SECTION_GLOBAL].newEntries;

        const entryCountArray = VarUint32ToArray(newEntries.length);

        reader.copyBuffer(entryCountArray);

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            reader.copyBuffer(Uint8ToArray(optionsEntry.globalType.contentType));
            reader.copyBuffer(Uint8ToArray(optionsEntry.globalType.mutability));

            const initExpr = this._expandArrayVariables(optionsEntry.initExpr);

            reader.copyBuffer(initExpr);

            if (optionsEntry.variable instanceof WailVariable) {
                optionsEntry.variable.value = this._importGlobalCount + i;
            }
        }

        const newPayload = reader.write();
        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([SECTION_GLOBAL]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _parseGlobalSection() {
        this.commitBytes();

        const oldPayloadLen = this.readVarUint32();

        const start = this.inPos;
        const oldCount = this.readVarUint32();
        const end = this.inPos;
        const oldCountLength = end - start;

        const oldPayload = this.readBytes(oldPayloadLen - oldCountLength);

        const reader = new BufferReader(oldPayload);

        const newEntries = this._sectionOptions[SECTION_GLOBAL].newEntries;
        const existingEntries = this._sectionOptions[SECTION_GLOBAL].existingEntries;

        const newCount = oldCount + newEntries.length;

        reader.copyBuffer(VarUint32ToArray(newCount));

        for (let globalIndex = 0; globalIndex < oldCount; globalIndex++) {
            let newContentType;
            let newMutability;

            for (let i = 0; i < existingEntries.length; i++) {
                const thisEntry = existingEntries[i];

                let thisIndex = thisEntry.index;

                if (thisIndex instanceof WailVariable) {
                    thisIndex = thisIndex.value;
                }

                if (globalIndex == thisIndex) {
                    newContentType = thisEntry.globalType.contentType;
                    newMutability = thisEntry.globalType.mutability;
                }
            }

            let contentType = reader.readUint8();

            if (typeof newContentType !== "undefined") {
                reader.copyBuffer([newContentType]);
            }

            reader.commitBytes();

            let mutability = reader.readUint8();

            if (typeof newMutability !== "undefined") {
                reader.copyBuffer([newMutability]);
            }

            let current;

            do {
                current = this._readInstruction(reader);
            } while (current[0] != OP_END);

            reader.commitBytes();
        }

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            reader.copyBuffer([optionsEntry.globalType.contentType]);
            reader.copyBuffer([optionsEntry.globalType.mutability]);
            reader.copyBuffer(this._expandArrayVariables(optionsEntry.initExpr));

            if (optionsEntry.variable instanceof WailVariable) {
                optionsEntry.variable.value = this._importGlobalCount + oldCount + i;
            }
        }

        const newPayload = reader.write();

        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _addExportSection() {
        const reader = new BufferReader();

        const newEntries = this._sectionOptions[SECTION_EXPORT].newEntries;

        const entryCountArray = VarUint32ToArray(newEntries.length);

        reader.copyBuffer(entryCountArray);

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            const fieldStr = stringToByteArray(optionsEntry.fieldStr);
            const fieldLen = VarUint32ToArray(fieldStr.length);
            const kind = Uint8ToArray(optionsEntry.kind);

            let index;

            if (optionsEntry.index instanceof TypedWailVariable) {
                index = optionsEntry.index.value;
            }
            else if (optionsEntry.index instanceof WailVariable) {
                throw new Error("Untyped WailVariable in _parseExportSection()");
            }
            else {
                index = VarUint32ToArray(optionsEntry.index);
            }

            reader.copyBuffer(fieldLen);
            reader.copyBuffer(fieldStr);
            reader.copyBuffer(kind);
            reader.copyBuffer(index);
        }

        const newPayload = reader.write();
        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([SECTION_EXPORT]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _parseExportSection() {
        this.commitBytes();

        const oldPayloadLen = this.readVarUint32();

        const oldPayload = this.readBytes(oldPayloadLen);

        const reader = new BufferReader(oldPayload);

        const oldCount = reader.readVarUint32();

        const newEntries = this._sectionOptions[SECTION_EXPORT].newEntries;
        const existingEntries = this._sectionOptions[SECTION_EXPORT].existingEntries;

        const newCount = oldCount + newEntries.length;

        reader.copyBuffer(VarUint32ToArray(newCount));

        for (let exportIndex = 0; exportIndex < oldCount; exportIndex++) {
            reader.commitBytes();

            let fieldLen = reader.readVarUint32();
            let fieldStr = reader.readBytes(fieldLen);

            let kind = reader.readUint8();

            let oldIndex = reader.readVarUint32();

            for (let i = 0; i < existingEntries.length; i++) {
                const thisEntry = existingEntries[i];

                const thisIndex = thisEntry.index;

                if (exportIndex == thisIndex) {
                    if (typeof thisEntry.fieldStr !== "undefined") {
                        fieldStr = thisEntry.fieldStr;
                        fieldLen = thisEntry.fieldStr.length;
                    }

                    if (typeof thisEntry.kind !== "undefined") {
                        kind = thisEntry.kind;
                    }

                    if (typeof thisEntry.funcIndex !== "undefined") {
                        oldIndex = thisEntry.funcIndex;
                    }
                }
            }

            let newIndex = oldIndex;

            if (oldIndex instanceof WailVariable) {
                newIndex = oldIndex.value;
            }
            else {
                // Fix up export table based on any additions to the import table
                if (kind == KIND_FUNC) {
                    newIndex = this._getAdjustedFunctionIndex(oldIndex);
                }
                else if (kind == KIND_GLOBAL) {
                    newIndex = this._getAdjustedGlobalIndex(oldIndex);
                }
            }

            reader.copyBuffer(VarUint32ToArray(fieldLen));
            reader.copyBuffer(fieldStr);
            reader.copyBuffer([kind]);
            reader.copyBuffer(VarUint32ToArray(newIndex));
        }

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            const fieldStr = stringToByteArray(optionsEntry.fieldStr);
            const fieldLen = VarUint32ToArray(fieldStr.length);
            const kind = Uint8ToArray(optionsEntry.kind);

            let index;

            if (optionsEntry.index instanceof TypedWailVariable) {
                index = optionsEntry.index.value;
            }
            else if (optionsEntry.index instanceof WailVariable) {
                throw new Error("Untyped WailVariable in _parseExportSection()");
            }
            else {
                index = VarUint32ToArray(optionsEntry.index);
            }

            reader.copyBuffer(fieldLen);
            reader.copyBuffer(fieldStr);
            reader.copyBuffer(kind);
            reader.copyBuffer(index);
        }

        const newPayload = reader.write();

        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _parseStartSection() {
        this.commitBytes();

        // We effectively ignore elementCount since (AFAIK) there is no circumstance
        // where there is more than one start entry in a binary
        const payloadSize = this.readVarUint32();
        const oldStart = this.readVarUint32();

        const existingEntries = this._sectionOptions[SECTION_START].existingEntries;

        let newStart;

        if (existingEntries.length > 0) {
            // As far as I can tell there's no purpose to calling editStartEntry multiple
            // times, but this is consistent with how other edit functions work
            for (let i = 0; i < existingEntries.length; i++) {
                const thisEntry = existingEntries[i];

                if (typeof thisEntry === "number") {
                    newStart = thisEntry;
                }
                else if (thisEntry instanceof WailVariable) {
                    newStart = thisEntry.value;
                }
                else {
                    throw new Error("Invalid function index in _parseStartSection()");
                }
            }
        }
        else {
            newStart = this._getAdjustedFunctionIndex(oldStart);
        }

        const newStartArray = VarUint32ToArray(newStart);
        const newPayloadLen = VarUint32ToArray(newStartArray.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newStartArray);
    }

    _addElementSection() {
        const reader = new BufferReader();

        const newEntries = this._sectionOptions[SECTION_ELEMENT].newEntries;

        const entryCountArray = VarUint32ToArray(newEntries.length);

        reader.copyBuffer(entryCountArray);

        for (let i = 0; i < newEntries.length; i++, newCount++) {
            const optionsEntry = newEntries[i];

            const index = optionsEntry.index;

            if (index != 0) {
                throw new Error("Unsupported element index "+index);
            }

            const offset = optionsEntry.offset;

            const elems = this._expandArrayVariables(optionsEntry.elems);

            const elemCount = elems.length;

            reader.copyBuffer(VarUint32ToArray(index));
            reader.copyBuffer(offset);
            reader.copyBuffer(VarUint32ToArray(elemCount));
            reader.copyBuffer(elems);
        }

        const newPayload = reader.write();
        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([SECTION_ELEMENT]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _parseElementSection() {
        this.commitBytes();

        const oldPayloadLen = this.readVarUint32();

        const start = this.inPos;
        const oldCount = this.readVarUint32();
        const end = this.inPos;
        const oldCountLength = end - start;

        const oldPayload = this.readBytes(oldPayloadLen - oldCountLength);

        const reader = new BufferReader(oldPayload);

        const newEntries = this._sectionOptions[SECTION_ELEMENT].newEntries;
        const existingEntries = this._sectionOptions[SECTION_ELEMENT].existingEntries;

        for (let elemIndex = 0; elemIndex < oldCount; elemIndex++) {
            let memIndex = reader.readVarUint32();

            let current;

            // At time of writing, init expressions can only be simple expressions.
            // Therefore, it is safe to just parse until we find OP_END. However,
            // this may become unreliable in the future
            do {
                current = this._readInstruction(reader);
            } while (current[0] != OP_END);

            reader.commitBytes();

            let numElements = reader.readVarUint32();

            let elements = [];

            for (let i = 0; i < numElements; i++) {
                const oldIndex = reader.readVarUint32();

                const newIndex = this._getAdjustedFunctionIndex(oldIndex);

                elements.push(newIndex);
            }

            for (let i = 0; i < existingEntries.length; i++) {
                const thisEntry = existingEntries[i];

                const thisIndex = thisEntry.index;

                if (elemIndex == thisIndex) {
                    // TODO Support WailVariables
                    if (typeof thisEntry.elems !== "undefined") {
                        elements = thisEntry.elems;
                        numElements = elements.length;
                    }
                }
            }

            reader.copyBuffer(VarUint32ToArray(numElements));

            for (let i = 0; i < numElements; i++) {
                reader.copyBuffer(VarUint32ToArray(elements[i]));
            }
        }

        let newCount = oldCount;

        for (let i = 0; i < newEntries.length; i++, newCount++) {
            const optionsEntry = newEntries[i];

            const index = optionsEntry.index;

            if (index != 0) {
                throw new Error("Unsupported element index "+index);
            }

            const offset = optionsEntry.offset;

            const elems = this._expandArrayVariables(optionsEntry.elems);

            const elemCount = elems.length;

            reader.copyBuffer(VarUint32ToArray(index));
            reader.copyBuffer(offset);
            reader.copyBuffer(VarUint32ToArray(elemCount));
            reader.copyBuffer(elems);
        }

        const newPayload = reader.write();

        const newCountArray = VarUint32ToArray(newCount);

        const newPayloadLen = VarUint32ToArray(newCountArray.length + newPayload.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newCountArray);
        this.copyBuffer(newPayload);
    }

    _addCodeSection() {
        const reader = new BufferReader();

        const newEntries = this._sectionOptions[SECTION_CODE].newEntries;

        const entryCountArray = VarUint32ToArray(newEntries.length);

        reader.copyBuffer(entryCountArray);

        //

        const newPayload = reader.write();
        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([SECTION_CODE]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _parseCodeSection() {
        this.commitBytes();

        const oldPayloadLen = this.readVarUint32();

        const oldPayload = this.readBytes(oldPayloadLen);

        const reader = new BufferReader(oldPayload);

        const oldCount = reader.readVarUint32();

        const newEntries = this._sectionOptions[SECTION_CODE].newEntries;

        const newCount = oldCount + newEntries.length;

        reader.copyBuffer(VarUint32ToArray(newCount));

        for (let i = 0; i < oldCount; i++) {
            const funcIndex = this._getAdjustedFunctionIndex(this._importFuncCount + i);

            this._readFunction(reader, funcIndex);
        }

        for (let currentIndex = oldCount; currentIndex < newCount; currentIndex++) {
            const realIndex = this._funcSectionIndexToFuncTableIndex(currentIndex);

            const bodyReader = new BufferReader();

            let foundEntry = false;
            let optionsEntry;

            for (let i = 0; i < newEntries.length; i++) {
                optionsEntry = newEntries[i];

                let optionsIndex = optionsEntry.index;

                if (optionsIndex instanceof WailVariable) {
                    optionsIndex = optionsIndex.value;
                }

                if (optionsIndex == realIndex) {
                    foundEntry = true;
                    break;
                }
            }

            if (!foundEntry) {
                throw new Error("No CODE entry found for index "+realIndex);
            }

            let locals = optionsEntry.locals;
            let code = optionsEntry.code;

            bodyReader.copyBuffer(VarUint32ToArray(locals.length));

            for (let i = 0; i < locals.length; i++) {
                const thisLocal = locals[i];

                bodyReader.copyBuffer(VarUint32ToArray(1));
                bodyReader.copyBuffer(Uint8ToArray(thisLocal));
            }

            code = this._expandArrayVariables(code);

            bodyReader.copyBuffer(code);

            const bodyPayload = bodyReader.write();

            const bodySize = VarUint32ToArray(bodyPayload.length);

            reader.copyBuffer(bodySize);
            reader.copyBuffer(bodyPayload);
        }

        const newPayload = reader.write();

        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _addDataSection() {
        const reader = new BufferReader();

        const newEntries = this._sectionOptions[SECTION_DATA].newEntries;

        const entryCountArray = VarUint32ToArray(newEntries.length);

        reader.copyBuffer(entryCountArray);

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            let index;

            if (typeof optionsEntry.index !== "undefined") {
                index = VarUint32ToArray(optionsEntry.index);
            }
            else {
                index = VarUint32ToArray(0);
            }

            const offset = optionsEntry.offset;

            // Initialization expressions must always end with an "end" instruction
            if (offset[offset.length - 1] != OP_END) {
                offset.push(OP_END);
            }

            const data = optionsEntry.data;
            const size = VarUint32ToArray(data.length);

            reader.copyBuffer(index);
            reader.copyBuffer(offset);
            reader.copyBuffer(size);
            reader.copyBuffer(data);
        }

        const newPayload = reader.write();
        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([SECTION_DATA]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    _parseDataSection() {
        this.commitBytes();

        const oldPayloadLen = this.readVarUint32();

        // This is gross but VarUInt32s can be variable lengths (obviously).
        // So this is an easy way to account for any possible length.
        const start = this.inPos;
        const oldCount = this.readVarUint32();
        const end = this.inPos;
        const oldCountLength = end - start;

        const oldPayload = this.readBytes(oldPayloadLen - oldCountLength);

        const reader = new BufferReader(oldPayload);

        const newEntries = this._sectionOptions[SECTION_DATA].newEntries;
        const existingEntries = this._sectionOptions[SECTION_DATA].existingEntries;

        const newCount = oldCount + newEntries.length;

        reader.copyBuffer(VarUint32ToArray(newCount));

        for (let dataIndex = 0; dataIndex < oldCount; dataIndex++) {
            let current;

            do {
                current = this._readInstruction(reader);
            } while (current[0] !== OP_END);

            reader.commitBytes();

            let size = reader.readVarUint32();

            let data = reader.readBytes(size);

            for (let i = 0; i < existingEntries.length; i++) {
                const thisEntry = existingEntries[i];

                const thisIndex = thisEntry.index;

                if (dataIndex == thisIndex) {
                    if (typeof thisEntry.data !== "undefined") {
                        data = thisEntry.data;
                        size = data.length;
                    }
                }
            }

            reader.copyBuffer(VarUint32ToArray(size));
            reader.copyBuffer(data);
        }

        for (let i = 0; i < newEntries.length; i++) {
            const optionsEntry = newEntries[i];

            let index;

            if (typeof optionsEntry.index !== "undefined") {
                index = VarUint32ToArray(optionsEntry.index);
            }
            else {
                index = VarUint32ToArray(0);
            }

            const offset = optionsEntry.offset;

            // Initialization expressions must always end with an "end" instruction
            if (offset[offset.length - 1] != OP_END) {
                offset.push(OP_END);
            }

            const data = optionsEntry.data;
            const size = VarUint32ToArray(data.length);

            reader.copyBuffer(index);
            reader.copyBuffer(offset);
            reader.copyBuffer(size);
            reader.copyBuffer(data);
        }

        const newPayload = reader.write();

        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
    }

    // TODO Modify locals/params
    _readFunction(reader, funcIndex) {
        const existingEntries = this._sectionOptions[SECTION_CODE].existingEntries;

        const bodySize = reader.readVarUint32();

        const bodyPayload = reader.readBytes(bodySize);

        const headerReader = new BufferReader(bodyPayload);

        const localCount = headerReader.readVarUint32();

        for (let i = 0; i < localCount; i++) {
            headerReader.readVarUint32();
            headerReader.readUint8();
        }

        headerReader.commitBytes();

        const bodyReader = new BufferReader(bodyPayload.subarray(headerReader.inPos));

        while (bodyReader.inPos < bodyReader.inBuffer.length) {
            this._readInstruction(bodyReader);
            bodyReader.commitBytes();
        }

        let newHeader = headerReader.write();
        let newBody = bodyReader.write();

        // TODO Should probably prioritize non-global callbacks over global callbacks
        if (typeof this._globalFunctionCallback === "function") {
            const parameters = {};

            parameters.bytes = bodyReader.write();
            parameters.index = funcIndex;

            const callbackResult = this._globalFunctionCallback(parameters);

            if (callbackResult !== false) {
                newBody = callbackResult;
            }
        }
        else {
            // TODO Callback should send and receive local info to/from callback
            for (let i = 0; i < this._functionCallbacks.length; i++) {
                const thisCallback = this._functionCallbacks[i];

                let thisIndex = thisCallback.index;

                if (thisIndex instanceof WailVariable) {
                    thisIndex = thisIndex.value;
                }

                if (thisIndex === funcIndex) {
                    const parameters = {};

                    parameters.bytes = bodyReader.write();
                    parameters.index = funcIndex;

                    // TODO Handle locals as well
                    const callbackResult = thisCallback.callback(parameters);

                    if (callbackResult !== false) {
                        newBody = callbackResult;
                    }
                }
            }
        }

        for (let i = 0; i < existingEntries.length; i++) {
            const thisEntry = existingEntries[i];

            let thisIndex = thisEntry.index;

            if (thisIndex instanceof WailVariable) {
                thisIndex = thisIndex.value;
            }

            if (funcIndex == thisIndex) {
                const newBodyReader = new BufferReader();

                const locals = thisEntry.locals;

                newBodyReader.copyBuffer(VarUint32ToArray(locals.length));

                for (let i = 0; i < locals.length; i++) {
                    const thisLocal = locals[i];

                    newBodyReader.copyBuffer(VarUint32ToArray(1));
                    newBodyReader.copyBuffer(Uint8ToArray(thisLocal));
                }

                const code = this._expandArrayVariables(thisEntry.code);

                newBodyReader.copyBuffer(code);

                newBody = newBodyReader.write();
            }
        }

        let newPayloadLen = VarUint32ToArray(newHeader.length + newBody.length);

        reader.copyBuffer(newPayloadLen);
        reader.copyBuffer(newHeader);
        reader.copyBuffer(newBody);
    }

    _readInstruction(reader) {
        reader.commitBytes();
        reader.setAnchor();

        const opcode = reader.readUint8();

        let oldTarget;
        let newTarget;
        let arg;

        switch (opcode) {
            case OP_UNREACHABLE:
            case OP_NOP:
            case OP_ELSE:
            case OP_END:
            case OP_RETURN:
            case OP_DROP:
            case OP_SELECT:
            case OP_I32_EQZ:
            case OP_I32_EQ:
            case OP_I32_NE:
            case OP_I32_LT_S:
            case OP_I32_LT_U:
            case OP_I32_GT_S:
            case OP_I32_GT_U:
            case OP_I32_LE_S:
            case OP_I32_LE_U:
            case OP_I32_GE_S:
            case OP_I32_GE_U:
            case OP_I64_EQZ:
            case OP_I64_EQ:
            case OP_I64_NE:
            case OP_I64_LT_S:
            case OP_I64_LT_U:
            case OP_I64_GT_S:
            case OP_I64_GT_U:
            case OP_I64_LE_S:
            case OP_I64_LE_U:
            case OP_I64_GE_S:
            case OP_I64_GE_U:
            case OP_F32_EQ:
            case OP_F32_NE:
            case OP_F32_LT:
            case OP_F32_GT:
            case OP_F32_LE:
            case OP_F32_GE:
            case OP_F64_EQ:
            case OP_F64_NE:
            case OP_F64_LT:
            case OP_F64_GT:
            case OP_F64_LE:
            case OP_F64_GE:
            case OP_I32_CLZ:
            case OP_I32_CTZ:
            case OP_I32_POPCNT:
            case OP_I32_ADD:
            case OP_I32_SUB:
            case OP_I32_MUL:
            case OP_I32_DIV_S:
            case OP_I32_DIV_U:
            case OP_I32_REM_S:
            case OP_I32_REM_U:
            case OP_I32_AND:
            case OP_I32_OR:
            case OP_I32_XOR:
            case OP_I32_SHL:
            case OP_I32_SHR_S:
            case OP_I32_SHR_U:
            case OP_I32_ROTL:
            case OP_I32_ROTR:
            case OP_I64_CLZ:
            case OP_I64_CTZ:
            case OP_I64_POPCNT:
            case OP_I64_ADD:
            case OP_I64_SUB:
            case OP_I64_MUL:
            case OP_I64_DIV_S:
            case OP_I64_DIV_U:
            case OP_I64_REM_S:
            case OP_I64_REM_U:
            case OP_I64_AND:
            case OP_I64_OR:
            case OP_I64_XOR:
            case OP_I64_SHL:
            case OP_I64_SHR_S:
            case OP_I64_SHR_U:
            case OP_I64_ROTL:
            case OP_I64_ROTR:
            case OP_F32_ABS:
            case OP_F32_NEG:
            case OP_F32_CEIL:
            case OP_F32_FLOOR:
            case OP_F32_TRUNC:
            case OP_F32_NEAREST:
            case OP_F32_SQRT:
            case OP_F32_ADD:
            case OP_F32_SUB:
            case OP_F32_MUL:
            case OP_F32_DIV:
            case OP_F32_MIN:
            case OP_F32_MAX:
            case OP_F32_COPYSIGN:
            case OP_F64_ABS:
            case OP_F64_NEG:
            case OP_F64_CEIL:
            case OP_F64_FLOOR:
            case OP_F64_TRUNC:
            case OP_F64_NEAREST:
            case OP_F64_SQRT:
            case OP_F64_ADD:
            case OP_F64_SUB:
            case OP_F64_MUL:
            case OP_F64_DIV:
            case OP_F64_MIN:
            case OP_F64_MAX:
            case OP_F64_COPYSIGN:
            case OP_I32_WRAP_I64:
            case OP_I32_TRUNC_S_F32:
            case OP_I32_TRUNC_U_F32:
            case OP_I32_TRUNC_S_F64:
            case OP_I32_TRUNC_U_F64:
            case OP_I64_EXTEND_S_I32:
            case OP_I64_EXTEND_U_I32:
            case OP_I64_TRUNC_S_F32:
            case OP_I64_TRUNC_U_F32:
            case OP_I64_TRUNC_S_F64:
            case OP_I64_TRUNC_U_F64:
            case OP_F32_CONVERT_S_I32:
            case OP_F32_CONVERT_U_I32:
            case OP_F32_CONVERT_S_I64:
            case OP_F32_CONVERT_U_I64:
            case OP_F32_DEMOTE_F64:
            case OP_F64_CONVERT_S_I32:
            case OP_F64_CONVERT_U_I32:
            case OP_F64_CONVERT_S_I64:
            case OP_F64_CONVERT_U_I64:
            case OP_F64_PROMOTE_F32:
            case OP_I32_REINTERPRET_F32:
            case OP_I64_REINTERPRET_F64:
            case OP_F32_REINTERPRET_I32:
            case OP_F64_REINTERPRET_I64:
                break;
            case OP_BLOCK:
            case OP_LOOP:
            case OP_IF:
            case OP_MEMORY_SIZE:
            case OP_MEMORY_GROW:
                reader.readUint8();
                break;
            case OP_BR:
            case OP_BR_IF:
            case OP_GET_LOCAL:
            case OP_SET_LOCAL:
            case OP_TEE_LOCAL:
            case OP_I32_CONST:
            case OP_I64_CONST:
                reader.readVarUint32();
                break;
            case OP_GET_GLOBAL:
            case OP_SET_GLOBAL:
                reader.commitBytes();

                oldTarget = reader.readVarUint32();

                newTarget = this._getAdjustedGlobalIndex(oldTarget);

                reader.copyBuffer(VarUint32ToArray(newTarget));
                break;
            case OP_F32_CONST:
                reader.readBytes(4);
                break;
            case OP_F64_CONST:
                reader.readBytes(8);
                break;
            case OP_I32_LOAD:
            case OP_I64_LOAD:
            case OP_F32_LOAD:
            case OP_F64_LOAD:
            case OP_I32_LOAD8_S:
            case OP_I32_LOAD8_U:
            case OP_I32_LOAD16_S:
            case OP_I32_LOAD16_U:
            case OP_I64_LOAD8_S:
            case OP_I64_LOAD8_U:
            case OP_I64_LOAD16_S:
            case OP_I64_LOAD16_U:
            case OP_I64_LOAD32_S:
            case OP_I64_LOAD32_U:
            case OP_I32_STORE:
            case OP_I64_STORE:
            case OP_F32_STORE:
            case OP_F64_STORE:
            case OP_I32_STORE8:
            case OP_I32_STORE16:
            case OP_I64_STORE8:
            case OP_I64_STORE16:
            case OP_I64_STORE32:
                reader.readVarUint32();
                reader.readVarUint32();
                break;
            case OP_BR_TABLE:
                const count = reader.readVarUint32();

                for (let i = 0; i < count; i++) {
                    reader.readVarUint32();
                }

                reader.readVarUint32();
                break;
            case OP_CALL:
                reader.commitBytes();

                oldTarget = reader.readVarUint32();

                newTarget = this._getAdjustedFunctionIndex(oldTarget);

                reader.copyBuffer(VarUint32ToArray(newTarget));
                break;
            case OP_CALL_INDIRECT:
                reader.readVarUint32();
                reader.readUint8();
                break;
            case OP_I32_EXTEND8_S:
            case OP_I32_EXTEND16_S:
            case OP_I64_EXTEND8_S:
            case OP_I64_EXTEND16_S:
            case OP_I64_EXTEND32_S:
                break;
            case OP_BULK_MEMORY:
                arg = reader.readUint8();

                switch (arg) {
                    case ARG_MEMORY_INIT:
                    case ARG_TABLE_INIT:
                        reader.readVarUint32();
                        reader.readUint8();
                        break;
                    case ARG_DATA_DROP:
                    case ARG_ELEM_DROP:
                        reader.readVarUint32();
                        break;
                    case ARG_MEMORY_COPY:
                    case ARG_TABLE_COPY:
                        reader.readUint8();
                        reader.readUint8();
                        break;
                    case ARG_MEMORY_FILL:
                        reader.readUint8();
                        break;
                }
                break;
            case OP_ATOMIC:
                arg = reader.readUint8();

                if (arg > ARG_I64_ATOMIC_RMW_CMPXCHG_32U || (arg > 0x2 && arg < 0x10)) {
                    throw new Error("Unknown argument '" + arg + "' for OP_ATOMIC. Probably parsing incorrectly");
                }

                //reader.readUint8();
                reader.readVarUint32();
                reader.readVarUint32();

                break;
            default:
                throw new Error("Unknown opcode '" + opcode + "'. Probably parsing incorrectly");
        }

        reader.commitBytes();

        if (typeof this._instructionCallbacks[opcode] !== "undefined") {
            const instrBytes = reader.readFromAnchor();

            const callbackResults = this._instructionCallbacks[opcode](instrBytes);

            reader.writeAtAnchor(callbackResults);
        }
        else if (typeof this._globalInstructionCallback === "function") {
            const instrBytes = reader.readFromAnchor();

            const callbackResults = this._globalInstructionCallback[opcode](instrBytes);

            reader.writeAtAnchor(callbackResults);
        }

        const fullInstruction = reader.readFromAnchor();

        return fullInstruction;
    }

    // Converts an index into the FUNCTION section into an adjusted index into the program's
    // function table
    _funcSectionIndexToFuncTableIndex(index) {
        return index + this._importFuncCount + this._importFuncNewCount;
    }

    // Helper function used to "fix up" an index into the function table when the table
    // may have been modified
    _getAdjustedFunctionIndex(index) {
        if (index >= this._importFuncCount) {
            return index + this._importFuncNewCount;
        }

        return index;
    }

    // Helper function used to "fix up" an index into the global table when the table
    // may have been modified
    _getAdjustedGlobalIndex(index) {
        if (index >= this._importGlobalCount) {
            return index + this._importGlobalNewCount;
        }

        return index;
    }
}
