class Card < ActiveRecord::Base
  validates :title, :list_id, :ord, presence: true

  belongs_to :list
  has_many :tasks, dependent: :destroy
  has_many :card_assignments, dependent: :destroy
  has_many :users, through: :card_assignments
end
