local M = {}
local main = require("main")
local utils = require("utils")
local current_dir = debug.getinfo(1).short_src

M.define_element = main.define_element;
M.split = utils.split
M.table_concat = utils.table_concat

return M
