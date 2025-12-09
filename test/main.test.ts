import assert from "node:assert/strict";
import { test } from "node:test";

void test("1 + 2는 3이다.", () => {
  assert.strictEqual(1 + 2, 3);
});
