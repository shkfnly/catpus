json.user @user.name
json.repositories current_client.repositories do |repository|
  json.id repository.id
  json.name repository.name
  json.url repository.url
  json.html_url repository.html_url
end
json.issues current_client.issues(nil, :filter => "subscribed") do |issue|
  if issue.state == 'open'
    json.title issue.title
    json.user issue.user.login
    json.repository issue.repository.name
  end
end
