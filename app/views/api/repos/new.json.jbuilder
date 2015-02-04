json.user current_client_user.name
json.repositories current_client.repositories do |repository|
  json.id repository.id
  json.name repository.name
  json.url repository.url
  json.html_url repository.html_url
end  