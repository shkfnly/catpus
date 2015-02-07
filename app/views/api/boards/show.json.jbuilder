json.extract! @board, :id, :user_id, :repository_url, :repository_id, :pushed_at, :repository_name

json.members @board.members do |member|
  json.name member.name
  json.username member.username
  json.email member.email
end

json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.ord  list.ord
  json.board_id list.board_id
  json.cards list.cards do |card|
    json.id card.id
    json.title card.title
    json.description card.description
    json.ord card.ord
    json.list_id card.list_id
  end
end
