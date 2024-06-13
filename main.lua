local utils = require("utils")
local js = require("js")
local M = {}

function define_routes(input, content_type, folder)
	local result = {}

	if (input == nil) then
		return result
	end

	local value, sp, add;

	for i = 1, #input do
		value = input[i]
		sp = utils.split(value, '/')
		add = "/smp/" .. folder .. "/" .. sp[#sp]

		table.insert(result, add)
		route(add, function(request)
			return { status = 200, content_type = content_type, body = getbody(value) }
		end)
	end

	return result
end

M.define_element = function(define)
	local scripts = define_routes(define.scripts, "text/javascript", "js")
	local styles = define_routes(define.styles, "text/css", "css")

	if define.dependencies ~= nil then
		utils.table_concat(styles, define.dependencies.styles)
		utils.table_concat(scripts, define.dependencies.scripts)
	end

	element(define.tag, define.path, styles, scripts)
	js.appendElement(define.tag, getbody(define.path))
end

return M
