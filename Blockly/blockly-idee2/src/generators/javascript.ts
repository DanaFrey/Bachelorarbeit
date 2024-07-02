/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from 'blockly/javascript';
import * as Blockly from 'blockly/core';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['add_text'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator
) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
  const color =
    generator.valueToCode(block, 'COLOR', Order.ATOMIC) || "'#ffffff'";

  const addText = generator.provideFunction_(
    'addText',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, color) {

  // Add text to the output area.
  const outputDiv = document.getElementById('output');
  const textEl = document.createElement('p');
  textEl.innerText = text;
  textEl.style.color = color;
  outputDiv.appendChild(textEl);
}`
  );
  // Generate the function call for this block.
  const code = `${addText}(${text}, ${color});\n`;
  return code;
};

forBlock['wait'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator
) {
  const seconds = block.getFieldValue('SECONDS');
  const code = `await new Promise(resolve => setTimeout(resolve, ${seconds} * 1000));\n`;
  return code;
};