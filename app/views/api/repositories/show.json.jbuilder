json.extract! @repository, :id, :name, :description, :full_name, :url, :html_url, :open_issues_count, :organization

json.languages current_client.languages(@repository.full_name)
json.collaborators current_client.collabs(@repository.full_name)
json.contributers current_client.contribs(@repository.full_name)
json.assignees current_client.repo_assignees(@repository.full_name)
json.branches current_client.branches(@repository.full_name)

json.issues current_client.list_issues(@repository.full_name) do |issue|
  json.github_id issue.id
  json.number issue.number
  json.repository_name @repository.full_name
  json.repository_id @repository.id
  json.url issue.url
  json.html_url issue.html_url
  json.number issue.number
  json.title issue.title
  json.body issue.body
  json.user_id issue.user.id
  json.username issue.user.login
  json.avatar_url issue.user.avatar_url
  json.html_url issue.user.html_url
end

json.events current_client.repository_events(@repository.full_name) do |event|
  json.type event.type
  json.actor event.actor.login
  json.actor_url event.actor.url
  json.actor_gravatar event.actor.avatar_url
  if event.type == "IssuesEvent"
    json.created_at event.closed_at
  else
    json.author event.payload.commits[0].author.name
    json.message event.payload.commits[0].message
    json.url event.payload.commits[0].url
    json.created_at event.created_at
  end
end