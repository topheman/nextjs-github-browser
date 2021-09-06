import {
  serializeMocksMap,
  parseMocksMap,
  getMockFileName,
  fromMocksMap,
} from "./common";

const makeMockMap = () => {
  return new Map([
    [
      getMockFileName(
        "MyQueryName",
        {
          foo: "toto",
          bar: "tata",
        },
        { isRequest: true }
      ),
      { someRequest: "foo/toto" },
    ],
    [
      getMockFileName(
        "MyQueryName",
        {
          foo: "toto",
          bar: "tata",
        },
        { isRequest: false }
      ),
      { someResponse: "bar/tata" },
    ],
    [
      getMockFileName(
        "MyQueryName",
        {
          foo: "titi",
          bar: "tutu",
        },
        { isRequest: true }
      ),
      { someRequest: "foo/titi" },
    ],
    [
      getMockFileName(
        "MyQueryName",
        {
          foo: "titi",
          bar: "tutu",
        },
        { isRequest: false }
      ),
      { someResponse: "bar/tutu" },
    ],
    [
      getMockFileName(
        "MyQueryName",
        {
          foo: "toto",
          bar: "tete",
        },
        { isRequest: true }
      ),
      { someRequest: "foo/toto" },
    ],
    [
      getMockFileName(
        "MyQueryName",
        {
          foo: "toto",
          bar: "tete",
        },
        { isRequest: false }
      ),
      { someResponse: "bar/tete" },
    ],
  ]);
};

describe("libs/mocks/common", () => {
  it("check map", () => {
    expect(Object.fromEntries(makeMockMap().entries() || [])).toStrictEqual({
      "MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_request.json": {
        someRequest: "foo/toto",
      },
      "MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_response.json": {
        someResponse: "bar/tata",
      },
      "MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_request.json": {
        someRequest: "foo/titi",
      },
      "MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_response.json": {
        someResponse: "bar/tutu",
      },
      "MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_request.json": {
        someRequest: "foo/toto",
      },
      "MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_response.json": {
        someResponse: "bar/tete",
      },
    });
  });
  it("serializeMocksMap should return a serialize version", () => {
    const result = serializeMocksMap(makeMockMap());
    expect(result).toBe(
      '[["MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_request.json",{"someRequest":"foo/toto"}],["MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_response.json",{"someResponse":"bar/tata"}],["MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_request.json",{"someRequest":"foo/titi"}],["MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_response.json",{"someResponse":"bar/tutu"}],["MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_request.json",{"someRequest":"foo/toto"}],["MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_response.json",{"someResponse":"bar/tete"}]]'
    );
  });
  it("parseMocksMap should return a map from a serialized string", () => {
    const result = parseMocksMap(
      '[["MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_request.json",{"someRequest":"foo/toto"}],["MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_response.json",{"someResponse":"bar/tata"}],["MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_request.json",{"someRequest":"foo/titi"}],["MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_response.json",{"someResponse":"bar/tutu"}],["MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_request.json",{"someRequest":"foo/toto"}],["MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_response.json",{"someResponse":"bar/tete"}]]'
    );
    expect(result).toBeInstanceOf(Map);
    expect(result?.size).toBe(6);
    expect(Object.fromEntries(result.entries())).toStrictEqual({
      "MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_request.json": {
        someRequest: "foo/toto",
      },
      "MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_response.json": {
        someResponse: "bar/tata",
      },
      "MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_request.json": {
        someRequest: "foo/titi",
      },
      "MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_response.json": {
        someResponse: "bar/tutu",
      },
      "MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_request.json": {
        someRequest: "foo/toto",
      },
      "MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_response.json": {
        someResponse: "bar/tete",
      },
    });
  });
  it("fromMocksMap should let you retrieve a body by passing the same operationName/variables as in graphql", () => {
    const result = fromMocksMap(makeMockMap());
    expect(
      result.get("MyQueryName", {
        foo: "titi",
        bar: "tutu",
      })
    ).toStrictEqual({ someResponse: "bar/tutu" });
  });
});
