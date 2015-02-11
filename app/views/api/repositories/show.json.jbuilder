json.extract! @repository, :id, :name, :description, :full_name, :url, :html_url, :open_issues_count, :organization

json.languages current_client.languages(@repository.full_name)

json.collaborators current_client.collabs(@repository.full_name) do |collab|
  json.extract! collab, :id, :login, :avatar_url, :html_url, :type
end

json.contributers current_client.contribs(@repository.full_name) do |contrib|
  json.extract! contrib, :id, :login, :avatar_url, :html_url, :contributions
end

json.assignees current_client.repo_assignees(@repository.full_name)

json.branches current_client.branches(@repository.full_name)

json.events current_client.repository_events(@repository.full_name) do |event|
  json.type event.type
  json.actor event.actor.login
  json.actor_url event.actor.url
  json.actor_gravatar event.actor.avatar_url
  if event.type == "IssuesEvent"
  elsif event.type == "PushEvent"
    json.author event.payload.commits[0].author.name
    json.message event.payload.commits[0].message
    json.url event.payload.commits[0].url

  elsif event.type == "CreateEvent"

  end
  json.created_at event.created_at
end