class Board < ActiveRecord::Base
  validates :title, :user_id, :repository_url, :repository_id, presence: true
  validates :title, uniqueness: {scope: :user_id, message: "Already have a repository with the same name"}

  belongs_to :user
  has_many :lists, dependent: :destroy
  has_many :board_memberships, dependent: :destroy
  has_many :members, through: :board_memberships, source: :user

  def is_member?(user)
    return true if Board.members.collect{|member| member.id}.include?(user.id)
  end
end
