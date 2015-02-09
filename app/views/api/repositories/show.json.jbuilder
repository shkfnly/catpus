json.extract! @repository, :id, :name, :description, :full_name, :url, :html_url, :open_issues_count, :organization

json.languages current_client.languages(@repository.full_name)
json.collaborators current_client.collabs(@repository.full_name)
json.contributers current_client.contribs(@repository.full_name)
json.assignees current_client.repo_assignees(@repository.full_name)
json.branches current_client.branches(@repository.full_name)

json.issues current_client.list_issues(@repository.full_name) do |issue|
  json.id issue.id
  json.url issue.url
  json.html_url issue.html_url
  json.number issue.number
  json.state issue.state
  json.title issue.title
  json.body issue.body
  json.login issue.user.login
  json.avatar_url issue.user.avatar_url
  json.html_url issue.user.html_url
end

json.events current_client.repository_events(@repository.full_name) do |event|
  json.type event.type
  json.actor event.actor.login
  json.actor_url event.actor.url
  json.actor_gravatar event.actor.avatar_url
  json.author event.payload.commits[0].author.name
  json.message event.payload.commits[0].message
  json.url event.payload.commits[0].url
  json.created_at event.created_at
end