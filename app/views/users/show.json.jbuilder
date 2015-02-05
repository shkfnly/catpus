json.user @user.name
json.boards @user.boards do |board|
  json.id board.id
  json.title board.title
  json.url board.repository_url
  json.repository_id board.repository_id
  json.pushed_at board.pushed_at
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
  json.title issue.title
  json.user issue.user.login
  json.repository issue.repository.name
end
