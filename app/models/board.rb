class Board < ActiveRecord::Base
  validates :title, :user_id, :repository_url, presence: true
  validates :title, uniqueness: {scope: :user_id, message: "Already have a repository with the same name"}

  has_many :lists, dependent: :destroy
  has_many :contributers
  has_many :members, through: :contributers, source: :user

end
