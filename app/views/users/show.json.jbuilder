json.user @user.name
json.boards @user.boards do |board|
  json.id board.id
  json.title board.title
  json.url board.repository_url
  json.repository_id board.repository_id
  json.pushed_at board.pushed_at
  json.repository_name board.repository_name
end
json.repositories @user.repositories do |repository|
  json.id repository.github_id
  json.name repository.name
  json.url repository.url
  json.html_url repository.html_url
  json.pushed_at repository.pushed_at
  json.full_name repository.full_name
end
json.issues @user.issues do |issue|
  json.id issue.id
  json.github_id issue.github_id
  json.number issue.number
  json.repository_name issue.repository_name
  json.repository_id issue.repository_id
  json.url issue.url
  json.html_url issue.html_url
  json.title issue.title
  json.body issue.body
  json.user_id issue.user_id
  json.username issue.username
  json.avatar_url issue.avatar_url
end
