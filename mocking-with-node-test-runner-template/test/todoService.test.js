import { describe, it, beforeEach, before, after } from "node:test";
import assert from "node:assert";
import crypto from "node:crypto";
import TodoService from "../src/todoService.js";
import Todo from "../src/todo.js";

describe("todoService test Suite", () => {
  describe("#list", () => {
    let _todoService;
    let _dependencies;
    const mockDatabase = [
      {
        text: "I must plan my trip to Europe",
        when: new Date("2021-03 - 22T00:00:00.000Z"),
        status: "late",
        id: "aaf5de1d-0878-4022-8ab0-fbe57c45e78e",
      },
    ];
    beforeEach((context) => {
      _dependencies = {
        todoRepository: {
          list: context.mock.fn(async () => mockDatabase),
        },
      };
      _todoService = new TodoService(_dependencies);
    });
    it("should return a list of items with uppercase text", async () => {
      const expected = mockDatabase.map(({ text, ...result }) => ({
        text: text.toUpperCase(),
        ...result,
      }));

      const result = await _todoService.list();
      assert.deepStrictEqual(result, expected);

      const fnMock = _dependencies.todoRepository.list.mock;
      assert.strictEqual(fnMock.callCount(), 1);
    });
  });

  describe("#create", () => {
    let _todoService;
    let _dependencies;
    const mockCreateResult = [
      {
        text: "I must plan my trip to Europe",
        when: new Date("2021-03 - 22T00:00:00.000Z"),
        status: "late",
        id: "aaf5de1d-0878-4022-8ab0-fbe57c45e78e",
      },
    ];

    const DEFAULT_ID = "0001";
    before(() => {
      crypto.randomUUID = () => DEFAULT_ID;
    });
    after(async () => {
      crypto.randomUUID = (await import("node:crypto")).randomUUID;
    });

    beforeEach((context) => {
      _dependencies = {
        todoRepository: {
          list: context.mock.fn(async () => mockDatabase),
        },
      };
      _todoService = new TodoService(_dependencies);
    });

    it(`shouldn't save todo item with invalid data`, async () => {
      const input = new Todo({
        text: "",
        when: "",
      });
      const expected = {
        error: {
          message: "invalid data",
          data: {
            text: "",
            when: "",
            status: "",
            id: DEFAULT_ID,
          },
        },
      };

      const result = await _todoService.create(input);
      assert.deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    });
  });
});
