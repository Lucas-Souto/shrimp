local utils = require("utils")
local js = require("js")
local M = {}

function define_routes(tag, input, content_type, folder)
	local result = {}

	if (input == nil) then
		return result
	end

	local value, sp, add;

	for i = 1, #input do
		value = input[i]
		sp = utils.split(value, '/')
		add = "/smp/" .. folder .. "/" .. tag .. "." .. sp[#sp]

		table.insert(result, add)
		route(add, function(request)
			return { status = 200, content_type = content_type, body = getbody(value) }
		end)
	end

	return result
end

M.define_element = function(define)
	local scripts = define_routes(define.tag, define.scripts, "text/javascript", "js")
	local styles = define_routes(define.tag, define.styles, "text/css", "css")

	if define.dependencies ~= nil then
		utils.table_concat(styles, define.dependencies.styles)
		utils.table_concat(scripts, define.dependencies.scripts)
	end

	element(define.tag, define.path, styles, scripts)
	
	if define.appendToIndex then
		local variables = {}

		if define.variables ~= nil then
			local temp = ""

			for i = 1, #define.variables do
				variables[define.variables[i]] = "$" .. define.variables[i] .. "$"
			end
		end

		js.appendElement(define.tag, render(define.path, variables))
	end
end

return M
