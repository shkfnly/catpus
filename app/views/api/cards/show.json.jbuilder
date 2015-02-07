json.extract! @card, :id, :title, :list_id, :description, :ord

json.tasks @list.tasks do |task|
  json.extract! task, :id, :title, :list_id, :description, :ord
end
