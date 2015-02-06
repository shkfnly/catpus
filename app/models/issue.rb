class Issue < ActiveRecord::Base
  validates :github_id, :url, :html_url, :number, :title, :user_id, :username, :repository_id, :repository_name, presence: true

  belongs_to :user
  belongs_to :repository
end
