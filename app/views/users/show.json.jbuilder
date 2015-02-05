json.user @user.name
json.repositories @user.repositories do |repository|
  json.id repository.github_id
  json.name repository.name
  json.url repository.url
  json.html_url repository.html_url
end
json.issues @user.issues do |issue|
  json.title issue.title
  json.user issue.user.login
  json.repository issue.repository.name
end
