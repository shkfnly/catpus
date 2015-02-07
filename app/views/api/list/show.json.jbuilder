json.extract! @list, :id, :title, :board_id, :ord

json.cards @list.cards do |card|
  json.extract! card, :id, :title, :list_id, :description, :ord
end
