import { describe, it, beforeEach } from "node:test";
import TodoService from "../src/todoService.js";
import assert from "node:assert";

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

    beforeEach((context) => {
      _dependencies = {
        todoRepository: {
          list: context.mock.fn(async () => mockDatabase),
        },
      };
      _todoService = new TodoService(_dependencies);
    });
  });
});
