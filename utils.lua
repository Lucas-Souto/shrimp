local M = {}

M.split = function(input, separator)
	local result = {}

	for str in string.gmatch(input, "([^" .. separator .. "]+)") do
		table.insert(result, str)
	end

	return result;
end

M.define_routes = function(input, content_type, folder)
	local result = {}

	if (input == nil) then
		return result
	end

	for i, value in ipairs(input) do
		local sp = M.split(value, '/')
		local add = "/smp/" .. folder .. "/" .. sp[#sp]

		table.insert(result, add)
		route(add, function(request)
			return { status = 200, content_type = content_type, body = getbody(value) }
		end)
	end

	return result
end

M.table_concat = function(a, b)
	if (b == nil) then
		return a
	end

	for i = 1, #b do
		a[#a + 1] = b[i]
	end

	return a;
end

return M;
