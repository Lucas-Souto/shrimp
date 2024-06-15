local M = {}
local main = require("main")
local utils = require("utils")
local builtin = require("elements.define")

M.define_element = main.define_element
M.define_builtin = builtin.define
M.split = utils.split
M.table_concat = utils.table_concat

return M
