class Repository < ActiveRecord::Base
  validates :github_id, :user_id, :name, :url, :html_url, presence: true

  belongs_to :user
  belongs_to :board
  has_many :issues
end
