// sample aws mocking behavior
// there are some libraries available that can be used like aws-sdk-mock
let lastPutItemParam;

const awsSdkMock = {
  DynamoDB: class {
    putItem(params, cb) {
      lastPutItemParam = params;
      cb(null, params);
    }
  }
};
jest.mock("aws-sdk", () => awsSdkMock);

const handler = require("../index").handler;

describe("addTodo", () => {
  test("throw error when no name is given", () => {
    const cb = jest.fn();
    const ctx = jest.fn();
    const event = {
      body: JSON.stringify({})
    };

    handler(event, ctx, cb);
    expect(cb).toBeCalledWith("Missing or empty parameter `name`");
  });

  test("returns valid response when name is given", done => {
    const ctx = jest.fn();
    const event = {
      body: JSON.stringify({
        name: "chocolate"
      })
    };

    handler(event, ctx, (err, data) => {
      expect(data.statusCode).toBe(200);
      done();
    });
  });

  test("store unfinished todo", done => {
    const ctx = jest.fn();
    const event = {
      body: JSON.stringify({
        name: "chocolate"
      })
    };

    handler(event, ctx, (err, data) => {
      expect(lastPutItemParam.Item.done.BOOL).toBe(false);
      done();
    });
  });

  test("store todo name", done => {
    const ctx = jest.fn();
    const event = {
      body: JSON.stringify({
        name: "chocolate"
      })
    };

    handler(event, ctx, (err, data) => {
      expect(lastPutItemParam.Item.name.S).toBe("chocolate");
      done();
    });
  });

  test("store generated id", done => {
    const ctx = jest.fn();
    const event = {
      body: JSON.stringify({
        name: "chocolate"
      })
    };

    handler(event, ctx, (err, data) => {
      expect(lastPutItemParam.Item.id.S.length > 0).toBeTruthy();
      done();
    });
  });

  test("generated is unique", done => {
    const ctx = jest.fn();
    const event = {
      body: JSON.stringify({
        name: "chocolate"
      })
    };

    const ids = [];
    handler(event, ctx, (err, data) => {
      ids.push(lastPutItemParam.Item.id.S);
    });

    handler(event, ctx, (err, data) => {
      ids.push(lastPutItemParam.Item.id.S);
      expect(ids[0]).not.toEqual(ids[1]);
      done();
    });
  });
});
