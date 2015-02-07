class Board < ActiveRecord::Base
  validates :title, :user_id, :repository_url, :repository_id, presence: true
  validates :title, uniqueness: {scope: :user_id, message: "Already have a repository with the same name"}

  has_one :repository
  belongs_to :user
  has_many :lists, dependent: :destroy
  has_many :board_memberships, dependent: :destroy
  has_many :members, through: :board_memberships, source: :user
  has_many :cards, through: :lists 

  def is_member?(u)
    return true if u.id == self.user_id
    board_memberships.where(user_id: u.id).exists?
  end
end
